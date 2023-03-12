<script setup lang="ts">
const { state, user, markTodo } = useState()

const activeTodos = computed(() => {
  return state.todos.value.filter(todo => todo.status !== 'completed')
})
</script>

<template>
  <div>
    <p text-3xl font-bold mb-4>
      {{ timeOfTheDay }} {{ user.username }}
    </p>

    <TodoInput />
    <ul>
      <li v-for="todo, idx in activeTodos" :key="idx" :class="[todo.status == 'completed' ? 'line-through' : '']"
        @click="markTodo(todo)">
        <span>
          {{ todo.title }}
        </span>

        <span v-if="todo?.dueDate">
          it is Due on {{ todo?.dueDate }}
        </span>
      </li>
    </ul>

    <EmptyTodo v-if="activeTodos.length < 1" message="Empty todo" />
  </div>
</template>

<style scoped>
</style>
