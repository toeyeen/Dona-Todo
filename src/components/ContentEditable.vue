<script setup lang="ts">
const props = defineProps({
  modelValue: String,
  placeholder: String,
})

const emits = defineEmits(['update:modelValue', 'clear'])

const textAreaRef = ref<HTMLDivElement | null>(null)
const isEditable = ref(false)
const inputText = ref(props.placeholder)

function updateContent(event) {
  emits('update:modelValue', event.target.innerText)
}
function clearContent(event) {
  emits('clear')
  textAreaRef.value.innerText = ''
}

function makeEditable() {
  isEditable.value = true

  setTimeout(() => {
    textAreaRef.value?.focus()
  }, 100)

  const doc = textAreaRef.value

  textAreaRef.value.innerText = props.modelValue || ''
  inputText.value = props.modelValue || ''

  if (textAreaRef.value.innerText && doc) {
    const range = document.createRange()
    const sel = window.getSelection()
    range.setStart(doc, 1)
    range.collapse(true)
    sel.removeAllRanges()
    sel.addRange(range)
    doc.focus()
  }
}

function makeNormal() {
  isEditable.value = false
  inputText.value = props.modelValue === '' ? props.placeholder : props.modelValue

  textAreaRef.value.innerText = props.modelValue === '' ? props.placeholder : props.modelValue
}

function callMe() {
}
</script>

<template>
  <div id="textAreaId" ref="textAreaRef" :contenteditable="isEditable" class="contenteditable" :value="props.modelValue"
    @input="updateContent" @click="makeEditable" @blur="makeNormal" v-text="props.placeholder" />
</template>

<style lang="scss"  scoped>
.contenteditable {

  &_container {
    display: inline-block;
  }

  width: 100%;
  min-height: 25px;
}
</style>
