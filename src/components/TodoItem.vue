<script setup lang="ts">
import TrashIcon from '~icons/ph/trash'
import EditIcon from '~icons/ph/pencil-simple'
import CopyIcon from '~icons/ph/copy'
const props = withDefaults(defineProps<{
  value: string
  id: string
  completed?: boolean
}>(), {
  completed: false,
})

const emits = defineEmits(['duplicate', 'delete', 'edit'])
const initDone = ref(false)
const optionLists = ref([
  {
    id: 1,
    slug: 'edit',
    name: 'Edit',
    function: () => {
      emits('edit', props.id)
    },
    icon: EditIcon,
  },
  {
    id: 2,
    slug: 'duplicate',
    name: 'Duplicate',
    function: () => {
      emits('duplicate', props.id)
    },
    icon: CopyIcon,
  },
  {
    id: 3,
    slug: 'delete',
    name: 'Delete',
    function: () => {
      emits('delete', props.id)
    },
    icon: TrashIcon,
  },
])

function clicker() {
  initDone.value = !initDone.value
}
</script>

<template>
  <div>
    <div class="relative bg-gray-50 rounded-xl drop-shadow w-full flex items-center justify-between px-2  py-2">
      <button @click="clicker">
        Toggle
      </button>
      <div class="left-input flex items-center flex-[1_1_70%]">
        <DCheckBox />
        <textarea :value="props.value" readonly rows="1" placeholder="Write a new task" type="text" name="todo"
          class="px-2 text-black w-full focus:outline-none bg-gray-50" />
      </div>

      <div id="teleport" class=" right-input items-center flex justify-end flex-auto ">
        <div>
          <DDropDown triggers="click">
            <template #overlay>
              <div ref="list" tabindex="-1" class="betaselect__content-wrapper" style="width: 140px;">
                <ul role="listbox">
                  <li v-for="option, idx in optionLists" :id="`null-${idx}`" :key="idx" class="betaselect__element"
                    role="option" @click="option.function()">
                    <span :class="[props.completed ? 'line-through' : '']" class=" betaselect__option">
                      {{ option.name }}
                    </span>
                    <component :is="shallowRef(option.icon)" :key="idx"
                      class="w-4 h-4 fill-current text-black cursor-pointer" aria-hidden="true" />
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
  </div>

  <div v-if="1 < 0">
    <li class="i-beta:edit" />
    <li class="i-beta:copy" />
    <li class="i-beta:trash" />
  </div>

  <DDrawer :visible="initDone" />
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
</style>
