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

const emits = defineEmits(['duplicate'])

const optionLists = ref([
  {
    id: 1,
    slug: 'edit',
    name: 'Edit',
    function: () => {
      console.log('edit')
    },
    icon: EditIcon,
  },
  {
    id: 2,
    slug: 'duplicate',
    name: 'Duplicate',
    function: () => {
      console.log(props.id)
      emits('duplicate', props.id)
    },
    icon: CopyIcon,
  },
  {
    id: 3,
    slug: 'delete',
    name: 'Delete',
    function: () => {
      console.log('delete')
    },
    icon: TrashIcon,
  },
])
</script>

<template>
  <div>
    <div class="relative bg-gray-50 rounded-xl drop-shadow w-full flex items-center justify-between px-2  py-2">
      <div class="left-input flex flex-[1_1_70%]">
        <DCheckBox />
        <textarea :value="props.value" readonly rows="1" placeholder="Write a new task" type="text" name="todo"
          class="px-2 text-black w-full focus:outline-none bg-gray-50" />
      </div>

      <div class="right-input items-center flex justify-end flex-auto ">
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
                    <component :is="shallowRef(option.icon)" class="w-4 h-4 fill-current text-black cursor-pointer"
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
  </div>

  <div v-if="1 < 0">
    <li class="i-beta:edit" />
    <li class="i-beta:copy" />
    <li class="i-beta:trash" />
  </div>
</template>

<style scoped>
textarea {
  resize: none
}
</style>
