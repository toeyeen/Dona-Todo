const { duplicateTodo, deleteTodo, getTodo, updateTodo } = useState()
export const useSelector = () => {
  const isEditDrawer = ref(false)
  const todoToEdit = ref(null)

  function openEditDrawer(id: string) {
    isEditDrawer.value = !isEditDrawer.value

    todoToEdit.value = getTodo(id)
  }

  return {
    openEditDrawer,
    duplicateTodo,
    deleteTodo,
    isEditDrawer,
    todoToEdit,
    updateTodo,
  }
}
