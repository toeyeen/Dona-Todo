import type { Category, Todo } from '../types'

const defaultcategory = {
  id: '1',
  title: 'Personal',
  color: '#f34123',

}

const state = reactive({
  category: defaultcategory,
  categories: [defaultcategory],
  todos: [],
  auth: {
    logged: true,
    user: {
      id: 1,
      username: 'toeyeen',
    },
  },
})

export const useState = () => {
  const localVariables = reactive({
    firstName: 'Toyin',
    lastName: 'Jolaoso',
  })

  function setCurrentCategory(payload: Category) {
    state.category = (payload)
  }

  function addCategories(value) {
    state.categories.push(value)
  }

  function addTodo(value: Todo) {
    state.todos.unshift(value)
  }
  function markTodo(value: Todo) {
    value.status = 'completed'
  }

  function getCategoryLength(title: string) {
    return state.todos.filter(todo => todo.category[0].title === title).length
  }

  const totalTodos = computed(() => {
    return state.todos.filter(todo => todo.status !== 'completed').length
  })

  const completed = computed(() => {
    return state.todos.filter(todo => todo.status === 'completed').length
  })

  const user = computed(() => {
    return state.auth.user
  })

  return {
    state: toRefs(state),
    localVariables,
    setCurrentCategory,
    addCategories,
    addTodo,
    getCategoryLength,
    totalTodos,
    completed,
    user,
    markTodo,
  }
}
