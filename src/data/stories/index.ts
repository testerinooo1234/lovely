import type { Story } from '../../types'
import aDaddyForHim from './a-daddy-for-him'
import fridayNightProtocol from './friday-night-protocol'
import frontRowLesson from './front-row-lesson'
import goodGirlRules from './good-girl-rules'
import heAskedForIt from './he-asked-for-it'
import herBirthdayLock from './her-birthday-lock'
import holdingHands from './holding-hands'
import houseRulesWithMissHale from './house-rules-with-miss-hale'
import justATaste from './just-a-taste'
import littleAftercare from './little-aftercare'
import measuredAndFoundWanting from './measured-and-found-wanting'
import missVictoriasSurvey from './miss-victorias-survey'
import naughtydiapergirls from './naughtydiapergirls'
import overHerKnee from './over-her-knee'
import prettyThingsWearPink from './pretty-things-wear-pink'
import sheLetsHimStay from './she-lets-him-stay'
import soapAndFlash from './soap-and-flash'
import theBeltSheBorrowed from './the-belt-she-borrowed'
import theGuestInOurBed from './the-guest-in-our-bed'
import theKeyOnHerChain from './the-key-on-her-chain'
import theOtherDiscipline from './the-other-discipline'
import theWrongDrawer from './the-wrong-drawer'
import tooMuchToAsk from './too-much-to-ask'
import twoBoysOneDare from './two-boys-one-dare'
import untilTheVows from './until-the-vows'
import velvetRestraints from './velvet-restraints'

export const stories: Story[] = [
  aDaddyForHim,
  theKeyOnHerChain,
  overHerKnee,
  goodGirlRules,
  theGuestInOurBed,
  prettyThingsWearPink,
  measuredAndFoundWanting,
  missVictoriasSurvey,
  naughtydiapergirls,
  velvetRestraints,
  fridayNightProtocol,
  littleAftercare,
  sheLetsHimStay,
  justATaste,
  theWrongDrawer,
  twoBoysOneDare,
  theOtherDiscipline,
  tooMuchToAsk,
  frontRowLesson,
  houseRulesWithMissHale,
  heAskedForIt,
  herBirthdayLock,
  holdingHands,
  soapAndFlash,
  theBeltSheBorrowed,
  untilTheVows,
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
