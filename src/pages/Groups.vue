<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
const { setCurrentCategory, state } = useState()

let currentCategory = ref(null)
// let todos = ref(null)

// const currentCategory = computed(() => {
//   categories.value.filter(cat => cat.title == routeDynamicId)
//   // return categories.value.find(cat => cat.title)
// })
const todos = computed(() => {
  return state.todos.value.filter(todo => todo.category[0].title === route.params.id)
})

const paramsId = route.params.id

watch(route, () => {
  currentCategory = state.categories.value.filter(cat => cat.title === route.params.id)

  setCurrentCategory(currentCategory[0])
}, { immediate: true })

onMounted(() => {})
</script>

<template>
  <p text-2xl font-bold mb-2>
    {{ route.params.id }}
  </p>

  <ul>
    <li v-for="todo, idx in todos" :key="idx">
      {{ todo.title }}
    </li>
  </ul>
</template>

<style scoped>
</style>
