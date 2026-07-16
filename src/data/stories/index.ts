import type { Story } from '../../types'
import fridayNightProtocol from './friday-night-protocol'
import goodGirlRules from './good-girl-rules'
import justATaste from './just-a-taste'
import littleAftercare from './little-aftercare'
import measuredAndFoundWanting from './measured-and-found-wanting'
import overHerKnee from './over-her-knee'
import prettyThingsWearPink from './pretty-things-wear-pink'
import sheLetsHimStay from './she-lets-him-stay'
import theGuestInOurBed from './the-guest-in-our-bed'
import theKeyOnHerChain from './the-key-on-her-chain'
import theWrongDrawer from './the-wrong-drawer'
import twoBoysOneDare from './two-boys-one-dare'
import velvetRestraints from './velvet-restraints'

export const stories: Story[] = [
  theKeyOnHerChain,
  overHerKnee,
  goodGirlRules,
  theGuestInOurBed,
  prettyThingsWearPink,
  measuredAndFoundWanting,
  velvetRestraints,
  fridayNightProtocol,
  littleAftercare,
  sheLetsHimStay,
  justATaste,
  theWrongDrawer,
  twoBoysOneDare,
].sort(
  (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
)

export function getStoryBySlug(slug: string): Story | undefined {
  return stories.find((s) => s.slug === slug)
}

export function getAllTags(): string[] {
  const set = new Set<string>()
  for (const story of stories) {
    for (const tag of story.tags) set.add(tag)
  }
  return [...set].sort((a, b) => a.localeCompare(b))
}

export function getFeaturedStories(): Story[] {
  return stories.filter((s) => s.featured)
}
