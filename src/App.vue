<script setup>
import router from '@/router/index.js'
import { RouterView } from 'vue-router'
import Header from '@/components/common/Header.vue'
function getRoute(){
  console.log(router.matched)
}
getRoute()
</script>

<template>

  <RouterView />
</template>

<style scoped></style>
