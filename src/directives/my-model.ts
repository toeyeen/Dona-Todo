import { useContentEdittable } from '../composables/useContentEditable'
const { setText, updateText } = useContentEdittable()
const myModel = {
  mounted: (el, binding) => {
    setText(el, binding.value)
    updateText(el, binding)

    watchEffect(() => {
      setText(el, binding.value)
    })
  },
}

export default myModel
