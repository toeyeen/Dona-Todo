<script setup lang="ts">
import { onClickOutside, useMagicKeys } from '@vueuse/core'
import { v4 as uuidv4 } from 'uuid'
import type { Category } from '../types'
import { hyphen } from '../utils/index'
import EmojiCard from './EmojiCard.vue'

const category = ref('')
const placeholder = ref('Create new list')
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
  if (category.value.length < 3)
    return alert('Input cannot be less than 3 ')
  const color = getCategorySymbol()

  addCategories({ color, ...c })
  resetInput()
}

function resetInput() {
  category.value = ''
  emojiCard.value = false
  focusMode.value = false
  placeholder.value = 'Create new list'
}

watch(state.todos, () => {
}, { immediate: true })

function onFocus() {
  focusMode.value = true
  console.log(newCategory)
  placeholder.value = 'List name'
}

function showEmojiCard() {
  emojiCard.value = true
}

function onBlur() {
  // resetInput()
}

onClickOutside(emojiCardElement, (event: Event) => emojiCard.value = false)

const myElement = computed(() => {
  if (getCategorySymbol().hex)

    return getCategorySymbol().hex

  else
    return getCategorySymbol().unified
})
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
        <div v-if="cat.color.hex" class="i-carbon-checkbox w-5 h-5" :style="{ background: cat.color.hex }" />

        <button v-if="cat.color.unified" class=" emoji-category__button panel"
          :data-unified="parseNativeEmoji(cat.color.unified)">
          <img style="width: 24px;" :src="emojiURLByUnified(cat.color.unified, 'apple')" alt="" loading="lazy">
        </button>
        <span class=" line-clamp-1 whitespace-pre-wrap break-all">{{ hyphen(cat.title, {
          type: 'remove',
        }) }} </span>
      </span>

      <span class="text-xs bg-gray-200 text-gray-500 rounded px-1"> {{
        getCategoryLength(cat.title) }}
      </span>
    </router-link>
    <div>
      <div
        class="flex justify-between items-center px-4 py-3  rounded-lg hover: cursor-pointer hover:shadow-sm hover:bg-gray-100">
        <span class="flex items-center gap-2">
          <li v-if="!focusMode" class="i-carbon-add w-5 h-5" @click="onFocus" />

          <div v-else class="bg-gray-200 w-20 rounded-md h-6 flex justify-between items-center p-2">

            <span>
              <div v-if="getCategorySymbol().hex" class="i-carbon-checkbox w-5 h-5" :style="{ background: myElement }" />

              <button v-if="getCategorySymbol().unified" class=" emoji-category__button panel"
                :data-unified="parseNativeEmoji(myElement)">
                <img style="width: 24px;" :src="emojiURLByUnified(myElement, 'apple')" alt="" loading="lazy">
              </button>
            </span>

            <span class="i-carbon:caret-sort-down w-5 h-5 text-black" @click="showEmojiCard" />
          </div>

          <GhostInput ref="newCategory" v-model="category" :placeholder="placeholder" @keyup.enter="addCat({
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
