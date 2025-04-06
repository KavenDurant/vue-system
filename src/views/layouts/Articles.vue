<template>
  <div class="p-6">
    <div class="mb-4 flex justify-between">
      <div class="flex items-center gap-4">
        <h1 class="text-2xl font-bold">文章管理</h1>
        <a-input-search
          v-model:value="searchText"
          placeholder="搜索文章"
          style="width: 200px"
          @search="handleSearch"
        />
      </div>
      <a-button type="primary" @click="showModal()">新增文章</a-button>
    </div>

    <!-- 文章列表 -->
    <a-table :columns="columns" :data-source="articles" :loading="loading">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <a-space>
            <a-button type="link" @click="showModal(record)">编辑</a-button>
            <a-popconfirm
              title="确定要删除这篇文章吗？"
              ok-text="确定"
              cancel-text="取消"
              @confirm="handleDelete(record.id)"
            >
              <a-button type="link" danger>删除</a-button>
            </a-popconfirm>
          </a-space>
        </template>
      </template>
    </a-table>

    <!-- 新增/编辑弹窗 -->
    <a-modal
      :title="currentArticle ? '编辑文章' : '新增文章'"
      :v-modal:open="modalVisible"
      @ok="handleSubmit"
      @cancel="handleCancel"
      :confirmLoading="submitLoading"
    >
      <a-form :model="formState" :rules="rules" ref="formRef">
        <a-form-item label="标题" name="title">
          <a-input v-model:value="formState.title" placeholder="请输入文章标题" />
        </a-form-item>
        <a-form-item label="内容" name="content">
          <a-textarea v-model:value="formState.content" placeholder="请输入文章内容" :rows="4" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { message } from 'ant-design-vue'
import type { Article } from '@/servers/api/article/types'
import { getArticles, createArticle, updateArticle, deleteArticle } from '@/servers/api/article'

// 表格列定义
const columns = [
  {
    title: '标题',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: '内容',
    dataIndex: 'content',
    key: 'content',
    ellipsis: true,
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    key: 'createdAt',
    width: 200,
    customRender: ({ text }: { text: string }) => new Date(text).toLocaleString(),
  },
  {
    title: '操作',
    key: 'action',
    width: 200,
    fixed: 'right',
  },
]

// 数据相关
const loading = ref(false)
const articles = ref<Article[]>([])
const originalArticles = ref<Article[]>([])
const fetchArticles = async () => {
  loading.value = true
  try {
    const res = await getArticles()
    originalArticles.value = res.articles
    articles.value = res.articles
  } catch (error) {
    message.error('获取文章列表失败')
  } finally {
    loading.value = false
  }
}

// 搜索相关
const searchText = ref('')
const handleSearch = (value: string) => {
  if (!value.trim()) {
    articles.value = originalArticles.value
    return
  }
  articles.value = originalArticles.value.filter(
    (article) =>
      article.title.toLowerCase().includes(value.toLowerCase()) ||
      article.content.toLowerCase().includes(value.toLowerCase()),
  )
}

// 表单相关
const formRef = ref()
const modalVisible = ref(false)
const submitLoading = ref(false)
const currentArticle = ref<Article | null>(null)
const formState = reactive({
  title: '',
  content: '',
})

const rules = {
  title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
  content: [{ required: true, message: '请输入内容', trigger: 'blur' }],
}

// 打开弹窗
const showModal = (article?: Article) => {
  currentArticle.value = article || null
  if (article) {
    formState.title = article.title
    formState.content = article.content
  } else {
    formState.title = ''
    formState.content = ''
  }
  modalVisible.value = true
}

// 提交表单
const handleSubmit = () => {
  formRef.value.validate().then(async () => {
    submitLoading.value = true
    try {
      if (currentArticle.value) {
        await updateArticle({
          id: currentArticle.value.id,
          title: formState.title,
          content: formState.content,
        })
        message.success('更新成功')
      } else {
        await createArticle({
          title: formState.title,
          content: formState.content,
        })
        message.success('创建成功')
      }
      modalVisible.value = false
      fetchArticles()
    } catch (error) {
      message.error(currentArticle.value ? '更新失败' : '创建失败')
    } finally {
      submitLoading.value = false
    }
  })
}

// 删除文章
const handleDelete = async (id: number) => {
  try {
    await deleteArticle(id)
    message.success('删除成功')
    fetchArticles()
  } catch (error) {
    message.error('删除失败')
  }
}

// 取消
const handleCancel = () => {
  modalVisible.value = false
  formRef.value?.resetFields()
}

onMounted(() => {
  fetchArticles()
})
</script>
