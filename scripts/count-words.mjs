import fs from 'node:fs'
import path from 'node:path'

const dir = 'src/data/stories'
const files = fs.readdirSync(dir).filter((f) => f.endsWith('.ts') && f !== 'index.ts')

for (const file of files) {
  const text = fs.readFileSync(path.join(dir, file), 'utf8')
  const start = text.indexOf('pages:')
  const tags = text.indexOf('\n  tags:', start)
  const published = text.indexOf('\n  publishedAt:', start)
  const end = [tags, published].filter((n) => n > start).sort((a, b) => a - b)[0]
  if (start < 0 || end == null) {
    console.log(file, 'NO PAGES BLOCK')
    continue
  }
  const pageLiteral = text.slice(start, end)
  const pageCount = (pageLiteral.match(/^\s*\[$/gm) || []).length
  const paras = [...pageLiteral.matchAll(/`((?:\\`|[^`])*)`/g)].map((m) =>
    m[1].replace(/\\`/g, '`'),
  )
  const words = paras.join(' ').trim().split(/\s+/).filter(Boolean).length
  const mins = Math.max(1, Math.round(words / 230))
  const flag = words < 1150 ? ' ⚠ UNDER 5 MIN' : ''
  console.log(
    `${file}: ${words} words (~${mins} min), ${paras.length} paras, ~${Math.max(1, pageCount - 1)} pages${flag}`,
  )
}
