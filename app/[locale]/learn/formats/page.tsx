import Link from 'next/link'
import { getTranslations, setRequestLocale } from 'next-intl/server'

/**
 * Generate metadata for the formats page
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
	
	const t = await getTranslations({ locale, namespace: 'learn.formats' })

	return {
		title: t('title'),
		description: t('description'),
	}
}

/**
 * Digital Color Formats page
 * Educational content about color formats
 */
export default async function FormatsPage({
	params,
}: {
	params: Promise<{ locale: string }> | { locale: string }
}) {
	const resolvedParams = await Promise.resolve(params)
	const locale = resolvedParams.locale
	// Enable static rendering
	setRequestLocale(locale)
	
	const t = await getTranslations({ locale, namespace: 'learn.formats' })

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
				<div className='text-6xl mb-4'>💻</div>
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
						{t('sections.hex.title')}
					</h2>
					<p className='text-slate-700 leading-relaxed'>
						{t('sections.hex.content')}
					</p>
					<div className='bg-slate-50 p-4 rounded-lg mt-4'>
						<code className='text-slate-900 font-mono'>
							#FF5733, #00A8CC, #F5F5F5
						</code>
					</div>
				</section>

				<section className='space-y-4'>
					<h2 className='text-2xl font-semibold text-slate-900'>
						{t('sections.rgb.title')}
					</h2>
					<p className='text-slate-700 leading-relaxed'>
						{t('sections.rgb.content')}
					</p>
					<div className='bg-slate-50 p-4 rounded-lg mt-4'>
						<code className='text-slate-900 font-mono'>
							rgb(255, 87, 51), rgba(0, 168, 204, 0.5)
						</code>
					</div>
				</section>

				<section className='space-y-4'>
					<h2 className='text-2xl font-semibold text-slate-900'>
						{t('sections.hsl.title')}
					</h2>
					<p className='text-slate-700 leading-relaxed'>
						{t('sections.hsl.content')}
					</p>
					<div className='bg-slate-50 p-4 rounded-lg mt-4'>
						<code className='text-slate-900 font-mono'>
							hsl(9, 100%, 60%), hsla(195, 100%, 40%, 0.5)
						</code>
					</div>
				</section>

				<section className='space-y-4'>
					<h2 className='text-2xl font-semibold text-slate-900'>
						{t('sections.css.title')}
					</h2>
					<p className='text-slate-700 leading-relaxed'>
						{t('sections.css.content')}
					</p>
					<div className='bg-slate-50 p-4 rounded-lg mt-4'>
						<code className='text-slate-900 font-mono'>
							red, blue, green, coral, skyblue
						</code>
					</div>
				</section>
			</div>
		</div>
	)
}

