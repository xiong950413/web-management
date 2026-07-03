/**
 * 项目主题 → 内联 CSS 变量
 *
 * 把 config 中每个项目的 `theme` 配置转成一组可局部覆盖的 CSS 变量，
 * 绑到详情页根节点 / 首页卡片上即可整体“换肤”，无需为每个项目写样式。
 *
 * 由 primary 派生的 Element Plus 浅色梯度（light-3..9）用 color-mix 混入
 * 全局 `--tint`（亮色=白、暗色=近黑，见 style.css），从而在明暗两种模式下
 * 都能得到正确方向的浅色——避免暗色模式下按钮 hover 变成刺眼的浅色块。
 *
 * theme 字段：
 *   primary   必填，主强调色（HEX）
 *   brandText 可选，链接/hover 文本色，默认取 primary
 *   grad      可选，品牌渐变（logo 方块、卡片顶条、标题下划线、技术标签 hover）
 *   heroBg    可选，详情页 hero 背景（大渐变）
 *   aurora    可选，详情页 hero 光晕（多层 radial-gradient，逗号分隔）
 */
export function themeVars(theme) {
  if (!theme || !theme.primary) return {}
  const p = theme.primary
  const vars = {
    '--el-color-primary': p,
    '--brand-1': p,
    '--brand-text': theme.brandText || p,
    '--ring': `0 0 0 3px color-mix(in srgb, ${p} 40%, transparent)`,
    '--el-color-primary-light-3': `color-mix(in srgb, ${p} 70%, var(--tint))`,
    '--el-color-primary-light-5': `color-mix(in srgb, ${p} 50%, var(--tint))`,
    '--el-color-primary-light-7': `color-mix(in srgb, ${p} 30%, var(--tint))`,
    '--el-color-primary-light-8': `color-mix(in srgb, ${p} 20%, var(--tint))`,
    '--el-color-primary-light-9': `color-mix(in srgb, ${p} 12%, var(--tint))`,
    '--el-color-primary-dark-2': `color-mix(in srgb, ${p} 80%, #000)`,
  }
  if (theme.grad) vars['--brand-grad'] = theme.grad
  if (theme.heroBg) vars['--hero-bg'] = theme.heroBg
  if (theme.aurora) vars['--hero-aurora'] = theme.aurora
  return vars
}
