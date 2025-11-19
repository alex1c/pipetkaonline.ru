/**
 * SEO Utilities
 * 
 * Helper functions for generating SEO-related structured data and metadata.
 * Provides reusable functions for creating Schema.org markup, FAQ schemas,
 * and HowTo schemas for consistent SEO implementation across the application.
 * 
 * @module lib/seo-utils
 */

/**
 * Generate SoftwareApplication structured data
 * 
 * Creates Schema.org SoftwareApplication markup for tool pages.
 * This helps search engines understand that the page is a web application.
 * 
 * @param {Object} params - Parameters for software application
 * @param {string} params.name - Application name
 * @param {string} params.description - Application description
 * @param {string} params.url - Application URL
 * @param {string[]} [params.features] - List of features
 * @param {number} [params.ratingValue=4.8] - Average rating
 * @param {number} [params.ratingCount=150] - Number of ratings
 * 
 * @returns {Object} SoftwareApplication structured data
 * 
 * @example
 * generateSoftwareApplicationSchema({
 *   name: 'Color Converter',
 *   description: 'Convert colors between HEX, RGB, and HSL formats',
 *   url: 'https://pipetkaonline.ru/ru/tools/color-converter',
 *   features: ['HEX to RGB', 'RGB to HSL', 'Real-time conversion'],
 * })
 */
export function generateSoftwareApplicationSchema({
	name,
	description,
	url,
	features = [],
	ratingValue = 4.8,
	ratingCount = 150,
}: {
	name: string
	description: string
	url: string
	features?: string[]
	ratingValue?: number
	ratingCount?: number
}) {
	return {
		'@context': 'https://schema.org',
		'@type': 'SoftwareApplication',
		name,
		description,
		url,
		applicationCategory: 'DesignApplication',
		operatingSystem: 'Web',
		offers: {
			'@type': 'Offer',
			price: '0',
			priceCurrency: 'USD',
		},
		aggregateRating: {
			'@type': 'AggregateRating',
			ratingValue: ratingValue.toString(),
			ratingCount: ratingCount.toString(),
		},
		...(features.length > 0 && { featureList: features }),
	}
}

/**
 * Generate Article structured data
 * 
 * Creates Schema.org Article markup for learn/educational pages.
 * This helps search engines understand the content type and improves
 * visibility in search results.
 * 
 * @param {Object} params - Parameters for article
 * @param {string} params.headline - Article headline/title
 * @param {string} params.description - Article description
 * @param {string} params.url - Article URL
 * @param {string} [params.author='PipetkaOnline'] - Article author
 * @param {string} [params.datePublished] - Publication date (ISO format)
 * @param {string} [params.dateModified] - Last modified date (ISO format)
 * 
 * @returns {Object} Article structured data
 * 
 * @example
 * generateArticleSchema({
 *   headline: 'Understanding HEX Color Format',
 *   description: 'Complete guide to hexadecimal color codes',
 *   url: 'https://pipetkaonline.ru/ru/learn/formats/hex',
 * })
 */
export function generateArticleSchema({
	headline,
	description,
	url,
	author = 'PipetkaOnline',
	datePublished,
	dateModified,
}: {
	headline: string
	description: string
	url: string
	author?: string
	datePublished?: string
	dateModified?: string
}) {
	return {
		'@context': 'https://schema.org',
		'@type': 'Article',
		headline,
		description,
		url,
		author: {
			'@type': 'Organization',
			name: author,
		},
		publisher: {
			'@type': 'Organization',
			name: 'PipetkaOnline',
			logo: {
				'@type': 'ImageObject',
				url: 'https://pipetkaonline.ru/logo.svg',
			},
		},
		...(datePublished && { datePublished }),
		...(dateModified && { dateModified }),
	}
}

/**
 * Generate FAQPage structured data
 * 
 * Creates Schema.org FAQPage markup for pages with frequently asked questions.
 * This can result in rich snippets in search results showing FAQ accordions.
 * 
 * @param {Object[]} faqs - Array of FAQ items
 * @param {string} faqs[].question - FAQ question
 * @param {string} faqs[].answer - FAQ answer
 * 
 * @returns {Object} FAQPage structured data
 * 
 * @example
 * generateFAQSchema([
 *   { question: 'How to convert HEX to RGB?', answer: 'Use our color converter tool...' },
 *   { question: 'What is color harmony?', answer: 'Color harmony is...' },
 * ])
 */
export function generateFAQSchema(
	faqs: Array<{ question: string; answer: string }>
) {
	return {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: faqs.map((faq) => ({
			'@type': 'Question',
			name: faq.question,
			acceptedAnswer: {
				'@type': 'Answer',
				text: faq.answer,
			},
		})),
	}
}

/**
 * Generate HowTo structured data
 * 
 * Creates Schema.org HowTo markup for instructional content.
 * This can result in rich snippets showing step-by-step instructions
 * directly in search results.
 * 
 * @param {Object} params - Parameters for HowTo
 * @param {string} params.name - HowTo title
 * @param {string} params.description - HowTo description
 * @param {Object[]} params.steps - Array of steps
 * @param {string} params.steps[].name - Step title
 * @param {string} params.steps[].text - Step description
 * 
 * @returns {Object} HowTo structured data
 * 
 * @example
 * generateHowToSchema({
 *   name: 'How to Use Color Converter',
 *   description: 'Step-by-step guide to converting colors',
 *   steps: [
 *     { name: 'Enter color', text: 'Type or paste your color value' },
 *     { name: 'Select format', text: 'Choose input format (HEX, RGB, HSL)' },
 *   ],
 * })
 */
export function generateHowToSchema({
	name,
	description,
	steps,
}: {
	name: string
	description: string
	steps: Array<{ name: string; text: string }>
}) {
	return {
		'@context': 'https://schema.org',
		'@type': 'HowTo',
		name,
		description,
		step: steps.map((step, index) => ({
			'@type': 'HowToStep',
			position: index + 1,
			name: step.name,
			text: step.text,
		})),
	}
}

/**
 * Generate BreadcrumbList structured data
 * 
 * Creates Schema.org BreadcrumbList markup for navigation breadcrumbs.
 * This helps search engines understand site structure and can result
 * in breadcrumb display in search results.
 * 
 * @param {Object[]} items - Array of breadcrumb items
 * @param {string} items[].name - Breadcrumb name
 * @param {string} items[].url - Breadcrumb URL (full URL with domain)
 * 
 * @returns {Object} BreadcrumbList structured data
 * 
 * @example
 * generateBreadcrumbSchema([
 *   { name: 'Home', url: 'https://pipetkaonline.ru/ru' },
 *   { name: 'Tools', url: 'https://pipetkaonline.ru/ru/tools' },
 *   { name: 'Color Converter', url: 'https://pipetkaonline.ru/ru/tools/color-converter' },
 * ])
 */
export function generateBreadcrumbSchema(
	items: Array<{ name: string; url: string }>
) {
	return {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: items.map((item, index) => ({
			'@type': 'ListItem',
			position: index + 1,
			name: item.name,
			item: item.url,
		})),
	}
}

/**
 * Generate ItemList structured data
 * 
 * Creates Schema.org ItemList markup for pages with lists of items.
 * Useful for tool listings, article collections, etc.
 * 
 * @param {Object} params - Parameters for ItemList
 * @param {string} params.name - List name
 * @param {string} params.description - List description
 * @param {Object[]} params.items - Array of items in the list
 * @param {string} params.items[].name - Item name
 * @param {string} params.items[].url - Item URL
 * @param {string} [params.items[].description] - Item description
 * 
 * @returns {Object} ItemList structured data
 * 
 * @example
 * generateItemListSchema({
 *   name: 'Color Tools',
 *   description: 'List of available color tools',
 *   items: [
 *     { name: 'Color Converter', url: 'https://pipetkaonline.ru/ru/tools/color-converter' },
 *     { name: 'Palette Generator', url: 'https://pipetkaonline.ru/ru/tools/palette-generator' },
 *   ],
 * })
 */
export function generateItemListSchema({
	name,
	description,
	items,
}: {
	name: string
	description: string
	items: Array<{ name: string; url: string; description?: string }>
}) {
	return {
		'@context': 'https://schema.org',
		'@type': 'ItemList',
		name,
		description,
		itemListElement: items.map((item, index) => ({
			'@type': 'ListItem',
			position: index + 1,
			item: {
				'@type': 'SoftwareApplication',
				name: item.name,
				url: item.url,
				...(item.description && { description: item.description }),
			},
		})),
	}
}

/**
 * Generate Review structured data
 * 
 * Creates Schema.org Review markup for product/service reviews.
 * Can be used for individual tool pages to show ratings.
 * 
 * @param {Object} params - Parameters for Review
 * @param {string} params.itemName - Name of the item being reviewed
 * @param {string} params.reviewBody - Review text
 * @param {number} params.ratingValue - Rating value (1-5)
 * @param {string} params.author - Review author name
 * @param {string} [params.datePublished] - Review date (ISO format)
 * 
 * @returns {Object} Review structured data
 * 
 * @example
 * generateReviewSchema({
 *   itemName: 'Color Converter Tool',
 *   reviewBody: 'Great tool for converting colors between formats',
 *   ratingValue: 5,
 *   author: 'John Doe',
 * })
 */
export function generateReviewSchema({
	itemName,
	reviewBody,
	ratingValue,
	author,
	datePublished,
}: {
	itemName: string
	reviewBody: string
	ratingValue: number
	author: string
	datePublished?: string
}) {
	return {
		'@context': 'https://schema.org',
		'@type': 'Review',
		itemReviewed: {
			'@type': 'SoftwareApplication',
			name: itemName,
		},
		reviewBody,
		author: {
			'@type': 'Person',
			name: author,
		},
		reviewRating: {
			'@type': 'Rating',
			ratingValue: ratingValue.toString(),
			bestRating: '5',
			worstRating: '1',
		},
		...(datePublished && { datePublished }),
	}
}


