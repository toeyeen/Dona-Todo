<script setup lang="ts">
const props = withDefaults(defineProps<{
  id?: string | number
  modelValue: boolean
  label?: string
  value?: string
  disabled?: boolean
}>(), {

})

const emits = defineEmits<{
  (e: 'onChange', value: boolean): void
  (e: 'update:modelValue', value: boolean): void
}>()

const updateValue = (event: Event) => {
  const target = event.target as HTMLInputElement
  let val = target.checked
  if (target.type === 'checkbox')
    val = target.checked
  emits('onChange', val)
  emits('update:modelValue', val)
}

const slots = useSlots()
</script>

<template>
  <div>
    <input id="c1" :aria-labelledby="`label-${props.id}`" type="checkbox" :checked="props.modelValue"
      v-bind="{ ...$attrs, onChange: updateValue }">

    <slot />
    <!-- <label for="c1">Checkbox</label> -->
  </div>
</template>

<style lang="scss">
@import '../assets/scss/variables';
</style>
