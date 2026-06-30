import axios from 'axios'
import { config } from '../config'

const api = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Accept: 'application/vnd.github.v3+json',
    ...(config.github.token
      ? { Authorization: `token ${config.github.token}` }
      : {}),
  },
})

/** 获取用户信息 */
export async function fetchUser(username) {
  const { data } = await api.get(`/users/${username}`)
  return data
}

/** 获取单页仓库 */
async function fetchReposPage(username, page = 1, perPage = 100) {
  const { data, headers } = await api.get(`/users/${username}/repos`, {
    params: { page, per_page: perPage, sort: 'updated', direction: 'desc' },
  })
  const hasNext = (headers['link'] || '').includes('rel="next"')
  return { data, hasNext }
}

/** 获取所有公开仓库（自动分页） */
export async function fetchAllRepos(username) {
  const perPage = 100
  let allRepos = []
  let page = 1

  while (true) {
    const { data, hasNext } = await fetchReposPage(username, page, perPage)
    allRepos = allRepos.concat(data)
    if (!hasNext || data.length < perPage) break
    page++
  }

  // 过滤掉 fork 的仓库，只展示自己的项目
  return allRepos.filter((repo) => !repo.fork)
}
