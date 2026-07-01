<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useClipboard } from '@vueuse/core'
import { ElMessage } from 'element-plus'
import {
  ArrowLeft, Monitor, FolderOpened, DataLine, Cpu, Grid, DocumentChecked,
  Download, Link as LinkIcon, Star, Share, CopyDocument,
} from '@element-plus/icons-vue'
import { projects } from '../config'
import { getLanguageColor } from '../utils/languages'
import { useI18n } from '../i18n'
import LangSwitcher from '../components/LangSwitcher.vue'
import ThemeToggle from '../components/ThemeToggle.vue'

const route = useRoute()
const router = useRouter()
const { t, tc } = useI18n()
const { copy } = useClipboard({ legacy: true })

const project = computed(() => projects.find((p) => p.name === route.params.name))
const detail = computed(() => project.value?.detail)

const iconMap = {
  Monitor,
  FolderOpen: FolderOpened,
  Activity: DataLine,
  Terminal: Cpu,
  Layers: Grid,
  Shield: DocumentChecked,
}

/** 区块副标题：优先 config 双语，缺失则回退 i18n 默认文案 */
function sectionSubtitle(key) {
  return tc(detail.value?.sections?.[key]?.subtitle) || t(`detail.sections.${key}.subtitle`)
}

function openLink(url) {
  window.open(url, '_blank', 'noopener,noreferrer')
}

function goBack() {
  router.push({ name: 'Home' })
}

async function copyText(text, duration = 2000) {
  try {
    await copy(text)
    ElMessage({ message: t('common.copied'), type: 'success', duration })
  } catch {
    ElMessage({ message: t('common.copyFailed'), type: 'error', duration: duration + 500 })
  }
}

function shareProject() {
  copyText(window.location.href)
}
</script>

<template>
  <div class="detail-page" v-if="project && detail">
    <!-- Top Nav -->
    <nav class="detail-nav">
      <div class="detail-nav-inner container">
        <div class="detail-nav-left">
          <button class="back-btn" type="button" @click="goBack">
            <el-icon><ArrowLeft /></el-icon>{{ t('detail.back') }}
          </button>
        </div>
        <div class="detail-nav-right">
          <el-button class="detail-nav-btn" text :icon="Share" @click="shareProject">
            {{ t('common.share') }}
          </el-button>
          <el-button class="detail-nav-btn" text :icon="LinkIcon" @click="openLink(project.url)">
            {{ t('detail.viewSource') }}
          </el-button>
          <div class="control-group">
            <LangSwitcher />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>

    <!-- Hero -->
    <section class="detail-hero">
      <div class="detail-hero-aurora"></div>
      <div class="detail-hero-inner container">
        <div class="detail-hero-badge">v{{ detail.version }}</div>
        <h1 class="detail-hero-title">{{ project.name }}</h1>
        <p class="detail-hero-tagline">{{ tc(detail.tagline) }}</p>
        <p class="detail-hero-desc">{{ tc(project.description) }}</p>
        <div class="detail-hero-actions">
          <el-button type="primary" size="large" round :icon="Download" @click="openLink(detail.downloadUrl)">
            {{ t('detail.downloadCta') }}
          </el-button>
          <el-button size="large" round :icon="LinkIcon" @click="openLink(project.url)">
            {{ t('detail.viewSource') }}
          </el-button>
        </div>
        <div class="detail-hero-stats">
          <div class="detail-hero-stat">
            <el-icon><Star /></el-icon>
            <span>{{ project.stars || 0 }} {{ t('home.stats.stars') }}</span>
          </div>
          <div class="detail-hero-stat">
            <el-icon><Share /></el-icon>
            <span>{{ project.forks || 0 }} {{ t('home.stats.forks') }}</span>
          </div>
          <div class="detail-hero-stat" v-if="project.language">
            <span class="detail-hero-lang-dot" :style="{ background: getLanguageColor(project.language) }"></span>
            <span>{{ project.language }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Features -->
    <section class="section" v-if="detail.features && detail.features.length">
      <div class="container">
        <div class="section-head" v-reveal>
          <h2 class="section-title">{{ t('detail.sections.features.title') }}</h2>
          <p class="section-subtitle">{{ sectionSubtitle('features') }}</p>
        </div>
        <div class="feature-grid">
          <div
            v-for="(f, i) in detail.features"
            :key="i"
            class="feature-card"
            v-reveal="Math.min(i * 60, 300)"
          >
            <span class="feature-index">{{ String(i + 1).padStart(2, '0') }}</span>
            <div class="feature-icon">
              <el-icon :size="26"><component :is="iconMap[f.icon] || Monitor" /></el-icon>
            </div>
            <h3 class="feature-title">{{ tc(f.title) }}</h3>
            <p class="feature-desc">{{ tc(f.desc) }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Tech Stack -->
    <section class="section section--alt" v-if="detail.techStack && detail.techStack.length">
      <div class="container">
        <div class="section-head" v-reveal>
          <h2 class="section-title">{{ t('detail.sections.tech.title') }}</h2>
          <p class="section-subtitle">{{ sectionSubtitle('tech') }}</p>
        </div>
        <div class="tech-grid">
          <div
            v-for="(tech, i) in detail.techStack"
            :key="tech"
            class="tech-tag"
            v-reveal="Math.min(i * 30, 240)"
          >
            {{ tech }}
          </div>
        </div>
      </div>
    </section>

    <!-- Shortcuts -->
    <section class="section" v-if="detail.shortcuts && detail.shortcuts.length">
      <div class="container">
        <div class="section-head" v-reveal>
          <h2 class="section-title">{{ t('detail.sections.shortcuts.title') }}</h2>
          <p class="section-subtitle">{{ sectionSubtitle('shortcuts') }}</p>
        </div>
        <div class="shortcut-list" v-reveal>
          <div class="shortcut-row" v-for="(s, i) in detail.shortcuts" :key="i">
            <div class="shortcut-keys"><kbd class="kbd">{{ s.key }}</kbd></div>
            <div class="shortcut-action">{{ tc(s.action) }}</div>
            <button
              class="shortcut-copy"
              type="button"
              :aria-label="t('detail.copyKey')"
              @click="copyText(s.key, 1500)"
            >
              <el-icon><CopyDocument /></el-icon>
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Download -->
    <section class="section section--alt">
      <div class="container">
        <div class="section-head" v-reveal>
          <h2 class="section-title">{{ t('detail.sections.download.title') }}</h2>
          <p class="section-subtitle">{{ sectionSubtitle('download') }}</p>
        </div>
        <div class="download-card" v-reveal>
          <div class="download-info">
            <div class="download-version">
              <div class="download-meta-item">
                <span class="download-label">{{ t('detail.currentVersion') }}</span>
                <span class="download-badge">v{{ detail.version }}</span>
              </div>
            </div>
            <div class="download-meta">
              <div class="download-meta-item" v-if="detail.systemRequirement">
                <span class="download-label">{{ t('detail.systemRequirement') }}</span>
                <span class="download-value">{{ tc(detail.systemRequirement) }}</span>
              </div>
              <div class="download-meta-item" v-if="detail.license">
                <span class="download-label">{{ t('detail.license') }}</span>
                <span class="download-value">{{ detail.license }}</span>
              </div>
              <div class="download-meta-item" v-if="project.updatedAt">
                <span class="download-label">{{ t('detail.updatedDate') }}</span>
                <span class="download-value">{{ project.updatedAt }}</span>
              </div>
            </div>
          </div>
          <div class="download-actions">
            <el-button type="primary" size="large" round :icon="Download" @click="openLink(detail.downloadUrl)">
              {{ t('detail.gotoDownload') }}
            </el-button>
            <el-button size="large" round :icon="LinkIcon" @click="openLink(detail.releaseUrl)">
              {{ t('detail.viewChangelog') }}
            </el-button>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="site-footer">
      <div class="site-footer-inner container">
        <span>{{ t('footer.builtWith') }}</span>
        <div class="footer-links">
          <a :href="project.url" target="_blank" rel="noopener">{{ t('detail.viewSource') }}</a>
        </div>
      </div>
    </footer>

    <el-backtop :right="32" :bottom="32" />
  </div>

  <!-- Not Found -->
  <div class="detail-page" v-else>
    <nav class="detail-nav">
      <div class="detail-nav-inner container">
        <button class="back-btn" type="button" @click="goBack">
          <el-icon><ArrowLeft /></el-icon>{{ t('detail.back') }}
        </button>
        <div class="control-group">
          <LangSwitcher />
          <ThemeToggle />
        </div>
      </div>
    </nav>
    <div class="detail-not-found">
      <div class="empty-emoji">🧭</div>
      <div class="empty-title">{{ t('detail.notFoundTitle') }}</div>
      <div class="empty-desc">{{ t('detail.notFoundDesc') }}</div>
      <el-button type="primary" round @click="goBack">{{ t('detail.backHome') }}</el-button>
    </div>
  </div>
</template>
