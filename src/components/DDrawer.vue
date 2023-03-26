<script setup lang="ts">
const props = withDefaults(defineProps<{
  visible: boolean
  closable: boolean
}>(

), {
  visible: false,
  closable: true,
})

const emits = defineEmits<
  {
    (e: 'close',): void
  }
>()

const localVisible = ref(props.visible)

function closeDrawer() {
  updateLocalValue()
  emits('close')
}

function updateLocalValue() {
  localVisible.value = false
}
</script>

<template>
  <Teleport to="#app">
    <div class="drawer" :class="[props.visible ? 'beta-drawer-true' : '']">
      <div class="beta-drawer-mask" />
      <div class="beta-drawer" :class="[props.visible ? 'beta-drawer-opened' : '']">
        <div class="beta-drawer-content-wrapper">
          <div class="beta-drawer-content">
            <div class="beta-drawer-wrapper-body">
              <p> {{ localVisible }} </p>
              <div class="beta-drawer-header">
                I am the header
              </div>

              <span class="i-carbon:close cursor-pointer inline-block w-4 h-4 text-black fill-current"
                @click="closeDrawer" />

              <div class="beta-drawer-body">
                I am the footer
              </div>
              <div class="beta-drawer-footer">
                I am the footer
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style lang="scss">
// .beta-drawer {
//   position: absolute;
//   top: 0px;
//   right: 0px;
//   width: 500px;
//   height: 100%;
//   max-width: 100%;
//   transform: translateX(100%);

//   &-opened {
//     transform: translateX(0%);
//   }

//   &-content-wrapper {
//     height: 100%;
//     width: 100%;
//     background-color: #fff;
//     box-shadow: -6px 0 16px -8px #00000014, -9px 0 28px #0000000d, -12px 0 48px 16px #00000008;
//     ;
//   }

//   // &-right,
//   // &-left {
//   //   height: 100%;
//   //   top: 0px;

//   //   &.beta-drawer-open {
//   //     // width: 100%;

//   //     // .beta-drawer-content-wrapper {
//   //     //   box-shadow: -6px 0 16px -8px #00000014, -9px 0 28px #0000000d, -12px 0 48px 16px #00000008;
//   //     // }
//   //   }

//   // }

//   // &-right {
//   //   right: 0px;

//   //   // .beta-drawer-content-wrapper {
//   //   //   height: 100%;
//   //   // }

//   //   // &.beta-drawer-open {}

//   //   // .beta-drawer-content-wrapper {}
//   // }

//   &-mask {
//     position: absolute;
//     top: 0;
//     left: 0;
//     width: 100%;
//     height: 100%;
//     background-color: #00000073;
//     transition: opacity .3s linear, height 0s ease .3s;
//     pointer-events: none;
//     opacity: 0;

//     &~.beta-drawer.beta-drawer-opened {
//       opacity: 1;
//     }
//   }

//   // &-content {
//   //   position: relative;
//   //   z-index: 1;
//   //   overflow: auto;
//   //   background-color: #fff;
//   //   border: 0;
//   //   width: 500px;
//   //   height: 100%
//   // }

//   // &.beta-drawer-open {
//   //   .beta-drawer-mask {
//   //     height: 100%;
//   //     opacity: 1;
//   //   }
//   // }
// }

.beta-drawer {
  position: absolute;
  top: 0px;
  right: 0px;
  width: 500px;
  height: 100%;
  max-width: 100%;
  transform: translateX(100%);

  &-opened {
    transform: translateX(0%);
  }

  &-content-wrapper {
    height: 100%;
    width: 100%;
    background-color: #fff;
    box-shadow: -6px 0 16px -8px #00000014, -9px 0 28px #0000000d, -12px 0 48px 16px #00000008;
    ;
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

}

.beta-drawer-true>.beta-drawer-mask {
  opacity: 1;
}
</style>
