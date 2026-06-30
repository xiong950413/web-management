<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useDark, useToggle } from '@vueuse/core'
import { projects } from '../config'
import {
  ArrowLeft, Monitor, FolderOpened, DataLine, Cpu,
  Grid, DocumentChecked, Download, Link as LinkIcon, Star, Share,
} from '@element-plus/icons-vue'

const route = useRoute()
const router = useRouter()
const isDark = useDark()
const toggleDark = useToggle(isDark)

const project = computed(() => projects.find(p => p.name === route.params.name))
const detail = computed(() => project.value?.detail)

const iconMap = {
  Monitor, FolderOpen: FolderOpened, Activity: DataLine, Terminal: Cpu, Layers: Grid, Shield: DocumentChecked,
}

function openLink(url) {
  window.open(url, '_blank')
}

function goBack() {
  router.push({ name: 'Home' })
}
</script>

<template>
  <div class="detail-page" v-if="project && detail">
    <!-- Top Nav -->
    <nav class="detail-nav">
      <div class="detail-nav-inner">
        <el-button :icon="ArrowLeft" text @click="goBack">返回项目列表</el-button>
        <div class="detail-nav-right">
          <el-switch
            v-model="isDark"
            inline-prompt
            active-text="🌙"
            inactive-text="☀️"
            style="--el-switch-on-color: #2d2d2d;"
          />
          <el-button :icon="LinkIcon" text @click="openLink(project.url)">源码</el-button>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="detail-hero">
      <div class="detail-hero-bg"></div>
      <div class="detail-hero-inner">
        <div class="detail-hero-badge">v{{ detail.version }}</div>
        <h1 class="detail-hero-title">{{ project.name }}</h1>
        <p class="detail-hero-tagline">{{ detail.tagline }}</p>
        <p class="detail-hero-desc">{{ project.description }}</p>
        <div class="detail-hero-actions">
          <el-button type="primary" size="large" round :icon="Download" @click="openLink(detail.downloadUrl)">
            下载安装包
          </el-button>
          <el-button size="large" round :icon="LinkIcon" @click="openLink(project.url)">
            查看源码
          </el-button>
        </div>
        <div class="detail-hero-stats">
          <div class="detail-hero-stat">
            <el-icon><Star /></el-icon>
            <span>{{ project.stars || 0 }} Stars</span>
          </div>
          <div class="detail-hero-stat">
            <el-icon><Share /></el-icon>
            <span>{{ project.forks || 0 }} Forks</span>
          </div>
          <div class="detail-hero-stat">
            <span class="detail-hero-lang-dot" :style="{ background: '#3178c6' }"></span>
            <span>{{ project.language }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="detail-section">
      <div class="detail-section-inner">
        <h2 class="detail-section-title">核心功能</h2>
        <p class="detail-section-subtitle">为开发者打造的全能 SSH 工作台</p>
        <div class="feature-grid">
          <div v-for="f in detail.features" :key="f.title" class="feature-card">
            <div class="feature-icon">
              <el-icon :size="28"><component :is="iconMap[f.icon]" /></el-icon>
            </div>
            <h3 class="feature-title">{{ f.title }}</h3>
            <p class="feature-desc">{{ f.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Tech Stack Section -->
    <section class="detail-section detail-section--alt">
      <div class="detail-section-inner">
        <h2 class="detail-section-title">技术栈</h2>
        <p class="detail-section-subtitle">采用现代化技术构建，性能与体验兼得</p>
        <div class="tech-grid">
          <div v-for="tech in detail.techStack" :key="tech" class="tech-tag">
            {{ tech }}
          </div>
        </div>
      </div>
    </section>

    <!-- Shortcuts Section -->
    <section class="detail-section">
      <div class="detail-section-inner">
        <h2 class="detail-section-title">快捷键</h2>
        <p class="detail-section-subtitle">高效操作，键盘优先</p>
        <el-table :data="detail.shortcuts" class="shortcut-table" stripe>
          <el-table-column prop="key" label="快捷键" width="220">
            <template #default="{ row }">
              <kbd class="kbd">{{ row.key }}</kbd>
            </template>
          </el-table-column>
          <el-table-column prop="action" label="功能" />
        </el-table>
      </div>
    </section>

    <!-- Download Section -->
    <section class="detail-section detail-section--alt">
      <div class="detail-section-inner">
        <h2 class="detail-section-title">下载安装</h2>
        <p class="detail-section-subtitle">获取最新版本，开始使用 LuckyShell</p>
        <div class="download-card">
          <div class="download-info">
            <div class="download-version">
              <span class="download-label">当前版本</span>
              <span class="download-value">v{{ detail.version }}</span>
            </div>
            <div class="download-meta">
              <div class="download-meta-item">
                <span class="download-label">系统要求</span>
                <span class="download-value">{{ detail.systemRequirement }}</span>
              </div>
              <div class="download-meta-item">
                <span class="download-label">开源协议</span>
                <span class="download-value">{{ detail.license }}</span>
              </div>
              <div class="download-meta-item">
                <span class="download-label">更新日期</span>
                <span class="download-value">{{ project.updatedAt }}</span>
              </div>
            </div>
          </div>
          <div class="download-actions">
            <el-button type="primary" size="large" round :icon="Download" @click="openLink(detail.downloadUrl)">
              前往下载页面
            </el-button>
            <el-button size="large" round :icon="LinkIcon" @click="openLink(detail.releaseUrl)">
              查看更新日志
            </el-button>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="site-footer">
      <p>使用 Vue 3 + Element Plus 构建</p>
    </footer>
  </div>

  <!-- Not Found -->
  <div class="detail-page" v-else>
    <nav class="detail-nav">
      <div class="detail-nav-inner">
        <el-button :icon="ArrowLeft" text @click="goBack">返回项目列表</el-button>
      </div>
    </nav>
    <div class="detail-not-found">
      <el-empty description="项目不存在" />
      <el-button type="primary" @click="goBack">返回首页</el-button>
    </div>
  </div>
</template>
