<script setup lang="ts">
import { useRoute } from 'vue-router'
import { v4 as uuidv4 } from 'uuid'
import type { Todo } from '../types'
import { formatInputDate } from '../utils/index'

const dueDateRef = ref<HTMLInputElement>(null)

const { addTodo, state } = useState()
const route = useRoute()

const vCat = ref(null)
const dueDate = ref(null)

const category = computed(() => {
  return (route.path !== '/')
    ? state.categories.value.filter(cat => cat.title === route.params.id)
    : state.categories.value
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
// const taskRef = ref<HTMLDivElement>()

const todo = ref('')
const submit = (value: Todo) => {
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

// function selectDueDate(e: Event) {
// const target = e.target as HTMLInputElement
//   dueDate = target.value
// }

function checker() {
  return !route.path.includes('groups')
}
</script>

<template>
  <div>
    <div class="bg-white rounded-lg drop-shadow w-full flex items-center justify-between px-2  py-2">
      <div class="left-input flex flex-[1_1_70%]">
        <DCheckBox />
        <input ref="taskRef" v-model="todo" placeholder="Write a new task" type="text" name="todo"
          class="px-2 text-black w-full focus:outline-none " @keyup.enter="submit({
            id: uuidv4(),
            title: todo,
            status: 'inProgress',
            dueDate: formatInputDate(dueDate),
            category: vCat ? [vCat] : unComputedCategory,
          })">
      </div>

      <div class="right-input flex justify-end flex-auto ">
        <div>
          <li class="i-carbon-calendar w-5 h-5" />
        </div>

        <span class="flex">
          <li class="i-carbon-home w-5 h-5" />
          <DSelect :options="['Jolaoso', 'toyun', 'joseph', 'danmilare']" style="width: 200px" />
          <!-- <select v-if="checker" id="category" v-model="vCat" name="category">
                                        <option v-for="cat, idx in state.categories.value" :key="idx" selected :value="cat">
                                          {{ cat.title }}
                                        </option>
                                      </select> -->
        </span>
      </div>
    </div>

    <span class="mx-2 ">
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
    </button>
  </div>
</template>

<style scoped>
</style>
