/** Story body font size preference (persisted in a cookie). */

export const STORY_FONT_COOKIE = 'lovely_story_font'
const COOKIE_MAX_AGE_SEC = 60 * 60 * 24 * 365 // 1 year

export const STORY_FONT_SIZES = [
  { id: 'xs', label: 'Extra small', rem: '0.875rem' },
  { id: 'sm', label: 'Small', rem: '0.95rem' },
  { id: 'md', label: 'Medium', rem: '1.05rem' },
  { id: 'lg', label: 'Large', rem: '1.2rem' },
  { id: 'xl', label: 'Extra large', rem: '1.35rem' },
] as const

export type StoryFontSizeId = (typeof STORY_FONT_SIZES)[number]['id']

export const DEFAULT_STORY_FONT_SIZE: StoryFontSizeId = 'md'

export function isStoryFontSizeId(value: string): value is StoryFontSizeId {
  return STORY_FONT_SIZES.some((size) => size.id === value)
}

export function remForStoryFontSize(id: StoryFontSizeId): string {
  return STORY_FONT_SIZES.find((size) => size.id === id)?.rem ?? '1.05rem'
}

export function readStoryFontSizeCookie(): StoryFontSizeId {
  if (typeof document === 'undefined') return DEFAULT_STORY_FONT_SIZE
  const match = document.cookie
    .split(';')
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${STORY_FONT_COOKIE}=`))
  if (!match) return DEFAULT_STORY_FONT_SIZE
  const value = decodeURIComponent(match.slice(STORY_FONT_COOKIE.length + 1))
  return isStoryFontSizeId(value) ? value : DEFAULT_STORY_FONT_SIZE
}

export function writeStoryFontSizeCookie(id: StoryFontSizeId) {
  document.cookie = `${STORY_FONT_COOKIE}=${encodeURIComponent(id)}; path=/; max-age=${COOKIE_MAX_AGE_SEC}; SameSite=Lax`
}

/** Apply the CSS variable used by `.story-reader__body`. */
export function applyStoryFontSize(id: StoryFontSizeId) {
  document.documentElement.style.setProperty(
    '--story-font-size',
    remForStoryFontSize(id),
  )
}
