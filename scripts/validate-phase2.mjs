import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const failures = []

function walk(directory) {
	return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
		const fullPath = path.join(directory, entry.name)
		return entry.isDirectory() ? walk(fullPath) : [fullPath]
	})
}

function flatten(value, prefix = '', output = {}) {
	if (value && typeof value === 'object' && !Array.isArray(value)) {
		for (const [key, child] of Object.entries(value)) {
			flatten(child, prefix ? `${prefix}.${key}` : key, output)
		}
	} else {
		output[prefix] = value
	}
	return output
}

const englishLocaleDirectory = path.join(root, 'locales', 'en')
for (const file of fs.readdirSync(englishLocaleDirectory).filter((name) => name.endsWith('.json'))) {
	const english = flatten(JSON.parse(fs.readFileSync(path.join(englishLocaleDirectory, file), 'utf8')))
	for (const locale of ['ru', 'de', 'es']) {
		const localizedPath = path.join(root, 'locales', locale, file)
		if (!fs.existsSync(localizedPath)) {
			failures.push(`Missing locale file: locales/${locale}/${file}`)
			continue
		}
		const localized = flatten(JSON.parse(fs.readFileSync(localizedPath, 'utf8')))
		for (const key of Object.keys(english)) {
			if (!(key in localized)) failures.push(`Missing translation key: ${locale}/${file}:${key}`)
		}
	}
}

const pages = walk(path.join(root, 'app', '[locale]')).filter((file) => file.endsWith('page.tsx'))
for (const page of pages) {
	const source = fs.readFileSync(page, 'utf8')
	if (!source.includes('generateMetadata')) continue
	if (!source.includes('generatePageMetadata') && !source.includes('generateToolMetadata') && !source.includes('alternates:')) {
		failures.push(`Metadata is missing centralized alternates: ${path.relative(root, page)}`)
	}
}

const sourceFiles = walk(path.join(root, 'app')).concat(walk(path.join(root, 'lib')))
const ogAssets = new Set()
for (const file of sourceFiles) {
	if (!/\.(ts|tsx)$/.test(file)) continue
	for (const match of fs.readFileSync(file, 'utf8').matchAll(/(?:\/|\b)(og-[\w-]+\.(?:jpg|png|webp|svg))/g)) {
		ogAssets.add(match[1])
	}
}
for (const asset of ogAssets) {
	if (!fs.existsSync(path.join(root, 'public', asset))) failures.push(`Missing Open Graph asset: public/${asset}`)
}

if (failures.length) {
	console.error(failures.join('\n'))
	console.error(`Phase 2 static validation failed with ${failures.length} issue(s).`)
	process.exitCode = 1
} else {
	console.log(`Phase 2 static validation passed (${pages.length} pages, ${ogAssets.size} OG asset references).`)
}
