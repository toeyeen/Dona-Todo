<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div>
    <h1>
      404 page not found!!! go back to <RouterLink to="/">
        Home
      </RouterLink>
    </h1>
  </div>
</template>

<style scoped>
</style>
