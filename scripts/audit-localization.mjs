import fs from 'node:fs'
import path from 'node:path'

const locales = ['ru', 'en', 'de', 'es']
const requiredLegacyTitles = ['picker', 'palette', 'contrast', 'converter', 'harmony', 'gradient']
const similarToolsSource = fs.readFileSync(path.join('components', 'similar-tools.tsx'), 'utf8')
const similarToolTitleKeys = Array.from(
	new Set(Array.from(similarToolsSource.matchAll(/titleKey:\s*'([^']+)'/g), (match) => match[1]))
)

function flatten(value, prefix = '', result = new Set()) {
	for (const [key, child] of Object.entries(value)) {
		const current = prefix ? `${prefix}.${key}` : key
		if (child && typeof child === 'object' && !Array.isArray(child)) {
			flatten(child, current, result)
		} else {
			result.add(current)
		}
	}
	return result
}

const dictionaries = Object.fromEntries(
	locales.map((locale) => [
		locale,
		JSON.parse(fs.readFileSync(path.join('locales', locale, 'tools.json'), 'utf8')),
	])
)

function hasRuntimePath(dictionary, key) {
	if (Object.hasOwn(dictionary, key)) return true

	let current = dictionary
	for (const part of key.split('.')) {
		if (!current || typeof current !== 'object' || !Object.hasOwn(current, part)) return false
		current = current[part]
	}
	return typeof current === 'string'
}

const structures = Object.fromEntries(
	locales.map((locale) => [locale, flatten(dictionaries[locale])])
)
const union = new Set(locales.flatMap((locale) => Array.from(structures[locale])))
const report = Object.fromEntries(locales.map((locale) => {
	const missingUsedTitles = similarToolTitleKeys.filter(
		(key) => !hasRuntimePath(dictionaries[locale], key)
	)
	const missingRequiredTitles = requiredLegacyTitles
		.map((key) => `tools.${key}.title`)
		.filter((key) => !hasRuntimePath(dictionaries[locale], key))
	const missingStructure = Array.from(union).filter((key) => !structures[locale].has(key))
	const localeOnly = Array.from(structures[locale]).filter((key) =>
		locales.every((other) => other === locale || !structures[other].has(key))
	)

	return [locale, {
		leafKeys: structures[locale].size,
		missingUsedTitles,
		missingRequiredTitles,
		missingStructure,
		localeOnly,
	}]
}))

console.log(JSON.stringify({ usedToolTitleKeys: similarToolTitleKeys, report }, null, 2))

if (Object.values(report).some(({ missingUsedTitles, missingRequiredTitles }) =>
	missingUsedTitles.length > 0 || missingRequiredTitles.length > 0
)) {
	process.exitCode = 1
}
