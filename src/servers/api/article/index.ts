import axiosInstance from '@/servers/http'
import type { Article, CreateArticleDto, UpdateArticleDto } from './types'

export function getArticles() {
  return axiosInstance.get<Article[]>('/admin/article')
}

export function createArticle(data: CreateArticleDto) {
  return axiosInstance.post('/admin/article', data)
}

export function updateArticle(data: UpdateArticleDto) {
  return axiosInstance.put(`/admin/article/${data.id}`, data)
}

export function deleteArticle(id: number) {
  return axiosInstance.delete(`/admin/article/${id}`)
}
