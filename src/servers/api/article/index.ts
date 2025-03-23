import axiosInstance from '@/servers/http'

export function getArticles() {
  return axiosInstance.get('/admin/article');
}
