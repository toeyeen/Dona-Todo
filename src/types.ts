export interface Color {
  hex: string
}
export interface Category {
  id: string
  title: string
  color?: Color
  icon?: Emoji
}

export interface ReactiveState {
  category: Category
  categories: Category[] | []
  todos: Todo[]
  auth?: Object
  categorySymbol: Color | EmojiStyle
}

export type statusState = 'inProgress' | 'due' | 'completed'

export interface BasicTodo {
  id: string
  title: string
  createdAt?: string
}

export interface Todo extends BasicTodo {
  status?: statusState
  dueDate?: string
  category?: Category[]
  subTodo?: BasicTodo[]
  tags?: string[]
  description: string
}

export interface HyphenOptions {
  /**
   * Observe `document.title` changes using MutationObserve
   *
   * @default add
   */
  type?: 'add' | 'remove'
}
export interface Emoji {
  names: string[]
  unified: string
  added_in: string
}

export type Theme = 'dark' | 'light' | 'auto'

// Emoji Types

export type SuggestionMode = 'recent' | 'frequent'
export type EmojiStyle = 'native' | 'apple' | 'twitter' | 'google' | 'facebook'

export enum SkinTones {
  NEUTRAL = 'neutral',
  LIGHT = '1f3fb',
  MEDIUM_LIGHT = '1f3fc',
  MEDIUM = '1f3fd',
  MEDIUM_DARK = '1f3fe',
  DARK = '1f3ff',
}

export type EmojiCategories = 'smileys_people' | 'animals_nature' | 'food_drink' | 'travel_places' | 'activities' | 'objects' | 'symbols' | 'flags'

export type SkinTonePickerLocation = 'search' | 'preview'

const skinToneVariations = [
  SkinTones.NEUTRAL,
  SkinTones.LIGHT,
  SkinTones.MEDIUM_LIGHT,
  SkinTones.MEDIUM,
  SkinTones.MEDIUM_DARK,
  SkinTones.DARK,
]

export const skinTonesNamed = Object.entries(SkinTones).reduce(
  (acc, [key, value]) => {
    acc[value] = key
    return acc
  },
  {} as Record<string, string>,
)

// Select Options

export type SelectOption<T = {}> = {
  id?: string | number
} & T

export const tuple = <T extends string[]>(...args: T) => args

export type Direction = 'above' | 'below' | 'bottom' | 'top'
