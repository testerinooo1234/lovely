import type { Story } from '../../types'
import aDaddyForHim from './a-daddy-for-him'
import akaCockBobber from './aka-cock-bobber'
import alreadyFree from './already-free'
import analDiscipline from './anal-discipline'
import anniversaryBudget from './anniversary-budget'
import apartmentLease from './apartment-lease'
import assAddict from './ass-addict'
import audioFirst from './audio-first'
import backwardsSock from './backwards-sock'
import bubblegloss from './bubblegloss'
import cardioThenCage from './cardio-then-cage'
import cuckysitter from './cuckysitter'
import elizabethsLottery from './elizabeths-lottery'
import faceslappedAndFacefucked from './faceslapped-and-facefucked'
import fridayNightProtocol from './friday-night-protocol'
import fiftyForAKiss from './fifty-for-a-kiss'
import frenchClassInvite from './french-class-invite'
import frontRowLesson from './front-row-lesson'
import goodGirlRules from './good-girl-rules'
import heAskedForIt from './he-asked-for-it'
import herBirthdayLock from './her-birthday-lock'
import herUberHisCard from './her-uber-his-card'
import holdStillForScale from './hold-still-for-scale'
import holdingHands from './holding-hands'
import houseRulesWithMissHale from './house-rules-with-miss-hale'
import humiliatrix from './humiliatrix'
import inspectionCosts from './inspection-costs'
import justATaste from './just-a-taste'
import justACleanTaste from './just-a-clean-taste'
import kaylasBrightRoom from './kaylas-bright-room'
import laundryDay from './laundry-day'
import listingDay from './listing-day'
import littleAftercare from './little-aftercare'
import loserTax from './loser-tax'
import madameBeaumontsCorner from './madame-beaumonts-corner'
import measuredAndFoundWanting from './measured-and-found-wanting'
import missVictoriasSurvey from './miss-victorias-survey'
import muteFee from './mute-fee'
import naughtydiapergirls from './naughtydiapergirls'
import officeHoursSoap from './office-hours-soap'
import overnightRent from './overnight-rent'
import overHerKnee from './over-her-knee'
import phonePrivileges from './phone-privileges'
import pinkMileage from './pink-mileage'
import prettyThingsWearPink from './pretty-things-wear-pink'
import punishmentInbox from './punishment-inbox'
import queueOnTheRug from './queue-on-the-rug'
import receiptForTheKey from './receipt-for-the-key'
import releaseEquation from './release-equation'
import rentMyAttention from './rent-my-attention'
import sentFromNyx from './sent-from-nyx'
import sheLetsHimStay from './she-lets-him-stay'
import sheReadAboutIt from './she-read-about-it'
import sheWasOnlyArguing from './she-was-only-arguing'
import smileThroughIt from './smile-through-it'
import soapAndFlash from './soap-and-flash'
import sockDrawerTrophy from './sock-drawer-trophy'
import savannahTheManipulator from './savannah-the-manipulator'
import soapSentences from './soap-sentences'
import stepstoolSink from './stepstool-sink'
import summerRules from './summer-rules'
import tenCollars from './ten-collars'
import tenMinuteWindow from './ten-minute-window'
import theBeltSheBorrowed from './the-belt-she-borrowed'
import theBarTab from './the-bar-tab'
import theDinnerNapkin from './the-dinner-napkin'
import theSixPlates from './the-six-plates'
import theGuestInOurBed from './the-guest-in-our-bed'
import theIvoryHandle from './the-ivory-handle'
import theKeyOnHerChain from './the-key-on-her-chain'
import theOtherDiscipline from './the-other-discipline'
import theWishlist from './the-wishlist'
import theWrongDrawer from './the-wrong-drawer'
import tipMenuTuesday from './tip-menu-tuesday'
import toHonorYourAss from './to-honor-your-ass'
import tooMuchToAsk from './too-much-to-ask'
import twoBoysOneDare from './two-boys-one-dare'
import untilTheVows from './until-the-vows'
import vanityLesson from './vanity-lesson'
import velvetRestraints from './velvet-restraints'

export const stories: Story[] = [
  aDaddyForHim,
  akaCockBobber,
  assAddict,
  backwardsSock,
  cuckysitter,
  elizabethsLottery,
  faceslappedAndFacefucked,
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
  fiftyForAKiss,
  frenchClassInvite,
  laundryDay,
  littleAftercare,
  madameBeaumontsCorner,
  sheLetsHimStay,
  sheReadAboutIt,
  sheWasOnlyArguing,
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
  humiliatrix,
  soapAndFlash,
  tenCollars,
  savannahTheManipulator,
  summerRules,
  theBeltSheBorrowed,
  untilTheVows,
  theWishlist,
  officeHoursSoap,
  stepstoolSink,
  theDinnerNapkin,
  listingDay,
  apartmentLease,
  theIvoryHandle,
  bubblegloss,
  vanityLesson,
  soapSentences,
  justACleanTaste,
  receiptForTheKey,
  tenMinuteWindow,
  overnightRent,
  toHonorYourAss,
  loserTax,
  muteFee,
  herUberHisCard,
  theBarTab,
  anniversaryBudget,
  alreadyFree,
  analDiscipline,
  theSixPlates,
  queueOnTheRug,
  holdStillForScale,
  audioFirst,
  sockDrawerTrophy,
  tipMenuTuesday,
  rentMyAttention,
  cardioThenCage,
  pinkMileage,
  smileThroughIt,
  inspectionCosts,
  releaseEquation,
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
