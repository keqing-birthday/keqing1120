# 刻晴生日会

[![Version](https://img.shields.io/badge/version-v2.0.0-blue.svg)](https://github.com/玉衡一心定天衡/keqing-birthday-2026/releases/tag/v2.0.0)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

> 原神角色「刻晴」同人生日庆祝活动页面。
>
> 玉衡星刻晴的生日即将到来，我们正在筹备一场盛大的庆典。无论你是才华横溢的创作者，还是热情似火的粉丝，都欢迎加入我们！

[//]: # "可以在这里放一张网站首页截图"

## 项目简介

本项目是 **刻晴生日会** 的网站前端代码，基于 React + Vite + Tailwind CSS 构建，包含：

- 首页招募与倒计时
- 历年生日贺图轮播
- 核心贡献者展示
- 音乐播放器
- 全部贡献者页面
- 暗色/亮色主题切换
- 粒子背景动画

网站为非官方同人作品，由刻晴生贺组「玉衡一心定天衡」制作。

## 技术栈

- [React 19](https://react.dev/)
- [Vite 8](https://vitejs.dev/)
- [Tailwind CSS 3](https://tailwindcss.com/)
- [Lucide React](https://lucide.dev/) - 图标
- [Swiper](https://swiperjs.com/) - 轮播图
- [LXGW Neo ZhiSong](https://github.com/lxgw/LxgwNeoZhiSong) / [LXGW WenKai](https://github.com/lxgw/LxgwWenKai) - 中文字体

## 快速开始

### 环境要求

- Node.js 18 或更高版本
- npm 10 或更高版本（也可使用 pnpm / yarn）

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

默认在 http://localhost:5173/ 打开，端口被占用时会自动切换。

### 构建生产版本

```bash
npm run build
```

构建产物输出到 `dist/` 目录。

### 预览生产构建

```bash
npm run preview
```

### 代码检查

```bash
npm run lint
```

## 项目结构

```text
keqing-birthday-2026/
├── public/                 # 静态资源（图片、音乐、图标）
│   ├── images/
│   └── music/
├── src/
│   ├── components/         # React 组件
│   ├── context/            # React Context（音乐、主题）
│   ├── data/               # 静态数据
│   ├── hooks/              # 自定义 Hooks
│   ├── pages/              # 页面组件
│   ├── App.jsx             # 路由与页面结构
│   ├── index.css           # 全局样式
│   └── main.jsx            # 入口文件
├── index.html
├── tailwind.config.js
├── vite.config.js
├── LICENSE
└── README.md
```

## 如何贡献

欢迎提交 Issue 和 Pull Request。

如果你也想加入刻晴生日会的创作，可以通过网站底部的联系方式找到我们。

## 版权声明

本项目网站代码基于 [MIT 许可证](LICENSE) 开源。

本项目为玩家同人作品，非官方内容。所涉及的游戏角色、图像、音乐等素材版权归 **miHoYo / HoYoverse** 所有。

> Genshin Impact and Keqing are trademarks of miHoYo/HoYoverse.  
> This is a fan-made project and is not affiliated with miHoYo.

## 版本历史

### v2.0.0

刻晴生日会网站正式版重构：

- 使用 React + Vite + Tailwind CSS 重新构建
- 新增首页招募倒计时与历年贺图轮播
- 新增核心贡献者与全部贡献者页面
- 新增音乐播放器与主题切换
- 新增粒子背景动画
- 添加 MIT 开源许可证与同人版权声明

## 联系方式

- 制作：刻晴生贺组「玉衡一心定天衡」
- QQ 群：231786295

---

Made with ❤️ by Keqing Birthday Fan Project.
