<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
const { setCurrentCategory, state, markTodo, duplicateTodo, deleteTodo, getTodo } = useState()

let currentCategory = ref(null)
const isEditDrawer = ref(false)
const todoToEdit = ref(null)

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

function openEditDrawer(id: string) {
  isEditDrawer.value = !isEditDrawer.value

  todoToEdit.value = getTodo(id)
}
</script>

<template>
  <div class="flex gap-3 items-center mb-4" />

  <TodoInput />

  <ul class="flex flex-col gap-y-1">
    <TodoItem v-for="todo, idx in todos" :id="todo.id" :key="idx" :value="todo.title" @duplicate="duplicateTodo"
      @delete="deleteTodo" @edit="openEditDrawer" />
  </ul>

  <EmptyTodo v-if="todos.length < 1" message="Empty todo" />

  <DDrawer v-if="todoToEdit" :visible="isEditDrawer" :closable="true" @close="isEditDrawer = false">
    <template #header>
      {{ todoToEdit.id }}
    </template>

    {{ todoToEdit.title }}

    <template #footer>
      <button> Delete todo </button>
    </template>
  </DDrawer>
</template>

<style scoped>
</style>
