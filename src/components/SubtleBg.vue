<script setup lang="ts">
const { color } = withDefaults(defineProps<{
  color?: string
}>(), {
  color: 'bg-gray-200',
})
</script>

<template>
  <div :class="[color ? color : '']" class=" cursor-pointer  text-xs text-gray-500  rounded">
    <slot />
  </div>
</template>

<style scoped>
</style>
