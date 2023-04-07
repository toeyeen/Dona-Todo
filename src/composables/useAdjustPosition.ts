import type { MaybeComputedRef, MaybeRef } from '@vueuse/shared'
import { unrefElement } from '@vueuse/core'
import type { Direction } from '../types'
export type MaybeElementRef<T extends MaybeElement = MaybeElement> = MaybeRef<T>
export type MaybeComputedElementRef<T extends MaybeElement = MaybeElement> = MaybeComputedRef<T>
export type MaybeElement = HTMLElement | SVGElement | undefined | null

interface adjustPositionOptions {
  maxHeight: string | number
  openDirection?: Direction
  window?: Window
  ignore?: (MaybeElementRef | string)[]
}

const defaultWindow = window

export const useAdjustPosition = <T extends adjustPositionOptions>(
  target: MaybeElementRef,
  options: T,
) => {
  const { window = defaultWindow, maxHeight = 300, openDirection } = options
  const el = unrefElement(target)

  if (!window)
    return

  const spaceBelow = window.innerHeight - el.getBoundingClientRect().bottom
  const spaceAbove = el!.getBoundingClientRect().top

  const hasEnoughSpaceBelow = spaceBelow > +maxHeight

  const preferredOpenDirection = ref()
  let optimizedHeight
  if (hasEnoughSpaceBelow || spaceBelow > spaceAbove || openDirection === 'below' || openDirection === 'bottom') {
    preferredOpenDirection.value = 'below'
    optimizedHeight = Math.min(spaceBelow - 40, +maxHeight)
  }
  else {
    preferredOpenDirection.value = 'above'
    optimizedHeight = Math.min(spaceAbove - 40, +maxHeight)
  }

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

  console.log(isAbove)
  return {
    spaceAbove,
    spaceBelow,
    preferredOpenDirection,
    optimizedHeight,
    isAbove,
  }
}
