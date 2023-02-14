import type { HyphenOptions } from '~/types'
export const todaysDate = () => {
  const date = new Date()

  return date.toLocaleString('en-GB', {
    hour12: false,

  })
}

export const formatInputDate = (date: string | Date) => {
  if (typeof date == 'string')

    return date.split('-').reverse().join('/')
}

export const timeOfTheDay = computed(() => {
  const today = todaysDate()

  today.split(',')[1].split(':')[0].trim()
  const date = new Date()

  const time = date.toLocaleString([], {
    hour12: false,
  }).split(',')[1].split(':')[0].trim()

  const formattedHour = (time.startsWith('0') && +time[1] === 0) ? +time[1] : time

  if (formattedHour > 0 && formattedHour < 12)

    return 'Good Morning'

  else if (formattedHour > 12 && formattedHour < 17)

    return 'Good Afternoon'

  else

    return 'Good Evening'
})

export const hyphen = (string, options: HyphenOptions = {}) => {
  const { type = 'add' } = options

  if (type === 'add')
    return string.trim().split(' ').join('-')

  if (type === 'remove')
    return string.trim().split('-').join(' ')
}
