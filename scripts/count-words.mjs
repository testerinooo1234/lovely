/**
 * Word-count audit for story bodies.
 * Hard rule: every story must be at least a 5-minute read (1150 words at 230 WPM).
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

let failures = 0

for (const file of files) {
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
  const pageLiteral = text.slice(start, end)
  const pageCount = (pageLiteral.match(/^\s*\[$/gm) || []).length
  const paras = [...pageLiteral.matchAll(/`((?:\\`|[^`])*)`/g)].map((m) =>
    m[1].replace(/\\`/g, '`'),
  )
  const words = paras.join(' ').trim().split(/\s+/).filter(Boolean).length
  const mins = Math.max(1, Math.round(words / WPM))
  const under = words < MIN_WORDS
  if (under) failures += 1
  const flag = under ? ` ⚠ UNDER ${MIN_MINUTES} MIN` : ''
  console.log(
    `${file}: ${words} words (~${mins} min), ${paras.length} paras, ~${Math.max(1, pageCount - 1)} pages${flag}`,
  )
}

if (failures > 0) {
  console.error(
    `\n${failures} stor${failures === 1 ? 'y' : 'ies'} under the ${MIN_MINUTES}-minute minimum (${MIN_WORDS} words).`,
  )
  process.exit(1)
}

console.log(`\nAll stories meet the ${MIN_MINUTES}-minute minimum.`)

