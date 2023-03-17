<script setup lang="ts">
const props = withDefaults(defineProps<{
  color: string
}>(), {
  color: 'bg-gray-200',
})
</script>

<template>
  <div :class="[color ? color : '']" class=" cursor-pointer p-1  text-xs text-gray-500  rounded px-1">
    <slot />
  </div>
</template>

<style scoped>
</style>
