<script setup lang="ts">
const { state, completed } = useState()
</script>

<template>
  <div>
    Completed Page
  </div>

  <ul>
    <li v-for=" todo, idx in completed" :key="idx" :class="[todo.status === 'completed' ? 'line-through' : '']">
      {{ todo.title }}
    </li>
  </ul>
</template>

<style scoped>

</style>
