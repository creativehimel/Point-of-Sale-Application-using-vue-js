import { ref } from 'vue'
import { defineStore } from 'pinia'
import { toast } from 'vue3-toastify'

import axios from 'axios'
import router from '@/router'

const baseURL = import.meta.env.VITE_API_URL

export const useAuthStore = defineStore('auth', () => {
  const isLoader = ref(false)
  const isAuthenticated = ref(false)

  // User Login Auth Store function
  async function userLogin(loginData) {
    isLoader.value = true
    await axios
      .post(`${baseURL}/login`, {
        email: loginData.email,
        password: loginData.password
      })
      .then((res) => {
        if (res.data.status == 'success') {
          const token = res.data.token
          toast(res.data.message, {
            type: 'success',
            transition: 'zoom',
            dangerouslyHTMLString: true
          })
          isAuthenticated.value = true
          localStorage.setItem('token', JSON.stringify(token))
          localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated.value))
          setTimeout(() => {
            router.push('/admin/dashboard')
          }, 1000)
        } else if (res.data.status == 'failed') {
          toast(res.data.message, {
            type: 'error',
            transition: 'zoom',
            dangerouslyHTMLString: true
          })
        }
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status == 422) {
            let errorList = error.response.data.message
            for (let key in errorList) {
              toast(errorList[key][0], {
                type: 'error',
                transition: 'zoom',
                dangerouslyHTMLString: true
              })
            }
          }
        } else if (error.request) {
          toast('No response received from the server.', {
            type: 'error',
            transition: 'zoom',
            dangerouslyHTMLString: true
          })
        } else {
          toast(error.message, {
            type: 'error',
            transition: 'zoom',
            dangerouslyHTMLString: true
          })
        }
      })
    isLoader.value = false
  }

  return {
    isLoader,
    isAuthenticated,
    userLogin
  }
})
