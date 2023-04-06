<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'
import { tuple } from '../types'

const props = withDefaults(defineProps<{
  visible: boolean
  closable?: boolean
  width?: number | string
}>(

), {
  visible: false,
  closable: false,
  width: 420,
})
const emits = defineEmits<
  {
    (e: 'close', event: boolean): void
    (e: 'update:visible', visible: boolean): void
  }
>()

const slotTupleNames = tuple('header', 'footer')
type slotNames = 'header' | 'footer'

const slots = useSlots()
const maskRef = ref<HTMLDivElement | null>(null)
const drawerRef = ref<HTMLDivElement | null>(null)
function closeDrawer(e) {
  emits('update:visible', false)
  emits('close', false)
}

onClickOutside(drawerRef, (event: Event) => closeDrawer(event),
)

const localVisible = ref(props.visible)

function updateLocalValue() {
  localVisible.value = false
}

const isSlotUsed = (slotName: slotNames) => {
  return !!slots[slotName]
}

watch(() => props.visible, (newValue) => {
  // document.body.style.
})
</script>

<template>
  <div class="drawer" :class="[props.visible ? 'beta-drawer-true' : '']">
    <div ref="maskRef" class="beta-drawer-mask" />
    <div ref="drawerRef" class="beta-drawer" :style="props.width ? `width: ${props.width}px` : ''"
      :class="[props.visible ? 'beta-drawer-opened' : '']">
      <div class="beta-drawer-content-wrapper">
        <div class="beta-drawer-content">
          <div class="beta-drawer-wrapper-body">
            <div v-if="isSlotUsed('header')" class="beta-drawer-header">
              <slot name="header" />
              <span v-if="props.closable"
                class="i-carbon:close close-drawer cursor-pointer inline-block w-6 h-6 text-black fill-current"
                @click="closeDrawer" />
            </div>
            <div class="beta-drawer-body">
              <slot />
            </div>

            <div v-if="isSlotUsed('footer')" class="beta-drawer-footer">
              <slot name="footer" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.beta-drawer {
  position: absolute;
  top: 0px;
  right: 0px;
  height: 100%;
  max-width: 100%;
  transform: translateX(100%);
  z-index: 100;
  transition: transform .4s cubic-bezier(.23, 1, .32, 1);

  &-opened {
    transform: translateX(0%);
  }

  &-content {

    height: 100%;

    &-wrapper {
      height: 100%;
      width: 100%;
      background-color: #fff;
      box-shadow: -6px 0 16px -8px #00000014, -9px 0 28px #0000000d, -12px 0 48px 16px #00000008;
      ;
    }
  }

  &-mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #00000073;
    transition: opacity .3s linear, height 0s ease .3s;
    pointer-events: none;
    opacity: 0;
  }

  &-wrapper-body {
    display: flex;
    flex-flow: column nowrap;
    height: 100%;
    width: 100%;
  }

  &-header {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 24px;
    color: #000000d9;
    background: #fff;
    // border-bottom: 1px solid #f0f0f0;
    border-radius: 2px 2px 0 0;
  }

  &-body {
    // position: fixed;
    flex-grow: 1;
    padding: 24px;
    overflow: auto;
    font-size: 14px;
    line-height: 1.5715;
    word-wrap: break-word;
  }

  &-footer {
    flex-shrink: 0;
    padding: 10px 16px;
    border-top: 1px solid #f0f0f0;
    // position: fixed;
  }

}

.beta-drawer-true>.beta-drawer-mask {
  opacity: 1;
}

.close-drawer {
  position: absolute;
  right: 22px;
  top: 20px;
}
</style>
