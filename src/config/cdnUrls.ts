import type { EmojiStyle } from '../types'

const CDN_URL_APPLE
  = 'https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/'
const CDN_URL_FACEBOOK
  = 'https://cdn.jsdelivr.net/npm/emoji-datasource-facebook/img/facebook/64/'
const CDN_URL_TWITTER
  = 'https://cdn.jsdelivr.net/npm/emoji-datasource-twitter/img/twitter/64/'
const CDN_URL_GOOGLE
  = 'https://cdn.jsdelivr.net/npm/emoji-datasource-google/img/google/64/'

export function cdnUrl(emojiStyle: EmojiStyle) {
  switch (emojiStyle) {
    case 'twitter':
      return CDN_URL_TWITTER
    case 'google':
      return CDN_URL_GOOGLE
    case 'facebook':
      return CDN_URL_FACEBOOK
    default:
      return CDN_URL_APPLE
  }
}
