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

export const removeDuplicates = <T>(array: T[], identifier: string) => {
  const uniqueTitles = new Set()
  return array.filter((obj) => {
    if (uniqueTitles.has(obj[identifier]))
      return false // remove object from array

    uniqueTitles.add(obj[identifier])
    return true // keep object in array
  })
}

export const getPlatform = () => {
  const platform = navigator.platform.toLowerCase()

  if (platform.includes('mac'))
    return 'Mac'

  else if (platform.includes('linux'))
    return 'Linux'

  else if (platform.includes('win'))
    return 'Windows'

  else
    return 'Unknown'
}

export const validHex = (value: string) => {
  const hexColorRegex = /^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6})$/

  return hexColorRegex.test(value)
}

// Emoji Utils
export const parseNativeEmoji = (unified: string) => {
  return unified.split('-').map(hex => String.fromCodePoint(parseInt(hex, 16))).join(' ')
}

export const capitalize = (value: string) => {
  return value.charAt(0).toUpperCase() + value.slice(1)
}

export const removeHash = (value: string) => {
  return value.split('#')[1]
}

export const formatArray = (arr) => {
  const categories = {}

  for (const obj of arr) {
    const category = obj.category.toLowerCase()
    if (categories[category]) {
      categories[category].children.push({
        names: obj.names,
        unified: obj.unified,
        accuracy: obj.accuracy,
      })
    }
    else {
      categories[category] = {
        name: category,
        children: [
          {
            names: obj.names,
            unified: obj.unified,
            accuracy: obj.accuracy,
          },
        ],
      }
    }
  }

  return Object.values(categories)
}
