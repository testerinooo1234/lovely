import type { Story } from '../../types'
import aDaddyForHim from './a-daddy-for-him'
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
import tenCollars from './ten-collars'
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
