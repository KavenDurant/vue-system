<template>
  <RouterView />
</template>
<script lang="ts" setup>
import {ref,onMounted} from 'vue'
import { getArticles } from '@/servers/api/article'
import { RouterView } from 'vue-router'
const articles = ref()
const fetchArticles = async () => {
  const res = await getArticles()
  console.log("--------------",res)
  articles.value = res
}
onMounted(() => {
  fetchArticles()
})
</script>
<style scoped>
</style>
