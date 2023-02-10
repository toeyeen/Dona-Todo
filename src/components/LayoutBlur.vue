<script setup lang="ts">
interface Props {
  background: string
}

const props = withDefaults(defineProps<Props>(), {
  background: '#008ffd',
})

const { background } = toRefs(props)

const boxShadow = computed(() => `${(background.value)} 20px 250px 300px`)

// const bg = computed(() => {})
</script>

<template>
  <div class="layout-blur" />
</template>

<style scoped>
.layout-blur {
    position: absolute;
    width: 40%;
    height: 260px;
    top: 0px;
    right: 30%;
    pointer-events: none;
    border-radius: 120px 20px;
    opacity: 0.14;
    box-shadow:  v-bind(boxShadow);
    transform: rotate(352deg) translateY(-175%) translateZ(0px);
    /* transition: opacity 1.5s cubic-bezier(0.17, 0.17, 0, 1) 0s; */
}
</style>
