import { notFound } from 'next/navigation'
import { getRequestConfig } from 'next-intl/server'

/**
 * Supported locales for the application
 */
export const locales = ['ru', 'en', 'de', 'es'] as const

/**
 * Type definition for supported locales
 */
export type Locale = (typeof locales)[number]

/**
 * Default locale for the application
 */
export const defaultLocale: Locale = 'ru'

/**
 * Converts flat keys with dots to nested structure
 * Example: { "nav.home": "Home" } -> { nav: { home: "Home" } }
 * Handles empty objects and already nested structures
 */
function nestMessages(flatMessages: Record<string, any>): Record<string, any> {
	// Return empty object if input is empty or invalid
	if (!flatMessages || typeof flatMessages !== 'object' || Array.isArray(flatMessages)) {
		return {}
	}

	const nested: Record<string, any> = {}

	for (const [key, value] of Object.entries(flatMessages)) {
		// Skip if key is empty
		if (!key) continue

		const keys = key.split('.')
		let current = nested

		for (let i = 0; i < keys.length - 1; i++) {
			const k = keys[i]
			if (!k) continue

			if (!(k in current) || typeof current[k] !== 'object' || Array.isArray(current[k])) {
				current[k] = {}
			}
			current = current[k]
		}

		const lastKey = keys[keys.length - 1]
		if (lastKey) {
			current[lastKey] = value
		}
	}

	return nested
}

/**
 * Configuration for next-intl
 * Loads translation files based on the current locale
 */
export default getRequestConfig(async ({ locale }) => {
	// Validate that the incoming `locale` parameter is valid
	if (!locales.includes(locale as Locale)) {
		notFound()
	}

	// Load all translation files using dynamic imports with error handling
	// Use Promise.allSettled to handle missing files gracefully
	const translationModules = await Promise.allSettled([
		import(`./locales/${locale}/common.json`),
		import(`./locales/${locale}/home.json`),
		import(`./locales/${locale}/tools.json`),
		import(`./locales/${locale}/learn.json`),
		import(`./locales/${locale}/footer.json`),
		import(`./locales/${locale}/privacy.json`),
		import(`./locales/${locale}/cookies.json`),
		import(`./locales/${locale}/terms.json`),
		import(`./locales/${locale}/about.json`),
		import(`./locales/${locale}/contact.json`),
		// Fundamentals subpages
		import(`./locales/${locale}/learn-fundamentals-rgb-cmyk.json`),
		import(`./locales/${locale}/learn-fundamentals-color-wheel.json`),
		import(`./locales/${locale}/learn-fundamentals-warm-cool.json`),
		import(`./locales/${locale}/learn-fundamentals-saturation-brightness.json`),
		// Harmony subpages
		import(`./locales/${locale}/learn-harmony-complementary.json`),
		import(`./locales/${locale}/learn-harmony-analogous.json`),
		import(`./locales/${locale}/learn-harmony-triadic.json`),
		import(`./locales/${locale}/learn-harmony-split-complementary.json`),
		// Psychology subpages
		import(`./locales/${locale}/learn-psychology-cultural.json`),
		import(`./locales/${locale}/learn-psychology-emotions.json`),
		import(`./locales/${locale}/learn-psychology-branding.json`),
		import(`./locales/${locale}/learn-psychology-marketing.json`),
		// Accessibility subpages
		import(`./locales/${locale}/learn-accessibility-wcag.json`),
		import(`./locales/${locale}/learn-accessibility-color-blindness.json`),
		import(`./locales/${locale}/learn-accessibility-readability.json`),
		import(`./locales/${locale}/learn-accessibility-alternatives.json`),
		// Formats subpages
		import(`./locales/${locale}/learn-formats-hex.json`),
		import(`./locales/${locale}/learn-formats-rgb.json`),
		import(`./locales/${locale}/learn-formats-hsl.json`),
		import(`./locales/${locale}/learn-formats-css.json`),
	])

	// Extract default exports with fallback to empty object
	const getModule = (index: number) => {
		const result = translationModules[index]
		if (result.status === 'fulfilled') {
			return result.value.default || result.value || {}
		}
		console.warn(`Failed to load translation file ${index} for locale ${locale}`)
		return {}
	}

	const common = getModule(0)
	const home = getModule(1)
	const tools = getModule(2)
	const learn = getModule(3)
	const footer = getModule(4)
	const privacy = getModule(5)
	const cookies = getModule(6)
	const terms = getModule(7)
	const about = getModule(8)
	const contact = getModule(9)
	// Fundamentals subpages
	const learnFundamentalsRgbCmyk = getModule(10)
	const learnFundamentalsColorWheel = getModule(11)
	const learnFundamentalsWarmCool = getModule(12)
	const learnFundamentalsSaturationBrightness = getModule(13)
	// Harmony subpages
	const learnHarmonyComplementary = getModule(14)
	const learnHarmonyAnalogous = getModule(15)
	const learnHarmonyTriadic = getModule(16)
	const learnHarmonySplitComplementary = getModule(17)
	// Psychology subpages
	const learnPsychologyCultural = getModule(18)
	const learnPsychologyEmotions = getModule(19)
	const learnPsychologyBranding = getModule(20)
	const learnPsychologyMarketing = getModule(21)
	// Accessibility subpages
	const learnAccessibilityWcag = getModule(22)
	const learnAccessibilityColorBlindness = getModule(23)
	const learnAccessibilityReadability = getModule(24)
	const learnAccessibilityAlternatives = getModule(25)
	// Formats subpages
	const learnFormatsHex = getModule(26)
	const learnFormatsRgb = getModule(27)
	const learnFormatsHsl = getModule(28)
	const learnFormatsCss = getModule(29)

	// Convert flat keys to nested structure for next-intl
	// Only apply nestMessages to files with flat keys (like common.json)
	// Other files already have nested structure
	const nestedCommon = nestMessages(common)
	const nestedHome = nestMessages(home)
	const nestedTools = nestMessages(tools)
	const nestedLearn = nestMessages(learn)
	
	// Files with already nested structure don't need nestMessages
	// They are already in the correct format
	const nestedFooter = footer && typeof footer === 'object' && !Array.isArray(footer) ? footer : {}
	const nestedPrivacy = privacy && typeof privacy === 'object' && !Array.isArray(privacy) ? privacy : {}
	const nestedCookies = cookies && typeof cookies === 'object' && !Array.isArray(cookies) ? cookies : {}
	const nestedTerms = terms && typeof terms === 'object' && !Array.isArray(terms) ? terms : {}
	const nestedAbout = about && typeof about === 'object' && !Array.isArray(about) ? about : {}
	const nestedContact = contact && typeof contact === 'object' && !Array.isArray(contact) ? contact : {}
	
	// Helper function to safely nest translation objects
	const safeNest = (obj: any) => obj && typeof obj === 'object' && !Array.isArray(obj) ? obj : {}

	// Combine all translations with namespaces
	// Common translations go to root level, others are namespaced
	const messages = {
		...nestedCommon,
		home: nestedHome,
		tools: nestedTools,
		learn: {
			...nestedLearn,
			fundamentals: {
				rgbCmyk: safeNest(learnFundamentalsRgbCmyk),
				colorWheel: safeNest(learnFundamentalsColorWheel),
				warmCool: safeNest(learnFundamentalsWarmCool),
				saturationBrightness: safeNest(learnFundamentalsSaturationBrightness),
			},
			harmony: {
				complementary: safeNest(learnHarmonyComplementary),
				analogous: safeNest(learnHarmonyAnalogous),
				triadic: safeNest(learnHarmonyTriadic),
				splitComplementary: safeNest(learnHarmonySplitComplementary),
			},
			psychology: {
				cultural: safeNest(learnPsychologyCultural),
				emotions: safeNest(learnPsychologyEmotions),
				branding: safeNest(learnPsychologyBranding),
				marketing: safeNest(learnPsychologyMarketing),
			},
			accessibility: {
				wcag: safeNest(learnAccessibilityWcag),
				colorBlindness: safeNest(learnAccessibilityColorBlindness),
				readability: safeNest(learnAccessibilityReadability),
				alternatives: safeNest(learnAccessibilityAlternatives),
			},
			formats: {
				hex: safeNest(learnFormatsHex),
				rgb: safeNest(learnFormatsRgb),
				hsl: safeNest(learnFormatsHsl),
				css: safeNest(learnFormatsCss),
			},
		},
		footer: nestedFooter,
		privacy: nestedPrivacy,
		cookies: nestedCookies,
		terms: nestedTerms,
		about: nestedAbout,
		contact: nestedContact,
	}

	return { messages }
})


