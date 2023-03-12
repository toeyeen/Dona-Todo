<script setup lang="ts">
interface SelectProps {
  options: any[]
  defaultValue?: string
  tabindex?: number | string
  maxHeight?: number | string
}

const { options, tabindex, defaultValue } = withDefaults(defineProps<SelectProps>(), {
  defaultValue: null,
  tabindex: 0,
})

const el = ref<HTMLElement>(null)

const isOpen = ref(false)
const trackBy = ref('id')

// const open = ref(false)

const selected = computed(() => {
  return defaultValue || (options.length > 0 ? options[0] : null)
})

const optimizedHeight = computed(() => {
  return 300
})

const betaStyle = computed(() => {
  return {
    'betaselect--active': isOpen.value,
  }
})

onMounted(() => {
  console.log(el.value, 'ele')
})

function toggle() {
  isOpen.value
    ? deactivate()
    : activate()
}

function deactivate() {
  if (!isOpen.value)
    return

  isOpen.value = false
}
function activate() {
  if (isOpen.value)
    return

  isOpen.value = true
}

function valueKeys() {
  if (trackBy)
    return internalValue.map(element => element[trackBy])

  else
    return internalValue
}

function isSelected(option) {
  const opt = trackBy
    ? option[trackBy]
    : option
  return valueKeys.includes(opt)
}
</script>

<template>
  <div class="betaselect" :class="betaStyle">
    <slot name="caret" :toggle="toggle">
      <!-- <div class="betaselect__caret" @click="toggle()" /> -->
      <span class=" betaselect__caret i-carbon:caret-sort-down w-5 h-5 text-black" @click="toggle()" />
    </slot>
    <div class="betaselect__container">
      <span class="betaselect__text">
        Select option
      </span>
    </div>
    <transition name="betaselect">
      <div v-show="isOpen" ref="list" tabindex="-1" class="betaselect__content-wrapper"
        :style="{ maxHeight: `${optimizedHeight}px` }" @mousedown.prevent>
        <ul role="listbox">
          <li v-for="item, idx in options" id="null-${idx}" :key="idx" class="betaselect__element" role="option">
            <span class="betaselect__option">
              {{ item }}
            </span>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<style scoped lang="scss">
.betaselect {
  width: 100%;
  color: black;
  position: relative;
  display: block;
  min-height: 40px;

  &__container {
    min-height: 40px;
    padding: 8px 30px 0 8px;
    border: 1px solid rgb(145, 145, 145);
    border-radius: 8px;
    background-color: #fff;
    display: block;
    font-size: 14px;
  }

  &,
  &__input,
  &__single {
    font-family: inherit;
    font-size: 16px;
  }

  &__single {
    position: relative;
    display: inline-block;
    min-height: 20px;
    line-height: 20px;
    border: none;
    border-radius: 5px;
    background: #fff;
    padding: 0 0 0 5px;
    width: 100%;
    transition: border .1s ease;
    box-sizing: border-box;
    margin-bottom: 8px;
  }

  &__caret {
    position: absolute;
    width: 40px;
    height: 38px;
    right: 1px;
    top: 1px;
    padding: 4px 8px;
    text-align: center;
    transition: transform .2s ease;

    // &::before {
    //   content: "";
    //   position: relative;
    //   right: 0;
    //   top: 65%;
    //   color: #999;
    //   margin-top: 4px;
    //   border-style: solid;
    //   border-width: 5px 5px 0;
    //   border-color: #999 transparent transparent;
    // }
  }

  &-enter-active,
  &-leave-active {
    transition: all 0.15s ease;
  }

  &-enter,
  &-leave-active {
    opacity: 0;
  }

  &--active {
    .betaselect__caret {
      &::before {}

      transform: rotate(180deg);
    }
  }

  &__content-wrapper {
    overflow-y: scroll;
    z-index: 6;
    border-radius: 5px;
    margin-top: 8px;
    background: #fff;
    position: absolute;
    width: 100%;

    &>ul {
      list-style: none;
      min-width: 100%;
    }
  }

  &__element {
    cursor: pointer;
    padding: 10px;

    &:hover {
      background-color: green;
      color: #fff;
    }
  }

  &__option {
    white-space: nowrap;
  }
}
</style>
