export interface Category {
  id: string
  title: string
  color?: string
}

export interface Todo {
  id: number | string
  title: string
  status: status
  dueDate?: string
  category?: Category[]
}

type status = 'completed' | 'inProgress' | 'due'

export interface HyphenOptions {
  /**
   * Observe `document.title` changes using MutationObserve
   *
   * @default add
   */
  type?: 'add' | 'remove'
}
