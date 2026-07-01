<script setup>
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/es/locale/lang/en'
import { useI18n } from './i18n'
import { config, projects } from './config'

const route = useRoute()
const { locale, tc } = useI18n()

// 同步 Element Plus 内置组件文案的语言
const elLocale = computed(() => (locale.value === 'zh-CN' ? zhCn : en))

// 同步 <html lang> 与文档标题（随语言 / 路由变化）
watch(
  [locale, () => route.fullPath],
  () => {
    document.documentElement.lang = locale.value
    const siteTitle = tc(config.site.title)
    if (route.name === 'ProjectDetail') {
      const project = projects.find((p) => p.name === route.params.name)
      document.title = project ? `${project.name} · ${siteTitle}` : siteTitle
    } else {
      document.title = siteTitle
    }
  },
  { immediate: true }
)
</script>

<template>
  <el-config-provider :locale="elLocale">
    <router-view v-slot="{ Component }">
      <transition name="route-fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </el-config-provider>
</template>
