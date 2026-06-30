# 开源项目展示

基于 Vue 3 + Element Plus 的开源项目展示平台，支持项目卡片列表展示和产品详情页，提供搜索、筛选、排序和暗色模式功能。

## 功能

- **项目卡片列表** — 展示项目名称、描述、语言、Star、Fork、标签等信息
- **产品详情页** — 点击卡片跳转详情页，展示功能特性、技术栈、快捷键、下载链接等
- **搜索筛选** — 按名称、描述、标签搜索，按语言筛选
- **多种排序** — 按 Star / Fork / 更新时间 / 名称排序
- **暗色模式** — 一键切换明暗主题
- **响应式布局** — 适配桌面、平板、手机

## 技术栈

| 技术 | 说明 |
|------|------|
| [Vue 3](https://vuejs.org/) | Composition API + `<script setup>` |
| [Vue Router 4](https://router.vuejs.org/) | Hash 模式路由 |
| [Element Plus](https://element-plus.org/) | UI 组件库 |
| [VueUse](https://vueuse.org/) | 工具函数（暗色模式） |
| [Vite](https://vitejs.dev/) | 构建工具 |

## 快速开始

### 安装依赖

```bash
npm install
```

### 本地开发

```bash
npm run dev
```

浏览器访问 http://localhost:5173 查看效果。

### 构建打包

```bash
npm run build
```

产物输出到 `dist/` 目录。

## 添加 / 修改项目

编辑 `src/config.js`，在 `projects` 数组中增删改项目即可：

```js
export const projects = [
  {
    name: '项目名称',           // 必填
    description: '项目描述',     // 必填
    url: 'https://github.com/xxx/xxx',  // 必填，仓库地址
    homepage: 'https://xxx.vercel.app', // 可选，在线演示
    language: 'Vue',            // 可选，主要语言
    stars: 128,                 // 可选，默认 0
    forks: 32,                  // 可选，默认 0
    topics: ['vue3', 'vite'],   // 可选，标签
    updatedAt: '2025-06-30',    // 可选，更新时间

    // 可选 — 填写后卡片可点击跳转详情页
    detail: {
      tagline: '一句话介绍',
      version: '1.0.0',
      downloadUrl: 'https://xxx/releases',
      releaseUrl: 'https://xxx/releases',
      systemRequirement: 'Windows 10/11 (x64)',
      license: 'MIT',
      features: [
        { icon: 'Monitor', title: '功能名称', desc: '功能描述' },
      ],
      techStack: ['Electron', 'React', 'TypeScript'],
      shortcuts: [
        { key: 'Ctrl + K', action: '打开命令面板' },
      ],
    },
  },
]
```

### detail 字段说明

| 字段 | 说明 |
|------|------|
| `tagline` | 详情页副标题 |
| `version` | 当前版本号 |
| `downloadUrl` | 下载链接 |
| `releaseUrl` | 更新日志链接 |
| `systemRequirement` | 系统要求 |
| `license` | 开源协议 |
| `features` | 功能特性列表，`icon` 可选值：`Monitor` `FolderOpen` `Activity` `Terminal` `Layers` `Shield` |
| `techStack` | 技术栈标签 |
| `shortcuts` | 快捷键列表 |

## 项目结构

```
├── index.html                # 入口 HTML
├── package.json
├── vite.config.js
├── vercel.json               # Vercel SPA 重写配置
├── public/
│   └── favicon.svg
└── src/
    ├── main.js               # 应用入口
    ├── App.vue               # 根组件（router-view）
    ├── config.js             # 项目数据配置
    ├── router.js             # 路由配置
    ├── style.css             # 全局样式
    ├── api/
    │   └── github.js         # GitHub API（预留）
    ├── components/
    │   └── RepoCard.vue      # 项目卡片组件
    ├── utils/
    │   └── languages.js      # 语言颜色映射
    └── views/
        ├── HomeView.vue      # 首页（项目列表）
        └── ProjectDetail.vue # 项目详情页
```

## 部署到 Vercel

1. 将项目推送到 GitHub 仓库
2. 在 [Vercel](https://vercel.com) 导入该仓库
3. Vercel 自动检测 Vite 项目并完成部署
4. 之后每次 push 到 main 分支都会自动重新部署

## License

MIT
