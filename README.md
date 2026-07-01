# 开源项目展示 · Open Source Showcase

基于 Vue 3 + Element Plus 的开源项目展示平台，支持项目卡片列表、产品详情页，内置**中英双语国际化**、
搜索筛选、多种排序、网格/列表视图、暗色模式与滚动动效。

## 功能

- **项目卡片列表** — 展示项目名称、描述、语言、Star、Fork、标签等信息
- **产品详情页** — 点击卡片进入详情页，展示功能特性、技术栈、快捷键、下载信息等
- **中英双语（i18n）** — 一键切换语言，**界面 + 项目内容**同时切换；按浏览器语言自动识别并记忆偏好
- **搜索筛选** — 按名称、描述、标签搜索（防抖），按语言筛选，点击标签快速过滤
- **多种排序** — 按 Star / Fork / 更新时间 / 名称排序
- **网格 / 列表视图** — 两种布局一键切换，偏好本地记忆
- **分享** — 一键复制项目链接到剪贴板
- **暗色模式** — 一键切换明暗主题
- **动效与交互** — 滚动进场动画、统计数字滚动、路由过渡、`/` 快捷聚焦搜索
- **响应式布局** — 适配桌面、平板、手机，尊重 `prefers-reduced-motion`

## 技术栈

| 技术 | 说明 |
|------|------|
| [Vue 3](https://vuejs.org/) | Composition API + `<script setup>` |
| [Vue Router 4](https://router.vuejs.org/) | Hash 模式路由 |
| [Element Plus](https://element-plus.org/) | UI 组件库（主题经 CSS 变量重塑） |
| [VueUse](https://vueuse.org/) | 暗色模式、防抖、剪贴板、过渡动画、本地存储等 |
| 自研 i18n | 轻量组合式国际化，无第三方依赖（`src/i18n/`） |
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

## 国际化（i18n）

- 界面文案在 `src/i18n/locales/zh-CN.js` 与 `en-US.js` 中维护。
- **项目内容**（描述、功能、快捷键说明等）直接写在 `src/config.js`，支持双语（见下）。
- 语言状态由 `src/i18n/index.js` 统一管理，持久化到 localStorage，首访按浏览器语言自动选择。

### 双语字段写法

凡是面向用户展示的文本字段，都可写成两种形式之一：

```js
// 1) 纯字符串（单语）
description: '一句话介绍',

// 2) 双语对象（推荐）
description: { 'zh-CN': '中文描述', 'en-US': 'English description' },
```

渲染时由 `tc()` 自动按当前语言取值，缺失语言回退到中文——因此旧的纯字符串写法仍然兼容。

## 添加 / 修改项目

编辑 `src/config.js`，在 `projects` 数组中增删改项目即可：

```js
export const projects = [
  {
    name: '项目名称',                 // 必填，单值
    description: {                     // 必填，支持双语
      'zh-CN': '项目描述',
      'en-US': 'Project description',
    },
    url: 'https://github.com/xxx/xxx',  // 必填，仓库地址
    homepage: 'https://xxx.vercel.app', // 可选，在线演示
    language: 'Vue',                    // 可选，主要语言
    stars: 128,                         // 可选，默认 0
    forks: 32,                          // 可选，默认 0
    topics: ['vue3', 'vite'],           // 可选，标签
    updatedAt: '2025-06-30',            // 可选，更新时间

    // 可选 — 填写后卡片可点击跳转详情页
    detail: {
      tagline: { 'zh-CN': '一句话介绍', 'en-US': 'One-line intro' },
      version: '1.0.0',
      downloadUrl: 'https://xxx/releases',
      releaseUrl: 'https://xxx/releases',
      systemRequirement: 'Windows 10/11 (x64)',
      license: 'MIT',
      // 各区块副标题（可选），不填则用 i18n 默认文案
      sections: {
        features: { subtitle: { 'zh-CN': '副标题', 'en-US': 'Subtitle' } },
      },
      features: [
        {
          icon: 'Monitor',
          title: { 'zh-CN': '功能名称', 'en-US': 'Feature' },
          desc: { 'zh-CN': '功能描述', 'en-US': 'Feature description' },
        },
      ],
      techStack: ['Electron', 'React', 'TypeScript'],
      shortcuts: [
        { key: 'Ctrl + K', action: { 'zh-CN': '打开命令面板', 'en-US': 'Open command palette' } },
      ],
    },
  },
]
```

### detail 字段说明

| 字段 | 说明 | 支持双语 |
|------|------|:---:|
| `tagline` | 详情页副标题 | ✅ |
| `version` | 当前版本号 | — |
| `downloadUrl` | 下载链接 | — |
| `releaseUrl` | 更新日志链接 | — |
| `systemRequirement` | 系统要求 | ✅ |
| `license` | 开源协议 | — |
| `sections` | 各区块副标题（`features`/`tech`/`shortcuts`/`download`） | ✅ |
| `features` | 功能特性列表；`icon` 可选值：`Monitor` `FolderOpen` `Activity` `Terminal` `Layers` `Shield` | `title`/`desc` ✅ |
| `techStack` | 技术栈标签 | — |
| `shortcuts` | 快捷键列表；`key` 为键位、`action` 为说明 | `action` ✅ |

## 项目结构

```
├── index.html                # 入口 HTML
├── package.json
├── vite.config.js
├── vercel.json               # Vercel SPA 重写配置
├── public/
│   └── favicon.svg
└── src/
    ├── main.js               # 应用入口（注册 v-reveal 指令）
    ├── App.vue               # 根组件（路由过渡 + 标题/语言同步）
    ├── config.js             # 项目数据配置（支持双语）
    ├── router.js             # 路由配置
    ├── style.css             # 全局样式与设计令牌
    ├── i18n/
    │   ├── index.js          # i18n 组合式 API（t / tc / locale）
    │   └── locales/
    │       ├── zh-CN.js      # 中文界面文案
    │       └── en-US.js      # 英文界面文案
    ├── api/
    │   └── github.js         # GitHub API（预留）
    ├── directives/
    │   └── reveal.js         # v-reveal 滚动进场指令
    ├── components/
    │   ├── RepoCard.vue      # 项目卡片组件
    │   ├── LangSwitcher.vue  # 语言切换器
    │   └── ThemeToggle.vue   # 明暗主题切换
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
