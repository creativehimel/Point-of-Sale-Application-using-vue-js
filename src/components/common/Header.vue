<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/solid'
import menuItems from '@/data/menuList.js'
import { useAuthStore } from '@/stores/auth'
const auth = useAuthStore()
const mobileMenu = ref(false)
</script>
<template>
  <header class="bg-white py-2 md:py-3.5 px-6 shadow">
    <nav class="container mx-auto md:flex justify-between items-center">
      <img src="../../assets/images/logo.png" alt="" class="w-28" />
      <span
        @click="mobileMenu = !mobileMenu"
        class="absolute right-6 top-4 cursor-pointer md:hidden"
      >
        <XMarkIcon v-if="mobileMenu" class="h-8 w-8 text-indigo-600" />
        <Bars3Icon v-else class="h-8 w-8 text-indigo-600" />
      </span>

      <ul
        :class="[mobileMenu ? 'block duration-200' : 'hidden']"
        class="text-center space-y-3 mt-6 md:mt-0 md:space-y-0 md:flex gap-4 md:items-center"
      >
        <li
          class="hover:text-indigo-600 font-[700] duration-200"
          v-for="menuItem in menuItems"
          :key="menuItem.id"
        >
          <RouterLink :to="menuItem.url">{{ menuItem.name }}</RouterLink>
        </li>
      </ul>
      <div
        :class="[mobileMenu ? 'duration-200' : 'hidden md:flex']"
        class="flex flex-col gap-2 mt-4 md:flex-row md:mt-0"
      >
        <button
          v-if="auth.isAuthenticated"
          class="bg-indigo-600 px-6 py-2 rounded text-white hover:bg-indigo-700 hover:shadow duration-200"
        >
          <RouterLink to="/admin/dashboard">Dashboard</RouterLink>
        </button>
        <button
          v-if="auth.isAuthenticated"
          class="bg-indigo-600 px-6 py-2 rounded text-white hover:bg-indigo-700 hover:shadow duration-200"
        >
          <RouterLink to="#" @click="auth.logout()">Logout</RouterLink>
        </button>
        <button
          v-if="!auth.isAuthenticated"
          class="bg-indigo-600 px-6 py-2 rounded text-white hover:bg-indigo-700 hover:shadow duration-200"
        >
          <RouterLink to="/login">Login</RouterLink>
        </button>
        <button
          v-if="!auth.isAuthenticated"
          class="bg-indigo-600 px-6 py-2 rounded text-white hover:bg-indigo-700 hover:shadow duration-200"
        >
          <RouterLink to="/register">Register</RouterLink>
        </button>
      </div>
    </nav>
  </header>
</template>

<style scoped></style>
