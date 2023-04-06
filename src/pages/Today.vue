<script setup lang="ts">
import { useRoute } from 'vue-router'

const { state, todosDueToday, markTodo } = useState()

const route = useRoute()
</script>

<template>
  <div>
    <p text-2xl font-bold mb-2>
      {{ route.name }}
    </p>

    <TodoInput />

    <ul class="flex flex-col gap-y-1 overflow-y-scroll">
      <TodoItem v-for="todo, idx in todosDueToday" :id="todo.id" :key="idx" :status="todo.status" :value="todo.title" />
    </ul>

    <EmptyTodo v-if="todosDueToday.length < 1" message="Empty todo" />
  </div>
</template>

<style scoped>
</style>
