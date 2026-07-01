<script setup>
import { useDark, useToggle } from '@vueuse/core'
import { Moon, Sunny } from '@element-plus/icons-vue'
import { useI18n } from '../i18n'

const isDark = useDark({ initialValue: 'dark' })
const toggleDark = useToggle(isDark)
const { t } = useI18n()
</script>

<template>
  <button
    class="chrome-btn"
    type="button"
    :aria-label="isDark ? t('common.lightMode') : t('common.darkMode')"
    @click="toggleDark()"
  >
    <el-icon :size="18"><component :is="isDark ? Sunny : Moon" /></el-icon>
  </button>
</template>
