<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid'
import { useRoute } from 'vue-router'
import type { Category } from '../types'
import { hyphen } from '../utils/index'

const category = ref('')
const { addCategories, state, getCategoryLength, totalTodos, completed, todosDueToday, totalDueTodayTodos } = useState()

const route = useRoute()

const addCat = (c: Category) => {
  const { color } = useColors()

  addCategories({ color, ...c })
  category.value = ''
}

const counts = computed(() => {
  // return 3
  return state.todos.value.filter(todo => todo.category[0].title == route.params.id).length
})

watch(state.todos, () => {
}, { immediate: true })

onMounted(() => {
  console.log(route)
})

const catColor = (id) => {
  state.categories.value.filter(cat => cat.id === id)
}
</script>

<template>
  <div bg="~ white" my-auto rounded-lg p-8 h-full font-rubik>
    <ul>
      <router-link to="/" class="flex justify-between items-center px-4 py-3  rounded-lg hover: cursor-pointer hover:shadow-sm hover:bg-gray-100">
        <div class="flex items-center gap-2">
          <li class="i-carbon-home w-5 h-5" />
          <span>Home</span>
        </div>

        <span class="text-xs "> {{ totalTodos }} </span>
      </router-link>
    </ul>

    <router-link to="/Today" class="flex justify-between items-center px-4 py-3  rounded-lg hover: cursor-pointer hover:shadow-sm hover:bg-gray-100">
      <span class="flex items-center gap-2">
        <li class="i-carbon-checkmark w-5 h-5" />
        <span>Today</span>
      </span>

      <span class="text-xs "> {{ totalDueTodayTodos }} </span>
    </router-link>

    <router-link to="/Completed" class="flex justify-between items-center px-4 py-3  rounded-lg hover: cursor-pointer hover:shadow-sm hover:bg-gray-100">
      <span class="flex items-center gap-2">
        <li class="i-carbon-checkmark w-5 h-5" />
        <span>Completed</span>
      </span>

      <span class="text-xs "> {{ completed.length }} </span>
    </router-link>

    <router-link v-for="cat, idx in state.categories.value" :key="idx" :to="{ path: `/groups/${cat.title}` }" class="flex justify-between items-center px-4 py-3  rounded-lg hover: cursor-pointer hover:shadow-sm hover:bg-gray-100">
      <span class="flex items-center gap-2">
        <li
          class="i-carbon-checkbox w-5 h-5"
        />
        <span>{{ hyphen(cat.title, {
          type: 'remove',
        }) }} </span>
      </span>

      <span class="text-xs bg-gray-200 text-gray-500 rounded px-1 "> {{ getCategoryLength(cat.title) }} </span>
    </router-link>

    <div class="flex justify-between items-center px-4 py-3  rounded-lg hover: cursor-pointer hover:shadow-sm hover:bg-gray-100">
      <span class="flex items-center gap-2">
        <li class="i-carbon-add w-5 h-5" />
        <input
          id="newCaregory" v-model="category" placeholder="Create New list" type="text" name="New Category" @keyup.enter="addCat({
            id: uuidv4(),
            title: category,
          })"
        >
      </span>

      <span class="text-xs " />
    </div>
  </div>
</template>

<style scoped>

</style>
