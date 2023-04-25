<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'

const { triggers, closeOnClick } = withDefaults(defineProps<{
  triggers?: 'click' | 'hover' | 'focus'
  closeOnClick?: boolean

}>(), {
  triggers: 'click',
  closeOnClick: false,
})

const showPopup = ref(false)
const dropdownRef = ref<HTMLDivElement | null>(null)
const activatorRef = ref<HTMLDivElement | null>(null)
onClickOutside(dropdownRef, (event: Event) => {
  if (closeOnClick)
    showPopup.value = false
})

const overlayPosition = ref(null)
const preferredOpenDirection1 = ref(null)

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

watchEffect(() => {
  window.addEventListener('resize', getPosition)
  getPosition()
  return () => {
    window.removeEventListener('resize', getPosition)
  }
})

function getPosition() {
  if (activatorRef.value) {
    const divRect = activatorRef.value.getBoundingClientRect()

    for (const key in divRect) {
      // console.log(`${key}: ${divRect[key]}`)
    }

    const x = divRect.left + activatorRef.value.offsetWidth
    const y = divRect.top + activatorRef.value.offsetHeight

    overlayPosition.value = {
      position: 'absolute',
      left: `${x}px`,
      top: `${y}px`,
    }
    return {
      position: 'absolute',
      left: `${x}px`,
      top: `${y}px`,
    }
  }
}

onMounted(() => {
  window.addEventListener('resize', getPosition)
  getPosition()
})

onUnmounted(() => {
  window.removeEventListener('resize', getPosition)
})
</script>

<template>
  <div ref="dropdownRef" class="dropdown">
    <div v-if="showPopup" class="overlay">
      <Teleport to="#app">
        <div class="dropdown" :style="objectToStyle(overlayPosition)">
          <slot name="overlay" />
        </div>
      </Teleport>
    </div>

    <div ref="activatorRef" class="see it">
      <slot name="activator" :toggle="toggle" />
    </div>
    <div />
  </div>
</template>

<style>
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
