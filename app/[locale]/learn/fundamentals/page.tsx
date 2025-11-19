import Link from 'next/link'
import { getTranslations, setRequestLocale } from 'next-intl/server'

/**
 * Generate metadata for the fundamentals page
 */
export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }> | { locale: string }
}) {
	const resolvedParams = await Promise.resolve(params)
	const locale = resolvedParams.locale
	// Enable static rendering
	setRequestLocale(locale)
	
	const t = await getTranslations({ locale, namespace: 'learn.fundamentals' })

	return {
		title: t('title'),
		description: t('description'),
	}
}

/**
 * Color Fundamentals page
 * Educational content about color basics
 */
export default async function FundamentalsPage({
	params,
}: {
	params: Promise<{ locale: string }> | { locale: string }
}) {
	const resolvedParams = await Promise.resolve(params)
	const locale = resolvedParams.locale
	// Enable static rendering
	setRequestLocale(locale)
	
	const t = await getTranslations({ locale, namespace: 'learn.fundamentals' })

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
				<div className='text-6xl mb-4'>🎨</div>
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
						{t('sections.models.title')}
					</h2>
					<p className='text-slate-700 leading-relaxed'>
						{t('sections.models.content')}
					</p>
					<div className='grid md:grid-cols-2 gap-4 mt-4'>
						<div className='bg-slate-50 p-4 rounded-lg'>
							<h3 className='font-semibold text-slate-900 mb-2'>
								{t('sections.models.rgb.title')}
							</h3>
							<p className='text-slate-700 text-sm'>
								{t('sections.models.rgb.desc')}
							</p>
						</div>
						<div className='bg-slate-50 p-4 rounded-lg'>
							<h3 className='font-semibold text-slate-900 mb-2'>
								{t('sections.models.cmyk.title')}
							</h3>
							<p className='text-slate-700 text-sm'>
								{t('sections.models.cmyk.desc')}
							</p>
						</div>
					</div>
				</section>

				<section className='space-y-4'>
					<h2 className='text-2xl font-semibold text-slate-900'>
						{t('sections.wheel.title')}
					</h2>
					<p className='text-slate-700 leading-relaxed'>
						{t('sections.wheel.content')}
					</p>
				</section>

				<section className='space-y-4'>
					<h2 className='text-2xl font-semibold text-slate-900'>
						{t('sections.temperature.title')}
					</h2>
					<p className='text-slate-700 leading-relaxed'>
						{t('sections.temperature.content')}
					</p>
					<div className='grid md:grid-cols-2 gap-4 mt-4'>
						<div className='bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500'>
							<h3 className='font-semibold text-slate-900 mb-2'>
								{t('sections.temperature.warm.title')}
							</h3>
							<p className='text-slate-700 text-sm'>
								{t('sections.temperature.warm.desc')}
							</p>
						</div>
						<div className='bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500'>
							<h3 className='font-semibold text-slate-900 mb-2'>
								{t('sections.temperature.cool.title')}
							</h3>
							<p className='text-slate-700 text-sm'>
								{t('sections.temperature.cool.desc')}
							</p>
						</div>
					</div>
				</section>

				<section className='space-y-4'>
					<h2 className='text-2xl font-semibold text-slate-900'>
						{t('sections.properties.title')}
					</h2>
					<p className='text-slate-700 leading-relaxed'>
						{t('sections.properties.content')}
					</p>
					<ul className='list-disc list-inside space-y-2 text-slate-700 ml-4'>
						<li>{t('sections.properties.items.0')}</li>
						<li>{t('sections.properties.items.1')}</li>
						<li>{t('sections.properties.items.2')}</li>
					</ul>
				</section>
			</div>
		</div>
	)
}

