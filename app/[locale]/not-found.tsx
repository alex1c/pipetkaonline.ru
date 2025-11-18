/**
 * Not Found (404) Page Component
 * 
 * Custom 404 error page that displays when a user navigates to a non-existent route.
 * Provides a user-friendly error message with navigation options to help users
 * find what they're looking for.
 * 
 * Features:
 * - Localized error messages
 * - Links to main sections (Home, Tools, Learn)
 * - Modern, friendly design
 * - Responsive layout
 * 
 * @component
 */

import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'

/**
 * Generate metadata for 404 page
 */
export async function generateMetadata({
	params: { locale },
}: {
	params: { locale: string }
}): Promise<Metadata> {
	const t = await getTranslations({ locale, namespace: 'notFound' })

	return {
		title: t('title'),
		description: t('description'),
	}
}

/**
 * Not Found Page Component
 * 
 * Server component that renders a custom 404 error page.
 * Uses translations for internationalization.
 * 
 * @param {Object} props - Component props
 * @param {Object} props.params - Route parameters
 * @param {string} props.params.locale - Current locale code
 * @returns {Promise<JSX.Element>} 404 error page
 */
export default async function NotFoundPage({
	params: { locale },
}: {
	params: { locale: string }
}) {
	const t = await getTranslations('notFound')

	return (
		<div className='min-h-[60vh] flex items-center justify-center'>
			<div className='text-center space-y-8 max-w-2xl mx-auto px-4'>
				{/* Large 404 number */}
				<div className='space-y-4'>
					<h1 className='text-9xl md:text-[12rem] font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 leading-none'>
						404
					</h1>
					<div className='text-6xl mb-4'>🔍</div>
				</div>

				{/* Error message */}
				<div className='space-y-4'>
					<h2 className='text-3xl md:text-4xl font-bold text-slate-900'>
						{t('heading')}
					</h2>
					<p className='text-lg text-slate-600 leading-relaxed'>
						{t('description')}
					</p>
				</div>

				{/* Navigation links */}
				<div className='flex flex-col sm:flex-row gap-4 justify-center items-center pt-4'>
					<Link
						href={`/${locale}`}
						className='px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg'
					>
						{t('goHome')}
					</Link>
					<Link
						href={`/${locale}/tools`}
						className='px-6 py-3 bg-white text-slate-700 border-2 border-slate-300 rounded-lg font-medium hover:bg-slate-50 hover:border-slate-400 transition-colors duration-200 shadow-sm hover:shadow-md'
					>
						{t('browseTools')}
					</Link>
					<Link
						href={`/${locale}/learn`}
						className='px-6 py-3 bg-white text-slate-700 border-2 border-slate-300 rounded-lg font-medium hover:bg-slate-50 hover:border-slate-400 transition-colors duration-200 shadow-sm hover:shadow-md'
					>
						{t('browseLearn')}
					</Link>
				</div>

				{/* Helpful suggestions */}
				<div className='pt-8 border-t border-slate-200'>
					<p className='text-sm text-slate-500 mb-4'>{t('suggestions.title')}</p>
					<ul className='text-left space-y-2 text-slate-600 max-w-md mx-auto'>
						<li className='flex items-start gap-2'>
							<span className='text-blue-600 mt-1'>•</span>
							<span>{t('suggestions.checkUrl')}</span>
						</li>
						<li className='flex items-start gap-2'>
							<span className='text-blue-600 mt-1'>•</span>
							<span>{t('suggestions.useNavigation')}</span>
						</li>
						<li className='flex items-start gap-2'>
							<span className='text-blue-600 mt-1'>•</span>
							<span>{t('suggestions.searchTools')}</span>
						</li>
					</ul>
				</div>
			</div>
		</div>
	)
}

