<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
const { setCurrentCategory, state, markTodo } = useState()

let currentCategory = ref(null)
// let todos = ref(null)

// const currentCategory = computed(() => {
//   categories.value.filter(cat => cat.title == routeDynamicId)
//   // return categories.value.find(cat => cat.title)
// })
const todos = computed(() => {
  return state.todos.value.filter(todo => todo.category[0].title === route.params.id && todo.status !== 'completed')
})

watch(route, () => {
  currentCategory = state.categories.value.filter(cat => cat.title === route.params.id)

  setCurrentCategory(currentCategory[0])
}, { immediate: true })

onMounted(() => {
  currentCategory = state.categories.value.filter(cat => cat.title === route.params.id)
  setCurrentCategory(currentCategory[0])
})
</script>

<template>
  <TodoInput />

  <ul>
    <li v-for="todo, idx in todos" :key="idx" :class="[todo.status == 'completed' ? 'line-through' : '']" @click="markTodo(todo)">
      <span>
        {{ todo.title }}
      </span>

      <span v-if="todo?.dueDate">
        it is Due on  {{ todo?.dueDate }}
      </span>
    </li>
  </ul>
</template>

<style scoped>
</style>
