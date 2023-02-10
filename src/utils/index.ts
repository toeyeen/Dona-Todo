export const timeOfTheDay = computed(() => {
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