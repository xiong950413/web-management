<script setup>
import { Star, Link as LinkIcon, View, ArrowRight, Share, Clock } from '@element-plus/icons-vue'
import { useClipboard } from '@vueuse/core'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { getLanguageColor } from '../utils/languages'
import { useI18n } from '../i18n'

const props = defineProps({
  repo: { type: Object, required: true },
})
defineEmits(['filter-topic'])

const router = useRouter()
const { t, tc } = useI18n()
const { copy } = useClipboard({ legacy: true })

function openLink(url) {
  window.open(url, '_blank', 'noopener,noreferrer')
}

function goToDetail() {
  if (props.repo.detail) {
    router.push({ name: 'ProjectDetail', params: { name: props.repo.name } })
  }
}

function handleCardClick() {
  if (props.repo.detail) goToDetail()
}

function shareUrl() {
  if (props.repo.detail) {
    return `${window.location.origin}${window.location.pathname}#/project/${props.repo.name}`
  }
  return props.repo.url
}

async function share() {
  try {
    await copy(shareUrl())
    ElMessage({ message: t('common.copied'), type: 'success', duration: 2000 })
  } catch {
    ElMessage({ message: t('common.copyFailed'), type: 'error', duration: 2500 })
  }
}

function timeAgo(dateStr) {
  if (!dateStr) return ''
  const s = Math.floor((Date.now() - new Date(dateStr)) / 1000)
  if (s < 60) return t('card.timeAgo.justNow')
  if (s < 3600) return t('card.timeAgo.minute', { n: Math.floor(s / 60) })
  if (s < 86400) return t('card.timeAgo.hour', { n: Math.floor(s / 3600) })
  if (s < 2592000) return t('card.timeAgo.day', { n: Math.floor(s / 86400) })
  if (s < 31536000) return t('card.timeAgo.month', { n: Math.floor(s / 2592000) })
  return t('card.timeAgo.year', { n: Math.floor(s / 31536000) })
}
</script>

<template>
  <article
    class="repo-card"
    :class="{ 'repo-card--clickable': repo.detail }"
    :role="repo.detail ? 'link' : undefined"
    :tabindex="repo.detail ? 0 : undefined"
    @click="handleCardClick"
    @keydown.enter="handleCardClick"
  >
    <div class="repo-card-top">
      <div class="repo-card-icon">{{ repo.name.charAt(0) }}</div>
      <div class="repo-card-heading">
        <a
          v-if="!repo.detail"
          :href="repo.url"
          target="_blank"
          rel="noopener noreferrer"
          class="repo-name"
          @click.stop
        >{{ repo.name }}</a>
        <span v-else class="repo-name">{{ repo.name }}</span>
        <span class="repo-lang" v-if="repo.language">
          <span class="lang-dot" :style="{ background: getLanguageColor(repo.language) }"></span>
          {{ repo.language }}
        </span>
      </div>
      <button class="repo-share" type="button" :aria-label="t('common.share')" @click.stop="share">
        <el-icon><Share /></el-icon>
      </button>
    </div>

    <p class="repo-desc">{{ tc(repo.description) || t('card.noDescription') }}</p>

    <div class="repo-topics" v-if="repo.topics && repo.topics.length">
      <button
        v-for="topic in repo.topics.slice(0, 5)"
        :key="topic"
        type="button"
        class="repo-topic"
        @click.stop="$emit('filter-topic', topic)"
      >
        {{ topic }}
      </button>
    </div>

    <div class="repo-card-footer">
      <div class="repo-metrics">
        <span class="metric metric--star">
          <el-icon><Star /></el-icon>{{ repo.stars || 0 }}
        </span>
        <span class="metric" v-if="repo.forks > 0">
          <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor"
            stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <circle cx="6" cy="5" r="2.4" />
            <circle cx="18" cy="5" r="2.4" />
            <circle cx="12" cy="19" r="2.4" />
            <path d="M6 7.4v2.1a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V7.4M12 12.5v4.1" />
          </svg>
          {{ repo.forks }}
        </span>
        <span class="metric" v-if="repo.updatedAt">
          <el-icon><Clock /></el-icon>{{ timeAgo(repo.updatedAt) }}
        </span>
      </div>
      <div class="repo-actions">
        <el-button
          v-if="repo.detail"
          type="primary"
          size="small"
          round
          @click.stop="goToDetail"
        >
          {{ t('common.detail') }}
          <el-icon class="el-icon--right"><ArrowRight /></el-icon>
        </el-button>
        <template v-else>
          <el-button size="small" text :icon="LinkIcon" @click.stop="openLink(repo.url)">
            {{ t('common.source') }}
          </el-button>
          <el-button
            v-if="repo.homepage"
            size="small"
            text
            :icon="View"
            @click.stop="openLink(repo.homepage)"
          >
            {{ t('common.demo') }}
          </el-button>
        </template>
      </div>
    </div>
  </article>
</template>
