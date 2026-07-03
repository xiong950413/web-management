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
 *   icon        - 卡片图标（可选，Element Plus 图标名，如 'Monitor'/'Headset'；不填则显示名称首字母）
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
    icon: 'Monitor',
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
  {
    name: 'melodia',
    icon: 'Headset',
    description: {
      'zh-CN': '面向 Windows 桌面端的本地音乐 / 视频播放器，Spotify 风格暗色主题：左侧导航 + 卡片式内容区 + 底部常驻播放条，支持音视频播放、本地媒体库、歌单、播放队列与全局搜索。',
      'en-US': 'A local music & video player for the Windows desktop with a Spotify-style dark theme — sidebar navigation, a card content area and a persistent bottom player bar. Audio/video playback, a local media library, playlists, a play queue and global search.',
    },
    url: 'https://gitee.com/helixiong/melodia',
    language: 'TypeScript',
    topics: ['electron', 'react', 'typescript', 'music-player', 'video-player'],
    updatedAt: '2026-06-14',
    detail: {
      tagline: {
        'zh-CN': 'Spotify 风格的本地音乐 / 视频播放器',
        'en-US': 'A Spotify-style local music & video player',
      },
      version: '1.0.0',
      downloadUrl: 'https://gitee.com/helixiong/melodia/releases',
      releaseUrl: 'https://gitee.com/helixiong/melodia/releases',
      systemRequirement: 'Windows 10/11 (x64)',
      license: 'MIT',
      // 各区块副标题（可选）；不填则回退到 i18n 默认文案
      sections: {
        features: {
          subtitle: {
            'zh-CN': '为本地曲库打造的沉浸式播放体验',
            'en-US': 'An immersive playback experience for your local library',
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
            'zh-CN': '键盘优先，畅快控制播放',
            'en-US': 'Keyboard-first, effortless playback control',
          },
        },
        download: {
          subtitle: {
            'zh-CN': '获取最新版本，开始使用 Melodia',
            'en-US': 'Get the latest Melodia release and start now',
          },
        },
      },
      features: [
        {
          icon: 'Headset',
          title: { 'zh-CN': '音频播放', 'en-US': 'Audio Playback' },
          desc: {
            'zh-CN': '支持 mp3、flac、wav、aac、m4a、ogg、opus、wma 等主流格式，进度拖动、音量、随机、单曲 / 列表循环一应俱全。',
            'en-US': 'Plays mainstream formats — mp3, flac, wav, aac, m4a, ogg, opus and wma — with seek, volume, shuffle and single / list repeat.',
          },
        },
        {
          icon: 'Video',
          title: { 'zh-CN': '视频播放', 'en-US': 'Video Playback' },
          desc: {
            'zh-CN': '支持 mp4、webm、mkv、mov、avi 等格式，可全屏、画中画 (PiP)，或缩小为悬浮小窗一边看一边浏览。',
            'en-US': 'Supports mp4, webm, mkv, mov and avi with fullscreen, picture-in-picture (PiP), or a floating mini-window while you keep browsing.',
          },
        },
        {
          icon: 'FolderOpen',
          title: { 'zh-CN': '本地媒体库', 'en-US': 'Local Media Library' },
          desc: {
            'zh-CN': '添加文件夹递归扫描或直接添加文件，自动读取标题、艺人、专辑、时长与内嵌封面等标签。',
            'en-US': 'Add folders for a recursive scan or pick files directly; tags like title, artist, album, duration and embedded cover art are read automatically.',
          },
        },
        {
          icon: 'List',
          title: { 'zh-CN': '歌单与播放队列', 'en-US': 'Playlists & Queue' },
          desc: {
            'zh-CN': '新建 / 重命名 / 删除歌单，右键歌曲加入歌单；实时查看「正在播放 / 接下来」，可移除、清空、跳播。',
            'en-US': 'Create / rename / delete playlists and add songs from the context menu; watch "Now Playing / Up Next" and remove, clear or jump within the queue.',
          },
        },
        {
          icon: 'Search',
          title: { 'zh-CN': '搜索与多视图', 'en-US': 'Search & Multiple Views' },
          desc: {
            'zh-CN': '按歌曲 / 专辑 / 艺人全局即时筛选，主页、歌曲、专辑、艺人、视频多种浏览视图自由切换。',
            'en-US': 'Instant global filtering by song / album / artist, with Home, Songs, Albums, Artists and Videos browsing views.',
          },
        },
        {
          icon: 'Sparkles',
          title: { 'zh-CN': '现代外观', 'en-US': 'Modern Look' },
          desc: {
            'zh-CN': '无边框窗口 + 自定义标题栏、圆角卡片、绿色强调色与流畅的页面切换动效，媒体库与设置自动持久化。',
            'en-US': 'A frameless window with a custom title bar, rounded cards, a green accent and smooth page transitions; library and settings persist automatically.',
          },
        },
      ],
      techStack: [
        'Electron 42', 'React 19', 'TypeScript', 'electron-vite 5', 'Vite 7',
        'Tailwind CSS 3', 'Zustand 5', 'React Router 7', 'framer-motion', 'music-metadata',
      ],
      shortcuts: [
        {
          key: 'Space',
          action: { 'zh-CN': '播放 / 暂停', 'en-US': 'Play / Pause' },
        },
        {
          key: '← / →',
          action: { 'zh-CN': '快退 / 快进 5 秒', 'en-US': 'Seek backward / forward 5s' },
        },
        {
          key: '↑ / ↓',
          action: { 'zh-CN': '音量 增大 / 减小', 'en-US': 'Volume up / down' },
        },
        {
          key: 'M',
          action: { 'zh-CN': '静音 / 取消静音', 'en-US': 'Mute / Unmute' },
        },
      ],
    },
  },
  {
    name: 'mysql-ai',
    icon: 'Coin',
    description: {
      'zh-CN': 'MySQL 数据库管理 + 多轮 AI 对话分析的 Windows 桌面客户端：连接管理、库表浏览、SQL 编辑执行、表数据增删改查、表设计器，内置 AI 助手可用自然语言写 / 解释 / 优化 SQL 并对话式分析数据库。',
      'en-US': 'A Windows desktop client for MySQL management plus multi-turn AI analysis — connection management, schema browsing, a SQL editor, table-data CRUD and a table designer, with a built-in AI assistant that writes / explains / optimizes SQL and analyzes your database conversationally.',
    },
    url: 'https://gitee.com/helixiong/mysql-ai',
    language: 'JavaScript',
    topics: ['mysql', 'database', 'ai', 'llm', 'sql', 'electron', 'vue'],
    updatedAt: '2026-07-03',
    detail: {
      tagline: {
        'zh-CN': '会聊天的 MySQL 管理与分析客户端',
        'en-US': 'A conversational MySQL management & analysis client',
      },
      version: '1.0.0',
      downloadUrl: 'https://gitee.com/helixiong/mysql-ai/releases',
      releaseUrl: 'https://gitee.com/helixiong/mysql-ai/releases',
      systemRequirement: 'Windows 10/11 (x64)',
      license: 'MIT',
      // 各区块副标题（可选）；不填则回退到 i18n 默认文案
      sections: {
        features: {
          subtitle: {
            'zh-CN': '数据库管理与 AI 分析，一个客户端搞定',
            'en-US': 'Database management and AI analysis in one client',
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
            'zh-CN': '获取最新版本，开始使用 MySQL 智能 AI 助手',
            'en-US': 'Get the latest release and start now',
          },
        },
      },
      features: [
        {
          icon: 'FolderOpen',
          title: { 'zh-CN': '连接管理与库表浏览', 'en-US': 'Connections & Schema Browsing' },
          desc: {
            'zh-CN': '多连接管理与连接池，左侧库表树支持搜索、右键菜单（编辑 / 删除 / 查看 DDL / 复制 SELECT）与一键刷新。',
            'en-US': 'Multi-connection management with pooling; a searchable schema tree with a right-click menu (edit / drop / view DDL / copy SELECT) and one-click refresh.',
          },
        },
        {
          icon: 'Terminal',
          title: { 'zh-CN': 'SQL 编辑与执行', 'en-US': 'SQL Editor & Execution' },
          desc: {
            'zh-CN': '基于 CodeMirror 6：语法高亮、自动补全、查找替换（Ctrl+F）、注释切换、一键格式化，多 Tab 查询与执行历史。',
            'en-US': 'Powered by CodeMirror 6 — syntax highlighting, autocomplete, find & replace (Ctrl+F), comment toggling, one-click formatting, multi-tab queries and execution history.',
          },
        },
        {
          icon: 'List',
          title: { 'zh-CN': '表数据编辑与导出', 'en-US': 'Table Data Editing & Export' },
          desc: {
            'zh-CN': '数据网格支持行内编辑（脏单元格高亮）、批量删除、列点击排序、自定义 WHERE，结果集可 CSV / JSON 导出。',
            'en-US': 'A data grid with inline editing (dirty-cell highlight), batch delete, click-to-sort columns and a custom WHERE; result sets export to CSV / JSON.',
          },
        },
        {
          icon: 'Layers',
          title: { 'zh-CN': '表设计器', 'en-US': 'Table Designer' },
          desc: {
            'zh-CN': '可视化建表、改列与索引编辑，自动生成并预览 DDL 后再执行。',
            'en-US': 'Visually create tables, edit columns and indexes, then generate and preview the DDL before running it.',
          },
        },
        {
          icon: 'Sparkles',
          title: { 'zh-CN': 'AI 智能助手', 'en-US': 'AI Assistant' },
          desc: {
            'zh-CN': '用自然语言写 / 解释 / 优化 SQL，并对话式分析数据库；Markdown + SQL 高亮流式输出，可一键填入或追加到编辑器。兼容 DeepSeek / 通义 / 智谱 / OpenAI 等接口。',
            'en-US': 'Write / explain / optimize SQL in natural language and analyze your database via chat; streamed Markdown with SQL highlighting, fillable into the editor in one click. Works with DeepSeek / Qwen / GLM / OpenAI-compatible APIs.',
          },
        },
        {
          icon: 'Shield',
          title: { 'zh-CN': '安全加密', 'en-US': 'Secure Storage' },
          desc: {
            'zh-CN': '连接密码经 Electron safeStorage（Windows DPAPI）加密存储；行修改 / 删除走参数化查询，渲染层 contextIsolation 开启、数据库能力仅经受控 IPC 暴露。',
            'en-US': 'Connection passwords are encrypted with Electron safeStorage (Windows DPAPI); row updates / deletes use parameterized queries, with contextIsolation on and DB access exposed only over controlled IPC.',
          },
        },
      ],
      techStack: [
        'Electron 30', 'Vue 3', 'Vite 5', 'Element Plus',
        'Pinia', 'CodeMirror 6', 'mysql2', 'electron-builder',
      ],
      shortcuts: [
        {
          key: 'Ctrl + Enter / F9',
          action: { 'zh-CN': '运行当前 SQL（无选中则运行全部）', 'en-US': 'Run current SQL (or all if nothing is selected)' },
        },
        {
          key: 'Ctrl + Shift + F',
          action: { 'zh-CN': '格式化 SQL', 'en-US': 'Format SQL' },
        },
        {
          key: 'Ctrl + /',
          action: { 'zh-CN': '注释 / 取消注释', 'en-US': 'Toggle comment' },
        },
        {
          key: 'Ctrl + T / W',
          action: { 'zh-CN': '新建 / 关闭查询 Tab', 'en-US': 'New / close query tab' },
        },
        {
          key: 'Ctrl + B / J',
          action: { 'zh-CN': '切换 库表栏 / AI 面板', 'en-US': 'Toggle schema pane / AI panel' },
        },
        {
          key: 'Ctrl + K',
          action: { 'zh-CN': '聚焦库表搜索', 'en-US': 'Focus schema search' },
        },
      ],
    },
  },
  // 继续添加更多项目...
]
