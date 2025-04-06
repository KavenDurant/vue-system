import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMenuStore = defineStore('menu', () => {
  const selectedKey = ref('1')

  const setSelectedKey = (key: string) => {
    selectedKey.value = key
  }

  return {
    selectedKey,
    setSelectedKey,
  }
})
