<script setup lang="ts">
const props = defineProps({
  placeholder: String,
  disabled: Boolean,
  modelValue: {
    type: [String, Number],
    default: '',
  },
  type: {
    type: String,
    default: 'text',
  },
  addonBefore: String,
  addonAfter: String,
})

const emit = defineEmits(['update:modelValue', 'delete'])

const updateValue = (e: Event) => {
  const target = e.target as HTMLInputElement

  emit('update:modelValue', target.value)
}
</script>

<template>
  <div />
  <input type="text" class="ghost" :placeholder="placeholder
  " :value="modelValue" v-bind="{
  ...$attrs,
  onInput: updateValue,
}">
</template>

<style lang="scss" scoped>
.ghost {
  outline: none;

  &:focus,
  &:active {
    outline: none;
  }

}
</style>
