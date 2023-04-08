export const useContentEdittable = () => {
  const setText = (el, value) => {
    // Set the value of the contenteditable element
    el.innerText = value
  }

  const updateText = (el, binding) => {
    // Update the v-model property when the contenteditable element's value changes
    el.addEventListener('input', () => {
      binding.value = el.innerText
    })
  }

  return {
    setText,
    updateText,
  }
}
