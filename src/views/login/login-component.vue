<template>
  <div
    class="min-h-screen flex items-center justify-center p-4 relative overflow-hidden border-b border-gray-200"
  >
    <!-- 背景渐变圆形 -->
    <div class="absolute inset-0 overflow-hidden opacity-20">
      <div
        class="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-500 filter blur-3xl opacity-30"
      ></div>
      <div
        class="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-purple-500 filter blur-3xl opacity-30"
      ></div>
    </div>

    <!-- 登录卡片，保持原有配色和样式 -->
    <a-card
      class="relative max-w-md w-full bg-gray-900 bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-xl overflow-hidden border border-gray-800 shadow-xl"
    >
      <div class="p-8">
        <div class="flex justify-center mb-8">
          <!-- 使用 a-avatar 替换原图标，并添加脉冲动画 -->
          <a-avatar
            size="64"
            class="bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center pulse"
          >
            <LockOutlined class="text-white text-2xl" />
          </a-avatar>
        </div>
        <h1 class="text-3xl font-bold text-center mb-2 gradient-text">Michael's home</h1>
        <p class="text-gray-400 text-center mb-8">Secure access to your digital universe</p>

        <!-- 表单部分 -->
        <a-form @submit.prevent="onSubmit" layout="vertical" class="space-y-6">
          <a-form-item label="Email" class="mb-4">
            <a-input
              v-model:value="email"
              placeholder="your@email.com"
              size="large"
              class="input-field"
            />
          </a-form-item>
          <a-form-item label="Password" class="mb-4">
            <a-input-password
              v-model:value="password"
              placeholder="••••••••"
              size="large"
              class="input-field"
            />
          </a-form-item>

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <a-checkbox id="remember-me" class="text-white"> Remember me </a-checkbox>
            </div>
            <div class="text-sm">
              <a href="#" class="font-medium text-blue-400 hover:text-blue-300">Forgot password?</a>
            </div>
          </div>

          <a-form-item>
            <a-button
              type="primary"
              html-type="submit"
              block
              size="large"
              :disabled="isSubmitting"
              :class="buttonClasses"
            >
              <template v-if="!isSubmitting">Authenticate</template>
              <template v-else-if="isSubmitting && !isSuccess">
                <LoadingOutlined class="mr-2" />
                Authenticating...
              </template>
              <template v-else>
                <CheckCircleOutlined class="mr-2" />
                Success!
              </template>
            </a-button>
          </a-form-item>
        </a-form>

        <!-- 第三方登录 -->
        <div class="mt-6">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-700"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-gray-900 bg-opacity-50 text-gray-400"> Or continue with </span>
            </div>
          </div>
          <div class="mt-4 flex justify-between items-center">
            <a-button
              :style="{ width: '38px', height: '38px', lineHeight: '38px', padding: '0' }"
              class="rounded-full bg-gray-800 text-red-400 hover:bg-gray-700 flex items-center justify-center"
            >
              <GoogleOutlined />
            </a-button>

            <a-button
              :style="{ width: '38px', height: '38px', lineHeight: '38px', padding: '0' }"
              class="rounded-full bg-gray-800 text-gray-200 hover:bg-gray-700 flex items-center justify-center"
            >
              <AppleOutlined />
            </a-button>

            <a-button
              :style="{ width: '38px', height: '38px', lineHeight: '38px', padding: '0' }"
              class="rounded-full bg-gray-800 text-gray-200 hover:bg-gray-700 flex items-center justify-center"
            >
              <GithubOutlined />
            </a-button>
          </div>
        </div>

        <div class="mt-6 text-center text-sm text-gray-400">
          Don't have an account?
          <a href="#" class="font-medium text-blue-400 hover:text-blue-300"> Request access </a>
        </div>
      </div>

      <div class="px-8 py-4 bg-gray-900 bg-opacity-30 border-t border-gray-800 text-center">
        <p class="text-xs text-gray-500">
          © 2023 Michael's home Technologies. All rights reserved.
        </p>
      </div>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

// 导入 Ant Design Vue 图标组件
import {
  LockOutlined,
  LoadingOutlined,
  CheckCircleOutlined,
  GoogleOutlined,
  AppleOutlined,
  GithubOutlined,
} from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'

const email = ref('')
const password = ref('')
const isSubmitting = ref(false)
const isSuccess = ref(false)

const router = useRouter()

const buttonClasses = computed(() => {
  const base =
    'w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-300 glow-effect'
  return isSuccess.value
    ? base +
        ' bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500'
    : base + ' bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500'
})

function onSubmit(e: Event) {
  e.preventDefault()
  if (isSubmitting.value) return
  isSubmitting.value = true
  if(email.value !== 'admin@qq.com' && password.value !== 'Ljx7221698+') {
    message.error('用户名或密码错误')
    isSubmitting.value = false
    return
  }else{
    // 模拟 API 调用延时
    setTimeout(() => {
      isSuccess.value = true
      // 成功后 1 秒跳转
      setTimeout(() => {
        router.push('/layouts')
      }, 1000)
    }, 2000)
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

body {
  font-family: 'Inter', sans-serif;
  background-color: #0a0a0a;
  color: #e5e5e5;
}

/* 保持原有阴影和输入框样式 */
.glow-effect {
  box-shadow: 0 0 15px rgba(59, 130, 246, 0.5);
}

.input-field {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.input-field:focus {
  border-color: rgba(59, 130, 246, 0.7);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
}

/* 渐变文字、脉冲动画保持原有效果 */
.gradient-text {
  background: linear-gradient(90deg, #3b82f6, #8b5cf6);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.pulse {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(59, 130, 246, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(59, 130, 246, 0);
  }
}
</style>
