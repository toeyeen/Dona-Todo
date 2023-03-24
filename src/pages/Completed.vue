<script setup lang="ts">
const { state, completed } = useState()
</script>

<template>
  <div>
    Completed Page
  </div>

  <ul class="flex flex-col gap-y-1">
    <TodoItem v-for="todo, idx in completed" :id="todo.id" :key="idx" :value="todo.title" :completed="true" />
  </ul>

  <EmptyTodo v-if="completed.length < 1" message="Empty todo" />
</template>

<style scoped>
</style>
