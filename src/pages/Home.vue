<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid'
import type { Todo } from '../types'
const { addTodo, state, user, markTodo } = useState()

const todo = ref('')
const category = state.categories.value[0]
const taskRef = ref<HTMLDivElement>()

const submit = (value: Todo) => {
  if (todo.value) {
    addTodo(value)
    todo.value = ''
  }
}
</script>

<template>
  <div>
    <p text-3xl font-bold mb-4>
      {{ timeOfTheDay }} {{ user.username }}
    </p>

    <div>
      <input
        id=""
        ref="taskRef" v-model="todo" placeholder="Write a new task" type="text" name="todo" px-2 text-black border border-blue @keyup.enter="submit({
          id: uuidv4(),
          title: todo,
          status: 'inProgress',
          category: [category],
        })"
      >

      <select id="category" v-model="category" name="category">
        <option v-for="cat, idx in state.categories.value" :key="idx" selected :value="cat">
          {{ cat.title }}
        </option>
      </select>
      <button
        @click="submit({
          id: uuidv4(),
          title: todo,
          status: 'inProgress',
          category: [category],
        })"
      >
        Add
      </button>
    </div>

    <ul>
      <li
        v-for="todo, idx in state.todos.value" :key="idx"
        :class="[todo.status == 'completed' ? 'line-through' : '']"
        @click="markTodo(todo)"
      >
        {{ todo }}  {{ todo.category[0].title }}
      </li>
    </ul>
  </div>
</template>

<style scoped>

</style>
