// Generated by 'unplugin-auto-import'
export {}
declare global {
  const $$: typeof import('vue/macros')['$$']
  const $: typeof import('vue/macros')['$']
  const $computed: typeof import('vue/macros')['$computed']
  const $customRef: typeof import('vue/macros')['$customRef']
  const $ref: typeof import('vue/macros')['$ref']
  const $shallowRef: typeof import('vue/macros')['$shallowRef']
  const $toRef: typeof import('vue/macros')['$toRef']
  const EffectScope: typeof import('vue')['EffectScope']
  const capitalize: typeof import('./src/utils/index')['capitalize']
  const computed: typeof import('vue')['computed']
  const createApp: typeof import('vue')['createApp']
  const customRef: typeof import('vue')['customRef']
  const defaultcategory: typeof import('./src/composables/useState')['defaultcategory']
  const defineAsyncComponent: typeof import('vue')['defineAsyncComponent']
  const defineComponent: typeof import('vue')['defineComponent']
  const effectScope: typeof import('vue')['effectScope']
  const emojiURLByUnified: typeof import('./src/utils/index')['emojiURLByUnified']
  const filterOptions: typeof import('./src/utils/index')['filterOptions']
  const formatArray: typeof import('./src/utils/index')['formatArray']
  const formatInputDate: typeof import('./src/utils/index')['formatInputDate']
  const getCurrentInstance: typeof import('vue')['getCurrentInstance']
  const getCurrentScope: typeof import('vue')['getCurrentScope']
  const getLabel: typeof import('./src/utils/index')['getLabel']
  const getPlatform: typeof import('./src/utils/index')['getPlatform']
  const h: typeof import('vue')['h']
  const hyphen: typeof import('./src/utils/index')['hyphen']
  const inject: typeof import('vue')['inject']
  const isEmpty: typeof import('./src/utils/index')['isEmpty']
  const isProxy: typeof import('vue')['isProxy']
  const isReactive: typeof import('vue')['isReactive']
  const isReadonly: typeof import('vue')['isReadonly']
  const isRef: typeof import('vue')['isRef']
  const markRaw: typeof import('vue')['markRaw']
  const nextTick: typeof import('vue')['nextTick']
  const objectToStyle: typeof import('./src/utils/index')['objectToStyle']
  const onActivated: typeof import('vue')['onActivated']
  const onBeforeMount: typeof import('vue')['onBeforeMount']
  const onBeforeUnmount: typeof import('vue')['onBeforeUnmount']
  const onBeforeUpdate: typeof import('vue')['onBeforeUpdate']
  const onDeactivated: typeof import('vue')['onDeactivated']
  const onErrorCaptured: typeof import('vue')['onErrorCaptured']
  const onMounted: typeof import('vue')['onMounted']
  const onRenderTracked: typeof import('vue')['onRenderTracked']
  const onRenderTriggered: typeof import('vue')['onRenderTriggered']
  const onScopeDispose: typeof import('vue')['onScopeDispose']
  const onServerPrefetch: typeof import('vue')['onServerPrefetch']
  const onUnmounted: typeof import('vue')['onUnmounted']
  const onUpdated: typeof import('vue')['onUpdated']
  const parseNativeEmoji: typeof import('./src/utils/index')['parseNativeEmoji']
  const provide: typeof import('vue')['provide']
  const reactive: typeof import('vue')['reactive']
  const readonly: typeof import('vue')['readonly']
  const ref: typeof import('vue')['ref']
  const removeDuplicates: typeof import('./src/utils/index')['removeDuplicates']
  const removeHash: typeof import('./src/utils/index')['removeHash']
  const resolveComponent: typeof import('vue')['resolveComponent']
  const resolveDirective: typeof import('vue')['resolveDirective']
  const shallowReactive: typeof import('vue')['shallowReactive']
  const shallowReadonly: typeof import('vue')['shallowReadonly']
  const shallowRef: typeof import('vue')['shallowRef']
  const timeOfTheDay: typeof import('./src/utils/index')['timeOfTheDay']
  const toRaw: typeof import('vue')['toRaw']
  const toRef: typeof import('vue')['toRef']
  const toRefs: typeof import('vue')['toRefs']
  const todaysDate: typeof import('./src/utils/index')['todaysDate']
  const triggerRef: typeof import('vue')['triggerRef']
  const unref: typeof import('vue')['unref']
  const useAdjustPosition: typeof import('./src/composables/useAdjustPosition')['useAdjustPosition']
  const useAttrs: typeof import('vue')['useAttrs']
  const useColors: typeof import('./src/composables/useColors')['useColors']
  const useCssModule: typeof import('vue')['useCssModule']
  const useCssVars: typeof import('vue')['useCssVars']
  const useSelector: typeof import('./src/composables/useSelector')['useSelector']
  const useSlots: typeof import('vue')['useSlots']
  const useState: typeof import('./src/composables/useState')['useState']
  const validHex: typeof import('./src/utils/index')['validHex']
  const watch: typeof import('vue')['watch']
  const watchEffect: typeof import('vue')['watchEffect']
  const watchPostEffect: typeof import('vue')['watchPostEffect']
  const watchSyncEffect: typeof import('vue')['watchSyncEffect']
}
// for vue template auto import
import { UnwrapRef } from 'vue'
declare module 'vue' {
  interface ComponentCustomProperties {
    readonly $$: UnwrapRef<typeof import('vue/macros')['$$']>
    readonly $: UnwrapRef<typeof import('vue/macros')['$']>
    readonly $computed: UnwrapRef<typeof import('vue/macros')['$computed']>
    readonly $customRef: UnwrapRef<typeof import('vue/macros')['$customRef']>
    readonly $ref: UnwrapRef<typeof import('vue/macros')['$ref']>
    readonly $shallowRef: UnwrapRef<typeof import('vue/macros')['$shallowRef']>
    readonly $toRef: UnwrapRef<typeof import('vue/macros')['$toRef']>
    readonly EffectScope: UnwrapRef<typeof import('vue')['EffectScope']>
    readonly capitalize: UnwrapRef<typeof import('./src/utils/index')['capitalize']>
    readonly computed: UnwrapRef<typeof import('vue')['computed']>
    readonly createApp: UnwrapRef<typeof import('vue')['createApp']>
    readonly customRef: UnwrapRef<typeof import('vue')['customRef']>
    readonly defaultcategory: UnwrapRef<typeof import('./src/composables/useState')['defaultcategory']>
    readonly defineAsyncComponent: UnwrapRef<typeof import('vue')['defineAsyncComponent']>
    readonly defineComponent: UnwrapRef<typeof import('vue')['defineComponent']>
    readonly effectScope: UnwrapRef<typeof import('vue')['effectScope']>
    readonly emojiURLByUnified: UnwrapRef<typeof import('./src/utils/index')['emojiURLByUnified']>
    readonly filterOptions: UnwrapRef<typeof import('./src/utils/index')['filterOptions']>
    readonly formatArray: UnwrapRef<typeof import('./src/utils/index')['formatArray']>
    readonly formatInputDate: UnwrapRef<typeof import('./src/utils/index')['formatInputDate']>
    readonly getCurrentInstance: UnwrapRef<typeof import('vue')['getCurrentInstance']>
    readonly getCurrentScope: UnwrapRef<typeof import('vue')['getCurrentScope']>
    readonly getLabel: UnwrapRef<typeof import('./src/utils/index')['getLabel']>
    readonly getPlatform: UnwrapRef<typeof import('./src/utils/index')['getPlatform']>
    readonly h: UnwrapRef<typeof import('vue')['h']>
    readonly hyphen: UnwrapRef<typeof import('./src/utils/index')['hyphen']>
    readonly inject: UnwrapRef<typeof import('vue')['inject']>
    readonly isEmpty: UnwrapRef<typeof import('./src/utils/index')['isEmpty']>
    readonly isProxy: UnwrapRef<typeof import('vue')['isProxy']>
    readonly isReactive: UnwrapRef<typeof import('vue')['isReactive']>
    readonly isReadonly: UnwrapRef<typeof import('vue')['isReadonly']>
    readonly isRef: UnwrapRef<typeof import('vue')['isRef']>
    readonly markRaw: UnwrapRef<typeof import('vue')['markRaw']>
    readonly nextTick: UnwrapRef<typeof import('vue')['nextTick']>
    readonly objectToStyle: UnwrapRef<typeof import('./src/utils/index')['objectToStyle']>
    readonly onActivated: UnwrapRef<typeof import('vue')['onActivated']>
    readonly onBeforeMount: UnwrapRef<typeof import('vue')['onBeforeMount']>
    readonly onBeforeUnmount: UnwrapRef<typeof import('vue')['onBeforeUnmount']>
    readonly onBeforeUpdate: UnwrapRef<typeof import('vue')['onBeforeUpdate']>
    readonly onDeactivated: UnwrapRef<typeof import('vue')['onDeactivated']>
    readonly onErrorCaptured: UnwrapRef<typeof import('vue')['onErrorCaptured']>
    readonly onMounted: UnwrapRef<typeof import('vue')['onMounted']>
    readonly onRenderTracked: UnwrapRef<typeof import('vue')['onRenderTracked']>
    readonly onRenderTriggered: UnwrapRef<typeof import('vue')['onRenderTriggered']>
    readonly onScopeDispose: UnwrapRef<typeof import('vue')['onScopeDispose']>
    readonly onServerPrefetch: UnwrapRef<typeof import('vue')['onServerPrefetch']>
    readonly onUnmounted: UnwrapRef<typeof import('vue')['onUnmounted']>
    readonly onUpdated: UnwrapRef<typeof import('vue')['onUpdated']>
    readonly parseNativeEmoji: UnwrapRef<typeof import('./src/utils/index')['parseNativeEmoji']>
    readonly provide: UnwrapRef<typeof import('vue')['provide']>
    readonly reactive: UnwrapRef<typeof import('vue')['reactive']>
    readonly readonly: UnwrapRef<typeof import('vue')['readonly']>
    readonly ref: UnwrapRef<typeof import('vue')['ref']>
    readonly removeDuplicates: UnwrapRef<typeof import('./src/utils/index')['removeDuplicates']>
    readonly removeHash: UnwrapRef<typeof import('./src/utils/index')['removeHash']>
    readonly resolveComponent: UnwrapRef<typeof import('vue')['resolveComponent']>
    readonly resolveDirective: UnwrapRef<typeof import('vue')['resolveDirective']>
    readonly shallowReactive: UnwrapRef<typeof import('vue')['shallowReactive']>
    readonly shallowReadonly: UnwrapRef<typeof import('vue')['shallowReadonly']>
    readonly shallowRef: UnwrapRef<typeof import('vue')['shallowRef']>
    readonly timeOfTheDay: UnwrapRef<typeof import('./src/utils/index')['timeOfTheDay']>
    readonly toRaw: UnwrapRef<typeof import('vue')['toRaw']>
    readonly toRef: UnwrapRef<typeof import('vue')['toRef']>
    readonly toRefs: UnwrapRef<typeof import('vue')['toRefs']>
    readonly todaysDate: UnwrapRef<typeof import('./src/utils/index')['todaysDate']>
    readonly triggerRef: UnwrapRef<typeof import('vue')['triggerRef']>
    readonly unref: UnwrapRef<typeof import('vue')['unref']>
    readonly useAdjustPosition: UnwrapRef<typeof import('./src/composables/useAdjustPosition')['useAdjustPosition']>
    readonly useAttrs: UnwrapRef<typeof import('vue')['useAttrs']>
    readonly useColors: UnwrapRef<typeof import('./src/composables/useColors')['useColors']>
    readonly useCssModule: UnwrapRef<typeof import('vue')['useCssModule']>
    readonly useCssVars: UnwrapRef<typeof import('vue')['useCssVars']>
    readonly useSelector: UnwrapRef<typeof import('./src/composables/useSelector')['useSelector']>
    readonly useSlots: UnwrapRef<typeof import('vue')['useSlots']>
    readonly useState: UnwrapRef<typeof import('./src/composables/useState')['useState']>
    readonly validHex: UnwrapRef<typeof import('./src/utils/index')['validHex']>
    readonly watch: UnwrapRef<typeof import('vue')['watch']>
    readonly watchEffect: UnwrapRef<typeof import('vue')['watchEffect']>
    readonly watchPostEffect: UnwrapRef<typeof import('vue')['watchPostEffect']>
    readonly watchSyncEffect: UnwrapRef<typeof import('vue')['watchSyncEffect']>
  }
}
