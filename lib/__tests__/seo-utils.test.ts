/**
 * SEO Utils Tests
 * 
 * Tests for SEO utility functions to ensure:
 * - Structured data is generated correctly
 * - Schema.org formats are valid
 * - All required fields are present
 */

import {
	generateSoftwareApplicationSchema,
	generateArticleSchema,
	generateFAQSchema,
	generateHowToSchema,
	generateBreadcrumbSchema,
} from '../seo-utils'

describe('SEO Utils', () => {
	describe('generateSoftwareApplicationSchema', () => {
		/**
		 * Test: Generates valid SoftwareApplication schema
		 * 
		 * Verifies that the generated schema has all required
		 * fields and follows Schema.org format.
		 */
		it('generates valid SoftwareApplication schema', () => {
			const schema = generateSoftwareApplicationSchema({
				name: 'Color Converter',
				description: 'Convert colors between formats',
				url: 'https://pipetkaonline.ru/ru/tools/color-converter',
			})

			expect(schema['@context']).toBe('https://schema.org')
			expect(schema['@type']).toBe('SoftwareApplication')
			expect(schema.name).toBe('Color Converter')
			expect(schema.description).toBe('Convert colors between formats')
			expect(schema.url).toBe('https://pipetkaonline.ru/ru/tools/color-converter')
			expect(schema.applicationCategory).toBe('DesignApplication')
			expect(schema.operatingSystem).toBe('Web')
		})

		/**
		 * Test: Includes features when provided
		 * 
		 * Verifies that features list is included
		 * in the schema when provided.
		 */
		it('includes features when provided', () => {
			const schema = generateSoftwareApplicationSchema({
				name: 'Test App',
				description: 'Test',
				url: 'https://example.com',
				features: ['Feature 1', 'Feature 2'],
			})

			expect(schema.featureList).toEqual(['Feature 1', 'Feature 2'])
		})

		/**
		 * Test: Includes rating when provided
		 * 
		 * Verifies that aggregate rating is included
		 * with correct structure.
		 */
		it('includes rating when provided', () => {
			const schema = generateSoftwareApplicationSchema({
				name: 'Test App',
				description: 'Test',
				url: 'https://example.com',
				ratingValue: 4.5,
				ratingCount: 100,
			})

			expect(schema.aggregateRating['@type']).toBe('AggregateRating')
			expect(schema.aggregateRating.ratingValue).toBe('4.5')
			expect(schema.aggregateRating.ratingCount).toBe('100')
		})
	})

	describe('generateArticleSchema', () => {
		/**
		 * Test: Generates valid Article schema
		 * 
		 * Verifies that the generated schema has all required
		 * fields for Article type.
		 */
		it('generates valid Article schema', () => {
			const schema = generateArticleSchema({
				headline: 'Understanding HEX Colors',
				description: 'Complete guide to hexadecimal colors',
				url: 'https://pipetkaonline.ru/ru/learn/formats/hex',
			})

			expect(schema['@context']).toBe('https://schema.org')
			expect(schema['@type']).toBe('Article')
			expect(schema.headline).toBe('Understanding HEX Colors')
			expect(schema.description).toBe('Complete guide to hexadecimal colors')
			expect(schema.url).toBe('https://pipetkaonline.ru/ru/learn/formats/hex')
			expect(schema.author['@type']).toBe('Organization')
			expect(schema.publisher['@type']).toBe('Organization')
		})
	})

	describe('generateFAQSchema', () => {
		/**
		 * Test: Generates valid FAQPage schema
		 * 
		 * Verifies that FAQ schema is generated correctly
		 * with proper question/answer structure.
		 */
		it('generates valid FAQPage schema', () => {
			const faqs = [
				{ question: 'What is HEX?', answer: 'HEX is a color format' },
				{ question: 'How to convert?', answer: 'Use our converter tool' },
			]

			const schema = generateFAQSchema(faqs)

			expect(schema['@context']).toBe('https://schema.org')
			expect(schema['@type']).toBe('FAQPage')
			expect(schema.mainEntity).toHaveLength(2)
			expect(schema.mainEntity[0]['@type']).toBe('Question')
			expect(schema.mainEntity[0].name).toBe('What is HEX?')
			expect(schema.mainEntity[0].acceptedAnswer['@type']).toBe('Answer')
			expect(schema.mainEntity[0].acceptedAnswer.text).toBe('HEX is a color format')
		})
	})

	describe('generateHowToSchema', () => {
		/**
		 * Test: Generates valid HowTo schema
		 * 
		 * Verifies that HowTo schema is generated correctly
		 * with proper step structure.
		 */
		it('generates valid HowTo schema', () => {
			const steps = [
				{ name: 'Step 1', text: 'Enter color value' },
				{ name: 'Step 2', text: 'Select format' },
				{ name: 'Step 3', text: 'Get result' },
			]

			const schema = generateHowToSchema({
				name: 'How to Convert Colors',
				description: 'Step-by-step guide',
				steps,
			})

			expect(schema['@context']).toBe('https://schema.org')
			expect(schema['@type']).toBe('HowTo')
			expect(schema.name).toBe('How to Convert Colors')
			expect(schema.step).toHaveLength(3)
			expect(schema.step[0]['@type']).toBe('HowToStep')
			expect(schema.step[0].position).toBe(1)
			expect(schema.step[0].name).toBe('Step 1')
		})
	})

	describe('generateBreadcrumbSchema', () => {
		/**
		 * Test: Generates valid BreadcrumbList schema
		 * 
		 * Verifies that breadcrumb schema is generated correctly
		 * with proper list item structure.
		 */
		it('generates valid BreadcrumbList schema', () => {
			const items = [
				{ name: 'Home', url: 'https://pipetkaonline.ru/ru' },
				{ name: 'Tools', url: 'https://pipetkaonline.ru/ru/tools' },
				{ name: 'Converter', url: 'https://pipetkaonline.ru/ru/tools/converter' },
			]

			const schema = generateBreadcrumbSchema(items)

			expect(schema['@context']).toBe('https://schema.org')
			expect(schema['@type']).toBe('BreadcrumbList')
			expect(schema.itemListElement).toHaveLength(3)
			expect(schema.itemListElement[0]['@type']).toBe('ListItem')
			expect(schema.itemListElement[0].position).toBe(1)
			expect(schema.itemListElement[0].name).toBe('Home')
			expect(schema.itemListElement[0].item).toBe('https://pipetkaonline.ru/ru')
		})
	})
})

