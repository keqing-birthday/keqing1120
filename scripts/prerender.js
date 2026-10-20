import { chromium } from '@playwright/test';
import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, '../dist');
const port = 4321;
const baseUrl = `http://localhost:${port}`;

// 需要预渲染的路由，以及每个路由自己的 SEO 元信息
const siteUrl = 'https://keqing1120.cn';
const routes = [
  { path: '/', title: '刻晴生日会 - 璃月七星玉衡星' },
  { path: '/contributors/', title: '全部贡献者名单 - 刻晴生日会' },
];

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
};

function startServer() {
  return new Promise((resolve, reject) => {
    const server = http.createServer(async (req, res) => {
      const urlPath = new URL(req.url, baseUrl).pathname;
      let filePath = path.join(distDir, urlPath);

      try {
        const stat = await fs.stat(filePath);
        if (stat.isDirectory()) {
          filePath = path.join(filePath, 'index.html');
        }
      } catch {
        // 客户端路由回退：未命中文件时返回 index.html
        filePath = path.join(distDir, 'index.html');
      }

      const ext = path.extname(filePath).toLowerCase();
      const contentType = mimeTypes[ext] || 'application/octet-stream';

      try {
        const content = await fs.readFile(filePath);
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content);
      } catch {
        res.writeHead(404);
        res.end('Not found');
      }
    });

    // 端口被占用时明确报错退出，而不是让构建永久挂起
    server.on('error', (err) => {
      reject(new Error(`预渲染服务器启动失败（端口 ${port}）：${err.message}`));
    });
    server.listen(port, () => resolve(server));
  });
}

async function prerender() {
  const server = await startServer();
  let browser;

  try {
    try {
      browser = await chromium.launch();
    } catch (launchErr) {
      // 未安装 Playwright 浏览器（如全新克隆的环境 npm ci 后）时跳过预渲染，
      // 只影响 SEO 快照，不影响构建产物本身
      console.warn(`⚠ 预渲染已跳过：${launchErr.message.split('\n')[0]}`);
      console.warn('  如需启用 SEO 预渲染，请运行 npx playwright install chromium');
      return;
    }

    for (const route of routes) {
      const page = await browser.newPage();
      await page.goto(`${baseUrl}${route.path}`, { waitUntil: 'networkidle' });

      // 等待 React 渲染完成
      await page.waitForSelector('#root', { state: 'attached' });

      // 每个路由写入各自的 title / canonical / og 元信息，避免全部复用首页
      await page.evaluate(
        ({ title, url }) => {
          document.title = title;
          const setAttr = (selector, attr, value) => {
            const el = document.querySelector(selector);
            if (el) el.setAttribute(attr, value);
          };
          setAttr('link[rel="canonical"]', 'href', url);
          setAttr('meta[property="og:url"]', 'content', url);
          setAttr('meta[property="og:title"]', 'content', title);
          setAttr('meta[name="twitter:title"]', 'content', title);
        },
        { title: route.title, url: `${siteUrl}${route.path}` },
      );

      const html = await page.content();

      const outputPath =
        route.path === '/'
          ? path.join(distDir, 'index.html')
          : path.join(distDir, route.path, 'index.html');

      await fs.mkdir(path.dirname(outputPath), { recursive: true });
      await fs.writeFile(outputPath, html, 'utf-8');

      console.log(`✓ 预渲染 ${route.path} -> ${outputPath}`);
      await page.close();
    }
  } catch (err) {
    console.error('预渲染失败：', err.message);
    console.error('提示：如果尚未安装 Playwright 浏览器，请运行 npx playwright install chromium');
    process.exit(1);
  } finally {
    if (browser) await browser.close();
    server.close();
  }
}

prerender();
