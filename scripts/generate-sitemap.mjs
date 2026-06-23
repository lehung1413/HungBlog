import { writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const siteUrl = process.env.VITE_SITE_URL ?? 'https://hungblog.vercel.app'
const locales = ['en', 'vi']
const staticPaths = ['', '/portfolio', '/blog', '/contact']

const urls = locales.flatMap((lang) =>
  staticPaths.map((path) => `  <url><loc>${siteUrl}/${lang}${path}</loc></url>`),
)

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>
`

writeFileSync(join(__dirname, '../dist/sitemap.xml'), sitemap)
console.log('Generated sitemap.xml')
