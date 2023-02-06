interface Category {
  id: string | number
  title: string
  color?: string
}

export const categories = ref([])

export const addCategories = (value: Category) => {
  categories.value.push(value)
}
