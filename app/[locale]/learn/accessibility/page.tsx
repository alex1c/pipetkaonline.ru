import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'

/**
 * Generate metadata for the accessibility page
 */
export async function generateMetadata({
	params: { locale },
}: {
	params: { locale: string }
}) {
	const t = await getTranslations({ locale, namespace: 'learn.accessibility' })

	return {
		title: t('title'),
		description: t('description'),
	}
}

/**
 * Color Accessibility page
 * Educational content about color accessibility
 */
export default function AccessibilityPage({
	params: { locale },
}: {
	params: { locale: string }
}) {
	const t = useTranslations('learn.accessibility')

	return (
		<div className='space-y-8'>
			{/* Back link */}
			<Link
				href={`/${locale}/learn`}
				className='inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors'
			>
				← {t('back')}
			</Link>

			{/* Page header */}
			<header className='text-center space-y-4'>
				<div className='text-6xl mb-4'>♿</div>
				<h1 className='text-4xl font-bold text-slate-900'>{t('title')}</h1>
				<p className='text-lg text-slate-600 max-w-2xl mx-auto'>
					{t('description')}
				</p>
			</header>

			{/* Content sections */}
			<div className='bg-white rounded-xl shadow-md p-8 space-y-8'>
				<section className='space-y-4'>
					<h2 className='text-2xl font-semibold text-slate-900'>
						{t('sections.intro.title')}
					</h2>
					<p className='text-slate-700 leading-relaxed'>
						{t('sections.intro.content')}
					</p>
				</section>

				<section className='space-y-4'>
					<h2 className='text-2xl font-semibold text-slate-900'>
						{t('sections.wcag.title')}
					</h2>
					<p className='text-slate-700 leading-relaxed'>
						{t('sections.wcag.content')}
					</p>
					<div className='bg-green-50 p-4 rounded-lg border-l-4 border-green-500 mt-4'>
						<h3 className='font-semibold text-slate-900 mb-2'>
							{t('sections.wcag.aa.title')}
						</h3>
						<p className='text-slate-700 text-sm'>
							{t('sections.wcag.aa.desc')}
						</p>
					</div>
					<div className='bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500 mt-4'>
						<h3 className='font-semibold text-slate-900 mb-2'>
							{t('sections.wcag.aaa.title')}
						</h3>
						<p className='text-slate-700 text-sm'>
							{t('sections.wcag.aaa.desc')}
						</p>
					</div>
				</section>

				<section className='space-y-4'>
					<h2 className='text-2xl font-semibold text-slate-900'>
						{t('sections.colorBlindness.title')}
					</h2>
					<p className='text-slate-700 leading-relaxed'>
						{t('sections.colorBlindness.content')}
					</p>
					<ul className='list-disc list-inside space-y-2 text-slate-700 ml-4'>
						<li>{t('sections.colorBlindness.items.0')}</li>
						<li>{t('sections.colorBlindness.items.1')}</li>
						<li>{t('sections.colorBlindness.items.2')}</li>
					</ul>
				</section>

				<section className='space-y-4'>
					<h2 className='text-2xl font-semibold text-slate-900'>
						{t('sections.readability.title')}
					</h2>
					<p className='text-slate-700 leading-relaxed'>
						{t('sections.readability.content')}
					</p>
				</section>

				<section className='space-y-4'>
					<h2 className='text-2xl font-semibold text-slate-900'>
						{t('sections.alternatives.title')}
					</h2>
					<p className='text-slate-700 leading-relaxed'>
						{t('sections.alternatives.content')}
					</p>
				</section>
			</div>
		</div>
	)
}

