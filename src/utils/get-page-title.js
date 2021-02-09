import defaultSettings from '@/settings'

const title = defaultSettings.title || 'Vue Admin Template Plus —— Vue 3.0 & Element Plus'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
