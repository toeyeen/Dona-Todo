<script setup lang="ts">
import { onClickOutside, useMagicKeys } from '@vueuse/core'
import { v4 as uuidv4 } from 'uuid'
import type { Category } from '../types'
import { hyphen } from '../utils/index'
import EmojiCard from './EmojiCard.vue'

const category = ref('')
const { addCategories, state, getCategoryLength, totalTodos, completed, totalDueTodayTodos, getCategorySymbol } = useState()

const keys = useMagicKeys({
  passive: false,
})

const newCategory = ref<HTMLInputElement>(null)
const emojiCardElement = ref<HTMLInputElement>(null)
const focusMode = ref(false)
const emojiCard = ref(false)

const CtrlE = keys['Ctrl+E']
const MetaE = keys['Meta+E']

watch(MetaE, (v) => {
  //  Add Category shortkey
  // v ?  Input.focus() : null
})

const addCat = (c: Category) => {
  const { color } = useColors()

  addCategories({ color, ...c })
  category.value = ''
}

watch(state.todos, () => {
}, { immediate: true })

const catColor = (id) => {
  state.categories.value.filter(cat => cat.id === id)
}

function onFocus() {
  focusMode.value = true
}

function onBlur() {
  // focusMode.value = false
}

function showEmojiCard() {
  emojiCard.value = true
}

onClickOutside(emojiCardElement, (event: Event) => emojiCard.value = false)
</script>

<template>
  <div bg="~ white" my-auto rounded-lg p-8 h-full font-rubik>
    <ul>
      <router-link to="/"
        class="flex justify-between items-center px-4 py-3  rounded-lg hover: cursor-pointer hover:shadow-sm hover:bg-gray-100">
        <div class="flex items-center gap-2">
          <li class="i-carbon-home w-5 h-5" />
          <span>Home</span>
        </div>

        <span class="text-xs "> {{ totalTodos }} </span>
      </router-link>
    </ul>

    <router-link to="/Today"
      class="flex justify-between items-center px-4 py-3  rounded-lg hover: cursor-pointer hover:shadow-sm hover:bg-gray-100">
      <span class="flex items-center gap-2">
        <li class="i-carbon-checkmark w-5 h-5" />
        <span>Today</span>
      </span>

      <span class="text-xs "> {{ totalDueTodayTodos }} </span>
    </router-link>

    <router-link to="/Completed"
      class="flex justify-between items-center px-4 py-3  rounded-lg hover: cursor-pointer hover:shadow-sm hover:bg-gray-100">
      <span class="flex items-center gap-2">
        <li class="i-carbon-checkmark w-5 h-5" />
        <span>Completed</span>
      </span>

      <span class="text-xs "> {{ completed.length }} </span>
    </router-link>

    <router-link v-for="cat, idx in state.categories.value" :key="idx" :to="{ path: `/groups/${cat.title}` }"
      class="flex justify-between items-center px-4 py-3  rounded-lg hover: cursor-pointer hover:shadow-sm hover:bg-gray-100">
      <span class="flex items-center gap-2">

        <li class="i-carbon-checkbox w-5 h-5" :style="{ background: cat.color }" />
        <span>{{ hyphen(cat.title, {
          type: 'remove',
        }) }} </span>
      </span>

      <span class="text-xs bg-gray-200 text-gray-500 rounded px-1 "> {{ getCategoryLength(cat.title) }} </span>
    </router-link>

    <div>
      <div
        class="flex justify-between items-center px-4 py-3  rounded-lg hover: cursor-pointer hover:shadow-sm hover:bg-gray-100">
        <span class="flex items-center gap-2">
          <li v-if="!focusMode" class="i-carbon-add w-5 h-5" />

          <div v-else class="bg-gray-200 w-20 rounded-md h-6 flex justify-between items-center p-2">
            <li class="i-carbon-checkbox w-5 h-5" :style="{ background: getCategorySymbol() }" />
            <li class="i-carbon:caret-sort-down w-5 h-5 text-black" @click="showEmojiCard" />
          </div>

          <GhostInput ref="newCategory" v-model="category" placeholder="Create New list" @keyup.enter="addCat({
            id: uuidv4(),
            title: category,
          })" @focus="onFocus" @blur="onBlur" />
        </span>
      </div>
      <EmojiCard v-if="emojiCard" ref="emojiCardElement" />
    </div>
  </div>
</template>

<style scoped>
</style>
