<script setup lang="ts">
import type { Todo } from '../types'
const props = defineProps<{
  todo: Todo
  isEditDrawer: boolean
  width?: number | string
}>()

const emits = defineEmits<{
  (e: 'closeTodoDrawer', visible: boolean): void
  (e: 'delete', id: string): void
  (e: 'update', todo: Todo): void
}>()

const today = new Date()
const year = today.getFullYear()
const month = String(today.getMonth() + 1).padStart(2, '0')
const day = String(today.getDate()).padStart(2, '0')
const formattedDate = `${year}-${month}-${day}`

const localVariable = ref(props.isEditDrawer)
const todoStatus = ref(props.todo.status === 'completed')
const description = ref(props?.todo?.description)
const dueDate = ref(props?.todo?.dueDate)
const title = ref(props?.todo?.title)
const todoCat = ref(props?.todo?.category)

// Watch for changes to the "value" prop and update the local "value" ref accordingly
watch(() => props.isEditDrawer, (newValue) => {
  localVariable.value = newValue
  description.value = props?.todo?.description
  dueDate.value = props?.todo?.dueDate
  title.value = props?.todo?.title
})

const { categories, updateTodo } = useState()

// const value = ref(categories)

function reset() {
  description.value = ''
  dueDate.value = ''
  title.value = ''
  todoCat.value = props?.todo?.category
}

function closeDrawer(value: boolean) {
  localVariable.value = value
  emits('closeTodoDrawer', false)
}

function deleteTodo() {
  emits('delete', props.todo.id)
  closeDrawer(false)
}

function updateLocalTodo() {
  const updated = {
    ...props.todo,
    description: description.value,
    dueDate: dueDate.value,
    title: title.value,
    category: todoCat.value,
    status: props.todo.status === 'completed' ? 'inProgress' : 'completed',
  }

  updateTodo(updated)

  closeDrawer(false)
  // reset()
  // closeDrawer(false)
}

function onChange(value) {
  todoStatus.value = value
}

// onMounted(() => {
//   todoCat.value = props.todo.category
//   console.log(props.todo.category[0], '12234')
//   console.log(todoCat.value, '2333')
// })
</script>

<template>
  <Teleport to="#app">
    <DDrawer :width="width" :visible="props.isEditDrawer" :closable="true" @close="closeDrawer">
      <template #header />

      <div class="todo--details">
        <div class="todo--details_title">
          <DCheckBox :id="props.todo.id" :model-value="todoStatus" class="mr-2" @on-change="onChange">
            <input id="" class="edit-title" type="text" name="" :value="props?.todo?.title"
              @input="event => title = (event.target as HTMLInputElement).value">
          </DCheckBox>
        </div>

        <div class="todo--details_information">
          <div class="todo--details_lists">
            <span>
              List
            </span>
            <span>
              <DSelect v-model="todoCat" track-by="title" label="title" :options="categories" :max-height="200"
                style="width: 100px" :dropdown-style="{ width: '140px' }">
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
              <input :min="formattedDate" :value="props?.todo?.dueDate" type="date" name="dueDate"
                @input="event => dueDate = (event.target as HTMLInputElement).value">
            </span>
          </div>
        </div>
      </div>
      <div class="todo--description">
        <textarea :value="props?.todo?.description" rows="6" placeholder="Write a note..."
          class="todo--description_notepad" @input="event => description = (event.target as HTMLTextAreaElement).value" />
      </div>

      <template #footer>
        <button class="todo_btn update mt-4" @click="updateLocalTodo">
          Update
        </button>
        <button class="todo_btn delete" @click="deleteTodo">
          Delete
        </button>
      </template>
    </DDrawer>
  </Teleport>
</template>

<style lang="scss" scoped>
.todo {
  &_btn {
    all: unset;
    box-sizing: border-box;
    border-radius: .5rem;
    width: 100%;
    padding: .75rem 2rem;
    display: flex;
    justify-content: center;
    outline: none;
    font-weight: 600;
    cursor: pointer;

    @apply text-danger-dark;

    &.delete {
      @apply bg-danger;
      ;

    }

    &.update {
      background: var(--);
    }
  }

  &--description {
    margin-top: .5rem;

    &_notepad {
      outline: none;
      width: 100%;
      border-radius: .5rem;
      padding: .75rem;
      color: #484848;
      // box-shadow: 1px 1px 1px #484848;
      box-shadow: rgba(0, 0, 0, 0.18) 0px 2px 2px;
      @apply bg-notepad text-main;

      &:focus {
        border-color: #eaecf2;
        outline: 0;
        box-shadow: 0 0 0 0.2rem rgb(118, 118, 118, .25);
      }

      &::placeholder {
        @apply text-notepad-secondary;
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
      padding: .75rem 1rem;
      color: #686872;
      row-gap: .5rem;
      @apply bg-tertiary text-grey;
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

.edit-title {
  margin-left: .5rem;

  &:focus {
    outline: none;

  }
}
</style>
