<script setup lang="ts">
const { state, user, markTodo } = useState()

const activeTodos = computed(() => {
  return state.todos.value.filter(todo => todo.status !== 'completed')
})

const formattedTodaysDate = computed(() => {
  const options = { weekday: 'long', month: 'short', day: 'numeric' }
  const date = todaysDate(options)

  return `It's ${date}`
})
</script>

<template>
  <div>
    <div class=" mb-4">
      <p class="text-2xl font-500">
        {{ timeOfTheDay }} {{ user.username }}
    </p>

    <div class="text-3xl font-300">
      <span>
        {{ formattedTodaysDate }}
      </span>

      <span v-if="activeTodos.length > 0">
        - {{ activeTodos.length }} task
      </span>
    </div>
    </div>

    <TodoInput />
    <!-- <ul>
                                                              <li v-for="todo, idx in activeTodos" :key="idx" :class="[todo.status == 'completed' ? 'line-through' : '']"
                                                                @click="markTodo(todo)">
                                                                <span>
                                                                                  {{ todo.title }}
                                                                                </span>

                                                                                <span v-if="todo?.dueDate">
                                                                                  it is Due on {{ todo?.dueDate }}
                                                                                </span>
                                                                              </li>
                                                                            </ul> -->

    <div class="py-2" />

    <EmptyTodo v-if="activeTodos.length < 1" message="Empty todo" />
    <ul class="flex flex-col gap-y-1">
      <TodoItem v-for="todo, idx in activeTodos" :id="todo.id" :key="idx" :value="todo.title" />
    </ul>
  </div>
</template>

<style scoped>
</style>
