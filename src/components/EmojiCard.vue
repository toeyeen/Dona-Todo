<script lang="ts" setup>
import { colors, emojis } from '../data/data'
import type { EmojiStyle } from '../types'
import { formatArray, removeHash } from '../utils/index'

const { setCategorySymbol } = useState()

function searchNestedArray(arr, term) {
  const searchedData = arr.reduce((acc, curr) => {
    const isAvailable = curr.names.some((value) => {
      return value.toLowerCase().includes(term.toLowerCase())
    })

    if (isAvailable)
      acc.push(curr)

    return acc
  }, [])

  return searchedData
}

const searchInput = ref('')
const selectedType = ref('')

const searchedResult = computed(() => {
  return searchNestedArray(emojis, searchInput.value)
})

const selectedColor = ref(removeHash(colors[0].hex))
const typeToShow = ref('colors')
const renderImage = ref(emojis[0])

const selectColor = (color: string) => {
  selectedColor.value = removeHash(color)
  selectedType.value = selectedColor.value
  setCategorySymbol({ hex: color })
}
const selectEmoji = (emoji: EmojiStyle) => {
  selectedType.value = emoji
  setCategorySymbol(emoji)
}
const switchTab = (tab: string) => {
  typeToShow.value = tab
}

function formatEmojiLabel(value: string) {
  return value.split('_').map(key => key.charAt(0).toUpperCase() + key.slice(1)).join(' & ')
}

function showEmojiDetails(image: object, settings?: 'reset') {
  // if (settings === 'reset')
  //   return renderImage.value = emojis[0].children
  // renderImage.value = image
}

function clearSearchInput() {
  searchInput.value = ''
}

onMounted(() => {
  if (typeToShow.value === 'colors')
    selectedType.value = selectedColor.value
})
</script>

<template>
  <div class="utils-card" :style="[searchedResult.length < 1 ? 'height: 380px' : '']">
    <div class="utils-card__headers">
      <div class="utils-card__headers-title">
        <span :class="typeToShow === 'colors' ? 'active' : ''" @click="switchTab('colors')">Colors</span>
        <span :class="typeToShow === 'emojis' ? 'active' : ''" @click="switchTab('emojis')">Emoji</span>
      </div>

      <div class="utils-card__headers-search">
        <div v-if="typeToShow === 'emojis'">
          <li class="i-carbon:search w-4 h-4 fill-current text-black" />
          <input v-model="searchInput" type="text" name="" placeholder="Search">
          <li v-if="searchInput.length > 0" class="i-carbon:close" @click="clearSearchInput" />
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
              @mouseout="showEmojiDetails(emoji, 'reset')" @click="selectEmoji(emoji)">
              <img style="width: 30px;" :src="emojiURLByUnified(emoji.unified, 'apple')" alt="" loading="lazy">
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="utils-card__categories">
      <!-- <pre>
                                                        {{ selectedType }}
                                                </pre> -->

      <ul>
        <div v-for="item, idx in emojis" :key="idx" class="here">
          {{ item.name }}
        </div>
      </ul>

      <div v-if="searchedResult.length === 0" class="empty">
        Empty State
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.utils-card {
  padding: .5rem;
  cursor: pointer;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  background-color: #fff;
  opacity: .8;
  width: 350px;
  max-height: 380px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  position: absolute;

  &__headers {
    &-title {
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

    &-search {

      position: relative;

      & li {
        position: absolute;
        transform: translateY(-50%);
        top: 50%;

        &:first-child {
          left: 4px;
        }

        &:last-child {
          right: 4px;
        }
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
    height: 100%;

    &>ul {
      display: grid;
      grid-template-columns: repeat(9, (minmax(0, 1fr)));
    }

    & .empty {
      display: flex;
      align-items: center;
      justify-items: center;
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
    z-index: 9;
  }

  &__button {
    all: unset;
    padding: 5px;

    &:hover {
      background-color: #e9f5fe;
      border-radius: 6px;
    }

    &.panel {
      padding: 0;
    }
  }

  &__content {
    display: grid;
    grid-template-columns: repeat(8, minmax(0, 1fr));
    justify-items: center;
  }
}
</style>
