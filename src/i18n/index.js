/**
 * 轻量级国际化（i18n）—— 无第三方依赖
 *
 * 设计要点：
 *   - locale 为模块级单例（useStorage 持久化），全站共享且响应式。
 *   - t(key, params)  —— 翻译「界面文案」，按点路径查词典，支持 {name} 插值。
 *   - tc(field)       —— 解析「内容字段」，兼容 纯字符串 或 { 'zh-CN', 'en-US' } 对象。
 *
 * 因此 config.js 中的内容字段可写成字符串（单语）或对象（双语），tc() 自动兼容。
 */
import { useStorage } from '@vueuse/core'
import { computed } from 'vue'
import zhCN from './locales/zh-CN'
import enUS from './locales/en-US'

export const SUPPORTED_LOCALES = [
  { value: 'zh-CN', label: '简体中文', short: '中' },
  { value: 'en-US', label: 'English', short: 'EN' },
]

const messages = {
  'zh-CN': zhCN,
  'en-US': enUS,
}

const FALLBACK_LOCALE = 'zh-CN'
const STORAGE_KEY = 'portfolio-locale'

/** 默认使用英语（首次访问且无本地缓存时生效） */
function detectLocale() {
  return 'en-US'
}

// 模块级单例：所有组件共享同一个响应式 locale
const locale = useStorage(STORAGE_KEY, detectLocale())

/** 按点路径读取嵌套对象，如 get(obj, 'a.b.c') */
function get(obj, path) {
  return path.split('.').reduce((o, k) => (o == null ? undefined : o[k]), obj)
}

/**
 * 翻译界面文案
 * @param {string} key    点路径，如 'home.searchPlaceholder'
 * @param {object} params 插值参数，如 { count: 3 }
 */
export function t(key, params) {
  const raw = get(messages[locale.value], key) ?? get(messages[FALLBACK_LOCALE], key) ?? key
  if (typeof raw !== 'string' || !params) return raw
  return raw.replace(/\{(\w+)\}/g, (_, name) => (params[name] ?? `{${name}}`))
}

/**
 * 解析内容字段：字符串直接返回；{ 'zh-CN', 'en-US' } 按当前语言取值
 * @param {string|object|undefined} field
 */
export function tc(field) {
  if (field == null) return ''
  if (typeof field === 'string') return field
  return field[locale.value] ?? field[FALLBACK_LOCALE] ?? Object.values(field)[0] ?? ''
}

export function setLocale(value) {
  if (messages[value]) locale.value = value
}

/**
 * 组合式 API 入口。t / tc 内部读取响应式 locale，
 * 在模板与 computed 中使用会自动追踪依赖、随语言切换刷新。
 */
export function useI18n() {
  return {
    locale,
    t,
    tc,
    setLocale,
    availableLocales: SUPPORTED_LOCALES,
    currentLocale: computed(() =>
      SUPPORTED_LOCALES.find((l) => l.value === locale.value) || SUPPORTED_LOCALES[0]
    ),
  }
}
