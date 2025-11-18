/**
 * Internationalization (i18n) Configuration
 * 
 * This module configures next-intl for the application, providing:
 * - Locale definitions and default locale
 * - Translation message loading and processing
 * - Message structure transformation (flat to nested)
 * - Multi-locale support (Russian, English, German, Spanish)
 * 
 * Architecture:
 * - All translation files are statically imported at build time
 * - Messages are processed and nested for next-intl compatibility
 * - Complex structures (tools, learn) are handled with special processors
 * - All messages are validated and serialized before use
 * 
 * Supported Locales:
 * - ru (Russian) - default
 * - en (English)
 * - de (German)
 * - es (Spanish)
 * 
 * Translation Structure:
 * - common.json - Common UI elements (navigation, buttons, etc.)
 * - home.json - Home page content
 * - tools.json - Tools section (with nested tool definitions)
 * - learn.json - Learning section (with nested sub-sections)
 * - footer.json - Footer content
 * - Legal pages: privacy.json, cookies.json, terms.json
 * - Contact pages: about.json, contact.json
 * 
 * Learn Sub-sections:
 * The learn section has a complex nested structure with multiple sub-sections:
 * - formats/ - Color format guides (hex, rgb, hsl, css)
 * - fundamentals/ - Basic color theory (color-wheel, rgb-cmyk, warm-cool, saturation-brightness)
 * - harmony/ - Color harmony guides (complementary, analogous, triadic, split-complementary)
 * - psychology/ - Color psychology (cultural, emotions, branding, marketing)
 * - accessibility/ - Accessibility guides (wcag, color-blindness, readability, alternatives)
 * 
 * @module i18n
 * @see https://next-intl.dev/docs/getting-started/app-router
 */

import { getRequestConfig } from 'next-intl/server'
import { notFound } from 'next/navigation'

/**
 * Static Imports - Translation Files
 * 
 * All translation files are statically imported to avoid webpack issues
 * with dynamic imports. This ensures all translations are available at build time
 * and properly bundled.
 * 
 * Note: Dynamic imports can cause issues with Next.js static generation
 * and webpack bundling, so we use static imports for all translation files.
 */
import commonRu from './locales/ru/common.json'
import homeRu from './locales/ru/home.json'
import toolsRu from './locales/ru/tools.json'
import learnRu from './locales/ru/learn.json'
import footerRu from './locales/ru/footer.json'
import privacyRu from './locales/ru/privacy.json'
import cookiesRu from './locales/ru/cookies.json'
import termsRu from './locales/ru/terms.json'
import aboutRu from './locales/ru/about.json'
import contactRu from './locales/ru/contact.json'

// Learn sub-sections for Russian
import learnFormatsRu from './locales/ru/learn-formats.json'
import learnFormatsHexRu from './locales/ru/learn-formats-hex.json'
import learnFormatsRgbRu from './locales/ru/learn-formats-rgb.json'
import learnFormatsHslRu from './locales/ru/learn-formats-hsl.json'
import learnFormatsCssRu from './locales/ru/learn-formats-css.json'
import learnFundamentalsRu from './locales/ru/learn-fundamentals.json'
import learnFundamentalsRgbCmykRu from './locales/ru/learn-fundamentals-rgb-cmyk.json'
import learnFundamentalsColorWheelRu from './locales/ru/learn-fundamentals-color-wheel.json'
import learnFundamentalsWarmCoolRu from './locales/ru/learn-fundamentals-warm-cool.json'
import learnFundamentalsSaturationBrightnessRu from './locales/ru/learn-fundamentals-saturation-brightness.json'
import learnHarmonyRu from './locales/ru/learn-harmony.json'
import learnHarmonyComplementaryRu from './locales/ru/learn-harmony-complementary.json'
import learnHarmonyAnalogousRu from './locales/ru/learn-harmony-analogous.json'
import learnHarmonyTriadicRu from './locales/ru/learn-harmony-triadic.json'
import learnHarmonySplitComplementaryRu from './locales/ru/learn-harmony-split-complementary.json'
import learnPsychologyRu from './locales/ru/learn-psychology.json'
import learnPsychologyCulturalRu from './locales/ru/learn-psychology-cultural.json'
import learnPsychologyEmotionsRu from './locales/ru/learn-psychology-emotions.json'
import learnPsychologyBrandingRu from './locales/ru/learn-psychology-branding.json'
import learnPsychologyMarketingRu from './locales/ru/learn-psychology-marketing.json'
import learnAccessibilityRu from './locales/ru/learn-accessibility.json'
import learnAccessibilityWcagRu from './locales/ru/learn-accessibility-wcag.json'
import learnAccessibilityColorBlindnessRu from './locales/ru/learn-accessibility-color-blindness.json'
import learnAccessibilityReadabilityRu from './locales/ru/learn-accessibility-readability.json'
import learnAccessibilityAlternativesRu from './locales/ru/learn-accessibility-alternatives.json'

import commonEn from './locales/en/common.json'
import homeEn from './locales/en/home.json'
import toolsEn from './locales/en/tools.json'
import learnEn from './locales/en/learn.json'
import footerEn from './locales/en/footer.json'
import privacyEn from './locales/en/privacy.json'
import cookiesEn from './locales/en/cookies.json'
import termsEn from './locales/en/terms.json'
import aboutEn from './locales/en/about.json'
import contactEn from './locales/en/contact.json'

// Learn sub-sections for English
import learnFormatsEn from './locales/en/learn-formats.json'
import learnFormatsHexEn from './locales/en/learn-formats-hex.json'
import learnFormatsRgbEn from './locales/en/learn-formats-rgb.json'
import learnFormatsHslEn from './locales/en/learn-formats-hsl.json'
import learnFormatsCssEn from './locales/en/learn-formats-css.json'
import learnFundamentalsEn from './locales/en/learn-fundamentals.json'
import learnFundamentalsRgbCmykEn from './locales/en/learn-fundamentals-rgb-cmyk.json'
import learnFundamentalsColorWheelEn from './locales/en/learn-fundamentals-color-wheel.json'
import learnFundamentalsWarmCoolEn from './locales/en/learn-fundamentals-warm-cool.json'
import learnFundamentalsSaturationBrightnessEn from './locales/en/learn-fundamentals-saturation-brightness.json'
import learnHarmonyEn from './locales/en/learn-harmony.json'
import learnHarmonyComplementaryEn from './locales/en/learn-harmony-complementary.json'
import learnHarmonyAnalogousEn from './locales/en/learn-harmony-analogous.json'
import learnHarmonyTriadicEn from './locales/en/learn-harmony-triadic.json'
import learnHarmonySplitComplementaryEn from './locales/en/learn-harmony-split-complementary.json'
import learnPsychologyEn from './locales/en/learn-psychology.json'
import learnPsychologyCulturalEn from './locales/en/learn-psychology-cultural.json'
import learnPsychologyEmotionsEn from './locales/en/learn-psychology-emotions.json'
import learnPsychologyBrandingEn from './locales/en/learn-psychology-branding.json'
import learnPsychologyMarketingEn from './locales/en/learn-psychology-marketing.json'
import learnAccessibilityEn from './locales/en/learn-accessibility.json'
import learnAccessibilityWcagEn from './locales/en/learn-accessibility-wcag.json'
import learnAccessibilityColorBlindnessEn from './locales/en/learn-accessibility-color-blindness.json'
import learnAccessibilityReadabilityEn from './locales/en/learn-accessibility-readability.json'
import learnAccessibilityAlternativesEn from './locales/en/learn-accessibility-alternatives.json'

import commonDe from './locales/de/common.json'
import homeDe from './locales/de/home.json'
import toolsDe from './locales/de/tools.json'
import learnDe from './locales/de/learn.json'
import footerDe from './locales/de/footer.json'
import privacyDe from './locales/de/privacy.json'
import cookiesDe from './locales/de/cookies.json'
import termsDe from './locales/de/terms.json'
import aboutDe from './locales/de/about.json'
import contactDe from './locales/de/contact.json'

// Learn sub-sections for German
import learnFormatsDe from './locales/de/learn-formats.json'
import learnFormatsHexDe from './locales/de/learn-formats-hex.json'
import learnFormatsRgbDe from './locales/de/learn-formats-rgb.json'
import learnFormatsHslDe from './locales/de/learn-formats-hsl.json'
import learnFormatsCssDe from './locales/de/learn-formats-css.json'
import learnFundamentalsDe from './locales/de/learn-fundamentals.json'
import learnFundamentalsRgbCmykDe from './locales/de/learn-fundamentals-rgb-cmyk.json'
import learnFundamentalsColorWheelDe from './locales/de/learn-fundamentals-color-wheel.json'
import learnFundamentalsWarmCoolDe from './locales/de/learn-fundamentals-warm-cool.json'
import learnFundamentalsSaturationBrightnessDe from './locales/de/learn-fundamentals-saturation-brightness.json'
import learnHarmonyDe from './locales/de/learn-harmony.json'
import learnHarmonyComplementaryDe from './locales/de/learn-harmony-complementary.json'
import learnHarmonyAnalogousDe from './locales/de/learn-harmony-analogous.json'
import learnHarmonyTriadicDe from './locales/de/learn-harmony-triadic.json'
import learnHarmonySplitComplementaryDe from './locales/de/learn-harmony-split-complementary.json'
import learnPsychologyDe from './locales/de/learn-psychology.json'
import learnPsychologyCulturalDe from './locales/de/learn-psychology-cultural.json'
import learnPsychologyEmotionsDe from './locales/de/learn-psychology-emotions.json'
import learnPsychologyBrandingDe from './locales/de/learn-psychology-branding.json'
import learnPsychologyMarketingDe from './locales/de/learn-psychology-marketing.json'
import learnAccessibilityDe from './locales/de/learn-accessibility.json'
import learnAccessibilityWcagDe from './locales/de/learn-accessibility-wcag.json'
import learnAccessibilityColorBlindnessDe from './locales/de/learn-accessibility-color-blindness.json'
import learnAccessibilityReadabilityDe from './locales/de/learn-accessibility-readability.json'
import learnAccessibilityAlternativesDe from './locales/de/learn-accessibility-alternatives.json'

import commonEs from './locales/es/common.json'
import homeEs from './locales/es/home.json'
import toolsEs from './locales/es/tools.json'
import learnEs from './locales/es/learn.json'
import footerEs from './locales/es/footer.json'
import privacyEs from './locales/es/privacy.json'
import cookiesEs from './locales/es/cookies.json'
import termsEs from './locales/es/terms.json'
import aboutEs from './locales/es/about.json'
import contactEs from './locales/es/contact.json'

// Learn sub-sections for Spanish
import learnFormatsEs from './locales/es/learn-formats.json'
import learnFormatsHexEs from './locales/es/learn-formats-hex.json'
import learnFormatsRgbEs from './locales/es/learn-formats-rgb.json'
import learnFormatsHslEs from './locales/es/learn-formats-hsl.json'
import learnFormatsCssEs from './locales/es/learn-formats-css.json'
import learnFundamentalsEs from './locales/es/learn-fundamentals.json'
import learnFundamentalsRgbCmykEs from './locales/es/learn-fundamentals-rgb-cmyk.json'
import learnFundamentalsColorWheelEs from './locales/es/learn-fundamentals-color-wheel.json'
import learnFundamentalsWarmCoolEs from './locales/es/learn-fundamentals-warm-cool.json'
import learnFundamentalsSaturationBrightnessEs from './locales/es/learn-fundamentals-saturation-brightness.json'
import learnHarmonyEs from './locales/es/learn-harmony.json'
import learnHarmonyComplementaryEs from './locales/es/learn-harmony-complementary.json'
import learnHarmonyAnalogousEs from './locales/es/learn-harmony-analogous.json'
import learnHarmonyTriadicEs from './locales/es/learn-harmony-triadic.json'
import learnHarmonySplitComplementaryEs from './locales/es/learn-harmony-split-complementary.json'
import learnPsychologyEs from './locales/es/learn-psychology.json'
import learnPsychologyCulturalEs from './locales/es/learn-psychology-cultural.json'
import learnPsychologyEmotionsEs from './locales/es/learn-psychology-emotions.json'
import learnPsychologyBrandingEs from './locales/es/learn-psychology-branding.json'
import learnPsychologyMarketingEs from './locales/es/learn-psychology-marketing.json'
import learnAccessibilityEs from './locales/es/learn-accessibility.json'
import learnAccessibilityWcagEs from './locales/es/learn-accessibility-wcag.json'
import learnAccessibilityColorBlindnessEs from './locales/es/learn-accessibility-color-blindness.json'
import learnAccessibilityReadabilityEs from './locales/es/learn-accessibility-readability.json'
import learnAccessibilityAlternativesEs from './locales/es/learn-accessibility-alternatives.json'

/**
 * Supported Locales Configuration
 * 
 * Defines all locales supported by the application.
 * These must match the locale directories in locales/ and the middleware configuration.
 * 
 * @constant {readonly string[]} locales - Array of supported locale codes
 * @type {('ru' | 'en' | 'de' | 'es')[]}
 */
export const locales = ['ru', 'en', 'de', 'es'] as const

/**
 * Locale Type
 * 
 * TypeScript type representing a valid locale code.
 * Extracted from the locales array for type safety.
 * 
 * @typedef {('ru' | 'en' | 'de' | 'es')} Locale
 */
export type Locale = (typeof locales)[number]

/**
 * Default Locale
 * 
 * The default locale used when:
 * - No locale is detected from browser settings
 * - An invalid locale is requested
 * - User visits the root path without locale
 * 
 * @constant {Locale} defaultLocale - Default locale code ('ru')
 */
export const defaultLocale: Locale = 'ru'

/**
 * Converts Flat Keys to Nested Structure
 * 
 * Transforms a flat object with dot-notation keys into a nested object structure.
 * This is required because next-intl expects nested objects, but JSON files
 * often use flat keys for easier editing.
 * 
 * Algorithm:
 * 1. Split each key by '.' to get path segments
 * 2. Create nested objects for each path segment
 * 3. Assign the value to the final key in the path
 * 
 * Example:
 * Input:  { "nav.home": "Home", "nav.tools": "Tools" }
 * Output: { nav: { home: "Home", tools: "Tools" } }
 * 
 * Edge Cases Handled:
 * - Empty keys are skipped
 * - Undefined values are skipped
 * - Invalid inputs return empty object
 * - Arrays are preserved as-is (not nested)
 * 
 * Performance:
 * - O(n * m) where n is number of keys, m is average depth
 * - Optimized for typical translation structures (2-3 levels deep)
 * 
 * @param {Record<string, any>} flatMessages - Flat object with dot-notation keys
 * @param {string} [debugContext] - Optional context string for debugging/logging
 * @returns {Record<string, any>} Nested object structure compatible with next-intl
 * 
 * @example
 * nestMessages({ "nav.home": "Home" })
 * // Returns: { nav: { home: "Home" } }
 */
function nestMessages(
	flatMessages: Record<string, any>,
	debugContext?: string
): Record<string, any> {
	try {
		if (!flatMessages || typeof flatMessages !== 'object' || Array.isArray(flatMessages)) {
			if (debugContext) {
				console.warn(`[i18n:nestMessages] Invalid input for ${debugContext}:`, {
					type: typeof flatMessages,
					isArray: Array.isArray(flatMessages),
					value: flatMessages,
				})
			}
			return {}
		}

		const nested: Record<string, any> = {}
		let processedCount = 0
		let skippedCount = 0

		for (const [key, value] of Object.entries(flatMessages)) {
			if (!key || value === undefined) {
				skippedCount++
				continue
			}

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
				processedCount++
			} else {
				skippedCount++
			}
		}

		// Only log in development mode to avoid console spam
		if (process.env.NODE_ENV === 'development' && debugContext && (processedCount > 0 || skippedCount > 0)) {
			console.log(`[i18n:nestMessages] ${debugContext}: processed ${processedCount}, skipped ${skippedCount}`)
		}

		return nested
	} catch (error) {
		console.error(`[i18n:nestMessages] Error processing ${debugContext || 'messages'}:`, error)
		return {}
	}
}

/**
 * Process Tools Translation Object
 * 
 * Processes the tools.json translation file which has a mixed structure:
 * - Some tools have nested objects (e.g., colorLab: { title: "...", ... })
 * - Some keys are flat with dots (e.g., "tools.title": "...")
 * 
 * This function:
 * 1. Separates nested tool objects from flat keys
 * 2. Processes flat keys through nestMessages()
 * 3. Combines both structures into final nested format
 * 
 * Tool Objects (preserved as nested):
 * - colorLab
 * - contrastChecker
 * - colorConverter
 * - paletteGenerator
 * - colorHarmony
 * - gradientGenerator
 * - colorBlindnessSimulator
 * 
 * Flat Keys (converted to nested):
 * - All other keys with dot notation
 * 
 * @param {any} tools - Tools translation object from tools.json
 * @returns {Record<string, any>} Processed tools object with proper nested structure
 * 
 * @example
 * processTools({
 *   "title": "Tools",
 *   "colorLab": { "title": "Color Lab" },
 *   "tools.description": "Browse tools"
 * })
 * // Returns: {
 * //   title: "Tools",
 * //   colorLab: { title: "Color Lab" },
 * //   tools: { description: "Browse tools" }
 * // }
 */
function processTools(tools: any) {
	try {
		if (!tools || typeof tools !== 'object' || Array.isArray(tools)) {
			console.warn('[i18n:processTools] Invalid tools input:', {
				type: typeof tools,
				isArray: Array.isArray(tools),
			})
			return {}
		}

		const nestedKeys = [
			'colorLab',
			'contrastChecker',
			'colorConverter',
			'paletteGenerator',
			'colorHarmony',
			'gradientGenerator',
			'colorBlindnessSimulator',
		]
		const nestedObjects: Record<string, any> = {}
		const flatKeys: Record<string, any> = {}

		// Separate nested objects from flat keys
		for (const [key, value] of Object.entries(tools)) {
			if (nestedKeys.includes(key) && value && typeof value === 'object' && !Array.isArray(value)) {
				nestedObjects[key] = value
			} else {
				flatKeys[key] = value
			}
		}

		// Nest flat keys
		const nestedFlat = nestMessages(flatKeys, 'processTools')

		// Combine
		const result = {
			...nestedFlat,
			...nestedObjects,
		}

		// Only log in development mode
		if (process.env.NODE_ENV === 'development') {
			console.log('[i18n:processTools] Processed:', {
				nestedObjectsCount: Object.keys(nestedObjects).length,
				flatKeysCount: Object.keys(flatKeys).length,
				resultKeysCount: Object.keys(result).length,
			})
		}

		return result
	} catch (error) {
		console.error('[i18n:processTools] Error:', error)
		return {}
	}
}

/**
 * Process Learn Translation Structure
 * 
 * Processes the complex learn section which consists of:
 * - Main learn.json file (base structure)
 * - Multiple learn-* sub-section files (formats, fundamentals, harmony, etc.)
 * 
 * This function:
 * 1. Nests the main learn.json flat keys
 * 2. Parses sub-section filenames to determine nested paths
 * 3. Merges all sub-sections into the correct nested structure
 * 4. Converts kebab-case filenames to camelCase object keys
 * 
 * Filename Pattern:
 * - learn-{section}-{subsection}.json -> learn.{section}.{subsection}
 * - learn-formats-hex.json -> learn.formats.hex
 * - learn-fundamentals-warm-cool.json -> learn.fundamentals.warmCool
 * 
 * Structure:
 * learn/
 *   formats/
 *     hex, rgb, hsl, css
 *   fundamentals/
 *     rgbCmyk, colorWheel, warmCool, saturationBrightness
 *   harmony/
 *     complementary, analogous, triadic, splitComplementary
 *   psychology/
 *     cultural, emotions, branding, marketing
 *   accessibility/
 *     wcag, colorBlindness, readability, alternatives
 * 
 * @param {any} learn - Main learn.json translation object
 * @param {Record<string, any>} learnSubsections - Object mapping filenames to content
 *   Example: { "learn-formats-hex": {...}, "learn-harmony-complementary": {...} }
 * @returns {Record<string, any>} Fully processed learn object with all sub-sections nested
 * 
 * @example
 * processLearn(
 *   { "title": "Learn" },
 *   { "learn-formats-hex": { "title": "HEX Format" } }
 * )
 * // Returns: {
 * //   title: "Learn",
 * //   formats: { hex: { title: "HEX Format" } }
 * // }
 */
function processLearn(learn: any, learnSubsections: Record<string, any>) {
	try {
		// Start with nested main learn.json
		const baseLearn = nestMessages(learn as Record<string, any>, 'processLearn:base')

		// Process and merge all sub-sections
		// File naming pattern: learn-{section}-{subsection}.json
		// Maps to: learn.{section}.{subsection}
		for (const [fileName, content] of Object.entries(learnSubsections)) {
			if (!content || typeof content !== 'object' || Array.isArray(content)) {
				console.warn(`[i18n:processLearn] Invalid subsection ${fileName}:`, {
					type: typeof content,
					isArray: Array.isArray(content),
				})
				continue
			}

			// Extract path from filename: learn-formats-hex -> formats.hex
			// Pattern: learn-{section}-{subsection} or learn-{section}
			const pathMatch = fileName.match(/^learn-(.+)$/)
			if (!pathMatch) {
				console.warn(`[i18n:processLearn] Could not parse path from ${fileName}`)
				continue
			}

			const fullPath = pathMatch[1]
			const pathParts = fullPath.split('-')

			if (pathParts.length === 0) {
				console.warn(`[i18n:processLearn] Empty path for ${fileName}`)
				continue
			}

			// Determine section and subsection
			// formats-hex -> section: formats, subsection: hex
			// fundamentals-warm-cool -> section: fundamentals, subsection: warm-cool -> warmCool
			const section = pathParts[0]
			const subsection = pathParts.length > 1 ? pathParts.slice(1).join('-') : null

			// Create nested structure if it doesn't exist
			if (!baseLearn[section]) {
				baseLearn[section] = {}
			}

			// Handle subsection nesting
			if (subsection) {
				// Convert kebab-case to camelCase for subsection key
				// hex -> hex (no change)
				// warm-cool -> warmCool
				const camelCaseSubsection = subsection
					.split('-')
					.map((part, index) =>
						index === 0 ? part : part.charAt(0).toUpperCase() + part.slice(1)
					)
					.join('')

				// Merge content into subsection
				baseLearn[section][camelCaseSubsection] = {
					...(baseLearn[section][camelCaseSubsection] || {}),
					...content,
				}

				// Only log in development mode
				if (process.env.NODE_ENV === 'development') {
					console.log(
						`[i18n:processLearn] Merged ${fileName} -> learn.${section}.${camelCaseSubsection}`
					)
				}
			} else {
				// If no subsection, merge directly into section
				baseLearn[section] = {
					...baseLearn[section],
					...content,
				}

				// Only log in development mode
				if (process.env.NODE_ENV === 'development') {
					console.log(`[i18n:processLearn] Merged ${fileName} -> learn.${section}`)
				}
			}
		}

		// Only log in development mode
		if (process.env.NODE_ENV === 'development') {
			console.log('[i18n:processLearn] Final structure keys:', Object.keys(baseLearn))
		}

		return baseLearn
	} catch (error) {
		console.error('[i18n:processLearn] Error:', error)
		// Fallback to just nested learn.json
		return nestMessages(learn as Record<string, any>, 'processLearn:fallback')
	}
}

/**
 * Prepare learn sub-sections for Russian locale
 */
function prepareLearnSubsectionsRu() {
	return {
		'learn-formats': learnFormatsRu,
		'learn-formats-hex': learnFormatsHexRu,
		'learn-formats-rgb': learnFormatsRgbRu,
		'learn-formats-hsl': learnFormatsHslRu,
		'learn-formats-css': learnFormatsCssRu,
		'learn-fundamentals': learnFundamentalsRu,
		'learn-fundamentals-rgb-cmyk': learnFundamentalsRgbCmykRu,
		'learn-fundamentals-color-wheel': learnFundamentalsColorWheelRu,
		'learn-fundamentals-warm-cool': learnFundamentalsWarmCoolRu,
		'learn-fundamentals-saturation-brightness': learnFundamentalsSaturationBrightnessRu,
		'learn-harmony': learnHarmonyRu,
		'learn-harmony-complementary': learnHarmonyComplementaryRu,
		'learn-harmony-analogous': learnHarmonyAnalogousRu,
		'learn-harmony-triadic': learnHarmonyTriadicRu,
		'learn-harmony-split-complementary': learnHarmonySplitComplementaryRu,
		'learn-psychology': learnPsychologyRu,
		'learn-psychology-cultural': learnPsychologyCulturalRu,
		'learn-psychology-emotions': learnPsychologyEmotionsRu,
		'learn-psychology-branding': learnPsychologyBrandingRu,
		'learn-psychology-marketing': learnPsychologyMarketingRu,
		'learn-accessibility': learnAccessibilityRu,
		'learn-accessibility-wcag': learnAccessibilityWcagRu,
		'learn-accessibility-color-blindness': learnAccessibilityColorBlindnessRu,
		'learn-accessibility-readability': learnAccessibilityReadabilityRu,
		'learn-accessibility-alternatives': learnAccessibilityAlternativesRu,
	}
}

/**
 * Prepare learn sub-sections for English locale
 */
function prepareLearnSubsectionsEn() {
	return {
		'learn-formats': learnFormatsEn,
		'learn-formats-hex': learnFormatsHexEn,
		'learn-formats-rgb': learnFormatsRgbEn,
		'learn-formats-hsl': learnFormatsHslEn,
		'learn-formats-css': learnFormatsCssEn,
		'learn-fundamentals': learnFundamentalsEn,
		'learn-fundamentals-rgb-cmyk': learnFundamentalsRgbCmykEn,
		'learn-fundamentals-color-wheel': learnFundamentalsColorWheelEn,
		'learn-fundamentals-warm-cool': learnFundamentalsWarmCoolEn,
		'learn-fundamentals-saturation-brightness': learnFundamentalsSaturationBrightnessEn,
		'learn-harmony': learnHarmonyEn,
		'learn-harmony-complementary': learnHarmonyComplementaryEn,
		'learn-harmony-analogous': learnHarmonyAnalogousEn,
		'learn-harmony-triadic': learnHarmonyTriadicEn,
		'learn-harmony-split-complementary': learnHarmonySplitComplementaryEn,
		'learn-psychology': learnPsychologyEn,
		'learn-psychology-cultural': learnPsychologyCulturalEn,
		'learn-psychology-emotions': learnPsychologyEmotionsEn,
		'learn-psychology-branding': learnPsychologyBrandingEn,
		'learn-psychology-marketing': learnPsychologyMarketingEn,
		'learn-accessibility': learnAccessibilityEn,
		'learn-accessibility-wcag': learnAccessibilityWcagEn,
		'learn-accessibility-color-blindness': learnAccessibilityColorBlindnessEn,
		'learn-accessibility-readability': learnAccessibilityReadabilityEn,
		'learn-accessibility-alternatives': learnAccessibilityAlternativesEn,
	}
}

/**
 * Prepare learn sub-sections for German locale
 */
function prepareLearnSubsectionsDe() {
	return {
		'learn-formats': learnFormatsDe,
		'learn-formats-hex': learnFormatsHexDe,
		'learn-formats-rgb': learnFormatsRgbDe,
		'learn-formats-hsl': learnFormatsHslDe,
		'learn-formats-css': learnFormatsCssDe,
		'learn-fundamentals': learnFundamentalsDe,
		'learn-fundamentals-rgb-cmyk': learnFundamentalsRgbCmykDe,
		'learn-fundamentals-color-wheel': learnFundamentalsColorWheelDe,
		'learn-fundamentals-warm-cool': learnFundamentalsWarmCoolDe,
		'learn-fundamentals-saturation-brightness': learnFundamentalsSaturationBrightnessDe,
		'learn-harmony': learnHarmonyDe,
		'learn-harmony-complementary': learnHarmonyComplementaryDe,
		'learn-harmony-analogous': learnHarmonyAnalogousDe,
		'learn-harmony-triadic': learnHarmonyTriadicDe,
		'learn-harmony-split-complementary': learnHarmonySplitComplementaryDe,
		'learn-psychology': learnPsychologyDe,
		'learn-psychology-cultural': learnPsychologyCulturalDe,
		'learn-psychology-emotions': learnPsychologyEmotionsDe,
		'learn-psychology-branding': learnPsychologyBrandingDe,
		'learn-psychology-marketing': learnPsychologyMarketingDe,
		'learn-accessibility': learnAccessibilityDe,
		'learn-accessibility-wcag': learnAccessibilityWcagDe,
		'learn-accessibility-color-blindness': learnAccessibilityColorBlindnessDe,
		'learn-accessibility-readability': learnAccessibilityReadabilityDe,
		'learn-accessibility-alternatives': learnAccessibilityAlternativesDe,
	}
}

/**
 * Prepare learn sub-sections for Spanish locale
 */
function prepareLearnSubsectionsEs() {
	return {
		'learn-formats': learnFormatsEs,
		'learn-formats-hex': learnFormatsHexEs,
		'learn-formats-rgb': learnFormatsRgbEs,
		'learn-formats-hsl': learnFormatsHslEs,
		'learn-formats-css': learnFormatsCssEs,
		'learn-fundamentals': learnFundamentalsEs,
		'learn-fundamentals-rgb-cmyk': learnFundamentalsRgbCmykEs,
		'learn-fundamentals-color-wheel': learnFundamentalsColorWheelEs,
		'learn-fundamentals-warm-cool': learnFundamentalsWarmCoolEs,
		'learn-fundamentals-saturation-brightness': learnFundamentalsSaturationBrightnessEs,
		'learn-harmony': learnHarmonyEs,
		'learn-harmony-complementary': learnHarmonyComplementaryEs,
		'learn-harmony-analogous': learnHarmonyAnalogousEs,
		'learn-harmony-triadic': learnHarmonyTriadicEs,
		'learn-harmony-split-complementary': learnHarmonySplitComplementaryEs,
		'learn-psychology': learnPsychologyEs,
		'learn-psychology-cultural': learnPsychologyCulturalEs,
		'learn-psychology-emotions': learnPsychologyEmotionsEs,
		'learn-psychology-branding': learnPsychologyBrandingEs,
		'learn-psychology-marketing': learnPsychologyMarketingEs,
		'learn-accessibility': learnAccessibilityEs,
		'learn-accessibility-wcag': learnAccessibilityWcagEs,
		'learn-accessibility-color-blindness': learnAccessibilityColorBlindnessEs,
		'learn-accessibility-readability': learnAccessibilityReadabilityEs,
		'learn-accessibility-alternatives': learnAccessibilityAlternativesEs,
	}
}

/**
 * All Messages Configuration
 * 
 * Complete translation messages for all supported locales.
 * This object contains all translations organized by locale, with each locale
 * having its own nested structure of namespaces.
 * 
 * Structure:
 * {
 *   ru: { common: {...}, home: {...}, tools: {...}, learn: {...}, ... },
 *   en: { common: {...}, home: {...}, tools: {...}, learn: {...}, ... },
 *   de: { common: {...}, home: {...}, tools: {...}, learn: {...}, ... },
 *   es: { common: {...}, home: {...}, tools: {...}, learn: {...}, ... }
 * }
 * 
 * Processing:
 * - common: Nested from flat keys
 * - home: Nested from flat keys
 * - tools: Processed through processTools() (handles mixed structure)
 * - learn: Processed through processLearn() (handles sub-sections)
 * - footer, privacy, cookies, terms, about, contact: Used as-is (already nested)
 * 
 * This object is used by getRequestConfig() to provide messages to next-intl.
 * 
 * @constant {Record<Locale, Record<string, any>>} allMessages
 */
const allMessages = {
	ru: {
		...nestMessages(commonRu as Record<string, any>, 'commonRu'),
		home: nestMessages(homeRu as Record<string, any>, 'homeRu'),
		tools: processTools(toolsRu),
		learn: processLearn(learnRu, prepareLearnSubsectionsRu()),
		footer: footerRu,
		privacy: privacyRu,
		cookies: cookiesRu,
		terms: termsRu,
		about: aboutRu,
		contact: contactRu,
	},
	en: {
		...nestMessages(commonEn as Record<string, any>, 'commonEn'),
		home: nestMessages(homeEn as Record<string, any>, 'homeEn'),
		tools: processTools(toolsEn),
		learn: processLearn(learnEn, prepareLearnSubsectionsEn()),
		footer: footerEn,
		privacy: privacyEn,
		cookies: cookiesEn,
		terms: termsEn,
		about: aboutEn,
		contact: contactEn,
	},
	de: {
		...nestMessages(commonDe as Record<string, any>, 'commonDe'),
		home: nestMessages(homeDe as Record<string, any>, 'homeDe'),
		tools: processTools(toolsDe),
		learn: processLearn(learnDe, prepareLearnSubsectionsDe()),
		footer: footerDe,
		privacy: privacyDe,
		cookies: cookiesDe,
		terms: termsDe,
		about: aboutDe,
		contact: contactDe,
	},
	es: {
		...nestMessages(commonEs as Record<string, any>, 'commonEs'),
		home: nestMessages(homeEs as Record<string, any>, 'homeEs'),
		tools: processTools(toolsEs),
		learn: processLearn(learnEs, prepareLearnSubsectionsEs()),
		footer: footerEs,
		privacy: privacyEs,
		cookies: cookiesEs,
		terms: termsEs,
		about: aboutEs,
		contact: contactEs,
	},
}

/**
 * Next-Intl Request Configuration
 * 
 * This is the main configuration function for next-intl. It's called
 * on every request to provide the appropriate translation messages
 * for the requested locale.
 * 
 * Process Flow:
 * 1. Receives locale from next-intl middleware
 * 2. Validates locale exists in allMessages
 * 3. Retrieves locale-specific messages
 * 4. Serializes messages to ensure they're JSON-compatible
 * 5. Validates message structure (development only)
 * 6. Returns configuration object for next-intl
 * 
 * Error Handling:
 * - Invalid locale: Calls notFound() to trigger 404
 * - Serialization errors: Logs problematic keys and re-throws
 * - Structure validation: Logs warnings in development mode
 * 
 * Performance:
 * - Messages are processed at build time (static imports)
 * - Serialization happens once per request
 * - Validation only runs in development mode
 * 
 * @param {Object} config - Configuration object from next-intl
 * @param {Locale} config.locale - Requested locale code
 * @returns {Promise<{ locale: Locale; messages: Record<string, any> }>}
 *   Configuration object with locale and messages
 * 
 * @throws {Error} If locale is invalid or messages cannot be serialized
 * 
 * @example
 * // Called automatically by next-intl on each request
 * // User visits /ru/tools
 * // getRequestConfig({ locale: 'ru' }) is called
 * // Returns: { locale: 'ru', messages: { ... } }
 */
export default getRequestConfig(async ({ locale }) => {
	try {
		// Debug logging only in development
		const isDev = process.env.NODE_ENV === 'development'
		
		if (isDev) {
			console.log(`[i18n:getRequestConfig] Processing locale: ${locale}`)
		}

		const localeData = allMessages[locale as Locale]

		if (!localeData) {
			console.error(`[i18n:getRequestConfig] Locale ${locale} not found in allMessages`)
			notFound()
		}

		if (isDev) {
			console.log(`[i18n:getRequestConfig] Locale data keys:`, Object.keys(localeData))
			console.log(`[i18n:getRequestConfig] Learn structure:`, {
				hasLearn: !!localeData.learn,
				learnKeys: localeData.learn ? Object.keys(localeData.learn) : [],
				hasFormats: !!(localeData.learn && localeData.learn.formats),
				formatsKeys: localeData.learn?.formats ? Object.keys(localeData.learn.formats) : [],
			})
		}

		// Ensure messages is serializable
		let messages
		try {
			messages = JSON.parse(JSON.stringify(localeData))
			if (isDev) {
				console.log(`[i18n:getRequestConfig] Successfully serialized messages for ${locale}`)
			}
		} catch (serializeError) {
			console.error(`[i18n:getRequestConfig] Serialization error for ${locale}:`, serializeError)
			// Try to identify problematic keys
			const problematicKeys: string[] = []
			const checkSerializable = (obj: any, path: string = '') => {
				for (const [key, value] of Object.entries(obj)) {
					const currentPath = path ? `${path}.${key}` : key
					try {
						JSON.stringify(value)
					} catch {
						problematicKeys.push(currentPath)
					}
					if (value && typeof value === 'object' && !Array.isArray(value)) {
						checkSerializable(value, currentPath)
					}
				}
			}
			checkSerializable(localeData)
			console.error(`[i18n:getRequestConfig] Problematic keys:`, problematicKeys)
			throw serializeError
		}

		// Validate that messages don't contain flat keys with dots (only in dev)
		if (isDev) {
			const validateMessages = (obj: any, namespace: string = 'root') => {
				for (const [key, value] of Object.entries(obj)) {
					if (key.includes('.')) {
						console.error(
							`[i18n:getRequestConfig] Invalid key with dot found in ${namespace}: ${key}`
						)
					}
					if (value && typeof value === 'object' && !Array.isArray(value)) {
						validateMessages(value, `${namespace}.${key}`)
					}
				}
			}
			validateMessages(messages, locale)
		}

		return {
			locale,
			messages,
		}
	} catch (error) {
		console.error(`[i18n:getRequestConfig] Fatal error for locale ${locale}:`, error)
		// Re-throw to let Next.js handle it
		throw error
	}
})
