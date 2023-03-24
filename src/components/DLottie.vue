<script>
export default {
  props: {
    src: {
      type: String,
      default: 'https://assets5.lottiefiles.com/packages/lf20_p8bfn5to.json',
    },
    autoplay: {
      type: Boolean,
      default: true,
    },
    showControls: {
      type: Boolean,
      default: false,
    },
    background: {
      type: String,
      default: 'transparent',
    },
    speed: {
      type: String,
      default: '1',
    },
    width: {
      type: String,
      default: '300px',
    },
    height: {
      type: String,
      default: '300px',
    },
    loop: {
      type: Boolean,
      default: true,
    },
  },
  head() {
    return {
      script: [
        {
          src:
            'https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js',
        },
      ],
    }
  },
  computed: {
    lottieStyle() {
      return {
        width: props.width,
        height: props.height,
      }
    },
  },

}
</script>

<template>
  <div>
    <lottie-player :src="src" :background="background" :speed="speed" style="width: 300px; height: 300px;"
      :autoplay="autoplay" :loop="loop" :controls="showControls" />
  </div>
</template>

<style lang="scss" scoped>
</style>
