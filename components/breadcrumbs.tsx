/**
 * Breadcrumbs Component
 * 
 * Displays breadcrumb navigation with Schema.org structured data.
 * Helps users understand their location in the site hierarchy and
 * improves SEO with structured breadcrumb markup.
 * 
 * Features:
 * - Visual breadcrumb trail
 * - Schema.org BreadcrumbList structured data
 * - Responsive design
 * - Internationalized labels
 * - Proper semantic HTML (nav, ol, li)
 * 
 * @component
 * @example
 * ```tsx
 * <Breadcrumbs
 *   items={[
 *     { name: 'Home', href: '/ru' },
 *     { name: 'Tools', href: '/ru/tools' },
 *     { name: 'Color Converter', href: '/ru/tools/color-converter' },
 *   ]}
 * />
 * ```
 */

'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'

/**
 * Breadcrumb item interface
 */
export interface BreadcrumbItem {
	/** Display name of the breadcrumb item */
	name: string
	/** URL path for the breadcrumb item */
	href: string
}

/**
 * Breadcrumbs component props
 */
interface BreadcrumbsProps {
	/** Array of breadcrumb items in order (home → current page) */
	items: BreadcrumbItem[]
}

/**
 * Breadcrumbs Component
 * 
 * Renders a breadcrumb navigation trail with Schema.org structured data.
 * The last item is displayed as plain text (current page), all others are links.
 * 
 * Structured Data:
 * - Uses BreadcrumbList schema from Schema.org
 * - Each item is a ListItem with position, name, and URL
 * - Helps search engines understand site structure
 * 
 * Accessibility:
 * - Uses semantic <nav> element with aria-label
 * - Uses ordered list (<ol>) for proper structure
 * - Screen readers can announce breadcrumb trail
 * 
 * @param {BreadcrumbsProps} props - Component props
 * @param {BreadcrumbItem[]} props.items - Array of breadcrumb items
 * 
 * @returns {JSX.Element} Breadcrumb navigation with structured data
 */
export function Breadcrumbs({ items }: BreadcrumbsProps) {
	const params = useParams()
	const locale = params.locale as string
	const baseUrl = 'https://pipetkaonline.ru'

	// Generate structured data for SEO
	const structuredData = {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: items.map((item, index) => ({
			'@type': 'ListItem',
			position: index + 1,
			name: item.name,
			item: `${baseUrl}${item.href}`,
		})),
	}

	return (
		<>
			{/* Structured Data for SEO */}
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
			/>

			{/* Breadcrumb Navigation */}
			<nav
				aria-label='Breadcrumb navigation'
				className='mb-6'
			>
				<ol className='flex flex-wrap items-center gap-2 text-sm text-slate-600'>
					{items.map((item, index) => {
						const isLast = index === items.length - 1

						return (
							<li key={index} className='flex items-center gap-2'>
								{isLast ? (
									// Last item (current page) - not a link
									<span
										className='text-slate-900 font-medium'
										aria-current='page'
									>
										{item.name}
									</span>
								) : (
									// Previous items - links
									<>
										<Link
											href={item.href}
											className='hover:text-slate-900 hover:underline transition-colors'
										>
											{item.name}
										</Link>
										{/* Separator */}
										<span className='text-slate-400' aria-hidden='true'>
											/
										</span>
									</>
								)}
							</li>
						)
					})}
				</ol>
			</nav>
		</>
	)
}


