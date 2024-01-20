<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
const auth = useAuthStore()
const email = ref('')
</script>
<template>
  <section class="bg-slate-100 px-4 py-16 md:py-28 flex items-center justify-center">
    <div class="bg-white max-w-lg w-full rounded p-5 shadow">
      <from class="" action="#" method="POST">
        <h2 class="text-center text-xl md:text-3xl font-bold pt-5">Forgot Your Password?</h2>
        <div class="px-5 py-4">
          <div class="py-2 flex flex-col gap-y-2">
            <label for="email">Email Address</label>
            <input
              v-model="email"
              type="text"
              class="border px-4 py-1.5 rounded-sm focus:none"
              id="email"
              placeholder="Enter your email"
            />
          </div>
          <button
            v-if="!auth.isLoader"
            @click.prevent="auth.forgotPassword(email)"
            class="bg-indigo-600 w-full mt-4 py-2 rounded text-white font-semibold hover:bg-indigo-700 duration-200 ring-1 ring-indigo-400"
          >
            Send OTP
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
    </div>
  </section>
</template>

<style scoped></style>
