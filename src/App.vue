<script setup lang="ts">
</script>

<template>
  <!-- <p>
    <router-link to="/">
      Home
    </router-link>
  </p>
  <p>
    <router-link to="/">
      About
    </router-link>
  </p> -->
  <div bg="~ gray/50" my-auto of-hidden h-screen grid class="grid-cols-[320px_1fr] border gap-8 border-red px-5 py-4 text-rubik">
    <LeftPanel />
    <router-view />
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
