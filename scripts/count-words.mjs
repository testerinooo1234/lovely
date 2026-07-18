/**
 * Word-count audit for story bodies.
 * Hard rule: every story must be at least a 5-minute read (1150 words at 230 WPM).
 * Multi-chapter companions (`*-chapter-*.ts`) are folded into the parent story total.
 */
import fs from 'node:fs'
import path from 'node:path'

const WPM = 230
const MIN_MINUTES = 5
const MIN_WORDS = WPM * MIN_MINUTES

const dir = 'src/data/stories'
const files = fs
  .readdirSync(dir)
  .filter((f) => f.endsWith('.ts') && f !== 'index.ts')
  .sort()

const chapterFiles = new Set(
  files.filter((f) => /^.+-chapter-\d+\.ts$/.test(f)),
)
const mainFiles = files.filter((f) => !chapterFiles.has(f))

function extractParagraphs(text) {
  return [...text.matchAll(/`((?:\\`|[^`])*)`/g)].map((m) =>
    m[1].replace(/\\`/g, '`'),
  )
}

function countWords(paragraphs) {
  return paragraphs.join(' ').trim().split(/\s+/).filter(Boolean).length
}

let failures = 0

for (const file of mainFiles) {
  const text = fs.readFileSync(path.join(dir, file), 'utf8')
  const start = text.indexOf('pages:')
  const tags = text.indexOf('\n  tags:', start)
  const published = text.indexOf('\n  publishedAt:', start)
  const end = [tags, published].filter((n) => n > start).sort((a, b) => a - b)[0]
  if (start < 0 || end == null) {
    console.log(file, 'NO PAGES BLOCK')
    failures += 1
    continue
  }

  const base = file.replace(/\.ts$/, '')
  const companions = [...chapterFiles]
    .filter((f) => f.startsWith(`${base}-chapter-`))
    .sort()

  const pageLiteral = text.slice(start, end)
  const paras = extractParagraphs(pageLiteral)
  let words = countWords(paras)
  const chapterNotes = []

  for (const companion of companions) {
    const chapterText = fs.readFileSync(path.join(dir, companion), 'utf8')
    const chapterParas = extractParagraphs(chapterText)
    const chapterWords = countWords(chapterParas)
    const chapterMins = Math.max(1, Math.round(chapterWords / WPM))
    words += chapterWords
    chapterNotes.push(`${companion}=${chapterWords}w/~${chapterMins}m`)
  }

  const mins = Math.max(1, Math.round(words / WPM))
  const under = words < MIN_WORDS
  if (under) failures += 1
  const flag = under ? ` ⚠ UNDER ${MIN_MINUTES} MIN` : ''
  const chapterSuffix = chapterNotes.length
    ? `, chapters: ${chapterNotes.join(', ')}`
    : ''
  console.log(
    `${file}: ${words} words (~${mins} min), ${paras.length} paras${chapterSuffix}${flag}`,
  )
}

if (failures > 0) {
  console.error(
    `\n${failures} stor${failures === 1 ? 'y' : 'ies'} under the ${MIN_MINUTES}-minute minimum (${MIN_WORDS} words).`,
  )
  process.exit(1)
}

console.log(`\nAll stories meet the ${MIN_MINUTES}-minute minimum.`)
