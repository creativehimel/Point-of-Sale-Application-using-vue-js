<script setup>
import { reactive } from 'vue'
import { useAuthStore } from '@/stores/auth'
import AuthLayout from '@/components/layouts/AuthLayout.vue'
const auth = useAuthStore()

const userData = reactive({
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  password: ''
})
</script>
<template>
  <AuthLayout>
    <div class="bg-white max-w-3xl w-full rounded p-5 shadow">
      <from method="POST" action="#">
        <h2 class="text-center text-2xl font-[700] pt-5">Create New Account</h2>
        <h4 class="text-center text-sm font-[500] py-2">Get your free velzon account now</h4>
        <div class="px-5 py-4">
          <div class="flex flex-col md:flex-row md:gap-6 items-center">
            <div class="py-2 w-full flex flex-col gap-y-2">
              <label for="email">First Name</label>
              <input
                v-model="userData.firstName"
                type="text"
                class="border px-4 py-1.5 rounded-sm focus:none"
                id="email"
                placeholder="Enter your email"
              />
            </div>
            <div class="py-2 w-full flex flex-col gap-y-2">
              <label for="email">Last Name</label>
              <input
                v-model="userData.lastName"
                type="text"
                class="border px-4 py-1.5 rounded-sm focus:none"
                id="email"
                placeholder="Enter your email"
              />
            </div>
          </div>
          <div class="flex flex-col md:flex-row md:gap-6 items-center">
            <div class="py-2 w-full flex flex-col gap-y-2">
              <label for="email">Phone Number</label>
              <input
                v-model="userData.phone"
                type="text"
                class="border px-4 py-1.5 rounded-sm focus:none"
                id="email"
                placeholder="Enter your email"
              />
            </div>
            <div class="py-2 w-full flex flex-col gap-y-2">
              <label for="email">Email</label>
              <input
                v-model="userData.email"
                type="text"
                class="border px-4 py-1.5 rounded-sm focus:none"
                id="email"
                placeholder="Enter your email"
              />
            </div>
          </div>
          <div class="flex gap-6 items-center">
            <div class="py-2 w-full flex flex-col gap-y-2">
              <label for="password">Password</label>
              <input
                v-model="userData.password"
                type="password"
                class="border px-4 py-1.5 rounded-sm focus:none"
                id="password"
                placeholder="********"
              />
            </div>
          </div>

          <button
            v-if="!auth.isLoader"
            @click.prevent="auth.userRegistration(userData)"
            class="bg-indigo-600 w-full mt-4 py-2 rounded text-white font-semibold hover:bg-indigo-700 duration-200 ring-1 ring-indigo-400"
          >
            Register
          </button>
          <button
            v-else
            type="button"
            class="inline-flex w-full mt-4 justify-center items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-indigo-500 hover:bg-indigo-400 transition ease-in-out duration-150 cursor-not-allowed"
            disabled=""
          >
            <svg
              class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Processing...
          </button>
        </div>
      </from>
      <p class="text-center py-1.5">
        Have any account?
        <RouterLink to="/login" class="pl-2 text-blue-600">Login</RouterLink>
      </p>
    </div>
  </AuthLayout>
</template>

<style scoped></style>
