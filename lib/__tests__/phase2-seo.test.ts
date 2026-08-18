import fs from 'node:fs'
import path from 'node:path'
import sitemap from '@/app/sitemap'
import { getAvailableLocales, getLocalizedAlternates } from '@/lib/metadata-utils'

const root = process.cwd()

function walk(directory: string): string[] {
	return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
		const fullPath = path.join(directory, entry.name)
		return entry.isDirectory() ? walk(fullPath) : [fullPath]
	})
}

function flatten(value: unknown, prefix = '', output: Record<string, unknown> = {}) {
	if (value && typeof value === 'object' && !Array.isArray(value)) {
		for (const [key, child] of Object.entries(value)) flatten(child, prefix ? `${prefix}.${key}` : key, output)
	} else output[prefix] = value
	return output
}

describe('Phase 2 SEO baseline', () => {
	it('provides self-referential hreflang and x-default', () => {
		const alternates = getLocalizedAlternates('es', '/tools/color-lab')
		const languages = alternates.languages as Record<string, string>
		expect(alternates.canonical).toBe('https://pipetkaonline.ru/es/tools/color-lab')
		expect(languages.es).toBe(alternates.canonical)
		expect(languages['x-default']).toBe('https://pipetkaonline.ru/ru/tools/color-lab')
	})

	it('does not advertise incomplete DE/ES detailed guides', () => {
		expect(getAvailableLocales('/learn/formats/hex')).toEqual(['ru', 'en'])
		expect(getLocalizedAlternates('ru', '/learn/formats/hex').languages).not.toHaveProperty('de')
	})

	it('generates a unique canonical sitemap without fake lastModified values', () => {
		const entries = sitemap()
		const urls = entries.map((entry) => entry.url)
		expect(entries).toHaveLength(160)
		expect(new Set(urls).size).toBe(entries.length)
		for (const entry of entries) {
			expect(entry.lastModified).toBeUndefined()
			expect(entry.alternates?.languages).toHaveProperty('x-default')
			expect(Object.values(entry.alternates?.languages ?? {})).toContain(entry.url)
		}
	})

	it('covers every indexable page metadata function with centralized alternates', () => {
		const pages = walk(path.join(root, 'app', '[locale]')).filter((file) => file.endsWith('page.tsx'))
		for (const page of pages) {
			const source = fs.readFileSync(page, 'utf8')
			if (!source.includes('generateMetadata')) continue
			expect(source.includes('generatePageMetadata') || source.includes('generateToolMetadata') || source.includes('alternates:')).toBe(true)
		}
	})

	it('has no missing translation keys for indexable locale families', () => {
		const englishFiles = fs.readdirSync(path.join(root, 'locales', 'en')).filter((file) => file.endsWith('.json'))
		for (const file of englishFiles) {
			const english = flatten(JSON.parse(fs.readFileSync(path.join(root, 'locales', 'en', file), 'utf8')))
			for (const locale of ['ru', 'de', 'es']) {
				const translated = flatten(JSON.parse(fs.readFileSync(path.join(root, 'locales', locale, file), 'utf8')))
				for (const key of Object.keys(english)) expect(Object.prototype.hasOwnProperty.call(translated, key)).toBe(true)
			}
		}
	})

	it('references only existing local Open Graph assets', () => {
		const files = walk(path.join(root, 'app')).concat(walk(path.join(root, 'lib')))
		const references = files.flatMap((file) => {
			if (!/\.(ts|tsx)$/.test(file)) return []
			return Array.from(fs.readFileSync(file, 'utf8').matchAll(/(?:\/|\b)(og-[\w-]+\.(?:jpg|png|webp|svg))/g)).map((match) => match[1])
		})
		for (const asset of Array.from(new Set(references))) expect(fs.existsSync(path.join(root, 'public', asset))).toBe(true)
	})
})
