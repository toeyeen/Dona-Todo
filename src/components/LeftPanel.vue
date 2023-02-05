<script setup lang="ts">

</script>

<template>
  <div bg="~ white" my-auto rounded-lg p-8 h-full font-rubik>
    <ul>
      <div class="flex justify-between items-center px-4 py-3  rounded-lg hover: cursor-pointer hover:shadow-sm hover:bg-gray-100">
        <router-link to="/" class="flex items-center gap-2">
          <li class="i-carbon-home w-5 h-5" />
          <span>Home</span>
        </router-link>

        <span class="text-xs "> 10 </span>
      </div>
      <router-link to="/about" class="flex justify-between items-center px-4 py-3  rounded-lg hover: cursor-pointer hover:shadow-sm hover:bg-gray-100">
        <span class="flex items-center gap-2">
          <li class="i-carbon-home w-5 h-5" />
          <span>About</span>
        </span>

        <span class="text-xs "> 10 </span>
      </router-link>
      <div class="flex justify-between items-center px-4 py-3  rounded-lg hover: cursor-pointer hover:shadow-sm hover:bg-gray-100">
        <span class="flex items-center gap-2">
          <li class="i-carbon-home w-5 h-5" />
          <span>Home</span>
        </span>

        <span class="text-xs "> 10 </span>
      </div>
    </ul>

    <div class="flex justify-between items-center px-4 py-3  rounded-lg hover: cursor-pointer hover:shadow-sm hover:bg-gray-100">
      <span class="flex items-center gap-2">
        <li class="i-carbon-checkmark w-5 h-5" />
        <span>Completed</span>
      </span>

      <span class="text-xs "> 10 </span>
    </div>

    <div class="flex justify-between items-center px-4 py-3  rounded-lg hover: cursor-pointer hover:shadow-sm hover:bg-gray-100">
      <span class="flex items-center gap-2">
        <li class="i-carbon-add w-5 h-5" />
        <span>Create New List</span>
      </span>

      <span class="text-xs "> 10 </span>
    </div>
  </div>
</template>

<style scoped>

</style>
