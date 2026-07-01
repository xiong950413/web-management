/**
 * v-reveal —— 元素进入视口时的淡入 / 上移动画（滚动进场）
 *
 * 用法：
 *   v-reveal                 默认无延迟
 *   v-reveal="120"           延迟 120ms
 *   v-reveal="{ delay: 80 }" 对象形式
 *
 * 尊重 prefers-reduced-motion：用户偏好减少动态时直接显示，不做动画。
 */
const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

function resolveDelay(value) {
  if (value == null) return 0
  if (typeof value === 'number') return value
  return Number(value.delay) || 0
}

export const reveal = {
  mounted(el, binding) {
    el.classList.add('reveal')

    if (prefersReducedMotion() || typeof IntersectionObserver === 'undefined') {
      el.classList.add('reveal-in')
      return
    }

    const delay = resolveDelay(binding.value)
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.style.transitionDelay = `${delay}ms`
            el.classList.add('reveal-in')
            io.unobserve(el)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )
    io.observe(el)
    el._revealObserver = io
  },
  unmounted(el) {
    if (el._revealObserver) {
      el._revealObserver.disconnect()
      delete el._revealObserver
    }
  },
}
