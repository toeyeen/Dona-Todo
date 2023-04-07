<script setup lang="ts">
import { watch } from 'vue'

import type { Direction, SelectOption } from '../types'

interface SelectProps<T> {
  options: SelectOption<T>[]
  modelValue: SelectOption<T>
  defaultValue?: string | number | []
  tabindex?: number | string
  maxHeight?: number | string
  closeOnSelect?: boolean
  placeholder?: string
  customLabel?: (a, b) => string
  label?: string
  trackBy?: string
  disabled?: boolean
  searchable?: boolean
  dropdownStyle?: object
  openDirection?: Direction
}

const { options, tabindex, defaultValue, closeOnSelect, placeholder, customLabel, label, trackBy, searchable, modelValue, dropdownStyle, maxHeight, openDirection } = withDefaults(defineProps<SelectProps<SelectOption>>(), {
  defaultValue: null,
  tabindex: 0,
  closeOnSelect: true,
  placeholder: 'Select an option',
  customLabel: (option, label) => {
    if (isEmpty(option))
      return ''
    return label ? option[label] : option
  },
  disabled: false,
  searchable: true,
  trackBy: 'id',
  modelValue: null,

})

const emit = defineEmits(['update:model-value', 'select', 'input'])

const root = ref<HTMLElement>(null)
const search = ref<HTMLElement>(null)

const isOpen = ref(false)
const selectedValue = ref([])
const searchValue = ref('')
const preferredOpenDirection = ref<Direction>('below')
const optimizedHeight = ref(maxHeight)

// const open = ref(false)

/** computed */

const internalValue = computed(() => {
  return (selectedValue.value || selectedValue.value.length === 0)
    ? Array.isArray(selectedValue.value) ? selectedValue.value : [selectedValue.value]
    : []
})

const selected = computed(() => {
  return !isEmpty(internalValue.value)
    ? getOptionLabel(internalValue.value[0])
    : placeholder
})

// const optimizedHeight = computed(() => {
//   return 300
// })

const isAbove = computed(() => {
  if (openDirection === 'above' || openDirection === 'top')
    return true

  else if (
    openDirection === 'below'
    || openDirection === 'bottom'
  )
    return false

  else
    return preferredOpenDirection.value === 'above'
})

const betaStyle = computed(() => {
  return {
    'betaselect--active': isOpen.value,
  }
})

const valueKeys = computed(() => {
  if (trackBy)
    return internalValue.value.map(element => element[trackBy])
  else
    return internalValue.value
})

const currentOptionLabel = computed(() => {
  return !isEmpty(selectedValue.value)
    ? getOptionLabel(selectedValue.value[0])
    : placeholder
})

const singleValue = computed(() => {
  return internalValue.value[0]
})

const isPlaceholderVisible = computed(() => {
  return !internalValue.value.length && (!searchable || !isOpen.value)
})

const inputStyle = computed(() => {
  if (searchable) {
    // Hide input by setting the width to 0 allowing it to receive focus
    const style = isOpen.value
      ? { width: '100%' }
      : { width: '0', padding: 0 }

    return objectToStyle(style)
  }

  return ''
})

const filteredOptions = computed(() => {
  const search = searchValue.value || ''
  const normalizedSearch = search.toLowerCase().trim()

  const newOptions = options

  return filterOptions(newOptions, normalizedSearch, label, getLabel)
})

/** Watcher **/

watch(internalValue, (newValue) => {
  console.log(newValue, 'watcher')
})

/** Methods  */

function toggle() {
  isOpen.value
    ? deactivate()
    : activate()
}

function deactivate() {
  if (!isOpen.value)
    return

  if (searchable && closeOnSelect) {
    searchValue.value = ''
    isOpen.value = false
  }
}
function activate() {
  adjustPosition()
  if (searchable)
    search.value.focus()

  if (isOpen.value)
    return

  isOpen.value = true
}

function isSelected(option, type = 'string') {
  const opt = trackBy
    ? option[trackBy]
    : option

  if (type === 'string')

    return valueKeys.value.includes(opt)

  if (type === 'object')
    return option
}

const updateValue = (e: Event) => {
  const target = e.target as HTMLInputElement

  searchValue.value = target.value
  emit('update:model-value', target.value)
}

const select = (option, key?) => {
  if (option.$isDisabled)
    return
  const selected = isSelected(option)

  if (!selected) {
    internalValue.value.pop()
    internalValue.value.push(option)
  }

  if (closeOnSelect)
    deactivate()

  if (searchable)
    search.value.blur()

  emit('select', option)
  emit('update:model-value', option)
}

const isSingleLabelVisible = computed(() => {
  return (!isOpen.value || !searchable)
})

function getOptionLabel(option) {
  if (isEmpty(option))
    return ''

  const internalLabel = customLabel(option, label)

  if (isEmpty(internalLabel))
    return ''
  return internalLabel
}

function isOptionDisabled(option) {
  return !!option.$isDisabled
}

function addSelectStyle(index: number, option: string) {
  return {
    // 'betaselect__option--highlight': index === this.pointer && this.showPointer,
    // 'betaselect__element--selected': this.isSelected(option),
    'i-carbon:checkmark-filled text-green-500': this.isSelected(option),
    // 'betaselect--element--disabled': option.$isDisabled,
  }
}

function adjustPosition() {
  if (typeof window == 'undefined')
    return

  const spaceAbove = root.value.getBoundingClientRect().top
  const spaceBelow = window.innerHeight - root.value.getBoundingClientRect().bottom

  const hasEnoughSpaceBelow = spaceBelow > +maxHeight

  if (hasEnoughSpaceBelow || spaceBelow > spaceAbove || openDirection === 'below' || openDirection === 'bottom') {
    preferredOpenDirection.value = 'below'
    optimizedHeight.value = Math.min(spaceBelow - 40, +maxHeight)
  }
  else {
    preferredOpenDirection.value = 'above'
    optimizedHeight.value = Math.min(spaceAbove - 40, +maxHeight)
  }
}
/** Mounted */

onMounted(() => {
  internalValue.value.push(modelValue)
})
</script>

<template>
  <div ref="root" class="betaselect" :class="betaStyle">
    <slot name="icon" :toggle="toggle">
      <!-- <div class="betaselect__caret" @click="toggle()" /> -->
      <span class=" betaselect__caret i-carbon:caret-sort-down w-5 h-5 text-black" @click="toggle()" />
    </slot>
    <div class="betaselect__container" @click="toggle()">
      <slot v-if="isSingleLabelVisible" name="singleLabel" :option="singleValue">
        <span class="betaselect__text">
          {{ currentOptionLabel }}
        </span>
      </slot>
    </div>
    <input v-if="searchable" ref="search" :value="searchValue" :style="inputStyle" :placeholder="placeholder"
      class="betaselect__input" autocomplete="off" :spellcheck="false" type="text" @input="updateValue" @focus="activate"
      @blur="deactivate" @keyup.esc="deactivate">

    <transition name="betaselect">
      <div v-show="isOpen" ref="list" class="betaselect__content-wrapper" :class="{ 'betaselect--above': isAbove }"
        :style="objectToStyle({ ...dropdownStyle, minHeight: `${maxHeight}px` })" @mousedown.prevent>
        <ul>
          <li v-for="option, idx in filteredOptions" :id="`null-${idx}`" :key="idx" class="betaselect__element"
            @click.stop="select(option)">
            <span class="betaselect__option">
              {{ getOptionLabel(option) }}
            </span>

            <i :class="addSelectStyle(idx, option)" class=" h-4 w-4 fill-current" />
          </li>

          <div v-if="filteredOptions.length === 0" class="betaselect__element--empty">
            <div class="i-ph:ghost-thin text-3xl" />
            <div>No Item</div>
          </div>
        </ul>
      </div>
    </transition>
  </div>
</template>

<style  lang="scss">
.betaselect {
  width: 100%;
  color: black;
  position: relative;
  display: block;
  min-height: 32px;

  &__container {
    min-height: 32px;
    padding: 6px 30px 0 8px;
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
    height: 100%;
    // width: 40px;
    // height: 38px;
    right: 4px;
    // top: 1px;
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
    transition: all 0.3s ease;
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
    z-index: 10;
    border-radius: 5px;
    margin-top: 4px;
    background: #fff;
    position: absolute;
    width: 100%;
    right: 0;
    box-shadow: 0 3px 6px -4px #0000001f, 0 6px 16px #00000014, 0 9px 28px 8px #0000000d;
    color: #000000d9;
    font-variant: tabular-nums;
    line-height: 1.5715;
    list-style: none;
    font-feature-settings: "tnum";
    outline: none;

    &.betaselect--above {
      bottom: 110% !important;
    }

    // margin: 0;
    // color: #000000d9;
    // font-variant: tabular-nums;
    // line-height: 1.5715;
    // list-style: none;
    // font-feature-settings: "tnum";
    // position: absolute;
    // z-index: 1050;
    // box-sizing: border-box;
    // padding: 4px 0;
    // overflow: hidden;
    // font-size: 14px;
    // font-variant: initial;
    // background-color: #fff;
    // border-radius: 2px;
    // outline: none;
    // box-shadow: 0 3px 6px -4px #0000001f, 0 6px 16px #00000014, 0 9px 28px 8px #0000000d;

    &>ul {
      list-style: none;
      min-width: 100%;
    }
  }

  &__element {
    cursor: pointer;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &:hover {
      background-color: green;
      color: #fff;
    }

    &--selected {
      background-color: red;
      color: #fff;
    }

    &--empty {
      height: 100px;
      padding: 16px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-size: 13px;
      color: #42424266;
    }

    &--disabled {}
  }

  &__option {
    white-space: nowrap;
  }

  &__input {
    position: absolute;
    top: 0;
    height: 100%;
    background-color: transparent;
    border-radius: 5px;
    outline: none;
    padding: 0px 30px 0 8px;
    font-size: 14px;

    &:focus {
      outline: none;
    }
  }

  &__placeholder {
    color: #adadad;
    display: inline-block;
    margin-bottom: 10px;
    padding-top: 2px;
  }
}

.betaselect--active .betaselect__placeholder {
  display: none;
}
</style>
