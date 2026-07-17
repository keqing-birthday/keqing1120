import { chromium } from '@playwright/test';
import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, '../dist');
const port = 4321;
const baseUrl = `http://localhost:${port}`;

// 需要预渲染的路由
const routes = ['/', '/contributors'];

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
  return new Promise((resolve) => {
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

    server.listen(port, () => resolve(server));
  });
}

async function prerender() {
  const server = await startServer();
  let browser;

  try {
    browser = await chromium.launch();

    for (const route of routes) {
      const page = await browser.newPage();
      await page.goto(`${baseUrl}${route}`, { waitUntil: 'networkidle' });

      // 等待 React 渲染完成
      await page.waitForSelector('#root', { state: 'attached' });

      const html = await page.content();

      const outputPath =
        route === '/'
          ? path.join(distDir, 'index.html')
          : path.join(distDir, route, 'index.html');

      await fs.mkdir(path.dirname(outputPath), { recursive: true });
      await fs.writeFile(outputPath, html, 'utf-8');

      console.log(`✓ 预渲染 ${route} -> ${outputPath}`);
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
