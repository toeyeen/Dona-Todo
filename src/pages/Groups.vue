<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
const { setCurrentCategory, state } = useState()
const { deleteTodo, duplicateTodo, openEditDrawer, isEditDrawer, todoToEdit } = useSelector()

let currentCategory = ref(null)

const value = ref({ name: 'No List', language: 'JavaScript' })

const todos = computed(() => {
  return state.todos.value.filter(todo => todo.category[0].title === route.params.id && todo.status !== 'completed')
})

watch(route, () => {
  currentCategory = state.categories.value.filter(cat => cat.title === route.params.id)

  setCurrentCategory(currentCategory[0])
}, { immediate: true })

onMounted(() => {
  currentCategory = state.categories.value.filter(cat => cat.title === route.params.id)
  setCurrentCategory(currentCategory[0])
})
</script>

<template>
  <div class="flex gap-3 items-center mb-4" />

  <TodoInput />

  <ul class="flex flex-col gap-y-1 overflow-y-scroll">
    <TodoItem v-for="todo in todos" :id="todo.id" :key="todo.id" :todo="todo" :status="todo.status" :value="todo.title"
      @duplicate="duplicateTodo" @delete="deleteTodo" @edit="openEditDrawer" />
  </ul>

  <EmptyTodo v-if="todos.length < 1" message="Empty todo" />

  <TodoDrawer :is-edit-drawer="isEditDrawer" :todo="todoToEdit" @close-todo-drawer="isEditDrawer = false"
    @delete="deleteTodo" />
</template>

<style lang="scss">
.todo {
  &--delete {
    all: unset;
    box-sizing: border-box;
    border-radius: .5rem;
    width: 100%;
    padding: .75rem 2rem;
    display: flex;
    justify-content: center;
    outline: none;
    background-color: #fcefec;
    color: #a77275;
    font-weight: 600;
    cursor: pointer;
  }

  &--description {
    margin-top: .5rem;

    &_notepad {
      outline: none;
      background-color: #f8f5ea;
      width: 100%;
      border-radius: .5rem;
      padding: .75rem;
      color: #484848;
      // box-shadow: 1px 1px 1px #484848;
      box-shadow: rgba(0, 0, 0, 0.18) 0px 2px 2px;

      &:focus {
        border-color: #eaecf2;
        outline: 0;
        box-shadow: 0 0 0 0.2rem rgb(118, 118, 118, .25);
      }

      &::placeholder {
        color: #B8A460;
      }
    }

  }

  &--details {
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
    margin-top: .75rem;

    &_title {
      display: flex;
      column-gap: .5rem;
      align-items: center;
    }

    &_information {
      border-radius: .5rem;
      display: flex;
      flex-direction: column;
      background-color: #eaecf2;
      padding: .75rem 1rem;
      color: #686872;
      row-gap: .5rem;
    }

    &_lists {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    &_date {
      display: flex;
      justify-content: space-between;
      align-items: center;

    }

    &_title {
      display: flex;
    }
  }
}
</style>
