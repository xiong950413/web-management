<script setup>
import { Star, Link as LinkIcon, ArrowRight } from '@element-plus/icons-vue'
import { getLanguageColor } from '../utils/languages'
import { useRouter } from 'vue-router'

const props = defineProps({
  repo: { type: Object, required: true }
})

const router = useRouter()

function openLink(url) {
  window.open(url, '_blank')
}

function goToDetail() {
  if (props.repo.detail) {
    router.push({ name: 'ProjectDetail', params: { name: props.repo.name } })
  }
}

function timeAgo(dateStr) {
  if (!dateStr) return ''
  const seconds = Math.floor((Date.now() - new Date(dateStr)) / 1000)
  if (seconds < 60) return '刚刚'
  if (seconds < 3600) return `${Math.floor(seconds / 60)} 分钟前`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} 小时前`
  if (seconds < 2592000) return `${Math.floor(seconds / 86400)} 天前`
  if (seconds < 31536000) return `${Math.floor(seconds / 2592000)} 个月前`
  return `${Math.floor(seconds / 31536000)} 年前`
}
</script>

<template>
  <el-card
    class="repo-card"
    :class="{ 'repo-card--clickable': repo.detail }"
    shadow="hover"
    @click="goToDetail"
  >
    <div class="repo-card-header">
      <a
        :href="repo.detail ? undefined : repo.url"
        target="_blank"
        rel="noopener noreferrer"
        class="repo-name"
        @click.stop="repo.detail && goToDetail()"
      >
        {{ repo.name }}
      </a>
      <div class="repo-stars">
        <el-icon><Star /></el-icon>
        <span>{{ repo.stars || 0 }}</span>
      </div>
    </div>

    <p class="repo-desc">{{ repo.description || '暂无描述' }}</p>

    <div class="repo-topics" v-if="repo.topics && repo.topics.length">
      <el-tag
        v-for="topic in repo.topics.slice(0, 5)"
        :key="topic"
        size="small"
        type="info"
        effect="plain"
        round
      >
        {{ topic }}
      </el-tag>
    </div>

    <div class="repo-footer">
      <div class="repo-meta">
        <span class="repo-lang" v-if="repo.language">
          <span class="lang-dot" :style="{ background: getLanguageColor(repo.language) }"></span>
          {{ repo.language }}
        </span>
        <span class="repo-stat" v-if="repo.forks > 0">
          <span>🍴</span> {{ repo.forks }}
        </span>
        <span class="repo-stat">
          {{ timeAgo(repo.updatedAt) }}
        </span>
      </div>
      <div class="repo-links">
        <el-button
          v-if="repo.detail"
          :icon="ArrowRight"
          size="small"
          type="primary"
          @click.stop="goToDetail()"
        >
          查看详情
        </el-button>
        <template v-else>
          <el-button
            :icon="FolderOpened"
            size="small"
            type="primary"
            link
            @click.stop="openLink(repo.url)"
          >
            源码
          </el-button>
          <el-button
            v-if="repo.homepage"
            :icon="LinkIcon"
            size="small"
            type="primary"
            link
            @click.stop="openLink(repo.homepage)"
          >
            Demo
          </el-button>
        </template>
      </div>
    </div>
  </el-card>
</template>
