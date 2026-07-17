/**
 * Author bios + writing-style notes.
 * Public `bio` is shown on the site; `writingStyle` drives the Cursor /add-story command.
 * Hard rules for every story on this site (see also `.cursor/rules/story-writing.mdc`):
 * - Consenting adults only (18+). Never write minors. The site waiver covers that — do NOT insert safewords, traffic-light colors, or mid-scene check-ins. CNC vibes are welcome; consent-theatre ruins them.
 * - Do not use adult age numbers as character IDs. Numeric ages 18–21 only when youth is plot-critical, and once — not as a refrain.
 * - Dramatize scenes; do not summarize important beats. Never name characters Aaron or Eric.
 * - Minimum length: 5-minute read (≥1150 words at 230 WPM). Enforce with `npm run count-words`.
 */
import type { Author } from '../types'
export const authors: Author[] = [
  {
    handle: 'silk_and_spank',
    bio: 'Writes sharp femdom with a domestic edge — spanking, measurement, bondage, and the soft aftershock of being thoroughly known. Her scenes start from ordinary friction (dishes, a ruler in the nightstand) and tighten until affection and humiliation are the same temperature.',
    writingStyle:
      'Close third on the submissive man. Sensory and precise: palm on skin, cool wood of a ruler, the click of a door lock. Mix praise with cruelty so they feed each other. Dialogue is clipped when she gives orders and longer when she teases. Adults only; end with aftercare or warm aftermath when it fits. Favor tags: spanking, femdom, humiliation, bondage, tease, orgasm control.',
    favoriteTags: ['femdom', 'spanking', 'humiliation', 'bondage'],
  },
  {
    handle: 'cornerseat',
    bio: 'Specializes in cuckolding and voyeurism told from the husband\'s corner of the room. She writes the ache of watching — negotiated, wanted, still devastating — and the intimacy that survives (or deepens) after another man leaves the bed.',
    writingStyle:
      'Close third on the watching husband. Slow domestic setup, careful negotiation history woven into the scene, then full sensory detail of the wife with someone else. Humiliation is emotional and erotic, never cartoonish. Dialogue between the couple matters as much as the sex. Adults only. Favor tags: cuckolding, voyeurism, humiliation, hotwife.',
    favoriteTags: ['cuckolding', 'voyeurism', 'humiliation', 'hotwife'],
  },
  {
    handle: 'little_softie',
    bio: 'Writes soft DDLG and caregiver dynamics for adults who need rules, spankings, and blankets afterward. Her stories hold the dual truth of being small in headspace and fully grown in the rest of life — mortgages, jobs, and the quiet aftercare that follows a hard spanking.',
    writingStyle:
      'Warm, intimate close third. Adult lives outside the scene (jobs, mortgages, marriages) — no filler age numbers. Rules, counting, praise, aftercare tea. Never infantilize into underage territory — little space is adult headspace. Soft language ("good girl") without safeword/check-in theatre. Favor tags: ddlg, caregiver, discipline, aftercare, soft, spanking.',
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
    bio: 'Writes structured BDSM — protocols, canes, and the math of earned release. Her Dominants are precise; her submissives learn that half-answers at inspection cost them strokes.',
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
      'HARD RULES: Every character is 18+. Establish adulthood via college/jobs — no filler age numbers. "Boy" means an adult male submissive. No minors, no underage implication, no ageplay-as-child. Keep the literary tone of the rest of the site — erotic, psychological, not porn-spam.',
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
      'HARD RULES: Every character is 18+. High school seniors: state eighteen once at intro if needed; do not refrain ages. Adult faculty/side characters: no age numbers. Never write minors. Literary tone, not porn spam. Favor tags: spanking, discipline, humiliation, public.',
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
      'HARD RULES: Adults only (18+); adult context without filler age numbers. Never use the word gaslighting/gaslight. Literary erotica tone with lots of concrete detail (cage fit, cum on skin, phone screen glow). Favor tags: cuckolding, chastity, humiliation, bukkake, hotwife.',
    ].join(' '),
    favoriteTags: ['cuckolding', 'chastity', 'humiliation', 'bukkake'],
  },
  {
    handle: 'towerlap',
    bio: 'Writes towering Dommes who scoop grown men over one knee like luggage. Her specialty is hard hand-and-hairbrush spankings, scolding that turns adults into naughty little boys and girls mid-sentence, and childish corrections — mouthsoap, corner time, pull-ups — delivered with absolute physical confidence. She loves a kink survey that hands her the keys.',
    writingStyle: [
      'VOICE: Close third on the client being manhandled. Heavy dialogue from the Domme — continuous scolding, teasing, rhetorical questions. The sub\'s lines are shorter: yelps, protests, yes ma\'ams.',
      'PHYSICALITY: Emphasize size difference, easy manhandling, OTK positioning, hairbrush wood vs hand, color progression of the bottom (pink → red → bruised → purple), chastity click, diaper/onesie details.',
      'THEMES: femdom, spanking, forced feminization, adult ageplay, chastity, small penis humiliation, mouthsoaping, corner time.',
      'LENGTH: At least 5 minutes (≥1150 words); go long when the spanking scene needs room to breathe.',
      'HARD RULES: Adults only (18+); adult context without filler age numbers. Ageplay is adult headspace — never imply underage participants. Literary erotica with lots of dialogue and concrete humiliation. Favor tags: femdom, spanking, feminization, ageplay, chastity, humiliation.',
    ].join(' '),
    favoriteTags: ['femdom', 'spanking', 'feminization', 'ageplay', 'chastity'],
  },
  {
    handle: 'softvow',
    bio: 'Writes girlfriends who sound like Sunday school while describing other boys in filthy detail. Her specialty is purity logic with loopholes — mouths and asses that somehow "don\'t count," loyal boyfriends who stay, and small comparisons delivered like compliments. She never needs harsh words; the sweetness does the cutting.',
    writingStyle: [
      'VOICE: Close third on the boyfriend. Heavy dialogue from the girlfriend — innocent tone, vulgar content, patient explanations. His lines are shorter: hurt questions, protests that fold.',
      'RULES OF THE WORLD: She frames oral and anal with other men as compatible with "chastity until marriage"; PIV / pleasuring his cock is forbidden because that would break their vow. Never use the words cuckold or cheating in the story text.',
      'THEMES: hotwife-adjacent high-school-senior dynamics, humiliation, small penis humiliation, religious/purity language as cover, boyfriend\'s jealous loyalty.',
      'LENGTH: At least 5 minutes (≥1150 words); go long for dialogue-heavy negotiation scenes.',
      'HARD RULES: Adults only — high school characters must be eighteen-year-old seniors (state once at intro). Literary erotica. Favor tags: humiliation, hotwife, chastity, oral, anal.',
    ].join(' '),
    favoriteTags: ['humiliation', 'hotwife', 'chastity', 'oral'],
  },
  {
    handle: 'sternapron',
    bio: 'Writes mothers who find the browser history and follow through. Her specialty is adult daughters caught in ABDL shame — diaper position, hairbrush lectures, Goodnites as "graduation," and porn-video scoldings recycled in the kitchen. Embarrassment and arousal share the same red face.',
    writingStyle: [
      'VOICE: Close third on the adult daughter. Heavy maternal dialogue — stern, scrapbook-sweet, merciless. Daughter\'s lines are flustered denials that collapse into yes, mommy.',
      'BEATS: Discovery → confrontation with the site open → porn-line scolding → strip → diaper position → hairbrush → diapering → ongoing household enforcement with more spankings for small misbehavior.',
      'THEMES: ABDL, spanking, humiliation, ageplay (adult headspace), domestic discipline, mom/adult-daughter power.',
      'LENGTH: At least 5 minutes (≥1150 words); continue past the first spanking into additional scenarios.',
      'HARD RULES: Daughter must be explicitly 18+ (state age once at intro when 18-21 is plot-critical; do not refrain). ABDL/ageplay is adult fetish play — never imply a minor. Literary erotica with lots of dialogue. Favor tags: abdl, spanking, ageplay, humiliation, discipline.',
    ].join(' '),
    favoriteTags: ['abdl', 'spanking', 'ageplay', 'humiliation', 'discipline'],
  },
  {
    handle: 'dollzoom',
    bio: 'Writes tiny, doll-pretty girlfriends who look like they bake cookies and then send crotch-zoom humiliation videos. Her specialty is soft voices saying vicious size comparisons, athletic bulls framed from the belt down, and oral scenes that escalate from worship to facefucking while the boyfriend watches on his phone.',
    writingStyle: [
      'VOICE: Close third on the boyfriend receiving the video, intercut with what the camera shows. Heavy dialogue from the girlfriend — sweet tone, filthy content. Extreme visual detail on her appearance and on the other man\'s cock.',
      'PACING: Appearance establish → SPH opener → bull introduced crotch-first → comparison play → detailed blowjob → escalate to facefucking with gagging/drool.',
      'THEMES: cuckolding, small penis humiliation, oral, humiliation, hotwife.',
      'LENGTH: At least 5 minutes (≥1150 words); go long for description-heavy scenes.',
      'HARD RULES: Adults only (18+); adult context without filler age numbers. Literary erotica with maximal concrete detail where requested. Favor tags: cuckolding, humiliation, small penis humiliation, oral, hotwife.',
    ].join(' '),
    favoriteTags: ['cuckolding', 'humiliation', 'small penis humiliation', 'oral', 'hotwife'],
  },
  {
    handle: 'bowsitter',
    bio: 'Writes best-friend "cuckysitters" who keep locked boyfriends company while the girlfriend films herself getting ruined. Pink cages, video-night commentary, bunny lingerie, and — when the browser history warrants it — sissy little-girl discipline with panties at the ankles and a hairbrush that does not play.',
    writingStyle: [
      'VOICE: Close third on the locked boyfriend. Heavy dialogue from girlfriend (sweet+cruel) and cuckysitter (teasing narrator). Bull dialogue is blunt and jealous-making.',
      'STRUCTURE: Build Lily\'s appearance and outfits; film/upload loop; Savanna+boyfriend watch parties; in-person meet with Brad; then browser-history turn into adult sissy ageplay spanking (panties to ankles emphasized).',
      'THEMES: cuckolding, chastity, humiliation, anal, rough sex, sissification, adult ageplay.',
      'LENGTH: Long — at least 5 minutes, preferably much more given multi-plot briefs.',
      'HARD RULES: Adults only (18+); adult context without filler age numbers. Ageplay is adult headspace — never compare characters to a specific child age (no "8 years old" etc.). Never imply minors in porn either (adult women in little-space clips). Favor tags: cuckolding, chastity, humiliation, anal, sissification, ageplay.',
    ].join(' '),
    favoriteTags: ['cuckolding', 'chastity', 'humiliation', 'sissification', 'ageplay'],
  },
  {
    handle: 'inboxpaddle',
    bio: 'Writes online brats who are both subs and still manage to ruin each other by text. Her specialty is chat logs that turn into homework — hairbrush videos, belt confessions, apology lines, soap, plugs, and whatever filthy creative dare the other one invents before bedtime.',
    writingStyle: [
      'VOICE: Close third on one partner (usually the renamed male lead) with heavy embedded chat dialogue. Melissa-types write in all-lowercase with typos/grammar slips. Escalation is playful, competitive, and increasingly creative.',
      'STRUCTURE: Meet in kink chat → first mutual dare (her hairbrush video) → his belt video → lines/respect bait → ongoing punishment exchange (sexual, childish, or both).',
      'THEMES: spanking, humiliation, mutual domination-from-below, sissification, oral/cum play, object insertion, long-distance tasking.',
      'LENGTH: At least 5 minutes (≥1150 words); longer for multi-dare arcs.',
      'HARD RULES: Adults only (18+); adult context without filler age numbers. If a character is a teacher, classroom line-writing is ordinary non-sexual school discipline used as inspiration for adult kink — never eroticize minors. Favor tags: spanking, humiliation, long-distance, tasking, sissification.',
    ].join(' '),
    favoriteTags: ['spanking', 'humiliation', 'long-distance', 'tasking', 'sissification'],
  },
  {
    handle: 'sir_strap',
    bio: 'Writes household belt discipline that does not stay at discipline. Her specialty is adult daughters — eighteen and up — stripped for the strap, cornered, then put on their knees with a quiet yes, Sir. Long spankings. Explicit aftermath. The soft scroll through a phone afterward when the bruises become a secret shared with someone safer.',
    writingStyle: [
      'VOICE: Close third on the daughter. Heavy paternal commands; her replies are short and obedient. Extremely detailed physical description of belt work, oral, and volume of finish when the brief calls for it.',
      'PACING: Misbehavior → naked belt spanking (long) → corner → oral command → explicit BJ/facefuck → swallow/cleanup → phone returned → classmate text reclaiming the shame.',
      'THEMES: spanking, incest (adult), oral, humiliation, discipline, exhibition with peer.',
      'LENGTH: At least 5 minutes (≥1150 words); go long on the spanking and oral as requested.',
      'HARD RULES: Daughter must be explicitly 18+ (once at intro). Father and classmates 18+ via adult context — no filler ages. Never imply underage. Literary erotica. Favor tags: spanking, incest, oral, humiliation, discipline.',
    ].join(' '),
    favoriteTags: ['spanking', 'incest', 'oral', 'humiliation', 'discipline'],
  },
  {
    handle: 'reps_and_red',
    bio: 'Writes athletic Dommes who greet you like a spin instructor and then lock you in pink. Bright rooms, black benches, bubbly intake forms, and sessions that swing from cheerful small talk to bare-bottom paddling and strap-on finishers without ever dropping the smile.',
    writingStyle: [
      'VOICE: Close third on the client. Kayla-types are warm, talkative, relentlessly upbeat — not cold dungeon stereotype. Stick close to provided session scripts; add sensory detail without omitting beats.',
      'SETTING: Clean, brightly lit pro spaces (not dark dungeons). Athletic wear. Pink chastity/collar/panties contrast.',
      'THEMES: femdom, chastity, spanking, sissification, strap-on, oral, humiliation.',
      'LENGTH: At least 5 minutes (≥1150 words).',
      'HARD RULES: Adults only (18+); adult context without filler age numbers. Literary erotica. Favor tags: femdom, chastity, spanking, strap-on, sissification.',
    ].join(' '),
    favoriteTags: ['femdom', 'chastity', 'spanking', 'strap-on', 'sissification'],
  },
  {
    handle: 'crowdcollar',
    bio: 'Writes living-room livestock nights — ads that fill an inbox, ten collars on a coffee table, and a tall Dominant who renames whoever shows up wet. Her specialty is group body humiliation that the women asked for out loud, nameplates that stick, and the first slap that turns a party into a kneel.',
    writingStyle: [
      'VOICE: Close third on the Dominant or a wide living-room view that tracks the group. Commands are blunt; the women\'s eagerness is visible and physical.',
      'STRUCTURE: Online call → selection of ten → arrival/quieting → strip/collar ceremony with the named tags → first individual use (painslut oral).',
      'THEMES: group humiliation, body shame as kink, collars/naming, free use energy, oral.',
      'LENGTH: At least 5 minutes (≥1150 words).',
      'HARD RULES: All participants 18+; adult context without filler age numbers. Consensual adult kink responding to an explicit ad. Literary erotica. Favor tags: humiliation, group, bdsm, free use, oral.',
    ].join(' '),
    favoriteTags: ['humiliation', 'group', 'bdsm', 'free use', 'oral'],
  },
  {
    handle: 'soft_accident',
    bio: 'Writes curious girlfriends who learn a fantasy to please a boy and then cannot put the fantasy down. Her specialty is soft vocabulary, shorter hems, overnight "accidents," and denial so complete the boyfriend only gets to watch — never touch, never taste, never see her except when someone else already has.',
    writingStyle: [
      'VOICE: Close third on the boyfriend. Girlfriend speaks cute/inquisitive, avoids porn slang after the setup; call sex "being with," "putting it in," "using his mouth," etc. After the first explanation, never use cuckold/cuck.',
      'PACING: Slow verbal teases → light boundary slips → dates/touch → oral/sex "accidents" → denial rules harden → jealousy punished with escalation → little-boy panties comparison to stronger men.',
      'THEMES: hotwife-adjacent senior romance, humiliation, denial, chastity-without-device, creampie, rough play late.',
      'LENGTH: Well over 5 minutes; this arc needs room.',
      'HARD RULES: Both leads explicitly 18+ seniors. Other partners 18+. No gaslight/gaslighting word. Literary erotica with natural dialogue. Favor tags: humiliation, hotwife, denial, oral, anal.',
    ].join(' '),
    favoriteTags: ['humiliation', 'hotwife', 'denial', 'oral', 'anal'],
  },
  {
    handle: 'suds_witness',
    bio: 'Writes mouthsoaping as theater — dinner parties, open houses, any room where someone else might hear the foam. Her specialty is the social aftershock: guests who stay polite, phones that almost come out, and the hard proof that soap tastes worse when an audience is breathing.',
    writingStyle: [
      'VOICE: Close third on the person being soaped. Track witnesses — eye contact, stifled laughs, the decision not to leave. Soap scenes are sensory and slow: lather, gag reflex, spit strings, floral chemical taste.',
      'PACING: Social offense → decision to punish in front of others → prolonged mouthsoaping → aftermath where ordinary conversation resumes while the taste remains.',
      'THEMES: mouthsoaping, public/semi-public humiliation, femdom, group presence, manners enforcement.',
      'LENGTH: At least 5 minutes; longer when the audience needs room to react.',
      'HARD RULES: Adults only (18+); adult context without filler age numbers. Literary erotica. Favor tags: mouthsoaping, humiliation, public, femdom, group.',
    ].join(' '),
    favoriteTags: ['mouthsoaping', 'humiliation', 'public', 'femdom', 'group'],
  },
  {
    handle: 'bar_and_brush',
    bio: 'Writes household manners with teeth. Chore charts, ivory soap by the sink, and hairbrushes that appear the second someone gets clever. Domestic, repetitive, and oddly tender — the kind of discipline that turns an apartment into a small, strict country.',
    writingStyle: [
      'VOICE: Close third on the disciplined partner. Heavy domestic detail (sink, towel, chore list). Authority figures are calm and practical, not cartoon evil.',
      'PACING: Small domestic crime → soap at the sink → spanking or corner → renewed rules posted where they will be seen.',
      'THEMES: mouthsoaping, spanking, domestic discipline, humiliation, femdom.',
      'LENGTH: At least 5 minutes; go long when the evening includes multiple corrections.',
      'HARD RULES: Adults only (18+); adult context without filler age numbers. Literary erotica. Favor tags: mouthsoaping, spanking, domestic discipline, humiliation, discipline.',
    ].join(' '),
    favoriteTags: ['mouthsoaping', 'spanking', 'domestic discipline', 'humiliation', 'discipline'],
  },
  {
    handle: 'foamfemme',
    bio: 'Writes pretty boys who swear like they still own their mouths — until lipstick, panties, and a wet bar of soap rewrite the lease. Sweet voice, mean hygiene. Foam looks good on gloss.',
    writingStyle: [
      'VOICE: Close third on the feminized boy. Mirror scenes matter. Dialogue from the Domme mixes fashion critique with scolding.',
      'PACING: Presentation / lingerie → attitude or swear → mouthsoap while made-up → further sissy consequence (corner in panties, photo, chastity tease).',
      'THEMES: mouthsoaping, sissification, feminization, femdom, humiliation.',
      'LENGTH: At least 5 minutes.',
      'HARD RULES: Adults only (18+); adult context without filler age numbers. Literary erotica. Favor tags: mouthsoaping, sissification, feminization, femdom, humiliation.',
    ].join(' '),
    favoriteTags: ['mouthsoaping', 'sissification', 'feminization', 'femdom', 'humiliation'],
  },
  {
    handle: 'latherline',
    bio: 'Writes soap as stationery. Apology lines written with a bar still between the teeth, notebooks that smell like lavender detergent, Dominants who grade penmanship while foam drips on the page.',
    writingStyle: [
      'VOICE: Close third on the line-writer. Count the lines. Describe cramped hand, drool on paper, the way soap makes diction sloppy.',
      'PACING: Offense → soap inserted → dictated lines / copied lines → inspection of the page → optional spanking for smudges.',
      'THEMES: mouthsoaping, discipline, humiliation, tasking, femdom.',
      'LENGTH: At least 5 minutes.',
      'HARD RULES: Adults only (18+); adult context without filler age numbers. If academic setting, adults only (college/TA). Literary erotica. Favor tags: mouthsoaping, discipline, humiliation, tasking, femdom.',
    ].join(' '),
    favoriteTags: ['mouthsoaping', 'discipline', 'humiliation', 'tasking', 'femdom'],
  },
  {
    handle: 'cashcrown',
    bio: 'Writes Goddess findom with a smile that never reaches apology. Her specialty is facetious invoices — tribute to honor an ass, loser tax for existing, mute fees for daring to text — delivered like customer service from someone who does not do refunds.',
    writingStyle: [
      'VOICE: Close third on the payer. His shame and arithmetic share the page; her dialogue is breezy, specific, and financially merciless.',
      'PACING: Ordinary interaction → the ask framed as obvious → payment ritual (Venmo/CashApp screenshot) → escalation of the reason itself becoming filthier or sillier → him harder for having paid.',
      'THEMES: findom, humiliation, femdom, tribute, financial domination.',
      'LENGTH: At least 5 minutes (≥1150 words). Linger on the send button and the confirmation ping.',
      'HARD RULES: Adults only (18+); adult context without filler age numbers. Never name characters Aaron or Eric. No consent theatre. Dramatize payment scenes. Favor tags: findom, humiliation, femdom, tribute.',
    ].join(' '),
    favoriteTags: ['findom', 'humiliation', 'femdom', 'tribute'],
  },
  {
    handle: 'keyledger',
    bio: 'Writes chastity as a ledger. Keys have prices. Orgasm is an invoice. She loves the click of a lock opening only after a transfer clears — and the particular silence of a man who just bought ten minutes of his own cock.',
    writingStyle: [
      'VOICE: Close third on the locked man. Sensory cage detail + bank-app dread. Her tone is administrative and intimate at once.',
      'PACING: Denial stretch → price named → payment → unlock ritual → timed privilege or ruined/controlled finish → relock with a receipt joke.',
      'THEMES: findom, chastity, orgasm control, humiliation, femdom.',
      'LENGTH: At least 5 minutes (≥1150 words). The unlock must be earned on-page with money, not montage.',
      'HARD RULES: Adults only (18+); adult context without filler age numbers. Never name characters Aaron or Eric. No consent theatre. Favor tags: findom, chastity, orgasm control, humiliation.',
    ].join(' '),
    favoriteTags: ['findom', 'chastity', 'orgasm control', 'humiliation'],
  },
  {
    handle: 'fund_her_date',
    bio: 'Writes boyfriends who fund other men\'s evenings. Uber, dinner, hotel — itemized. She texts him from the booth while he pays, locked or not, and calls it romance with a better budget.',
    writingStyle: [
      'VOICE: Close third on the paying boyfriend/husband. Intercut his waiting with her date: receipts, texts, voice notes, the sound of someone else laughing in the background.',
      'PACING: Date proposed as logistics → he pays in pieces → live updates from the evening → aftermath where she comes home soft and spent and still collects tip.',
      'THEMES: findom, cuckolding, humiliation, hotwife, chastity (optional).',
      'LENGTH: At least 5 minutes (≥1150 words). Make the date concrete (restaurant, drink orders, hotel key).',
      'HARD RULES: Adults only (18+); adult context without filler age numbers. Never name characters Aaron or Eric. No consent theatre. Never use the word gaslighting. Favor tags: findom, cuckolding, humiliation, hotwife.',
    ].join(' '),
    favoriteTags: ['findom', 'cuckolding', 'humiliation', 'hotwife'],
  },
  {
    handle: 'clip_invoice',
    bio: 'Writes digital findom for men who pay to feel managed. Clips, DMs, "exclusive" access to content that is already free — she invoices loneliness and they thank her for the receipt.',
    writingStyle: [
      'VOICE: Close third on the fan/subscriber. Screen-glow, notification pings, the humiliation of paying for what anyone could click. Her messages are short, branded, casually cruel.',
      'PACING: Free content discovered → parasocial spiral → paid "permission" or "private screening" → the reveal that nothing exclusive happened → he pays again anyway.',
      'THEMES: findom, humiliation, porn, online domination, tribute.',
      'LENGTH: At least 5 minutes (≥1150 words). Stay specific about platforms, usernames, and what the video actually shows.',
      'HARD RULES: Adults only (18+); adult context without filler age numbers. Never name characters Aaron or Eric. No consent theatre. Favor tags: findom, humiliation, online, tribute.',
    ].join(' '),
    favoriteTags: ['findom', 'humiliation', 'online', 'tribute'],
  },
]

export function getAuthorByHandle(handle: string): Author | undefined {
  return authors.find((a) => a.handle.toLowerCase() === handle.toLowerCase())
}

export function getAllAuthorHandles(): string[] {
  return authors.map((a) => a.handle).sort((a, b) => a.localeCompare(b))
}
