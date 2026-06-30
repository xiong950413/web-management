/**
 * 网站配置 & 项目数据
 * 在 projects 数组中添加你要展示的项目即可
 */
export const config = {
  site: {
    title: '开源项目展示',
    description: '我的开源项目作品集',
  },
}

/**
 * 项目列表 —— 直接在这里增删改
 *
 * 字段说明：
 *   name        - 项目名称（必填）
 *   description - 项目描述（必填）
 *   url         - GitHub 仓库地址（必填）
 *   homepage    - 在线演示地址（可选，不需要可删除此字段）
 *   language    - 主要编程语言（可选）
 *   stars       - Star 数量（可选，默认 0）
 *   forks       - Fork 数量（可选，默认 0）
 *   topics      - 标签数组（可选）
 *   updatedAt   - 最后更新时间，格式 YYYY-MM-DD（可选）
 */
export const projects = [
  {
    name: 'lucky-shell',
    description: 'Windows桌面SSH客户端，类似FinalShell，支持SSH终端、SFTP文件管理、服务器实时监控、本地终端、多会话管理、命令片段等功能。',
    url: 'https://gitee.com/helixiong/lucky-shell',
    language: 'TypeScript',
    topics: ['ssh', 'electron', 'react', 'sftp', 'terminal', 'xterm'],
    updatedAt: '2025-06-30',
    detail: {
      tagline: '高效、优雅的 Windows 桌面 SSH 客户端',
      version: '2.0.2',
      downloadUrl: 'https://gitee.com/helixiong/lucky-shell/releases',
      releaseUrl: 'https://gitee.com/helixiong/lucky-shell/releases',
      systemRequirement: 'Windows 10/11 (x64)',
      license: 'MIT',
      features: [
        {
          icon: 'Monitor',
          title: 'SSH 终端',
          desc: '基于 xterm.js + ssh2，支持 256 色、自动重连、终端内搜索、字号缩放、多套配色主题切换。',
        },
        {
          icon: 'FolderOpen',
          title: 'SFTP 文件管理',
          desc: '浏览远程目录、拖拽上传下载、在线编辑文本文件、新建/重命名/删除，右键菜单操作。',
        },
        {
          icon: 'Activity',
          title: '服务器监控',
          desc: '实时 CPU、内存、磁盘、网络监控，趋势迷你图、Top 进程列表，可调刷新间隔。',
        },
        {
          icon: 'Terminal',
          title: '本地终端',
          desc: '支持 PowerShell、CMD、WSL、Git Bash 等本地 Shell，原生 PTY 驱动。',
        },
        {
          icon: 'Layers',
          title: '多会话管理',
          desc: '标签页式多会话，支持拖拽排序、命令面板 Ctrl+K 快速搜索切换。',
        },
        {
          icon: 'Shield',
          title: '安全加密',
          desc: '密码与 SSH 私钥经 Electron safeStorage 加密后本地持久化，保障凭证安全。',
        },
      ],
      techStack: [
        'Electron 33', 'React 19', 'TypeScript 5.7', 'Vite 6',
        'Tailwind CSS 3', 'xterm.js 5.5', 'ssh2', 'node-pty',
      ],
      shortcuts: [
        { key: 'Ctrl + K', action: '打开命令面板（搜索服务器 / 切换标签）' },
        { key: 'Ctrl + + / - / 0', action: '终端字号 放大 / 缩小 / 重置' },
        { key: 'Ctrl + Shift + F', action: '终端内搜索' },
        { key: 'Ctrl + Shift + C', action: '复制' },
        { key: 'Ctrl + Shift + V', action: '粘贴' },
      ],
    },
  },
  // 继续添加更多项目...
]
