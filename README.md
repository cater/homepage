<p align="center">
  <img src="./public/og.png" width="200" height="200" />
</p>

<h1 align="center">cater's homepage</h1>

<p align="center">
  <a href="https://851158.xyz" target="_blank">主页</a>
<p>

### 介绍
> 一个简约风格的个人主页

### 特色
- [x] 使用NextJS支持SSR渲染
- [x] 使用Mdx作为Blog系统
- [x] 通过Upstash的redis实现文章计数系统

### 技术栈

* [Next.JS](https://nextjs.org/)
* [TailwindCSS](https://tailwindcss.com/)
* [Contentlayer](https://contentlayer.dev/)


### 手动部署

* **安装** [node.js](https://nodejs.org/zh-cn/) **环境**

  > node >= 18.19.1  
  > npm > 10.2.4
  
* 然后以 **管理员权限** 运行 `cmd` 终端，并 `cd` 到 项目根目录
* 在 `终端` 中输入：

```bash
# 安装 pnpm
npm install -g pnpm

# 安装依赖
pnpm install

# 预览
pnpm dev

# 构建
pnpm build

pm2 start npm --name "cater-home" -- start
```

> 构建完成后，也可使用 `Vercel` 等托管平台一键导入并自动部署

### 书签导航页

1. 将浏览器导出的书签 JSON 文件放到 `content/` 目录（例如 `content/bookmarks-2026-02-23.json`）。
2. 文件名保持 `bookmarks-YYYY-MM-DD.json` 格式，页面会自动读取最新日期的文件。
3. 运行 `pnpm dev` 或重新 `pnpm build`，访问 `/comment` 即可看到按文件夹分组的链接卡片。

> 兼容：优先读取 `bookmarks-*.json`，没有 JSON 时会回退读取 `content/bookmarks.html`。

<a title="Copyright" target="_blank" href="https://851158.xyz/"><img src="https://img.shields.io/badge/Copyright%20%C2%A9%202023--2024-Cater-blue"></a>
