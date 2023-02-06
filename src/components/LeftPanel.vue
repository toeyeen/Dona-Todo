<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid'
import type { Category } from '../types'
import { categories } from '../composables/state'

const category = ref('')

const addCat = (c: Category) => {
  const { color } = useColors()

  addCategories({ color, ...c })
  category.value = ''
}

const catColor = (id) => {
  categories.value.filter(cat => cat.id === id)
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

        <span class="text-xs "> 10 </span>
      </router-link>
      <router-link to="/about" class="flex justify-between items-center px-4 py-3  rounded-lg hover: cursor-pointer hover:shadow-sm hover:bg-gray-100">
        <span class="flex items-center gap-2">
          <li class="i-carbon-home w-5 h-5" />
          <span>About</span>
        </span>

        <span class="text-xs "> 10 </span>
      </router-link>
    </ul>

    <router-link v-for="cat, idx in categories" :key="idx" :to="{ path: `/groups/${cat.title}` }" class="flex justify-between items-center px-4 py-3  rounded-lg hover: cursor-pointer hover:shadow-sm hover:bg-gray-100">
      <span class="flex items-center gap-2">
        <li class="i-carbon-checkbox w-5 h-5 text-#af0613" :class="`text-${cat.color}`" />
        <span>{{ cat.title }} </span>
        <span>{{ cat.color }} </span>
      </span>

      <span class="text-xs bg-gray-200 text-gray-500 rounded px-1 "> 0 </span>
    </router-link>

    <div class="flex justify-between items-center px-4 py-3  rounded-lg hover: cursor-pointer hover:shadow-sm hover:bg-gray-100">
      <span class="flex items-center gap-2">
        <li class="i-carbon-checkmark w-5 h-5" />
        <span>Completed</span>
      </span>

      <span class="text-xs "> 10 </span>
    </div>

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

      <span class="text-xs "> 10 </span>
    </div>
  </div>
</template>

<style scoped>

</style>
