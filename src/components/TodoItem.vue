<script setup lang="ts">
import type { Todo } from '../types'
import TrashIcon from '~icons/ph/trash'
import EditIcon from '~icons/ph/pencil-simple'
import CopyIcon from '~icons/ph/copy'
const props = withDefaults(defineProps<{
  todo: Todo
}>(), {
})

const emits = defineEmits(['duplicate', 'delete', 'edit'])

const paraRef = ref<HTMLParagraphElement | null>(null)
const dropdownRef = ref<HTMLDivElement | null>(null)
const ddPosition = ref(null)

const { markTodo } = useState()

const optionLists = ref([
  {
    id: 1,
    slug: 'edit',
    name: 'Edit',
    function: () => {
      emits('edit', props.todo.id)
    },
    icon: EditIcon,
  },
  {
    id: 2,
    slug: 'duplicate',
    name: 'Duplicate',
    function: () => {
      emits('duplicate', props.todo.id)
    },
    icon: CopyIcon,
  },
  {
    id: 3,
    slug: 'delete',
    name: 'Delete',
    function: () => {
      emits('delete', props.todo.id)
    },
    icon: TrashIcon,
  },
])

const onChange = (val) => {
  if (props.todo.status !== 'completed')
    paraRef.value.classList.add('strike')

  setTimeout(() => {
    markTodo(props.todo)
  }, 1000)
}

const paraStrike = computed(() => {
  return {
    'strike-through': true,
  }
})

const isCompleted = computed(() => {
  if (props.todo.status === 'completed')
    return true
  else
    return false
})

onMounted(() => {
  const {
    isAbove,
  } = useAdjustPosition(dropdownRef, {
    maxHeight: 40,
  })

  ddPosition.value = isAbove
})

// function isCompleted2 = () => {

// }
</script>

<template>
  <div>
    <div class="relative bg-gray-50 rounded-xl drop-shadow w-full flex items-center justify-between px-2  py-2">
      <div class="left-input flex items-center flex-[1_1_70%]">
        <DCheckBox :id="props.todo.id" v-model:model-value="isCompleted" class="Jolaoao" @on-change="onChange" />
        <p ref="paraRef">
          {{ props.todo.title }}
        </p>
      </div>

      <div id="teleport" class=" right-input items-center flex justify-end flex-auto ">
        <button v-if="props.todo.category[0].color.unified" class=" emoji-category__button panel mr-2"
          :data-unified="parseNativeEmoji(props.todo.category[0].color.unified)">
          <img style="width: 24px;" :src="emojiURLByUnified(props.todo.category[0].color.unified, 'apple')" alt=""
            loading="lazy">
        </button>

        <span v-if="props.todo.category[0].color.hex" class="i-custom:logo fill-current text-[#008FFD] mr-2"
          :style="{ color: props.todo.category[0].color.hex }" />
        <div>
          <DDropDown ref="dropdownRef" triggers="click">
            <template #overlay>
              <!--  :class="[ddPosition ? 'betaselect--above' : null]" -->
              <div ref="list" tabindex="-1" class="betaselect__content-wrapper" style=" width: 140px;">
                <ul role="listbox">
                  <li v-for="option, idx in optionLists" :id="`null-${idx}`" :key="idx" class="betaselect__element right"
                    role="option" @click="option.function()">
                    <span class=" betaselect__option">
                      {{ option.name }}
                    </span>

                    <component :is="option.icon" :key="idx" class="w-4 h-4 fill-current text-black cursor-pointer"
                      aria-hidden="true" />
                  </li>
                </ul>
              </div>
            </template>
            <template #activator="{ toggle }">
              <SubtleBg @click="toggle">
                <li class="i-ph:dots-three-outline-vertical-thin w-4 h-4" />
              </SubtleBg>
            </template>
          </DDropDown>
        </div>
        <span class="flex" />
      </div>
    </div>

    <div v-if="1 < 0">
      <li class="i-beta:edit" />
      <li class="i-beta:copy" />
      <li class="i-beta:trash" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
textarea {
  resize: none
}

.ant-dropdown {
  position: absolute;
  left: -9999px;
  top: -9999px;
  z-index: 1070;
  display: block;
  font-size: 12px;
  font-weight: normal;
  line-height: 1.5;
  padding-top: 4px;

  &-wrap {
    position: relative;
  }

  &-hidden {
    display: none;
  }

  &-menu {
    outline: none;
    position: relative;
    list-style-type: none;
    padding: 0;
    margin: 0;
    text-align: left;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #d9d9d9;
    overflow: hidden;

    >li {
      margin: 0;
      padding: 0;
    }

    &>&-item {
      padding: 7px 16px;
      clear: both;
      font-size: 12px;
      font-weight: normal;
      color: #666;
      white-space: nowrap;
      cursor: pointer;
      transition: background 0.3s ease;

      >a {
        color: #666;
        display: block;
        padding: 7px 16px;
        margin: -7px -16px;
      }

      &-disabled {
        color: #ccc;
        cursor: not-allowed;
        pointer-events: none;

        &:hover {
          color: #ccc;
          background-color: #fff;
          cursor: not-allowed;
        }
      }

      &:last-child {
        border-bottom-left-radius: 3px;
        border-bottom-right-radius: 3px;
      }

      &:first-child {
        border-top-left-radius: 3px;
        border-top-right-radius: 3px;
      }

      &-divider {
        height: 1px;
        overflow: hidden;
        background-color: #e5e5e5;
        line-height: 0;
      }
    }
  }
}

.strike-through {
  position: relative;
  display: inline-block;
  // transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

.strike-through::after {
  content: '';
  position: absolute;
  display: block;
  width: 100%;
  height: 2px;
  box-shadow: 0 1px rgba(255, 255, 255, 0.6);
  top: 50%;
  background: black;
  transform-origin: center left;
  animation: strikethrough 1s 0.5s cubic-bezier(.55, 0, .1, 1) 1;
  transition: transform 0.5s cubic-bezier(.55, 0, .1, 1);
}

@keyframes strikethrough {
  from {
    transform: scaleX(0);
  }

  to {
    transform: scaleX(1);
  }
}

.strike-through:hover {
  color: rgba(200, 0, 0, 1);
  background: rgba(255, 189, 182, 0.3);
}

.strike-through:hover:after {
  transform: scaleX(0);
  transform-origin: center right;
}

@keyframes strike {
  0% {
    width: 0;
  }

  100% {
    width: 100%;
  }
}

.strike {
  position: relative;
}

.strike::after {
  content: ' ';
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 1px;
  background: black;
  animation-name: strike;
  animation-duration: .7s;
  animation-timing-function: linear;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
}
</style>
