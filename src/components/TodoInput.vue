<script setup lang="ts">
import { useRoute } from 'vue-router'
import { v4 as uuidv4 } from 'uuid'
import type { Todo } from '../types'
import { formatInputDate } from '../utils/index'

const dueDateRef = ref<HTMLInputElement>(null)

const { addTodo, state } = useState()
const route = useRoute()

const vCat = ref(null)

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
const dueDate = ref(null)
const submit = (value: Todo) => {
  if (todo.value && vCat.value) {
    addTodo(value)
    todo.value = ''

    // dueDateRef.value = null
  }

  if (!route.path.includes('/Today'))
    dueDate.value = null
}

const now = computed (() => {
  return todaysDate().split(',')[0].trim()
})

// function selectDueDate(e: Event) {
//   dueDate = e.target.value
// }
</script>

<template>
  <div>
    <input
      id=""
      ref="taskRef" v-model="todo" placeholder="Write a new task" type="text" name="todo" px-2 text-black border border-blue @keyup.enter="submit({
        id: uuidv4(),
        title: todo,
        status: 'inProgress',
        dueDate: formatInputDate(dueDate),
        category: vCat ? [vCat] : unComputedCategory,
      })"
    >

    <span class="mx-2 ">
      <input v-if="showDate" id="" ref="dueDateRef" v-model="dueDate" type="date">
    </span>

    <select v-if="!route.path.includes('groups')" id="category" v-model="vCat" name="category">
      <option v-for="cat, idx in state.categories.value" :key="idx" selected :value="cat">
        {{ cat.title }}
      </option>
    </select>
    <button
      class="bg-green text-white px-2 mx-1"
      @click="submit({
        id: uuidv4(),
        title: todo,
        status: 'inProgress',
        dueDate: formatInputDate(dueDate),
        category: vCat ? [vCat] : unComputedCategory,
      })"
    >
      Add
    </button>

    {{ vCat }}
  </div>
</template>

<style scoped>

</style>
