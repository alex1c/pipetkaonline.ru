/**
 * Metadata Utils Tests
 * 
 * Tests for metadata utility functions to ensure:
 * - Metadata is generated correctly
 * - All required fields are present
 * - URLs and paths are formatted correctly
 */

import {
	generateToolMetadata,
	generateLearnMetadata,
} from '../metadata-utils'

describe('Metadata Utils', () => {
	describe('generateToolMetadata', () => {
		/**
		 * Test: Generates complete metadata
		 * 
		 * Verifies that all required metadata fields
		 * are generated correctly.
		 */
		it('generates complete metadata', () => {
			const metadata = generateToolMetadata({
				title: 'Color Converter',
				description: 'Convert colors between formats',
				keywords: 'color, converter, hex, rgb',
				locale: 'ru',
				path: '/tools/color-converter',
			})

			expect(metadata.title).toBe('Color Converter')
			expect(metadata.description).toBe('Convert colors between formats')
			expect(metadata.keywords).toBe('color, converter, hex, rgb')
		})

		/**
		 * Test: Generates Open Graph metadata
		 * 
		 * Verifies that Open Graph tags are included
		 * with correct values.
		 */
		it('generates Open Graph metadata', () => {
			const metadata = generateToolMetadata({
				title: 'Test Tool',
				description: 'Test Description',
				keywords: 'test',
				locale: 'en',
				path: '/tools/test',
			})

			expect(metadata.openGraph).toBeDefined()
			expect(metadata.openGraph?.title).toBe('Test Tool')
			expect(metadata.openGraph?.description).toBe('Test Description')
			expect(metadata.openGraph?.type).toBe('website')
			expect(metadata.openGraph?.url).toBe('https://pipetkaonline.ru/en/tools/test')
		})

		/**
		 * Test: Generates Twitter Card metadata
		 * 
		 * Verifies that Twitter Card tags are included.
		 */
		it('generates Twitter Card metadata', () => {
			const metadata = generateToolMetadata({
				title: 'Test Tool',
				description: 'Test Description',
				keywords: 'test',
				locale: 'en',
				path: '/tools/test',
			})

			expect(metadata.twitter).toBeDefined()
			expect(metadata.twitter?.card).toBe('summary_large_image')
			expect(metadata.twitter?.title).toBe('Test Tool')
		})

		/**
		 * Test: Generates canonical URL
		 * 
		 * Verifies that canonical URL is generated
		 * correctly for each locale.
		 */
		it('generates canonical URL', () => {
			const metadata = generateToolMetadata({
				title: 'Test',
				description: 'Test',
				keywords: 'test',
				locale: 'ru',
				path: '/tools/test',
			})

			expect(metadata.alternates?.canonical).toBe('https://pipetkaonline.ru/ru/tools/test')
		})

		/**
		 * Test: Generates hreflang alternates
		 * 
		 * Verifies that hreflang alternates are generated
		 * for all supported locales.
		 */
		it('generates hreflang alternates', () => {
			const metadata = generateToolMetadata({
				title: 'Test',
				description: 'Test',
				keywords: 'test',
				locale: 'ru',
				path: '/tools/test',
			})

			expect(metadata.alternates?.languages).toBeDefined()
			expect(metadata.alternates?.languages?.ru).toBe('https://pipetkaonline.ru/ru/tools/test')
			expect(metadata.alternates?.languages?.en).toBe('https://pipetkaonline.ru/en/tools/test')
			expect(metadata.alternates?.languages?.de).toBe('https://pipetkaonline.ru/de/tools/test')
			expect(metadata.alternates?.languages?.es).toBe('https://pipetkaonline.ru/es/tools/test')
		})
	})

	describe('generateLearnMetadata', () => {
		/**
		 * Test: Generates Article type metadata
		 * 
		 * Verifies that learn pages use Article type
		 * instead of website.
		 */
		it('generates Article type metadata', () => {
			const metadata = generateLearnMetadata({
				title: 'Understanding Colors',
				description: 'Learn about colors',
				keywords: 'colors, learn',
				locale: 'en',
				path: '/learn/formats/hex',
			})

			expect(metadata.openGraph?.type).toBe('article')
		})
	})
})

