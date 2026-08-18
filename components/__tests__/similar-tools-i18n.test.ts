import { similarToolsMap } from '@/components/similar-tools'
import toolsRu from '@/locales/ru/tools.json'
import toolsEn from '@/locales/en/tools.json'
import toolsDe from '@/locales/de/tools.json'
import toolsEs from '@/locales/es/tools.json'

const dictionaries = { ru: toolsRu, en: toolsEn, de: toolsDe, es: toolsEs }

function hasRuntimePath(dictionary: Record<string, unknown>, path: string): boolean {
	if (path in dictionary) return true

	let current: unknown = dictionary
	for (const part of path.split('.')) {
		if (!current || typeof current !== 'object' || !(part in current)) return false
		current = (current as Record<string, unknown>)[part]
	}

	return typeof current === 'string'
}

describe('SimilarTools localization', () => {
	it.each(Object.entries(dictionaries))(
		'resolves every title key for %s client navigation',
		(_locale, dictionary) => {
			const titleKeys = new Set(
				Object.values(similarToolsMap).flatMap((tools) => tools.map((tool) => tool.titleKey))
			)

			for (const titleKey of titleKeys) {
				expect(hasRuntimePath(dictionary, titleKey)).toBe(true)
			}
		}
	)

	it.each(Object.entries(dictionaries))(
		'contains all required legacy tool titles for %s',
		(_locale, dictionary) => {
			for (const key of ['picker', 'palette', 'contrast', 'converter', 'harmony', 'gradient']) {
				expect(dictionary).toHaveProperty([`tools.${key}.title`])
			}
		}
	)
})
