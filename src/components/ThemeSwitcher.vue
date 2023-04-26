<script setup lang="ts">
import type { BasicColorSchema } from '@vueuse/core'
import { useColorMode } from '@vueuse/core'
import LightIcon from '~icons/ph/sun-light'
import DarkIcon from '~icons/ph/moon'
import BlackIcon from '~icons/ph/star'

const colorInStorage = localStorage.getItem('vueuse-color-scheme')

const isActive = ref(colorInStorage)

const mode = useColorMode({
  attribute: 'theme',
  modes: {
    // custom colors
    black: 'black',
  },
})

const optionLists = shallowRef([
  {
    id: 1,
    slug: 'light',
    name: 'Light',
    function: () => {
    },
    icon: LightIcon,
    isActive: true,
  },
  {
    id: 2,
    slug: 'dark',
    name: 'Dark',
    function: () => {
    },
    icon: DarkIcon,
    isActive: false,

  },
  {
    id: 3,
    slug: 'black',
    name: 'Black',
    function: () => {
    },
    icon: BlackIcon,
    isActive: false,

  },
])

function setTheme(theme: BasicColorSchema | 'black') {
  isActive.value = theme
  mode.value = theme
}
</script>

<template>
  <!--         :style="[isActive === item.slug ? `transform: translateX(${(item.id - 1) * 100}%)` : '']"
 -->
  <div>
    <label for="">Theme</label>
    <ul class="grid grid-cols-3 border py-1 bg-primary">
      <li v-for=" item in optionLists" :key="item.id" class="cursor-pointer rounded-md"
        :class="[isActive === item.slug ? 'is-active bg-cardHover' : '']" @click="setTheme(item.slug)">
        <span class="rounded-md flex justify-center items-center gap-x-1">
          <component :is="item.icon" />
          <span>
            {{ item.name }}
          </span>
        </span>
      </li>
    </ul>
  </div>
</template>

<style lang="scss">
.is-active {}

html.dark {
  filter: sepia(0.9) hue-rotate(315deg) brightness(0.9);
}

html.black {
  filter: contrast(2);
}

input[id="radio-3"] {
  &:checked {
    &~.glider {
      transform: translateX(200%);
    }
  }
}

.glider {
  position: absolute;
  display: flex;
  // height: 54px;
  // width: 200px;
  background-color: red;
  z-index: 1;
  border-radius: 99px; // just a high number to create pill effect
  transition: 0.25s ease-out;
}

@media (max-width: 700px) {
  .tabs {
    transform: scale(0.6);
  }
}
</style>
