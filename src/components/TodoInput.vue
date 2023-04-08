<script setup lang="ts">
import { useRoute } from 'vue-router'
import { onClickOutside, useMagicKeys, whenever } from '@vueuse/core'
import { v4 as uuidv4 } from 'uuid'
import type { Todo } from '../types'

const keys = useMagicKeys()
const shiftCtrlA = keys['Meta+e']

const dueDateRef = ref<HTMLInputElement>(null)
const taskRef = ref<HTMLInputElement>(null)
const inputArea = ref<HTMLInputElement>(null)
const taskFocused = ref(false)
const { addTodo, state, categories } = useState()
const route = useRoute()
const suffix = ref('')

const vCat = ref(null)
const value2 = ref({ id: 1, name: 'No List', language: 'JavaScript' })
const options = ref(
  [
    { id: 1, name: 'No List', language: 'JavaScript' },
    { id: 2, name: 'Rails', language: 'Ruby' },
    { id: 3, name: 'Sinatra', language: 'Ruby' },
    { id: 4, name: 'Laravel', language: 'PHP' },
    { id: 5, name: 'Phoenix', language: 'Elixir' },
  ])
const dueDate = ref(null)
const showDateInput = ref(false)

// Watcher
whenever(shiftCtrlA, () => {
  if (!taskFocused.value) {
    taskFocused.value = true
    taskRef.value.$el.focus()
  }
  else {
    removeFocus()
  }
})

function removeFocus() {
  taskRef.value.$el.blur()
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
const description = ref('')
const submit = (value: Todo, evt?: KeyboardEvent) => {
  evt.preventDefault()

  if (todo.value.includes('//')) {
    const index = todo.value.indexOf('//')
    const title = todo.value.substring(0, index)
    addTodo({
      ...value,
      title,
      description: description.value,
    })
    todo.value = ''
    description.value = ''
    taskRef.value.$el.innerText = ''
  }
  else {
    if (todo.value && vCat.value) {
      addTodo(value)
      todo.value = ''
      taskRef.value.$el.innerText = ''

      // dueDateRef.value = null
    }

    if (!route.path.includes('/Today'))
      dueDate.value = null
  }
}

watch(todo, (oldText, newText) => {
  if (todo.value.includes('//')) {
    const index = oldText.indexOf('//')
    // const matches = todo.value.match(/\/\/(.*)/)
    // suffix.value = matches ? matches[1] : ''

    if (index >= 0)
      description.value = oldText.substring(index + 2).trim()
  }
})

const now = computed(() => {
  return todaysDate().split(',')[0].trim()
})
const textAreaBg = computed(() => {
  return {
    'bg-white': taskFocused.value,
    'bg-gray-300': !taskFocused.value,
  }
})

const updateSuffix = computed(() => {
  const matches = todo.value.match(/\/\/(.*)/)
  suffix.value = matches ? matches[1] : ''
})

const adjustTextAreaHeight = () => {
  // console.log(taskRef.value.$el.scrollHeight), 'scroll'

  // taskRef.value.$el.style.height = '0px'
  // taskRef.value.$el.style.height = `${25 + taskRef.value.$el.scrollHeight}px`

  taskRef.value.$el.style.height = 'auto' // reset height
  taskRef.value.$el.style.height = `${taskRef.value.$el.scrollHeight}px` // adjust heigh
}

function checker() {
  return !route.path.includes('groups')
}

function nameWithNum({ title, language }) {
  // return `${language}`
  return `${title}`
}

function showDateBtn() {
  showDateInput.value = !showDateInput.value
}

const testVal = ref(false)
</script>

<template>
  <div ref="inputArea">
    <div :class="textAreaBg"
      class="z-5 relative rounded-xl drop-shadow w-full flex items-center justify-between px-2  py-2 min-h-12">
      <div class="left-input items-center flex flex-[1_1_70%]">
        <DCheckBox v-if="taskFocused === true" v-model="testVal" />
        <ContentEditable ref="taskRef" v-model="todo" placeholder="Enter Todo here" :class="textAreaBg"
          class="px-2 text-black w-full focus:outline-none " :data-suffix="suffix" @input="adjustTextAreaHeight"
          @keydown.enter="submit({
            id: uuidv4(),
            title: todo,
            status: 'inProgress',
            dueDate: formatInputDate(dueDate),
            category: vCat ? [vCat] : unComputedCategory,
            description: '',
          }, $event)" @focus="taskFocused = true" />
        <!-- <textarea ref="taskRef" v-model="todo" rows="1" placeholder="Write a new task" type="text" name="todo"
                                                                                                  :class="textAreaBg" class="px-2 text-black w-full focus:outline-none " @input="adjustTextAreaHeight"
                                                                                                  @keydown.enter="submit({
                                                                                                    id: uuidv4(),
                                                                                                    title: todo,
                                                                                                    status: 'inProgress',
                                                                                                    dueDate: formatInputDate(dueDate),
                                                                                                    category: vCat ? [vCat] : unComputedCategory,
                                                                                                    description: '',
                                                                                                  }, $event)" @focus="taskFocused = true" /> -->
      </div>

      <div v-if="taskFocused === true" class="right-input items-center flex justify-end flex-auto ">
        <div>
          <li v-if="!showDateInput" class="i-carbon-calendar w-5 h-5" @click="showDateBtn" />
          <input v-if="showDateInput" id="" type="date" name="">
        </div>
        <span class="flex">
          <DSelect v-model="vCat" track-by="title" label="title" :custom-label="nameWithNum" :options="categories"
            :max-height="200" style="width: 100px" :dropdown-style="{ width: '140px' }">

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
  </div>
</template>

<style lang="scss" scoped>
textarea {
  max-height: 120px;
  overflow-y: scroll;
  word-wrap: break-word;
  resize: none
}

[contenteditable]::after {
  content: attr(data-suffix);
  color: yellow;
}
</style>
