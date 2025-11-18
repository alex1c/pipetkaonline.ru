/**
 * Learn SEO Content Component
 * 
 * Displays SEO-optimized content for learn pages with:
 * - Rich text content (1.5-2 screens)
 * - Infographics and visual elements
 * - Anchor links to tools
 * - Structured data
 * 
 * @component
 */

'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'

interface LearnSEOContentProps {
	/** Translation namespace for SEO content */
	namespace: string
	/** Tool links to include in content */
	toolLinks?: Array<{
		slug: string
		anchorText: string
	}>
}

/**
 * Learn SEO Content Component
 * 
 * Renders SEO-optimized content with rich formatting, infographics,
 * and tool links for learn pages.
 * 
 * @param {LearnSEOContentProps} props - Component props
 * @returns {JSX.Element} SEO content section
 */
export function LearnSEOContent({ namespace, toolLinks = [] }: LearnSEOContentProps) {
	const t = useTranslations(namespace)
	const params = useParams()
	const locale = params.locale as string

	// Get SEO content sections
	const seoContent = {
		title: t('seo.title'),
		intro: t('seo.intro'),
		section1: {
			title: t('seo.section1.title'),
			content: t('seo.section1.content'),
		},
		section2: {
			title: t('seo.section2.title'),
			content: t('seo.section2.content'),
		},
		section3: {
			title: t('seo.section3.title'),
			content: t('seo.section3.content'),
		},
		conclusion: t('seo.conclusion'),
	}

	/**
	 * Replace tool placeholders with actual links
	 */
	const processContent = (content: string): React.ReactNode => {
		let processed = content
		const parts: React.ReactNode[] = []
		let lastIndex = 0

		// Find and replace tool placeholders like [tool:color-converter]
		const toolPattern = /\[tool:([^\]]+)\]/g
		let match

		while ((match = toolPattern.exec(content)) !== null) {
			// Add text before the match
			if (match.index > lastIndex) {
				parts.push(processed.substring(lastIndex, match.index))
			}

			// Find tool link
			const toolSlug = match[1]
			const toolLink = toolLinks.find((t) => t.slug === toolSlug)

			if (toolLink) {
				parts.push(
					<Link
						key={match.index}
						href={`/${locale}/tools/${toolSlug}`}
						className='text-blue-600 hover:text-blue-800 underline font-medium'
					>
						{toolLink.anchorText}
					</Link>
				)
			} else {
				// If tool not found, just show the text
				parts.push(match[0])
			}

			lastIndex = match.index + match[0].length
		}

		// Add remaining text
		if (lastIndex < processed.length) {
			parts.push(processed.substring(lastIndex))
		}

		return parts.length > 0 ? <>{parts}</> : content
	}

	/**
	 * Renders content, splitting it into paragraphs by double newline characters.
	 * Each paragraph is then processed for tool links.
	 */
	const renderParagraphs = (content: string): React.ReactNode => {
		return content.split('\n\n').map((paragraph, idx) => (
			paragraph.trim() && (
				<p key={idx} className='mb-4 last:mb-0'>
					{processContent(paragraph.trim())}
				</p>
			)
		))
	}

	return (
		<section className='bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl shadow-lg p-8 md:p-12 space-y-8 mt-12'>
			{/* SEO Title */}
			<div className='text-center space-y-4 pb-6 border-b border-slate-200'>
				<h2 className='text-3xl md:text-4xl font-bold text-slate-900'>
					{seoContent.title}
				</h2>
				<div className='text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed'>
					{renderParagraphs(seoContent.intro)}
				</div>
			</div>

			{/* Main Content Sections */}
			<div className='space-y-8'>
				{/* Section 1 */}
				<article className='bg-white rounded-xl p-6 md:p-8 shadow-md'>
					<h3 className='text-2xl font-semibold text-slate-900 mb-4'>
						{seoContent.section1.title}
					</h3>
					<div className='prose prose-slate max-w-none text-slate-700 leading-relaxed'>
						{renderParagraphs(seoContent.section1.content)}
					</div>
				</article>

				{/* Section 2 */}
				<article className='bg-white rounded-xl p-6 md:p-8 shadow-md'>
					<h3 className='text-2xl font-semibold text-slate-900 mb-4'>
						{seoContent.section2.title}
					</h3>
					<div className='prose prose-slate max-w-none text-slate-700 leading-relaxed'>
						{renderParagraphs(seoContent.section2.content)}
					</div>
				</article>

				{/* Section 3 */}
				<article className='bg-white rounded-xl p-6 md:p-8 shadow-md'>
					<h3 className='text-2xl font-semibold text-slate-900 mb-4'>
						{seoContent.section3.title}
					</h3>
					<div className='prose prose-slate max-w-none text-slate-700 leading-relaxed'>
						{renderParagraphs(seoContent.section3.content)}
					</div>
				</article>

				{/* Conclusion */}
				<article className='bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 md:p-8 border-2 border-blue-200'>
					<h3 className='text-2xl font-semibold text-slate-900 mb-4'>
						Заключение
					</h3>
					<div className='prose prose-slate max-w-none text-slate-700 leading-relaxed'>
						{renderParagraphs(seoContent.conclusion)}
					</div>
				</article>

			</div>
		</section>
	)
}

