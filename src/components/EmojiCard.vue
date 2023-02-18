<script lang="ts" setup>
import { colors, emojis } from '../data/data'
import { parseNativeEmoji } from '../utils'
import { cdnUrl } from '../config/cdnUrls'
import type { EmojiStyle } from '../types'

const selectedColor = ref(removeHash(colors[0].hex))
const typeToShow = ref('colors')

const selectColor = (color: string) => {
  selectedColor.value = removeHash(color)
}
const switchTab = (tab: string) => {
  typeToShow.value = tab
}

function removeHash(value: string) {
  return value.split('#')[1]
}

function formatEmojiLabel(value: string) {
  return value.split('_').map(key => key.charAt(0).toUpperCase() + key.slice(1)).join(' & ')
}

function emojiURLByUnified(unified: string, emojiStyle: EmojiStyle) {
  return `${cdnUrl(emojiStyle)}${unified}.png`
}
</script>

<template>
  <div class="utils-card">
    <div class="utils-card__headers">
      <span :class="typeToShow == 'colors' ? 'active' : ''" @click="switchTab('colors')">Colors</span>
      <span :class="typeToShow == 'emojis' ? 'active' : ''" @click="switchTab('emojis')">Emoji</span>
    </div>

    <div v-if="typeToShow === 'colors'" class="colors">
      <div class=" grid check grid-cols-8">
        <div v-for="item in colors" :key="item.name" class="inline-block color-container"
          :class="removeHash(item.hex) === selectedColor ? 'active' : ''" @click="selectColor(item.hex)">
          <span class="color-box" :style="{ background: `${item.hex}` }" />
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
            <span class="color-box" :style="{ background: `#${selectedColor}` }" />
            <!-- <span class="text-sm py-1 px-2 text-gray-400">
                                                                                                                                                                                                    {{ selectedColor }}
                                                                                                                                                                                                  </span> -->
            <GhostInput v-model="selectedColor" maxlength="6" placeholder="af0613" class="max-w-[100px] bg-[#eeeef2]" />
          </div>
        </div>
      </div>
    </div>

    <div v-else class="emojis">
      <div>
        <input id="" type="text" name="" placeholder="Search">
      </div>

      <div class="emoji_category">
        <div v-for="key, value, idx in emojis " :key="idx" class="">
          <div>
            {{ formatEmojiLabel(value) }}
          </div>
          <span class="grid grid-cols-8">
            <span v-for="key1, value2, idx2 in key" :key="idx2" :data-unified="parseNativeEmoji(key1.u)">
              <img :src="emojiURLByUnified(key1.u, 'apple')" alt="">
            </span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.utils-card {
  padding: .5rem 1rem;
  cursor: pointer;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  position: relative;
  background-color: #fff;
  opacity: .8;
  width: 300px;
  max-height: 300px;
  border-radius: 12px;
  overflow-y: scroll;

  &__headers {

    @apply text-sm mb-4 mt-4;

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

  &:hover,
  &.active {
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
