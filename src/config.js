/**
 * 网站配置 & 项目数据
 *
 * 【多语言（i18n）说明】
 *   凡是「面向用户展示的文本」字段，都可以写成两种形式，二选一：
 *     1) 纯字符串（单语）：           description: '一句话介绍'
 *     2) 双语对象（推荐）：           description: { 'zh-CN': '中文', 'en-US': 'English' }
 *   渲染时由 i18n 的 tc() 自动按当前语言取值，缺失语言回退到中文。
 *
 *   下列字段支持双语对象：
 *     site.title / site.description
 *     project.description
 *     detail.tagline / detail.systemRequirement
 *     detail.features[].title / detail.features[].desc
 *     detail.shortcuts[].action
 *     detail.sections.*.subtitle
 *   下列字段保持单值（不翻译）：
 *     name / url / homepage / language / stars / forks / topics / updatedAt
 *     detail.version / techStack / license / downloadUrl / releaseUrl
 *     detail.features[].icon / detail.shortcuts[].key
 */
export const config = {
  site: {
    title: { 'zh-CN': '开源项目展示', 'en-US': 'Open Source Showcase' },
    description: { 'zh-CN': '我的开源项目作品集', 'en-US': 'A showcase of my open-source work' },
  },
}

/**
 * 项目列表 —— 直接在这里增删改
 *
 * 字段说明：
 *   name        - 项目名称（必填，单值）
 *   description - 项目描述（必填，支持双语）
 *   url         - GitHub / Gitee 仓库地址（必填）
 *   homepage    - 在线演示地址（可选）
 *   language    - 主要编程语言（可选）
 *   stars       - Star 数量（可选，默认 0）
 *   forks       - Fork 数量（可选，默认 0）
 *   topics      - 标签数组（可选）
 *   updatedAt   - 最后更新时间，格式 YYYY-MM-DD（可选）
 *   detail      - 详情页数据（可选，填写后卡片可点击进入详情页）
 */
export const projects = [
  {
    name: 'lucky-shell',
    description: {
      'zh-CN': 'Windows 桌面 SSH 客户端，类似 FinalShell，支持 SSH 终端、SFTP 文件管理、服务器实时监控、本地终端、多会话管理、命令片段等功能。',
      'en-US': 'A Windows desktop SSH client (à la FinalShell) with SSH terminal, SFTP file management, real-time server monitoring, local terminal, multi-session management, command snippets and more.',
    },
    url: 'https://gitee.com/helixiong/lucky-shell',
    language: 'TypeScript',
    topics: ['ssh', 'electron', 'react', 'sftp', 'terminal', 'xterm'],
    updatedAt: '2025-06-30',
    detail: {
      tagline: {
        'zh-CN': '高效、优雅的 Windows 桌面 SSH 客户端',
        'en-US': 'An efficient, elegant SSH client for Windows',
      },
      version: '2.0.2',
      downloadUrl: 'https://gitee.com/helixiong/lucky-shell/releases',
      releaseUrl: 'https://gitee.com/helixiong/lucky-shell/releases',
      systemRequirement: 'Windows 10/11 (x64)',
      license: 'MIT',
      // 各区块副标题（可选）；不填则回退到 i18n 默认文案
      sections: {
        features: {
          subtitle: {
            'zh-CN': '为开发者打造的全能 SSH 工作台',
            'en-US': 'An all-in-one SSH workbench built for developers',
          },
        },
        tech: {
          subtitle: {
            'zh-CN': '现代技术栈，性能与体验兼得',
            'en-US': 'A modern stack — performance meets experience',
          },
        },
        shortcuts: {
          subtitle: {
            'zh-CN': '高效操作，键盘优先',
            'en-US': 'Work faster, keyboard-first',
          },
        },
        download: {
          subtitle: {
            'zh-CN': '获取最新版本，开始使用 LuckyShell',
            'en-US': 'Get the latest LuckyShell release and start now',
          },
        },
      },
      features: [
        {
          icon: 'Monitor',
          title: { 'zh-CN': 'SSH 终端', 'en-US': 'SSH Terminal' },
          desc: {
            'zh-CN': '基于 xterm.js + ssh2，支持 256 色、自动重连、终端内搜索、字号缩放、多套配色主题切换。',
            'en-US': 'Powered by xterm.js + ssh2 — 256-color, auto-reconnect, in-terminal search, font zoom and switchable color themes.',
          },
        },
        {
          icon: 'FolderOpen',
          title: { 'zh-CN': 'SFTP 文件管理', 'en-US': 'SFTP File Management' },
          desc: {
            'zh-CN': '浏览远程目录、拖拽上传下载、在线编辑文本文件、新建/重命名/删除，右键菜单操作。',
            'en-US': 'Browse remote directories, drag-and-drop transfers, edit text files online, and create / rename / delete from the context menu.',
          },
        },
        {
          icon: 'Activity',
          title: { 'zh-CN': '服务器监控', 'en-US': 'Server Monitoring' },
          desc: {
            'zh-CN': '实时 CPU、内存、磁盘、网络监控，趋势迷你图、Top 进程列表，可调刷新间隔。',
            'en-US': 'Real-time CPU, memory, disk and network metrics with trend sparklines, a top-process list and an adjustable refresh interval.',
          },
        },
        {
          icon: 'Terminal',
          title: { 'zh-CN': '本地终端', 'en-US': 'Local Terminal' },
          desc: {
            'zh-CN': '支持 PowerShell、CMD、WSL、Git Bash 等本地 Shell，原生 PTY 驱动。',
            'en-US': 'Run PowerShell, CMD, WSL, Git Bash and other local shells, driven by a native PTY.',
          },
        },
        {
          icon: 'Layers',
          title: { 'zh-CN': '多会话管理', 'en-US': 'Multi-Session Management' },
          desc: {
            'zh-CN': '标签页式多会话，支持拖拽排序、命令面板 Ctrl+K 快速搜索切换。',
            'en-US': 'Tabbed multi-session with drag-to-reorder and a Ctrl+K command palette for quick switching.',
          },
        },
        {
          icon: 'Shield',
          title: { 'zh-CN': '安全加密', 'en-US': 'Secure Storage' },
          desc: {
            'zh-CN': '密码与 SSH 私钥经 Electron safeStorage 加密后本地持久化，保障凭证安全。',
            'en-US': 'Passwords and SSH keys are encrypted with Electron safeStorage before local persistence, keeping credentials safe.',
          },
        },
      ],
      techStack: [
        'Electron 33', 'React 19', 'TypeScript 5.7', 'Vite 6',
        'Tailwind CSS 3', 'xterm.js 5.5', 'ssh2', 'node-pty',
      ],
      shortcuts: [
        {
          key: 'Ctrl + K',
          action: {
            'zh-CN': '打开命令面板（搜索服务器 / 切换标签）',
            'en-US': 'Open command palette (search servers / switch tabs)',
          },
        },
        {
          key: 'Ctrl + + / - / 0',
          action: { 'zh-CN': '终端字号 放大 / 缩小 / 重置', 'en-US': 'Terminal font: zoom in / out / reset' },
        },
        {
          key: 'Ctrl + Shift + F',
          action: { 'zh-CN': '终端内搜索', 'en-US': 'Search in terminal' },
        },
        {
          key: 'Ctrl + Shift + C',
          action: { 'zh-CN': '复制', 'en-US': 'Copy' },
        },
        {
          key: 'Ctrl + Shift + V',
          action: { 'zh-CN': '粘贴', 'en-US': 'Paste' },
        },
      ],
    },
  },
  // 继续添加更多项目...
]
