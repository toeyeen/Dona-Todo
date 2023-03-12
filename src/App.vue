<script setup lang="ts">
const { state } = useState()
</script>

<template>
  <div my-auto of-hidden h-screen grid
    class="md:grid-cols-[320px_1fr] border gap-8 px-5 py-4 text-rubik  rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-90 border bg-[#EEEFF2]">
    <LayoutBlur :background="state.category.value.color.hex" />
    <LeftPanel class="md:block hidden overflow-y-scroll" />
    <div py-2>
      <div class="border border-blue mx-auto max-w-3xl">
        <router-view />
      </div>
    </div>
  </div>
</template>

<style>
body {
  @apply font-rubik;
}

header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
