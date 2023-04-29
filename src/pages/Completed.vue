<script setup lang="ts">
const { state, completed } = useState()

const { deleteTodo, duplicateTodo, openEditDrawer, isEditDrawer, todoToEdit } = useSelector()

const value = ref({ name: 'No List', language: 'JavaScript' })
</script>

<template>
  <div>
    Completed Page
  </div>

  <ul class="flex flex-col gap-y-1 overflow-y-scroll">
    <TodoItem v-for="todo in completed" :id="todo.id" :key="todo.id" :todo="todo" :value="todo.title"
      :status="todo.status" @edit="openEditDrawer" @duplicate="duplicateTodo" @delete="deleteTodo" />
  </ul>

  <EmptyTodo v-if="completed.length < 1" message="Empty todo" />

  <TodoDrawer :is-edit-drawer="isEditDrawer" :todo="todoToEdit" @close-todo-drawer="isEditDrawer = false"
    @delete="deleteTodo" />
</template>

<style scoped>
</style>
