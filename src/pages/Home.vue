<script setup lang="ts">
const todo = ref('')
const taskRef = ref<HTMLDivElement>()

interface Group {
  id: number | string
  name: string
  emoji?: string
}

interface Todo {
  id: number | string
  title: string
  isCompleted: false
  dueDate?: Date
  group?: Group[]
}

const todos = ref([])
const todoId = ref(0)

const addTodo = (value: Todo) => {
  todos.value.unshift(value)
  todo.value = ''

  // todoRef.value.focus()
}
</script>

<template>
  <div>
    <p>Home Page</p>

    <div>
      <input
        id=""
        ref="taskRef" v-model="todo" placeholder="Write a new task" type="text" name="todo" px-2 text-black border border-blue @keyup.enter="addTodo({
          id: todoId++,
          title: todo,
          isCompleted: false,
          group: [{
            id: todoId++,
            name: 'Personal',
          }],
        })"
      >
      <button
        @click="addTodo({
          id: todoId++,
          title: todo,
          isCompleted: false,
          group: [{
            id: todoId++,
            name: 'Personal',
          }],
        })"
      >
        Add
      </button>
    </div>

    <ul>
      <li
        v-for="todo, idx in todos" :key="idx" :class="[todo.isCompleted ? 'line-through' : '',
        ]"
        @click="todo.isCompleted
          = !todo.isCompleted
        "
      >
        {{ todo }}
      </li>
    </ul>
  </div>
</template>

<style scoped>

</style>
