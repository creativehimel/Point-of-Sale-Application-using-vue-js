<script setup>
import { onMounted } from 'vue'
import { initFlowbite } from 'flowbite'
import AdminSidebar from '@/components/common/AdminSidebar.vue'
import AdminNavbar from '@/components/common/AdminNavbar.vue'

// initialize components based on data attribute selectors
onMounted(() => {
  initFlowbite();
})
</script>

<template>


<AdminNavbar/>

  <AdminSidebar/>

  <div class="p-4 sm:ml-64">
    <div class="p-4  mt-14">
      <slot></slot>
    </div>
  </div>


</template>

<style scoped>

</style>