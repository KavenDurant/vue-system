<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons-vue'
import { useMenuStore } from '@/stores/menu'

const collapsed = ref(false)
const router = useRouter()
const route = useRoute()
const menuStore = useMenuStore()

const toggleCollapsed = () => {
  collapsed.value = !collapsed.value
}

function onMenuClick({ key }: { key: string }) {
  menuStore.setSelectedKey(key)
}

// 监听路由变化，更新选中状态
watch(
  () => route.path,
  (newPath) => {
    switch (newPath) {
      case '/home':
        menuStore.setSelectedKey('1')
        break
      case '/about':
        menuStore.setSelectedKey('2')
        break
      case '/articles':
        menuStore.setSelectedKey('3')
        break
    }
  },
  { immediate: true },
)
</script>

<template>
  <a-layout style="min-height: 100vh">
    <!-- 侧边栏 -->
    <a-layout-sider v-model:collapsed="collapsed" collapsible>
      <div class="logo" />
      <a-menu
        theme="dark"
        mode="inline"
        :selectedKeys="[menuStore.selectedKey]"
        @click="onMenuClick"
      >
        <a-menu-item key="1">
          <router-link to="/home" class="menu-link">
            <HomeOutlined />
            <span>首页</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="2">
          <router-link to="/about" class="menu-link">
            <InfoCircleOutlined />
            <span>关于</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="3">
          <router-link to="/articles" class="menu-link">
            <InfoCircleOutlined />
            <span>文章</span>
          </router-link>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>

    <!-- 主体布局 -->
    <a-layout>
      <!-- 顶部导航栏 -->
      <a-layout-header class="header">
        <div class="header-left">
          <a-button type="text" @click="toggleCollapsed">
            <MenuFoldOutlined v-if="collapsed" />
            <MenuUnfoldOutlined v-else />
          </a-button>
        </div>
      </a-layout-header>

      <!-- 内容区域 -->
      <a-layout-content class="content">
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<style scoped>
.logo {
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.2);
}

.header {
  background: #fff;
  padding: 0;
  display: flex;
  align-items: center;
}

.header-left {
  padding: 0 24px;
}

.content {
  margin: 24px 16px;
  padding: 24px;
  background: #fff;
  min-height: 280px;
}

.menu-link {
  color: inherit;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 8px;
}

:deep(.ant-layout-sider-trigger) {
  display: none;
}
</style>
