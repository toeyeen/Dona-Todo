<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
const { setCurrentCategory, state, markTodo } = useState()

let currentCategory = ref(null)
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

function clocker(id: string) {
  const todoindex = todos.value.findIndex(todo => todo.id == id)

  const sameTodo = todos.value[todoindex]

  todos.value.splice(todoindex + 1, 0, { ...sameTodo, id: `${sameTodo.id}duplicate`, title: `${sameTodo.title} Duplicate` })

  // Todo: Display the todos with the duplicated items

  console.log(todos.value)
}
</script>

<template>
  <div class="flex gap-3 items-center mb-4">
    <!-- <button v-if="state.category.value.color.unified" class=" emoji-category__button panel"
                                                                                              :data-unified="parseNativeEmoji(state.category.value.color.unified)">
                                                                                              <img style="width: 48px;" :src="emojiURLByUnified(state.category.value.color.unified, 'apple')" alt=""
                                                                                                loading="lazy">
                                                                                            </button> -->

    <!-- <span class="text-2xl">
                                                                                            {{ state.category.value.title }}
                                                                                          </span> -->
  </div>

  <TodoInput />

  <ul class="flex flex-col gap-y-1">
    <TodoItem v-for="todo, idx in todos" :id="todo.id" :key="idx" :value="todo.title" @duplicate="clocker">
      <!-- <li v-for="todo, idx in todos" :key="idx" :class="[todo.status == 'completed' ? 'line-through' : '']"
                                                          @click="markTodo(todo)">
                                                          <span>
                                                            {{ todo.title }}
                                                          </span>

                                                          <span v-if="todo?.dueDate">
                                                            it is Due on {{ todo?.dueDate }}
                                                          </span>
                                                        </li> -->
    </todoitem>
  </ul>

  <EmptyTodo v-if="todos.length < 1" message="Empty todo" />
</template>

<style scoped>
</style>
