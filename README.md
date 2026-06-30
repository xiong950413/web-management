# 开源项目展示

基于 Vue 3 + Element Plus 的纯前端 GitHub 开源项目展示网站。通过 GitHub API 自动拉取所有公开仓库，支持搜索、筛选、排序和深色模式。

部署到 Vercel 后，每次 push 到 GitHub 即自动发布。

## 快速开始

### 1. 修改配置

编辑 `src/config.js`，将 `YOUR_GITHUB_USERNAME` 替换为你的 GitHub 用户名：

```js
export const config = {
  github: {
    username: '你的GitHub用户名',
  },
}
```

### 2. 本地开发

```bash
npm install
npm run dev
```

### 3. 部署到 Vercel

1. 将项目推送到 GitHub 仓库
2. 在 [Vercel](https://vercel.com) 导入该仓库
3. Vercel 会自动检测 Vite 项目并完成部署
4. 之后每次 push 到 main 分支都会自动重新部署

## 功能

- 自动拉取 GitHub 上所有公开仓库（排除 Fork）
- 搜索仓库名称、描述、标签
- 按语言筛选
- 按 Star / Fork / 更新时间 / 名称排序
- 深色模式切换
- 响应式布局（桌面/平板/手机）
- 回到顶部按钮

## 技术栈

- [Vue 3](https://vuejs.org/) (Composition API + `<script setup>`)
- [Element Plus](https://element-plus.org/)
- [Axios](https://axios-http.com/)
- [Vite](https://vitejs.dev/)
- [VueUse](https://vueuse.org/)

## API 限流说明

未认证的 GitHub API 每小时限制 60 次请求。如果遇到 403 错误，可以在 `src/config.js` 中配置 GitHub Personal Access Token：

```js
github: {
  username: '你的用户名',
  token: 'ghp_xxxxxxxxxxxx',
}
```
