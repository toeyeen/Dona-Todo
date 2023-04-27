<script setup lang="ts">
const props = defineProps({
  placeholder: String,
  disabled: Boolean,
  modelValue: {
    type: [String, Number],
    default: '',
  },
  type: {
    type: String,
    default: 'text',
  },
  addonBefore: String,
  addonAfter: String,
  autoFocus: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String,
    default: 'normal',
  },
})

const emit = defineEmits(['update:model-value', 'focus', 'blur'])
const focused = ref(false)

const updateValue = (e: Event) => {
  const target = e.target as HTMLInputElement
  emit('update:model-value', target.value)
}

function onFocus(e) {
  const target = e.target as HTMLInputElement
  focused.value = true
  emit('focus', target)
}
function onBlur() {
  focused.value = false
  emit('blur')
}

onMounted(() => {
  focused.value = props.autoFocus
})
</script>

<template>
  <input type="text" class="ghost" :placeholder="placeholder
    " :value="modelValue" v-bind="{
      ...$attrs,
      onInput: updateValue,
      onFocus,
      onBlur,
    }">
</template>

<style lang="scss" scoped>
.ghost {
  display: inline-flex;
  width: 100%;
  min-width: 0px;
  outline: none;
  font-variant: tabular-nums;
  list-style: none;
  font-feature-settings: "tnum";
  position: relative;
  display: inline-block;
  width: 100%;
  min-width: 0px;
  padding: 4px 11px;
  color: #000000d9;
  font-size: 14px;
  line-height: 1.5715;
  background-image: none;
  border-radius: 2px;
  transition: all .3s;
  // background-color: red;

  @apply bg-input;

  &:focus,
  &:active {
    outline: none;
  }

  &:hover {
    @apply bg-inputEmpty;
  }

}
</style>
