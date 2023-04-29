import { v4 as uuidv4 } from 'uuid'
import type { Category, Color, EmojiStyle, ReactiveState, Todo } from '../types'
import { todos } from '../data/todo.json'
export const defaultcategory: Category = {
  id: '1',
  title: 'Personal',
  color: {
    hex: '#008FFD',
  },
}

const state: ReactiveState = reactive({
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
  const categories = computed(() => {
    return state?.categories
  })

  const localVariables = reactive({
    firstName: 'Toyin',
    lastName: 'Jolaoso',
  })

  function setCurrentCategory(payload: Category) {
    state.category = (payload)
  }

  function setCategorySymbol(payload: Color | EmojiStyle) {
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

    if (todoindex !== -1) {
      const sameTodo = state.todos[todoindex]
      state.todos.splice(todoindex + 1, 0, { ...sameTodo, id: `${uuidv4()}`, title: `${sameTodo.title} Duplicate` })
    }
  }

  function deleteTodo(id: string) {
    const todoindex = state.todos.findIndex(todo => todo.id === id)

    if (todoindex !== -1)
      state.todos.splice(todoindex, 1)
  }

  function getTodo(id: string) {
    return state.todos.find(todo => todo.id === id)
  }

  function markTodo(payload: Todo) {
    const todoindex = state.todos.findIndex(todo => todo.id === payload.id)

    if (payload.status === 'due' || payload.status === 'inProgress') {
      state.todos[todoindex].status = 'completed'
    }
    else {
      if (payload.dueDate) {
        const dueDate = Date.parse(payload.dueDate.split('/').reverse().join('/'))

        const endofDueDate = new Date(dueDate).setUTCHours(23, 59, 59, 999)

        endofDueDate < Date.now()
          ? state.todos[todoindex].status = 'due'
          : state.todos[todoindex].status = 'inProgress'
      }
      else {
        state.todos[todoindex].status = 'inProgress'
      }
    }
  }

  function updateTodo(todo: Todo) {
    console.log(todo, '1234')

    const todoIdToUpdate = todo.id

    const todoindex = state.todos.findIndex(todo => todo.id === todoIdToUpdate)

    state.todos.splice(todoindex, 1, todo)
  }

  function getCategoryLength(title: string) {
    return state?.todos?.filter(todo => todo?.category[0]?.title === title && todo.status !== 'completed').length
  }

  const totalTodos = computed(() => {
    return state.todos.length
    // return state.todos.filter(todo => todo.status !== 'completed').length
  })

  const completed = computed(() => {
    return state.todos.filter(todo => todo.status === 'completed')
  })

  const todosDueToday = computed(() => {
    // formatInputDate(1)
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

  function seedTodo(todos: Todo[]) {
    return state.todos = todos
  }

  seedTodo(todos)

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
    getTodo,
    seedTodo,
    categories,
    updateTodo,
  }
}
