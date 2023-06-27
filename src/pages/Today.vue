<script setup lang="ts">
import { useRoute } from 'vue-router'

const { deleteTodo, duplicateTodo, openEditDrawer, isEditDrawer, todoToEdit } = useSelector()
const { todosDueToday } = useState()

const route = useRoute()
</script>

<template>
  <div>
    <p text-2xl font-bold mb-2>
      {{ route.name }}
    </p>

    <TodoInput />

    <ul class="flex flex-col gap-y-1 overflow-y-scroll">
      <TodoItem v-for="todo in todosDueToday" :id="todo.id" :key="todo.id" :todo="todo" :status="todo.status"
        :value="todo.title" @duplicate="duplicateTodo" @delete="deleteTodo" @edit="openEditDrawer" />
    </ul>

    <EmptyTodo v-if="todosDueToday.length < 1" message="Empty todo" />
    <TodoDrawer v-if="isEditDrawer" :is-edit-drawer="isEditDrawer" :todo="todoToEdit"
      @close-todo-drawer="isEditDrawer = false" @delete="deleteTodo" />
  </div>
</template>

<style scoped>
</style>
