<script setup>
import { ref, computed } from 'vue'
import { useDark, useToggle } from '@vueuse/core'
import { Search, Folder } from '@element-plus/icons-vue'
import { config, projects } from '../config'
import RepoCard from '../components/RepoCard.vue'

const isDark = useDark()
const toggleDark = useToggle(isDark)

const search = ref('')
const selectedLanguage = ref('')
const sortBy = ref('stars')

const languages = computed(() => {
  const langSet = new Set(projects.map(p => p.language).filter(Boolean))
  return Array.from(langSet).sort()
})

const filteredProjects = computed(() => {
  let result = [...projects]

  if (search.value) {
    const q = search.value.toLowerCase()
    result = result.filter(p =>
      p.name.toLowerCase().includes(q) ||
      (p.description || '').toLowerCase().includes(q) ||
      (p.topics || []).some(t => t.toLowerCase().includes(q))
    )
  }

  if (selectedLanguage.value) {
    result = result.filter(p => p.language === selectedLanguage.value)
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

const totalStars = computed(() => projects.reduce((sum, p) => sum + (p.stars || 0), 0))
const totalForks = computed(() => projects.reduce((sum, p) => sum + (p.forks || 0), 0))
</script>

<template>
  <!-- Header -->
  <header class="site-header">
    <div class="header-inner">
      <div class="header-avatar-icon">
        <el-icon :size="48"><Folder /></el-icon>
      </div>
      <div class="header-info">
        <h1>{{ config.site.title }}</h1>
        <p class="bio">{{ config.site.description }}</p>
        <div class="header-stats">
          <div class="stat-item">
            <span class="stat-value">{{ projects.length }}</span>
            <span class="stat-label">项目</span>
          </div>
          <div class="stat-item">
            <span class="stat-value">{{ totalStars }}</span>
            <span class="stat-label">Stars</span>
          </div>
          <div class="stat-item">
            <span class="stat-value">{{ totalForks }}</span>
            <span class="stat-label">Forks</span>
          </div>
        </div>
      </div>
      <div class="header-actions">
        <el-switch
          v-model="isDark"
          inline-prompt
          active-text="🌙"
          inactive-text="☀️"
          style="--el-switch-on-color: #2d2d2d;"
        />
      </div>
    </div>
  </header>

  <!-- Filter Bar -->
  <section class="filter-section">
    <div class="filter-inner">
      <el-input
        v-model="search"
        placeholder="搜索项目名称、描述或标签..."
        :prefix-icon="Search"
        clearable
      />
      <el-select v-model="selectedLanguage" placeholder="语言筛选" clearable>
        <el-option v-for="lang in languages" :key="lang" :label="lang" :value="lang" />
      </el-select>
      <el-select v-model="sortBy" placeholder="排序方式">
        <el-option label="按 Star 排序" value="stars" />
        <el-option label="按 Fork 排序" value="forks" />
        <el-option label="最近更新" value="updated" />
        <el-option label="按名称排序" value="name" />
      </el-select>
      <span class="filter-count">共 {{ filteredProjects.length }} 个项目</span>
    </div>
  </section>

  <!-- Project Grid -->
  <main class="repo-section">
    <div class="repo-grid" v-if="filteredProjects.length > 0">
      <RepoCard v-for="project in filteredProjects" :key="project.name" :repo="project" />
    </div>
    <el-empty v-else description="没有找到匹配的项目" />
  </main>

  <!-- Footer -->
  <footer class="site-footer">
    <p>使用 Vue 3 + Element Plus 构建</p>
  </footer>

  <el-back-to-top :right="40" :bottom="40" />
</template>
