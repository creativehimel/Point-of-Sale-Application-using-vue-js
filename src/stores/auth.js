import { ref } from 'vue'
import { defineStore } from 'pinia'
import { toast } from 'vue3-toastify'

import axios from 'axios'
import router from '@/router'

const baseURL = import.meta.env.VITE_API_URL

export const useAuthStore = defineStore('auth', () => {
  const isLoader = ref(false)
  const isAuthenticated = ref(false)
  return {
    isLoader,
    isAuthenticated,
  }
})
