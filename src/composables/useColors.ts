import { colors } from '../data/data'

export const useColors = () => {
  const randoms = (Math.floor(Math.random() * colors.length))

  return { color: colors[randoms].name }
}
