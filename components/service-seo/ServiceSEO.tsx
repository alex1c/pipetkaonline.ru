'use client'

import { useTranslations } from 'next-intl'

interface ServiceSEOProps {
	/**
	 * Translation namespace for SEO content
	 * Example: 'tools.colorLab.seo' or 'tools.paletteGenerator.seo'
	 */
	namespace: string
}

/**
 * Helper function to safely check if a translation key exists
 * Uses a try-catch with silent error handling to avoid console errors
 */
function hasTranslation(
	t: ReturnType<typeof useTranslations>,
	key: string,
	namespacePrefix: string
): boolean {
	// Suppress console errors temporarily
	const originalError = console.error
	console.error = () => {} // Silently ignore errors
	
	try {
		// Try to get the translation value
		// This will throw an IntlError with code 'MISSING_MESSAGE' if key doesn't exist
		const value = t(key)
		
		// Restore console.error
		console.error = originalError
		
		// If we got here, the key exists
		// Check if it's not a fallback (starts with namespace prefix)
		if (value && typeof value === 'string') {
			const firstPart = namespacePrefix.split('.')[0]
			// If value starts with namespace prefix, it's likely a fallback
			return !value.startsWith(firstPart + '.')
		}
		
		// If value exists and is not a string, assume it's valid
		return !!value
	} catch (error: any) {
		// Restore console.error
		console.error = originalError
		
		// Check if it's a MISSING_MESSAGE error
		// This is expected for optional keys
		if (error?.code === 'MISSING_MESSAGE' || error?.message?.includes('MISSING_MESSAGE')) {
			return false
		}
		// For other errors, return false silently
		return false
	}
}

/**
 * Reusable SEO content component for service pages
 * Displays guide, how-to section, and FAQ with keywords
 * Can be used for any service with the same structure
 */
export function ServiceSEO({ namespace }: ServiceSEOProps) {
	const t = useTranslations(namespace)

	// Helper to check if optional keys exist
	const hasKey = (key: string) => hasTranslation(t, key, namespace)

	return (
		<div className='space-y-12 mt-16'>
			{/* Guide Section */}
			<section className='bg-white rounded-xl shadow-md p-8'>
				<h2 className='text-3xl font-bold text-slate-900 mb-6'>
					{t('guide.title')}
				</h2>
				<p className='text-lg text-slate-700 mb-8'>{t('guide.intro')}</p>

				<div className='space-y-6'>
					{/* Step 1 */}
					<div className='border-l-4 border-blue-500 pl-6'>
						<h3 className='text-xl font-semibold text-slate-900 mb-2'>
							{t('guide.step1.title')}
						</h3>
						<p className='text-slate-600'>{t('guide.step1.description')}</p>
					</div>

					{/* Step 2 */}
					<div className='border-l-4 border-blue-500 pl-6'>
						<h3 className='text-xl font-semibold text-slate-900 mb-2'>
							{t('guide.step2.title')}
						</h3>
						<p className='text-slate-600'>{t('guide.step2.description')}</p>
					</div>

					{/* Step 3 */}
					<div className='border-l-4 border-blue-500 pl-6'>
						<h3 className='text-xl font-semibold text-slate-900 mb-2'>
							{t('guide.step3.title')}
						</h3>
						<p className='text-slate-600'>{t('guide.step3.description')}</p>
					</div>

					{/* Step 4 - optional */}
					{hasKey('guide.step4.title') && (
						<div className='border-l-4 border-blue-500 pl-6'>
							<h3 className='text-xl font-semibold text-slate-900 mb-2'>
								{t('guide.step4.title')}
							</h3>
							<p className='text-slate-600'>{t('guide.step4.description')}</p>
						</div>
					)}

					{/* Step 5 - optional */}
					{hasKey('guide.step5.title') && (
						<div className='border-l-4 border-blue-500 pl-6'>
							<h3 className='text-xl font-semibold text-slate-900 mb-2'>
								{t('guide.step5.title')}
							</h3>
							<p className='text-slate-600'>{t('guide.step5.description')}</p>
						</div>
					)}

					{/* Step 6 - optional */}
					{hasKey('guide.step6.title') && (
						<div className='border-l-4 border-blue-500 pl-6'>
							<h3 className='text-xl font-semibold text-slate-900 mb-2'>
								{t('guide.step6.title')}
							</h3>
							<p className='text-slate-600'>{t('guide.step6.description')}</p>
						</div>
					)}
				</div>
			</section>

			{/* How-To Section */}
			<section className='bg-white rounded-xl shadow-md p-8'>
				<h2 className='text-3xl font-bold text-slate-900 mb-8'>
					{t('howTo.title')}
				</h2>

				<div className='grid md:grid-cols-2 gap-6'>
					{/* How-To 1 */}
					<div className='bg-slate-50 rounded-lg p-6 hover:shadow-md transition-shadow'>
						<h3 className='text-lg font-semibold text-slate-900 mb-3'>
							{t('howTo.howTo1.title')}
						</h3>
						<p className='text-slate-600'>{t('howTo.howTo1.description')}</p>
					</div>

					{/* How-To 2 */}
					<div className='bg-slate-50 rounded-lg p-6 hover:shadow-md transition-shadow'>
						<h3 className='text-lg font-semibold text-slate-900 mb-3'>
							{t('howTo.howTo2.title')}
						</h3>
						<p className='text-slate-600'>{t('howTo.howTo2.description')}</p>
					</div>

					{/* How-To 3 - optional */}
					{hasKey('howTo.howTo3.title') && (
						<div className='bg-slate-50 rounded-lg p-6 hover:shadow-md transition-shadow'>
							<h3 className='text-lg font-semibold text-slate-900 mb-3'>
								{t('howTo.howTo3.title')}
							</h3>
							<p className='text-slate-600'>{t('howTo.howTo3.description')}</p>
						</div>
					)}

					{/* How-To 4 - optional */}
					{hasKey('howTo.howTo4.title') && (
						<div className='bg-slate-50 rounded-lg p-6 hover:shadow-md transition-shadow'>
							<h3 className='text-lg font-semibold text-slate-900 mb-3'>
								{t('howTo.howTo4.title')}
							</h3>
							<p className='text-slate-600'>{t('howTo.howTo4.description')}</p>
						</div>
					)}

					{/* How-To 5 - optional */}
					{hasKey('howTo.howTo5.title') && (
						<div className='bg-slate-50 rounded-lg p-6 hover:shadow-md transition-shadow'>
							<h3 className='text-lg font-semibold text-slate-900 mb-3'>
								{t('howTo.howTo5.title')}
							</h3>
							<p className='text-slate-600'>{t('howTo.howTo5.description')}</p>
						</div>
					)}

					{/* How-To 6 - optional */}
					{hasKey('howTo.howTo6.title') && (
						<div className='bg-slate-50 rounded-lg p-6 hover:shadow-md transition-shadow'>
							<h3 className='text-lg font-semibold text-slate-900 mb-3'>
								{t('howTo.howTo6.title')}
							</h3>
							<p className='text-slate-600'>{t('howTo.howTo6.description')}</p>
						</div>
					)}
				</div>
			</section>

			{/* FAQ Section */}
			<section className='bg-white rounded-xl shadow-md p-8'>
				<h2 className='text-3xl font-bold text-slate-900 mb-8'>
					{t('faq.title')}
				</h2>

				<div className='space-y-6'>
					{/* FAQ Q1 */}
					<div className='border-b border-slate-200 pb-6'>
						<h3 className='text-lg font-semibold text-slate-900 mb-3'>
							{t('faq.q1.question')}
						</h3>
						<p className='text-slate-600'>{t('faq.q1.answer')}</p>
					</div>

					{/* FAQ Q2 */}
					<div className='border-b border-slate-200 pb-6'>
						<h3 className='text-lg font-semibold text-slate-900 mb-3'>
							{t('faq.q2.question')}
						</h3>
						<p className='text-slate-600'>{t('faq.q2.answer')}</p>
					</div>

					{/* FAQ Q3 */}
					<div className='border-b border-slate-200 pb-6'>
						<h3 className='text-lg font-semibold text-slate-900 mb-3'>
							{t('faq.q3.question')}
						</h3>
						<p className='text-slate-600'>{t('faq.q3.answer')}</p>
					</div>

					{/* FAQ Q4 - optional */}
					{hasKey('faq.q4.question') && (
						<div className='border-b border-slate-200 pb-6'>
							<h3 className='text-lg font-semibold text-slate-900 mb-3'>
								{t('faq.q4.question')}
							</h3>
							<p className='text-slate-600'>{t('faq.q4.answer')}</p>
						</div>
					)}

					{/* FAQ Q5 - optional */}
					{hasKey('faq.q5.question') && (
						<div className='border-b border-slate-200 pb-6'>
							<h3 className='text-lg font-semibold text-slate-900 mb-3'>
								{t('faq.q5.question')}
							</h3>
							<p className='text-slate-600'>{t('faq.q5.answer')}</p>
						</div>
					)}

					{/* FAQ Q6 - optional */}
					{hasKey('faq.q6.question') && (
						<div className='border-b border-slate-200 pb-6'>
							<h3 className='text-lg font-semibold text-slate-900 mb-3'>
								{t('faq.q6.question')}
							</h3>
							<p className='text-slate-600'>{t('faq.q6.answer')}</p>
						</div>
					)}

					{/* FAQ Q7 - optional */}
					{hasKey('faq.q7.question') && (
						<div className='border-b border-slate-200 pb-6'>
							<h3 className='text-lg font-semibold text-slate-900 mb-3'>
								{t('faq.q7.question')}
							</h3>
							<p className='text-slate-600'>{t('faq.q7.answer')}</p>
						</div>
					)}

					{/* FAQ Q8 - optional */}
					{hasKey('faq.q8.question') && (
						<div className='pb-6'>
							<h3 className='text-lg font-semibold text-slate-900 mb-3'>
								{t('faq.q8.question')}
							</h3>
							<p className='text-slate-600'>{t('faq.q8.answer')}</p>
						</div>
					)}
				</div>
			</section>

			{/* Keywords meta (hidden, for SEO) */}
			<div className='hidden' aria-hidden='true'>
				{t('keywords')}
			</div>
		</div>
	)
}
