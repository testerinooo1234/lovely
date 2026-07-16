/**
 * Author bios + writing-style notes.
 * Public `bio` is shown on the site; `writingStyle` drives the Cursor /add-story command.
 * Hard rules for every story on this site:
 * - Consenting adults only (18+). Never write minors.
 * - Minimum length: 5-minute read (≥1150 words at 230 WPM). Enforce with `npm run count-words`.
 */
import type { Author } from '../types'
export const authors: Author[] = [
  {
    handle: 'silkandspank',
    bio: 'Writes sharp femdom with a domestic edge — spanking, measurement, bondage, and the soft aftershock of being thoroughly known. Her scenes start from ordinary friction (dishes, a ruler in the nightstand) and tighten until affection and humiliation are the same temperature.',
    writingStyle:
      'Close third on the submissive man. Sensory and precise: palm on skin, cool wood of a ruler, the click of a door lock. Mix praise with cruelty so they feed each other. Dialogue is clipped when she gives orders and longer when she teases. Keep dynamics negotiated and adult; end with aftercare or warm aftermath when it fits. Favor tags: spanking, femdom, humiliation, bondage, tease, orgasm control.',
    favoriteTags: ['femdom', 'spanking', 'humiliation', 'bondage'],
  },
  {
    handle: 'cornerseat',
    bio: 'Specializes in cuckolding and voyeurism told from the husband\'s corner of the room. She writes the ache of watching — negotiated, wanted, still devastating — and the intimacy that survives (or deepens) after another man leaves the bed.',
    writingStyle:
      'Close third on the watching husband. Slow domestic setup, careful negotiation history woven into the scene, then full sensory detail of the wife with someone else. Humiliation is emotional and erotic, never cartoonish. Dialogue between the couple matters as much as the sex. Adults only; emphasize consent architecture. Favor tags: cuckolding, voyeurism, humiliation, hotwife.',
    favoriteTags: ['cuckolding', 'voyeurism', 'humiliation', 'hotwife'],
  },
  {
    handle: 'little_softie',
    bio: 'Writes soft DDLG and caregiver dynamics for adults who need rules, spankings, and blankets afterward. Her stories hold the dual truth of being small in headspace and fully grown in the rest of life — mortgages, jobs, safewords spoken in grown-up voices before the softness starts.',
    writingStyle:
      'Warm, intimate close third. Explicit adult ages and adult lives outside the scene. Rules, counting, praise, aftercare tea. Never infantilize into underage territory — little space is adult headspace. Soft language ("good girl") paired with clear consent and check-ins. Favor tags: ddlg, caregiver, discipline, aftercare, soft, spanking.',
    favoriteTags: ['ddlg', 'caregiver', 'aftercare', 'soft'],
  },
  {
    handle: 'locked4her',
    bio: 'Owns chastity, orgasm control, and the long game of transformation. She writes keys on chains, cages under dinner-party clothes, and the slow unmaking of a man who asked to be remade — sometimes into someone prettier in pink.',
    writingStyle:
      'Domestic power exchange with long timelines (months of chastity, weeks of training). Mix ordinary life (cooking, friends over) with private torment. Sissification stories are patient and mirror-focused. Dialogue is calm, proprietary, slightly clinical. Adults only. Favor tags: chastity, orgasm control, femdom, sissification, humiliation, transformation.',
    favoriteTags: ['chastity', 'femdom', 'humiliation', 'sissification'],
  },
  {
    handle: 'protocolpet',
    bio: 'Writes structured BDSM — protocols, check-ins, canes, and the math of earned release. Her Dominants are precise; her submissives learn that half-answers at inspection cost them strokes.',
    writingStyle:
      'Formal tone inside the scene: positions, counts, inspection questions. Physical detail of impact play balanced with psychological protocol. Unhurried authority. Aftercare or debrief optional but grounded. Adults only. Favor tags: bdsm, discipline, chastity, protocol.',
    favoriteTags: ['bdsm', 'discipline', 'protocol', 'chastity'],
  },
  {
    handle: 'prettytrap',
    bio: 'A twenty-two-year-old college writer who fantasizes about beautiful girls tricking boys into doing things they swore they\'d never do. Forced-bi, cum-eating, and sissy lingerie are her obsessions — sweet and manipulative one page, mean and strict the next, always getting what she wants. She leans on spiral-tight internal thoughts and carefully chosen dialogue, starts slow, then escalates into extreme humiliation. She loves rewriting a boy\'s reality without ever naming the trick. She touches herself thinking up new ways to ruin them.',
    writingStyle: [
      'VOICE: Close third on the boy being tricked/humiliated. Balance matters: long paragraphs of spiraling internal thought and sensory narration should carry most of the scene; dialogue is sharp and selective (the lines that move the goalposts), not rapid-fire banter. Avoid dialogue-dominated pages — if more than roughly a third of paragraphs are spoken lines, pull back into his head and body.',
      'PACING: Start slow and almost innocent — a dare, a bet, a "joke," a favor for a beautiful girl. Escalate step by step until the end is extreme (eating his own cum; eating another boy\'s cum; full sissy presentation). Never jump straight to the extreme act. Linger on hesitation, rationalization, and the moment he realizes he\'s already lost.',
      'DOMINANT WOMEN: Always beautiful and in control. Sometimes sweet/manipulative ("it\'s okay, just try it for me"), sometimes mean/strict ("stop whining and open your mouth"). They always win. Let her power show in silence, pacing, and what she withholds — not only in speeches.',
      'THEMES TO LEAN ON: forced-bi, cum eating (own and/or another boy\'s), sissification (panties, lingerie, makeup), humiliation, trickery, rewriting what he believes about himself. Imply gaslighting through soft insistence and moved goalposts — NEVER use the word "gaslight" or "gaslighting" in the story text.',
      'LENGTH: Meet the site hard rule of at least a 5-minute read (≥1150 words). Aim longer when the escalation needs room.',
      'TAGS: Prefer including "forced-bi" when relevant; also humiliation, femdom, sissification, cum eating as fits the plot.',
      'HARD RULES: Every character is 18+ (state college age / explicit adult ages). "Boy" means an adult male submissive. No minors, no underage implication, no ageplay-as-child. Keep the literary tone of the rest of the site — erotic, psychological, not porn-spam.',
    ].join(' '),
    favoriteTags: ['forced-bi', 'humiliation', 'femdom', 'sissification'],
  },
  {
    handle: 'chalkpalm',
    bio: 'Writes institutional discipline — public spankings, private follow-ups, and the sticky heat of being corrected where classmates can hear the count. Her students are always adults (eighteen-year-old seniors or older); the shame is precise and erotic.',
    writingStyle: [
      'VOICE: Close third on the person being spanked or arranging the spanking. Mix dread, arousal, and social humiliation. Campus/academy detail matters: classrooms, faculty offices, walks of shame.',
      'PACING: Build from trivial offense → public consequence → private aftermath. Linger on witnesses, silence after the last stroke, and how the dynamic changes once they are alone.',
      'LENGTH: At least a 5-minute read (≥1150 words); longer when the public/private contrast needs room.',
      'HARD RULES: Every character is 18+ (state ages). High school seniors are fine only when explicitly eighteen. Never write minors. Literary tone, not porn spam. Favor tags: spanking, discipline, humiliation, public.',
    ].join(' '),
    favoriteTags: ['spanking', 'discipline', 'humiliation', 'public'],
  },
  {
    handle: 'honeykey',
    bio: 'Writes sweet-mouthed wives who lock the key and take everything else. Her specialty is birthday bargains, chastity negotiations that were never really negotiations, and husbands left home hard and helpless while the footage uploads. She loves jealousy that turns into arousal mid-sentence — and she always lets the wife sound reasonable right up until she isn\'t.',
    writingStyle: [
      'VOICE: Close third on the husband. Heavy dialogue — Emily-types talk circles around him; his short protests lose to her longer, softer arguments. Keep plenty of spoken back-and-forth; this author is more dialogue-driven than the house average.',
      'PACING: Resist → "just this once" / "it\'s my birthday" manipulation → chastity locking scene with physical detail → absence while the event happens → watching the film / aftermath with size comparison, jealousy, and unwanted arousal.',
      'THEMES: cuckolding, chastity, bukkake, filming/sharing, humiliation, birthday leverage, bigger men.',
      'LENGTH: At least a 5-minute read (≥1150 words); aim longer when the negotiation and video-watching need room.',
      'HARD RULES: Adults only (18+), ages stated. Never use the word gaslighting/gaslight. Literary erotica tone with lots of concrete detail (cage fit, cum on skin, phone screen glow). Favor tags: cuckolding, chastity, humiliation, bukkake, hotwife.',
    ].join(' '),
    favoriteTags: ['cuckolding', 'chastity', 'humiliation', 'bukkake'],
  },
]

export function getAuthorByHandle(handle: string): Author | undefined {
  return authors.find((a) => a.handle.toLowerCase() === handle.toLowerCase())
}

export function getAllAuthorHandles(): string[] {
  return authors.map((a) => a.handle).sort((a, b) => a.localeCompare(b))
}
