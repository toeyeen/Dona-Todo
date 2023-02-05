<script setup lang="ts">
</script>

<template>
  <div my-auto of-hidden h-screen grid class="md:grid-cols-[320px_1fr] border gap-8 border-red px-5 py-4 text-rubik bg-gray-200 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100">
    <LeftPanel class="md:block hidden" />
    <div px-8 py-2 border border-blue>
      <router-view />
    </div>
  </div>
</template>

<style scoped>
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
