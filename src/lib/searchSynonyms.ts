/**
 * Kink vocabulary aliases → related catalog terms.
 * Keys and values are lowercase. Searching a key also matches its values
 * (in title, author, excerpt, tags, and story body).
 */
export const SEARCH_SYNONYMS: Record<string, readonly string[]> = {
  // sissy / feminization family — "sissy" is NOT a substring of "sissification"
  sissy: ['sissification', 'feminization', 'sissies'],
  sissies: ['sissy', 'sissification', 'feminization'],
  sissification: ['sissy', 'sissies', 'feminization'],
  feminization: ['sissy', 'sissification', 'feminisation'],
  feminisation: ['feminization', 'sissy', 'sissification'],
  femboy: ['sissification', 'feminization'],
  crossdressing: ['sissification', 'feminization', 'lingerie'],
  crossdresser: ['sissification', 'feminization', 'lingerie'],

  // cuckolding
  cuck: ['cuckolding', 'hotwife', 'cuckold'],
  cuckold: ['cuckolding', 'hotwife'],
  cuckolding: ['cuckold', 'hotwife'],
  hotwife: ['cuckolding'],
  bull: ['cuckolding', 'hotwife'],

  // chastity / denial
  cage: ['chastity'],
  chastity: ['orgasm control', 'denial'],
  denial: ['orgasm control', 'chastity'],
  edging: ['orgasm control', 'denial'],

  // impact / discipline
  spank: ['spanking'],
  spanked: ['spanking'],
  spanking: ['discipline'],
  paddle: ['spanking', 'discipline'],
  hairbrush: ['spanking'],
  mouthsoap: ['mouthsoaping'],
  mouthsoaping: ['mouthsoap', 'discipline'],
  soaping: ['mouthsoaping'],

  // sex acts
  pegging: ['strap-on'],
  pegged: ['strap-on'],
  'strap on': ['strap-on'],
  strapon: ['strap-on'],
  bj: ['oral'],
  blowjob: ['oral'],
  'blow job': ['oral'],
  facials: ['bukkake', 'cum eating'],
  facial: ['bukkake', 'cum eating'],
  'cum eating': ['cumplay'],
  cumplay: ['cum eating'],
  creampie: ['cum eating'],

  // bi / group — avoid bare "bi" (matches inside ordinary words)
  'forced bi': ['forced-bi'],
  bisexual: ['forced-bi'],
  gangbang: ['group', 'bukkake', 'free use'],
  orgy: ['group', 'free use'],

  // ageplay / littles
  littlespace: ['ddlg', 'ageplay'],
  'little space': ['ddlg', 'ageplay'],
  babygirl: ['ddlg', 'ageplay'],
  diaper: ['abdl', 'ageplay'],
  diapers: ['abdl', 'ageplay'],
  abdl: ['ageplay', 'diaper'],
  ageplay: ['ddlg', 'abdl'],
  ddlg: ['ageplay', 'caregiver'],

  // bdsm umbrella
  domme: ['femdom', 'bdsm'],
  bondage: ['bdsm'],
  collar: ['bdsm', 'protocol'],
  collared: ['bdsm', 'protocol'],

  // humiliation variants
  sph: ['small penis humiliation', 'humiliation'],
  'small penis': ['small penis humiliation', 'humiliation'],

  // other catalog shortcuts
  feet: ['foot fetish'],
  foot: ['foot fetish'],
  voyeur: ['voyeurism'],
  panties: ['lingerie', 'sissification'],
  freeuse: ['free use'],
  'free-use': ['free use'],
  incest: ['taboo'],
  taboo: ['incest'],
}

/** Expand a user query into match terms (original + synonym aliases). */
export function expandSearchTerms(query: string): string[] {
  const q = query.trim().toLowerCase()
  if (!q) return []

  const terms = new Set<string>([q])

  const addAliases = (key: string) => {
    const aliases = SEARCH_SYNONYMS[key]
    if (!aliases) return
    for (const alias of aliases) terms.add(alias)
  }

  addAliases(q)

  // Token-level expansion for known keys only (avoids noisy short splits).
  for (const token of q.split(/[\s,_-]+/).filter(Boolean)) {
    if (token === q) continue
    if (SEARCH_SYNONYMS[token]) {
      terms.add(token)
      addAliases(token)
    }
  }

  return [...terms]
}
