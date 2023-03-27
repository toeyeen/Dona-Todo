<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
const { setCurrentCategory, state, markTodo, duplicateTodo, deleteTodo, getTodo } = useState()

let currentCategory = ref(null)
const isEditDrawer = ref(false)
const todoToEdit = ref(null)
const value = ref({ name: 'No List', language: 'JavaScript' })

// let todos = ref(null)

// const currentCategory = computed(() => {
//   categories.value.filter(cat => cat.title == routeDynamicId)
//   // return categories.value.find(cat => cat.title)
// })
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

function openEditDrawer(id: string) {
  isEditDrawer.value = !isEditDrawer.value

  todoToEdit.value = getTodo(id)
}
</script>

<template>
  <div class="flex gap-3 items-center mb-4" />

  <TodoInput />

  <ul class="flex flex-col gap-y-1">
    <TodoItem v-for="todo, idx in todos" :id="todo.id" :key="idx" :value="todo.title" @duplicate="duplicateTodo"
      @delete="deleteTodo" @edit="openEditDrawer" />
  </ul>

  <EmptyTodo v-if="todos.length < 1" message="Empty todo" />

  <DDrawer :visible="isEditDrawer" :closable="true" @close="isEditDrawer = false">
    <template #header>
      <!-- {{ todoToEdit?.id }} -->
    </template>

    <div class="todo--details">
      <div class="todo--details_title">
        <DCheckBox /> {{ todoToEdit?.title }}
      </div>

      <div class="todo--details_information">
        <div class="todo--details_lists">
          <span>
            List
          </span>
          <span>
            <DSelect v-model="value" track-by="name" label="name" :options="[
              { id: 1, name: 'No List', language: 'JavaScript' },
              { id: 2, name: 'Rails', language: 'Ruby' },
              { id: 3, name: 'Sinatra', language: 'Ruby' }]" :max-height="200" style="width: 100px"
              :dropdown-style="{ width: '140px' }">
              <template #icon="{ toggle }">
                <span class=" betaselect__caret i-ph:caret-down text-lg text-black" @click="toggle" />
              </template>
            </DSelect>
          </span>
        </div>
        <div class="todo--details_date">
          <span>
            Due Date
          </span>
          <span>
            <input id="" type="date" name="">
          </span>
        </div>
      </div>
    </div>
    <div class="todo--description">
      <textarea rows="6" placeholder="Write a note..." class="todo--description_notepad" />
    </div>

    <template #footer>
      <button class="todo--delete">
        Delete
      </button>
    </template>
  </DDrawer>
</template>

<style lang="scss" scoped>
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
