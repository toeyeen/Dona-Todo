<script setup lang="ts">
import { useRoute } from 'vue-router'
import { v4 as uuidv4 } from 'uuid'
import type { Todo } from '../types'

const { addTodo, state } = useState()
const route = useRoute()

// const category = state.categories.value[0]

const category = computed(() => {
  console.log(state.categories.value.filter(todo => todo))

  return (route.path !== '/')
    ? state.categories.value.filter(cat => cat.title === route.params.id)[0]
    : state.categories.value[0]
})

onMounted(() => {

})
// const taskRef = ref<HTMLDivElement>()

const todo = ref('')
let dueDate = ref(null)
const submit = (value: Todo) => {
  if (todo.value) {
    addTodo(value)
    todo.value = ''
  }
}

const now = computed (() => {
  return new Date().toISOString()
})

function selectDueDate(e: Event) {
  dueDate = e.target.value
}
</script>

<template>
  <div>
    <input
      id=""
      ref="taskRef" v-model="todo" placeholder="Write a new task" type="text" name="todo" px-2 text-black border border-blue @keyup.enter="submit({
        id: uuidv4(),
        title: todo,
        status: 'inProgress',
        dueDate,
        category: [category],
      })"
    >

    <span class="mx-2 ">
      <input id="" type="date" name="" :min="now" @change="selectDueDate">
    </span>

    <select v-if="route.path == '/'" id="category" v-model="category" name="category">
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
        dueDate,
        category: [category],
      })"
    >
      Add
    </button>
  </div>
</template>

<style scoped>

</style>
