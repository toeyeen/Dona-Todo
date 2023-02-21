<script lang="ts" setup>
import Fuse from 'fuse.js'
import { colors, emojis } from '../data/data'
import { cdnUrl } from '../config/cdnUrls'
import type { EmojiStyle } from '../types'
import { formatArray, removeHash } from '../utils/index'

const fuse = new Fuse(emojis, {
  keys: ['names'],
})

// function searchNames(searchTerm, data) {
//   const searchResults = []

//   function searchChildren(children) {
//     for (const child of children) {
//       const isAvailable = child.names.some((value) => {
//         return value.toLowerCase().includes(searchTerm.toLowerCase())
//       })

//       if (isAvailable)
//         searchResults.push(child)

//       if (child.children)
//         searchChildren(child.children)
//     }
//   }

//   for (const item of data) {
//     if (item.children)
//       searchChildren(item.children)
//   }

//   return searchResults
// }

function searchNestedArray(arr, term) {
  const searchedData = arr.reduce((acc, curr) => {
    const isAvailable = curr.names.some((value) => {
      return value.toLowerCase().includes(term.toLowerCase())
    })

    console.log(isAvailable)
    if (isAvailable)
      acc.push(curr)

    return acc
  }, [])

  console.log(searchedData)
  return searchedData
}

const searchInput = ref('')

const searchedResult = computed(() => {
  return searchNestedArray(emojis, searchInput.value)
  return fuse.search(searchInput.value)
})

const selectedColor = ref(removeHash(colors[0].hex))
const typeToShow = ref('colors')
const renderImage = ref(emojis[0].children)

const selectColor = (color: string) => {
  selectedColor.value = removeHash(color)
}
const switchTab = (tab: string) => {
  typeToShow.value = tab
}

function formatEmojiLabel(value: string) {
  return value.split('_').map(key => key.charAt(0).toUpperCase() + key.slice(1)).join(' & ')
}

function emojiURLByUnified(unified: string, emojiStyle: EmojiStyle) {
  return `${cdnUrl(emojiStyle)}${unified}.png`
}

function showEmojiDetails(image: object, settings?: 'reset') {
  // if (settings === 'reset')
  //   return renderImage.value = emojis[0].children

  renderImage.value = image
}
</script>

<template>
  <div class="utils-card">
    <div class="utils-card__headers">
      <div class="utils-card__headers-title">
        <span :class="typeToShow === 'colors' ? 'active' : ''" @click="switchTab('colors')">Colors</span>
        <span :class="typeToShow === 'emojis' ? 'active' : ''" @click="switchTab('emojis')">Emoji</span>
      </div>

      <div class="utils-card__headers-search">
        <div>
          <li class="i-carbon:search w-4 h-4 fill-current text-black" />
          <input v-model="searchInput" type="text" name="" placeholder="Search">
        </div>
      </div>
    </div>

    <div v-if="typeToShow === 'colors'" class="utils-card__colors">
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
            <GhostInput v-model="selectedColor" maxlength="6" placeholder="af0613" class="max-w-[100px] bg-[#eeeef2]" />
          </div>
        </div>
      </div>
    </div>

    <div v-else class="utils-card__emoji">
      <div class="emoji-category">
        <div v-for="category, idx in formatArray(searchedResult) " :key="idx" class="">
          <div class="emoji-category__title" :data-id="category">
            {{ formatEmojiLabel(category.name) }}
          </div>
          <div class=" emoji-category__content">
            <button v-for="emoji, idx2 in category.children" :key="idx2" class="emoji-category__button"
              :data-unified="parseNativeEmoji(emoji.unified)" @mouseover="showEmojiDetails(emoji)"
              @mouseout="showEmojiDetails(emoji, 'reset')">
              <img style="width: 30px;" :src="emojiURLByUnified(emoji.unified, 'apple')" alt="">
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="utils-card__categories">
      <ul>
        <div v-for="item, idx in emojis" :key="idx">
          {{ item.name }}
        </div>
      </ul>
    </div>

    <!-- <div class="utils-card__details">
                                                                                    <img :src="emojiURLByUnified(renderImage.unified, 'apple')" alt="">
                                                                                    <p> {{ renderImage[0].unified ? 'What is on your mind?' : capitalize(renderImage[0].names) }} </p>
                                                                                  </div> -->
  </div>
</template>

<style lang="scss">
.utils-card {
  padding: .5rem;
  cursor: pointer;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  position: relative;
  background-color: #fff;
  opacity: .8;
  width: 350px;
  max-height: 380px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;

  &__headers {
    &-title {
      @apply text-sm mb-4 mt-4;

      &>span {
        border-radius: 6px;
        padding: .4rem .5rem;
      }
    }

    &>.active {
      color: #000;
      @apply bg-[#f8f5f9];
    }

    &-search {

      position: relative;

      & li {
        position: absolute;
        transform: translateY(-50%);
        top: 50%;
        left: 4px;
      }

      & input {
        width: 100%;
        padding-left: 1.5rem;
        background: #e8e8e8;
        border-radius: 6px;
        transition: background .3s;

        &:focus {
          border-color: #80bdff;
          box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
          outline: 0 none;
          background-color: #fff;
          // outline: 3px solid #86A9EF;
          // border-radius: 3px;
        }
      }
    }
  }

  &__emoji {
    margin-top: .5rem;
    overflow-y: scroll;
  }

  &__details {
    display: flex;
    align-items: center;
    column-gap: .65rem;
  }

  &__categories {
    padding: .25rem .5rem;

    &>ul {
      display: grid;
      grid-template-columns: repeat(9, (minmax(0, 1fr)));
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
  height: 20px;
  width: 20px;
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

.emoji-category {
  &__title {
    height: 40px;
    font-weight: 700;
    display: flex;
    align-items: center;
    background-color: #fff;
    opacity: .9;
    backdrop-filter: blur(3px);
    position: sticky;
    top: 0;
    z-index: 999;
  }

  &__button {
    all: unset;
    padding: 5px;

    &:hover {
      background-color: #e9f5fe;
      border-radius: 6px;
    }
  }

  &__content {
    display: grid;
    grid-template-columns: repeat(8, minmax(0, 1fr));
    justify-items: center;
  }
}
</style>
