import Link from 'next/link'
import { getTranslations, setRequestLocale } from 'next-intl/server'

/**
 * Generate metadata for the harmony page
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
	
	const t = await getTranslations({ locale, namespace: 'learn.harmony' })

	return {
		title: t('title'),
		description: t('description'),
	}
}

/**
 * Color Harmony page
 * Educational content about color harmony
 */
export default async function HarmonyPage({
	params,
}: {
	params: Promise<{ locale: string }> | { locale: string }
}) {
	const resolvedParams = await Promise.resolve(params)
	const locale = resolvedParams.locale
	// Enable static rendering
	setRequestLocale(locale)
	
	const t = await getTranslations({ locale, namespace: 'learn.harmony' })

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
				<div className='text-6xl mb-4'>🌈</div>
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
						{t('sections.complementary.title')}
					</h2>
					<p className='text-slate-700 leading-relaxed'>
						{t('sections.complementary.content')}
					</p>
					<div className='bg-gradient-to-r from-red-500 to-cyan-500 h-24 rounded-lg mt-4 flex items-center justify-center text-white font-semibold'>
						{t('sections.complementary.example')}
					</div>
				</section>

				<section className='space-y-4'>
					<h2 className='text-2xl font-semibold text-slate-900'>
						{t('sections.analogous.title')}
					</h2>
					<p className='text-slate-700 leading-relaxed'>
						{t('sections.analogous.content')}
					</p>
					<div className='bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 h-24 rounded-lg mt-4 flex items-center justify-center text-white font-semibold'>
						{t('sections.analogous.example')}
					</div>
				</section>

				<section className='space-y-4'>
					<h2 className='text-2xl font-semibold text-slate-900'>
						{t('sections.triadic.title')}
					</h2>
					<p className='text-slate-700 leading-relaxed'>
						{t('sections.triadic.content')}
					</p>
					<div className='grid grid-cols-3 gap-2 mt-4'>
						<div className='bg-red-500 h-24 rounded-lg'></div>
						<div className='bg-yellow-500 h-24 rounded-lg'></div>
						<div className='bg-blue-500 h-24 rounded-lg'></div>
					</div>
				</section>

				<section className='space-y-4'>
					<h2 className='text-2xl font-semibold text-slate-900'>
						{t('sections.splitComplementary.title')}
					</h2>
					<p className='text-slate-700 leading-relaxed'>
						{t('sections.splitComplementary.content')}
					</p>
				</section>
			</div>
		</div>
	)
}

