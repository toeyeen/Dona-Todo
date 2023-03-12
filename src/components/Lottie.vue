<script setup lang="ts">
import { objectToStyle } from '../utils/index'
interface Lottie {
  src?: string
  autoplay?: boolean
  showControls?: boolean
  background?: string
  speed?: string | number
  width?: string
  height?: string
  loop?: boolean
}

const { src, background, speed, autoplay, loop, showControls, height, width } = withDefaults(defineProps<Lottie>(), {
  src: 'https://assets5.lottiefiles.com/packages/lf20_p8bfn5to.json',
  autoplay: true,
  showControls: false,
  background: 'transparent',
  speed: '1',
  width: '300px',
  height: '300px',
  loop: true,
})

/* Add the lottie script to the component */
// useHead({
//   script: [
//     {
//       src:
//         'https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js',
//       type: 'text/javascript',
//     },
//   ],
// })

const lottieStyle = computed(() => {
  return {
    width: `${width}px`,
    height: `${height}px`,
  }
})

onMounted(() => {
  const existingScript = document.getElementById('lottie-script')
  if (existingScript) {
    console.log('Script already exists!')
    return
  }
  const script = document.createElement('script')
  script.setAttribute('id', 'lottie-script')
  script.setAttribute('src', 'https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js')
  document.head.appendChild(script)
})
</script>

<template>
  <div>
    <lottie-player :src="src" :background="background" :speed="speed" :style="objectToStyle(lottieStyle)"
      :autoplay="autoplay" :loop="loop" :control="showControls" />
  </div>
</template>

<style lang="scss" scoped>
</style>
