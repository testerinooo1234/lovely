import type { Story } from '../../types'
import aDaddyForHim from './a-daddy-for-him'
import assAddict from './ass-addict'
import backwardsSock from './backwards-sock'
import cuckysitter from './cuckysitter'
import elizabethsLottery from './elizabeths-lottery'
import fridayNightProtocol from './friday-night-protocol'
import frenchClassInvite from './french-class-invite'
import frontRowLesson from './front-row-lesson'
import goodGirlRules from './good-girl-rules'
import heAskedForIt from './he-asked-for-it'
import herBirthdayLock from './her-birthday-lock'
import holdingHands from './holding-hands'
import houseRulesWithMissHale from './house-rules-with-miss-hale'
import justATaste from './just-a-taste'
import kaylasBrightRoom from './kaylas-bright-room'
import laundryDay from './laundry-day'
import littleAftercare from './little-aftercare'
import madameBeaumontsCorner from './madame-beaumonts-corner'
import measuredAndFoundWanting from './measured-and-found-wanting'
import missVictoriasSurvey from './miss-victorias-survey'
import naughtydiapergirls from './naughtydiapergirls'
import overHerKnee from './over-her-knee'
import phonePrivileges from './phone-privileges'
import prettyThingsWearPink from './pretty-things-wear-pink'
import punishmentInbox from './punishment-inbox'
import sentFromNyx from './sent-from-nyx'
import sheLetsHimStay from './she-lets-him-stay'
import sheReadAboutIt from './she-read-about-it'
import soapAndFlash from './soap-and-flash'
import savannahTheManipulator from './savannah-the-manipulator'
import summerRules from './summer-rules'
import tenCollars from './ten-collars'
import theBeltSheBorrowed from './the-belt-she-borrowed'
import theGuestInOurBed from './the-guest-in-our-bed'
import theKeyOnHerChain from './the-key-on-her-chain'
import theOtherDiscipline from './the-other-discipline'
import theWishlist from './the-wishlist'
import theWrongDrawer from './the-wrong-drawer'
import tooMuchToAsk from './too-much-to-ask'
import twoBoysOneDare from './two-boys-one-dare'
import untilTheVows from './until-the-vows'
import velvetRestraints from './velvet-restraints'

export const stories: Story[] = [
  aDaddyForHim,
  assAddict,
  backwardsSock,
  cuckysitter,
  elizabethsLottery,
  theKeyOnHerChain,
  overHerKnee,
  phonePrivileges,
  goodGirlRules,
  theGuestInOurBed,
  prettyThingsWearPink,
  punishmentInbox,
  sentFromNyx,
  measuredAndFoundWanting,
  missVictoriasSurvey,
  naughtydiapergirls,
  velvetRestraints,
  fridayNightProtocol,
  frenchClassInvite,
  laundryDay,
  littleAftercare,
  madameBeaumontsCorner,
  sheLetsHimStay,
  sheReadAboutIt,
  justATaste,
  kaylasBrightRoom,
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
  tenCollars,
  savannahTheManipulator,
  summerRules,
  theBeltSheBorrowed,
  untilTheVows,
  theWishlist,
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

/** Top tags by usage, then shown alphabetically. */
export function getTopTags(limit = 10): string[] {
  const counts = new Map<string, number>()
  for (const story of stories) {
    for (const tag of story.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1)
    }
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, limit)
    .map(([tag]) => tag)
    .sort((a, b) => a.localeCompare(b))
}

export function getFeaturedStories(): Story[] {
  return stories.filter((s) => s.featured)
}
