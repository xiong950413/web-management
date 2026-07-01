<script setup>
import { useI18n, SUPPORTED_LOCALES } from '../i18n'

const { locale, setLocale, currentLocale, t } = useI18n()
</script>

<template>
  <el-dropdown trigger="click" popper-class="lang-dropdown" @command="setLocale">
    <button class="lang-switch" type="button" :aria-label="t('common.language')">
      <svg class="lang-switch-icon" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
        <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.6" />
        <path
          d="M3 12h18M12 3c2.5 2.4 3.8 5.6 3.8 9S14.5 18.6 12 21C9.5 18.6 8.2 15.4 8.2 12S9.5 5.4 12 3z"
          fill="none" stroke="currentColor" stroke-width="1.6"
        />
      </svg>
      <span class="lang-switch-label">{{ currentLocale.short }}</span>
    </button>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="l in SUPPORTED_LOCALES"
          :key="l.value"
          :command="l.value"
          :class="{ 'is-active': l.value === locale }"
        >
          <span class="lang-item">
            <span class="lang-item-check">{{ l.value === locale ? '✓' : '' }}</span>
            {{ l.label }}
          </span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
