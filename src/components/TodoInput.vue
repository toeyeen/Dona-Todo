<script setup lang="ts">
import { useRoute } from 'vue-router'
import { v4 as uuidv4 } from 'uuid'
import { onClickOutside, useMagicKeys, whenever } from '@vueuse/core'
import type { Todo } from '../types'
import { formatInputDate } from '../utils/index'

const keys = useMagicKeys()
const shiftCtrlA = keys['Meta+e']

const dueDateRef = ref<HTMLInputElement>(null)
const taskRef = ref<HTMLInputElement>(null)
const inputArea = ref<HTMLInputElement>(null)
const taskFocused = ref(false)
const { addTodo, state } = useState()
const route = useRoute()

const vCat = ref(null)
const value = ref({ name: 'No List', language: 'JavaScript' })
const options = ref(
  [
    { id: 1, name: 'No List', language: 'JavaScript' },
    { id: 2, name: 'Rails', language: 'Ruby' },
    { id: 3, name: 'Sinatra', language: 'Ruby' },
    { id: 4, name: 'Laravel', language: 'PHP' },
    { id: 5, name: 'Phoenix', language: 'Elixir' },
  ])
const dueDate = ref(null)

// Watcher
whenever(shiftCtrlA, () => {
  if (!taskFocused.value) {
    taskFocused.value = true
    taskRef.value.focus()
  }
  else {
    removeFocus()
  }
})

function removeFocus() {
  taskRef.value.blur()
  taskFocused.value = false
}

watch(taskRef, (old) => {
  document.activeElement !== taskRef.value ? taskFocused.value = false : taskFocused.value = true
})

const category = computed(() => {
  return (route.path !== '/')
    ? state.categories.value.filter(cat => cat.title === route.params.id)
    : state.categories.value
})

onClickOutside(inputArea, (event) => {
  taskFocused.value = false
})

const showDate = computed(() => {
  if (!route.path.includes('Today'))
    return true
})

const unComputedCategory = ref(category)

function resetGroup() {
  vCat.value = (route.path !== '/')
    ? state.categories.value.filter(cat => cat.title === route.params.id)[0]
    : state.categories.value[0]
}
onMounted(() => {
  watch(route, () => {
    resetGroup()
  })

  resetGroup()

  if (route.path.includes('Today'))
    dueDate.value = todaysDate().split(',')[0].trim()
})

const todo = ref('')
const submit = (value: Todo, evt?: KeyboardEvent) => {
  evt.preventDefault()

  if (todo.value && vCat.value) {
    addTodo(value)
    todo.value = ''
    // dueDateRef.value = null
  }

  if (!route.path.includes('/Today'))
    dueDate.value = null
}

const now = computed(() => {
  return todaysDate().split(',')[0].trim()
})
const textAreaBg = computed(() => {
  return {
    'bg-white': taskFocused.value,
    'bg-gray-300': !taskFocused.value,
  }
})

// function selectDueDate(e: Event) {
// const target = e.target as HTMLInputElement
//   dueDate = target.value
// }

const adjustTextAreaHeight = () => {
  // console.log(taskRef.value.scrollHeight), 'scroll'

  // taskRef.value.style.height = '0px'
  // taskRef.value.style.height = `${25 + taskRef.value.scrollHeight}px`

  taskRef.value.style.height = 'auto' // reset height
  taskRef.value.style.height = `${taskRef.value.scrollHeight}px` // adjust heigh
}

function checker() {
  return !route.path.includes('groups')
}

function nameWithNum({ name, language }) {
  return `${name}`
}
</script>

<template>
  <div ref="inputArea">
    <div :class="textAreaBg"
      class="z-5 relative rounded-xl drop-shadow w-full flex items-center justify-between px-2  py-2 max-h-12">
      <div class="left-input flex flex-[1_1_70%]">
        <DCheckBox v-if="taskFocused === true" />
        <textarea ref="taskRef" v-model="todo" rows="1" placeholder="Write a new task" type="text" name="todo"
          :class="textAreaBg" class="px-2 text-black w-full focus:outline-none " @input="adjustTextAreaHeight"
          @keydown.enter="submit({
            id: uuidv4(),
            title: todo,
            status: 'inProgress',
            dueDate: formatInputDate(dueDate),
            category: vCat ? [vCat] : unComputedCategory,
          }, $event)" @focus="taskFocused = true" />
      </div>

      <div v-if="taskFocused === true" class="right-input items-center flex justify-end flex-auto ">
        <div>
          <li class="i-carbon-calendar w-5 h-5" />
        </div>
        <span class="flex">
          <DSelect v-model="value" track-by="name" label="name" :custom-label="nameWithNum" :close-on-select="false"
            :options="options" :max-height="200" style="width: 100px" :dropdown-style="{ width: '140px' }">
            <template #icon="{ toggle }">
              <span class=" betaselect__caret i-ph:caret-down text-lg text-black" @click="toggle" />
            </template>
          </DSelect>
        </span>
      </div>

      <div v-else class="flex gap-x-1">
        <SubtleBg>
          <span class="text-base">⌘</span>
        </SubtleBg>
        <SubtleBg>
          <span class="text-base">E</span>
        </SubtleBg>
      </div>
    </div>

    <!-- <span class="mx-2 ">
                                                                                                                      <input v-if="showDate" id="" ref="dueDateRef" v-model="dueDate" type="date">
                                                                                                                    </span>

                                                                                                                    <button class="bg-green text-white px-2 mx-1" @click="submit({
                                                                                                                      id: uuidv4(),
                                                                                                                      title: todo,
                                                                                                                      status: 'inProgress',
                                                                                                                      dueDate: formatInputDate(dueDate),
                                                                                                                      category: vCat ? [vCat] : unComputedCategory,
                                                                                                                    })">
                                                                                                                      Add
                                                                                                                    </button> -->
  </div>
</template>

<style lang="scss" scoped>
textarea {
  max-height: 120px;
  overflow-y: scroll;
  word-wrap: break-word;
  resize: none
}
</style>
