import { v4 as uuidv4 } from 'uuid'
import type { Category, EmojiStyle, Todo } from '../types'

export const defaultcategory = {
  id: '1',
  title: 'Personal',
  color: {
    hex: '#f34123',
  },
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
  categorySymbol: { hex: defaultcategory.color.hex },
})

export const useState = () => {
  const localVariables = reactive({
    firstName: 'Toyin',
    lastName: 'Jolaoso',
  })

  function setCurrentCategory(payload: Category) {
    state.category = (payload)
  }

  function setCategorySymbol(payload: { hex: string } | EmojiStyle) {
    state.categorySymbol = (payload)
  }

  function getCategorySymbol() {
    return state.categorySymbol
  }

  function addCategories(value) {
    const { title, ...rest } = value

    const formatedValue = hyphen(title)

    const set = new Set(state.categories)

    const uniqueCategory = set.add({ title: formatedValue, ...rest })

    const filteredCategory = removeDuplicates(Array.from(uniqueCategory), 'title')

    state.categories = filteredCategory
  }

  function addTodo(value: Todo) {
    state.todos.unshift(value)
  }

  function duplicateTodo(id: string) {
    const todoindex = state.todos.findIndex(todo => todo.id === id)

    console.log(todoindex, 'todoindex')
    if (todoindex !== -1) {
      const sameTodo = state.todos[todoindex]
      state.todos.splice(todoindex + 1, 0, { ...sameTodo, id: `${uuidv4()}`, title: `${sameTodo.title} Duplicate` })
    }
  }

  function deleteTodo(id: string) {
    state.todos = state.todos.filter(todo => todo.id !== id)
  }

  function markTodo(value: Todo) {
    if (value.status === 'due' || value.status === 'inProgress') {
      value.status = 'completed'
    }
    else {
      if (value.dueDate) {
        const dueDate = Date.parse(value.dueDate.split('/').reverse().join('/'))

        const endofDueDate = new Date(dueDate).setUTCHours(23, 59, 59, 999)

        endofDueDate < Date.now()
          ? value.status = 'due'
          : value.status = 'inProgress'
      }
      else {
        value.status = 'inProgress'
      }
    }
  }

  function getCategoryLength(title: string) {
    return state.todos.filter(todo => todo.category[0].title === title && todo.status !== 'completed').length
  }

  const totalTodos = computed(() => {
    return state.todos.filter(todo => todo.status !== 'completed').length
  })

  const completed = computed(() => {
    return state.todos.filter(todo => todo.status === 'completed')
  })

  const todosDueToday = computed(() => {
    return state.todos.filter((todo) => {
      return todo.dueDate === formatInputDate(new Date().toISOString().split('T')[0])
    },
    )
  })

  const totalDueTodayTodos = computed(() => {
    return state.todos.filter((todo) => {
      return todo.dueDate === formatInputDate(new Date().toISOString().split('T')[0]) && todo.status !== 'completed'
    },
    ).length
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
    todosDueToday,
    user,
    markTodo,
    totalDueTodayTodos,
    setCategorySymbol,
    getCategorySymbol,
    duplicateTodo,
    deleteTodo,
  }
}
