<script setup lang="ts">
const slots = useSlots()
</script>

<template>
  <div>
    <input id="c1" type="checkbox">
    <slot />
    <!-- <label for="c1">Checkbox</label> -->
  </div>
</template>

<style lang="scss">
@import '../assets/scss/variables';
</style>
