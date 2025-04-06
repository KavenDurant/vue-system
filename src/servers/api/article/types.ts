export interface Article {
  id: number
  title: string
  content: string
  createdAt: string
  updatedAt: string
}

export interface CreateArticleDto {
  title: string
  content: string
}

export interface UpdateArticleDto {
  id: number
  title: string
  content: string
}