import { promises as fs } from 'node:fs'
import path from 'node:path'

const appRoot = path.resolve('app/[locale]')

async function walk(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true })
  const files = []
  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name)
    if (entry.isDirectory()) files.push(...await walk(fullPath))
    else if (entry.name === 'page.tsx') files.push(fullPath)
  }
  return files
}

for (const file of await walk(appRoot)) {
  let source = await fs.readFile(file, 'utf8')
  if (!source.includes('export async function generateMetadata')) continue

  const metadataStart = source.indexOf('export async function generateMetadata')
  const metadataEnd = source.indexOf('export default', metadataStart)
  const before = source.slice(0, metadataStart)
  let metadataBlock = source.slice(metadataStart, metadataEnd)
  const after = source.slice(metadataEnd)

  if (metadataBlock.includes('alternates:') || metadataBlock.includes('generateToolMetadata(')) continue

  const relativeDirectory = path.relative(appRoot, path.dirname(file)).replaceAll('\\', '/')
  const routePath = relativeDirectory ? `/${relativeDirectory}` : '/'
  const localeExpression = metadataBlock.includes('const locale = resolvedParams.locale')
    ? 'locale'
    : 'resolvedParams.locale'

  metadataBlock = metadataBlock.replace(
    /return\s*\{/,
    `return {\n\t\t...generatePageMetadata({ title: t('title'), description: t('description'), locale: ${localeExpression}, path: '${routePath}' }),`
  )

  if (!source.includes("from '@/lib/metadata-utils'")) {
    source = `import { generatePageMetadata } from '@/lib/metadata-utils'\n${before}${metadataBlock}${after}`
  } else {
    source = `${before}${metadataBlock}${after}`
  }

  await fs.writeFile(file, source)
  console.log(path.relative(process.cwd(), file))
}
