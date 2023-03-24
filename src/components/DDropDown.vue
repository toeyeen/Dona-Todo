<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'

const { triggers } = withDefaults(defineProps<{
  triggers?: 'click' | 'hover' | 'focus'
}>(), {
  triggers: 'click',
})

const showPopup = ref(false)
const dropdownElement = ref<HTMLDivElement | null>(null)
onClickOutside(dropdownElement, (event: Event) => showPopup.value = false)

function toggle() {
  showPopup.value = !showPopup.value
}

function isClickAction() {
  if (triggers.includes('click'))
    return true

  return false
}
function isHoverAction() {
  if (triggers.includes('hover'))
    return true

  return false
}
function isFocusAction() {
  if (triggers.includes('focus'))
    return true

  return false
}
</script>

<template>
  <div ref="dropdownElement" class="dropdown">
    <div v-if="showPopup" class="overlay">
      <slot name="overlay" />
    </div>

    <slot name="activator" :toggle="toggle" />
    <div />
  </div>
</template>

<style scoped>
.dropdown {
  position: relative;
}

.overlay {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
