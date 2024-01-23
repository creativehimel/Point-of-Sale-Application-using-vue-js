import { ref } from 'vue'
import { defineStore } from 'pinia'
import { toast } from 'vue3-toastify'

import axios from 'axios'
import router from '@/router'

const baseURL = import.meta.env.VITE_API_URL

export const useAuthStore = defineStore('auth', () => {
  const isLoader = ref(false)
  const isAuthenticated = ref(false)
  const token = ref('')
  const resetPasswordToken = ref('')

  if (JSON.parse(localStorage.getItem('isAuthenticated'))) {
    isAuthenticated.value = JSON.parse(localStorage.getItem('isAuthenticated'))
    token.value = JSON.parse(localStorage.getItem('token'))
  }
  if (JSON.parse(localStorage.getItem('token'))) {
    token.value = JSON.parse(localStorage.getItem('token'))
  }
  if (JSON.parse(localStorage.getItem('resetPasswordToken'))) {
    resetPasswordToken.value = JSON.parse(localStorage.getItem('resetPasswordToken'))
  }

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

  // User Registration Auth Store function
  async function userRegistration(userData) {
    isLoader.value = true
    await axios
      .post(`${baseURL}/register`, {
        first_name: userData.firstName,
        last_name: userData.lastName,
        phone: userData.phone,
        email: userData.email,
        password: userData.password
      })
      .then((res) => {
        toast(res.data.message, {
          type: 'success',
          transition: 'zoom',
          dangerouslyHTMLString: true
        })
        setTimeout(() => {
          router.push('/login')
        }, 1000)
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

  // User Logout Auth Store function
  function logout() {
    //await axios.post()
    isAuthenticated.value = false
    localStorage.removeItem('token')
    localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated.value))
    toast('Logout successfully', {
      type: 'success',
      transition: 'zoom',
      dangerouslyHTMLString: true
    })
    setTimeout(() => {
      router.push('/login')
    }, 1000)
  }

  // User forgot password Auth Store function
  async function forgotPassword(email) {
    isLoader.value = true
    await axios
      .post(`${baseURL}/send-otp`, {
        email: email
      })
      .then((res) => {
        if (res.data.status == 'success') {
          toast(res.data.message, {
            type: 'success',
            transition: 'zoom',
            dangerouslyHTMLString: true
          })
          sessionStorage.setItem('email', JSON.stringify(email))
          setTimeout(() => {
            router.push('/verify-otp')
          }, 1000)
        } else if (res.data.status == 'error') {
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

  // User verify OTP Auth Store function
  async function verifyOTP(otp) {
    isLoader.value = true
    let email = JSON.parse(sessionStorage.getItem('email'))
    await axios
      .post(`${baseURL}/verify-otp`, {
        otp: otp,
        email: email
      })
      .then((res) => {
        if (res.data.status == 'success') {
          let resetPasswordToken = res.data.token
          toast(res.data.message, {
            type: 'success',
            transition: 'zoom',
            dangerouslyHTMLString: true
          })
          sessionStorage.clear()
          localStorage.setItem('resetPasswordToken', JSON.stringify(resetPasswordToken))
          setTimeout(() => {
            router.push('/reset-password')
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

  // User reset password Auth Store function
  async function resetPassword(password, cpassword) {
    isLoader.value = true
    await axios
      .post(
        `${baseURL}/reset-password`,
        {
          password: password,
          password_confirmation: cpassword
        },
        {
          headers: {
            //'Content-Type': 'application/json',
            token: resetPasswordToken
          }
        }
      )
      .then((res) => {
        if (res.data.status == 'success') {
          toast(res.data.message, {
            type: 'success',
            transition: 'zoom',
            dangerouslyHTMLString: true
          })
          localStorage.clear()
          setTimeout(() => {
            router.push('/login')
          }, 1000)
        } else if (res.data.status == 401) {
          toast(res.data.message, {
            type: 'error',
            transition: 'zoom',
            dangerouslyHTMLString: true
          })
          localStorage.clear()
          setTimeout(() => {
            router.push('/login')
          }, 1000)
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
    userLogin,
    userRegistration,
    logout,
    forgotPassword,
    verifyOTP,
    resetPassword
  }
})
