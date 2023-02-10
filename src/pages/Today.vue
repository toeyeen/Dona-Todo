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

    <ul>
      <li v-for=" todo, idx in todosDueToday" :key="idx" :class="[todo.status === 'completed' ? 'line-through' : '']" @click="markTodo(todo)">
        <span>
          {{ todo.title }}
        </span>

        <span v-if="todo?.dueDate">
          it is Due today
        </span>
      </li>
    </ul>
  </div>
</template>

<style scoped>

</style>
