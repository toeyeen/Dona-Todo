<script setup lang="ts">
const { value } = defineProps<{
  value: string
}>()
</script>

<template>
  <div>
    <div class="bg-gray-50 rounded-xl drop-shadow w-full flex items-center justify-between px-2  py-2">
      <div class="left-input flex flex-[1_1_70%]">
        <DCheckBox />
        <textarea :value="value" readonly rows="1" placeholder="Write a new task" type="text" name="todo"
          class="px-2 text-black w-full focus:outline-none bg-gray-50" />
      </div>

      <div class="right-input items-center flex justify-end flex-auto ">
        <div>
          <SubtleBg>
            <li class="i-ph:dots-three-outline-vertical-thin w-4 h-4" />
          </SubtleBg>
        </div>
        <span class="flex" />
      </div>
    </div>
  </div>
</template>

<style scoped>
textarea {
  resize: none
}
</style>
