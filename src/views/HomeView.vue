<script setup>
import { ref, computed, onMounted } from 'vue'
import {
  refDebounced, useStorage, useTransition, TransitionPresets, onKeyStroke,
} from '@vueuse/core'
import { Folder, Search, Grid, List } from '@element-plus/icons-vue'
import { config, projects } from '../config'
import RepoCard from '../components/RepoCard.vue'
import LangSwitcher from '../components/LangSwitcher.vue'
import ThemeToggle from '../components/ThemeToggle.vue'
import { useI18n } from '../i18n'

const { t, tc } = useI18n()

const search = ref('')
const debouncedSearch = refDebounced(search, 250)
const selectedLanguage = ref('')
const selectedTopic = ref('')
const sortBy = ref('stars')
const viewMode = useStorage('portfolio-view-mode-v2', 'list')

// 按 "/" 聚焦搜索框（在输入框内时不拦截）
const searchInput = ref(null)
onKeyStroke('/', (e) => {
  const tag = document.activeElement?.tagName
  if (tag === 'INPUT' || tag === 'TEXTAREA') return
  e.preventDefault()
  searchInput.value?.focus()
})

const languages = computed(() => {
  const set = new Set(projects.map((p) => p.language).filter(Boolean))
  return Array.from(set).sort()
})

const filteredProjects = computed(() => {
  let result = [...projects]

  const q = debouncedSearch.value.trim().toLowerCase()
  if (q) {
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        tc(p.description).toLowerCase().includes(q) ||
        (p.topics || []).some((topic) => topic.toLowerCase().includes(q))
    )
  }

  if (selectedLanguage.value) {
    result = result.filter((p) => p.language === selectedLanguage.value)
  }
  if (selectedTopic.value) {
    result = result.filter((p) => (p.topics || []).includes(selectedTopic.value))
  }

  switch (sortBy.value) {
    case 'stars':
      result.sort((a, b) => (b.stars || 0) - (a.stars || 0))
      break
    case 'forks':
      result.sort((a, b) => (b.forks || 0) - (a.forks || 0))
      break
    case 'updated':
      result.sort((a, b) => new Date(b.updatedAt || 0) - new Date(a.updatedAt || 0))
      break
    case 'name':
      result.sort((a, b) => a.name.localeCompare(b.name))
      break
  }

  return result
})

const hasFilters = computed(
  () => !!(search.value || selectedLanguage.value || selectedTopic.value)
)

function clearFilters() {
  search.value = ''
  selectedLanguage.value = ''
  selectedTopic.value = ''
}

function onFilterTopic(topic) {
  selectedTopic.value = selectedTopic.value === topic ? '' : topic
}

// 统计数字滚动动画
const totalStars = computed(() => projects.reduce((s, p) => s + (p.stars || 0), 0))
const totalForks = computed(() => projects.reduce((s, p) => s + (p.forks || 0), 0))

const projectsSource = ref(0)
const starsSource = ref(0)
const forksSource = ref(0)
const tween = { duration: 1200, transition: TransitionPresets.easeOutCubic }
const animatedProjects = useTransition(projectsSource, tween)
const animatedStars = useTransition(starsSource, tween)
const animatedForks = useTransition(forksSource, tween)

onMounted(() => {
  projectsSource.value = projects.length
  starsSource.value = totalStars.value
  forksSource.value = totalForks.value
})
</script>

<template>
  <div class="page">
    <!-- Hero -->
    <header class="hero">
      <div class="hero-aurora"></div>
      <div class="hero-topbar">
        <div class="control-group control-group--on-dark">
          <LangSwitcher />
          <ThemeToggle />
        </div>
      </div>
      <div class="hero-content container">
        <div class="hero-badge">
          <span class="hero-mark"><el-icon :size="18"><Folder /></el-icon></span>
          <span class="hero-eyebrow">{{ t('home.eyebrow') }}</span>
        </div>
        <h1 class="hero-title">{{ tc(config.site.title) }}</h1>
        <p class="hero-desc">{{ tc(config.site.description) }}</p>
        <div class="hero-stats">
          <div class="hero-stat">
            <span class="hero-stat-value">{{ Math.round(animatedProjects) }}</span>
            <span class="hero-stat-label">{{ t('home.stats.projects') }}</span>
          </div>
          <div class="hero-stat">
            <span class="hero-stat-value">{{ Math.round(animatedStars) }}</span>
            <span class="hero-stat-label">{{ t('home.stats.stars') }}</span>
          </div>
          <div class="hero-stat">
            <span class="hero-stat-value">{{ Math.round(animatedForks) }}</span>
            <span class="hero-stat-label">{{ t('home.stats.forks') }}</span>
          </div>
        </div>
      </div>
    </header>

    <!-- Toolbar -->
    <section class="toolbar">
      <div class="toolbar-inner container">
        <div class="toolbar-search">
          <el-input
            ref="searchInput"
            v-model="search"
            :placeholder="t('home.searchPlaceholder')"
            :prefix-icon="Search"
            clearable
          />
          <span class="search-kbd" v-show="!search">/</span>
        </div>
        <div class="toolbar-selects">
          <el-select v-model="selectedLanguage" :placeholder="t('home.filterLanguage')" clearable>
            <el-option v-for="lang in languages" :key="lang" :label="lang" :value="lang" />
          </el-select>
          <el-select v-model="sortBy" :placeholder="t('home.sortBy')">
            <el-option :label="t('home.sort.stars')" value="stars" />
            <el-option :label="t('home.sort.forks')" value="forks" />
            <el-option :label="t('home.sort.updated')" value="updated" />
            <el-option :label="t('home.sort.name')" value="name" />
          </el-select>
        </div>
        <div class="toolbar-views">
          <button
            class="view-btn"
            :class="{ 'is-active': viewMode === 'grid' }"
            :aria-label="t('home.viewGrid')"
            @click="viewMode = 'grid'"
          >
            <el-icon><Grid /></el-icon>
          </button>
          <button
            class="view-btn"
            :class="{ 'is-active': viewMode === 'list' }"
            :aria-label="t('home.viewList')"
            @click="viewMode = 'list'"
          >
            <el-icon><List /></el-icon>
          </button>
        </div>
        <span class="toolbar-count">
          {{ t('home.projectCount', { count: filteredProjects.length }) }}
        </span>
      </div>
      <div class="active-filters container" v-if="selectedTopic">
        <span class="filter-chip">
          {{ t('home.tagFilter') }}: {{ selectedTopic }}
          <button
            class="filter-chip-close"
            :aria-label="t('home.clearFilters')"
            @click="selectedTopic = ''"
          >✕</button>
        </span>
      </div>
    </section>

    <!-- Project Grid -->
    <main class="repo-main container">
      <div
        v-if="filteredProjects.length"
        class="repo-grid"
        :class="{ 'repo-grid--list': viewMode === 'list' }"
      >
        <RepoCard
          v-for="(project, i) in filteredProjects"
          :key="project.name"
          :repo="project"
          v-reveal="Math.min(i * 40, 320)"
          @filter-topic="onFilterTopic"
        />
      </div>
      <div v-else class="empty-state">
        <div class="empty-emoji">🔍</div>
        <div class="empty-title">{{ t('home.emptyTitle') }}</div>
        <div class="empty-desc">{{ t('home.emptyDesc') }}</div>
        <el-button v-if="hasFilters" type="primary" round @click="clearFilters">
          {{ t('home.clearFilters') }}
        </el-button>
      </div>
    </main>

    <!-- Footer -->
    <footer class="site-footer">
      <div class="site-footer-inner container">
        <span>{{ t('footer.builtWith') }}</span>
        <div class="footer-links">
          <a href="https://vuejs.org" target="_blank" rel="noopener">Vue 3</a>
          <a href="https://element-plus.org" target="_blank" rel="noopener">Element Plus</a>
          <a href="https://vitejs.dev" target="_blank" rel="noopener">Vite</a>
        </div>
      </div>
    </footer>

    <el-backtop :right="32" :bottom="32" />
  </div>
</template>
