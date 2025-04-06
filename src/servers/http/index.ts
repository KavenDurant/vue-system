// src/utils/axiosInstance.ts
import axios from 'axios'
import type { AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { message } from 'ant-design-vue'

interface ApiResponse<T = never> {
  code: number
  status: boolean
  data: T
  message: string
}

let hideLoading: (() => void) | null = null
let requestCount = 0

/**
 * 开启 loading，当有请求发起时调用
 */
function startLoading(): void {
  if (requestCount === 0) {
    // message.loading 返回一个函数，用于关闭 loading
    hideLoading = message.loading('加载中...', 0)
  }
  requestCount++
}

/**
 * 关闭 loading，当所有请求均结束时调用
 */
function endLoading(): void {
  requestCount--
  if (requestCount <= 0) {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    hideLoading && hideLoading()
    requestCount = 0
  }
}

const axiosInstance = axios.create({
  baseURL: '/api', // 使用 Vite 代理避免跨域问题
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000,
})

// 请求拦截器：发起请求前开启 loading
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    startLoading()
    return config
  },
  (error) => {
    endLoading()
    return Promise.reject(error)
  },
)

// 响应拦截器：响应返回后关闭 loading，并统一处理返回数据
axiosInstance.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => {
    endLoading()
    const res = response.data
    if (res.code === 200 && res.status) {
      return res.data
    } else {
      // 若接口返回错误信息，可在此处统一处理，如全局错误提示等
      return Promise.reject(res)
    }
  },
  (error) => {
    endLoading()
    return Promise.reject(error)
  },
)

export default axiosInstance
