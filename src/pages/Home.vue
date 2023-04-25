<script setup lang="ts">
const { state, user, categories } = useState()
const { deleteTodo, duplicateTodo, openEditDrawer, isEditDrawer, todoToEdit, updateTodo } = useSelector()

const value = ref({ name: 'No List', language: 'JavaScript' })

const activeTodos = computed(() => {
  return state.todos.value.filter(todo => todo.status !== 'completed')
})

const formattedTodaysDate = computed(() => {
  const options = { weekday: 'long', month: 'short', day: 'numeric' }
  const date = todaysDate(options)

  return `It's ${date}`
})

onBeforeMount(() => {
  // seedTodo(todos)
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

    <div class="py-2" />

    <EmptyTodo v-if="activeTodos.length < 1" message="Empty todo" />
    <ul class="flex flex-col gap-y-1 overflow-y-scroll">
      <TodoItem v-for="todo, idx in activeTodos" :id="todo.id" :key="idx" :todo="todo" :status="todo.status"
        :value="todo.title" @duplicate="duplicateTodo" @delete="deleteTodo" @edit="openEditDrawer" />
    </ul>
  </div>

  <TodoDrawer :is-edit-drawer="isEditDrawer" :todo="todoToEdit" @close-todo-drawer="isEditDrawer = false"
    @delete="deleteTodo" @update="updateTodo" />
  <!-- <DDrawer :visible="isEditDrawer" :closable="true" @close="isEditDrawer = false">
    <template #header>
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
                                                              </DDrawer> -->
</template>

<style scoped>
</style>
