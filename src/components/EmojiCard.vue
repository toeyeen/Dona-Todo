<script lang="ts" setup>
import { colors } from '../data/data'

const selectedColor = ref(colors[0].hex)
// const selectedColor = ref(null)

const selectColor = (color: string) => {
  selectedColor.value = color
}
</script>

<template>
  <div class="utils-card">
    <div class="utils-card__headers">
      <span class="active">Colors</span>
      <span>Emoji</span>
    </div>

    <div class=" grid check grid-cols-8">
      <div v-for="item in colors" :key="item.name" class="inline-block color-container" @click="selectColor(item.hex)">
        <span class="color-box" :style="{ background: item.hex }" />
      </div>
    </div>

    <div class="divider my-4 " />

    <div class="mb-3">
      <div class="flex items-center justify-center">
        <div class="text-sm flex-auto ">
          <span>
            Custom Color
          </span>
        </div>

        <div class="inline-flex items-center px-2 bg-[#eeeef2] rounded-md w-[120px]">
          <span class="color-box" :style="{ background: selectedColor }" />
          <!-- <span class="text-sm py-1 px-2 text-gray-400">
                                                          {{ selectedColor }}
                                                        </span> -->
          <GhostInput v-model="selectedColor" maxlength="7" placeholder="af0613" class="max-w-[100px] bg-[#eeeef2]" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.utils-card {
  padding: .5rem 1rem;
  cursor: pointer;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  position: relative;
  background-color: #fff;
  width: 300px;
  max-height: 200px;
  border-radius: 12px;

  &__headers {

    @apply text-sm mb-2 mt-4;

    &>span {
      border-radius: 6px;
      padding: .4rem .5rem;
    }

    &>.active {
      color: #000;
      @apply bg-[#f8f5f9];
    }
  }

}

.color-container {
  display: inline-flex;
  padding: .4rem .4rem;
  border-radius: 8px;
  border: 2px solid transparent;

  &:hover {
    @apply border-gray-300;
  }
}

.color-box {
  display: inline-flex;
  height: 14px;
  width: 14px;
  color: #fff;
  background: #af0613;
  padding: .1rem .25rem;
  border-radius: 6px;
}

.check {
  justify-items: center;
  align-content: center;
}

.custom-input {
  &::placeholder {
    /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: red;
    opacity: 1;
    /* Firefox */
  }
}

.divider {
  @apply border-b border-[#eeeef2];
}
</style>
