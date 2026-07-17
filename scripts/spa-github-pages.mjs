/**
 * GitHub Pages serves 404.html for unknown deep links on project sites.
 * Copying the built index.html there lets /browse, /authors, etc. boot the
 * SPA in place — no redirect flash / blank white screen on refresh.
 */
import { copyFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'

const dist = resolve(import.meta.dirname, '../dist')
const index = resolve(dist, 'index.html')
const notFound = resolve(dist, '404.html')

if (!existsSync(index)) {
  console.error('spa-github-pages: dist/index.html missing — run vite build first')
  process.exit(1)
}

copyFileSync(index, notFound)
console.log('spa-github-pages: wrote dist/404.html')
