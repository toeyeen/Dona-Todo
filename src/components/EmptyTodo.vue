<script setup lang="ts">
const { message } = withDefaults(defineProps<{
  message: string
}>(), {
  message: 'You are all done ',
})
</script>

<template>
  <div class="flex flex-col justify-center items-center">
    <Lottie src="https://assets2.lottiefiles.com/private_files/lf30_cgfdhxgx.json" :show-controls="true" width="100"
      height="100" />
    <p>{{ message }} </p>
  </div>
</template>

<style scoped>
</style>
