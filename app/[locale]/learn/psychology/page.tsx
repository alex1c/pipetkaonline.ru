import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'

/**
 * Generate metadata for the psychology page
 */
export async function generateMetadata({
	params: { locale },
}: {
	params: { locale: string }
}) {
	const t = await getTranslations({ locale, namespace: 'learn.psychology' })

	return {
		title: t('title'),
		description: t('description'),
	}
}

/**
 * Color Psychology page
 * Educational content about color psychology
 */
export default function PsychologyPage({
	params: { locale },
}: {
	params: { locale: string }
}) {
	const t = useTranslations('learn.psychology')

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
				<div className='text-6xl mb-4'>🧠</div>
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
						{t('sections.cultural.title')}
					</h2>
					<p className='text-slate-700 leading-relaxed'>
						{t('sections.cultural.content')}
					</p>
					<div className='grid md:grid-cols-2 gap-4 mt-4'>
						<div className='bg-red-50 p-4 rounded-lg border-l-4 border-red-500'>
							<h3 className='font-semibold text-slate-900 mb-2'>
								{t('sections.cultural.red.title')}
							</h3>
							<p className='text-slate-700 text-sm'>
								{t('sections.cultural.red.desc')}
							</p>
						</div>
						<div className='bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500'>
							<h3 className='font-semibold text-slate-900 mb-2'>
								{t('sections.cultural.blue.title')}
							</h3>
							<p className='text-slate-700 text-sm'>
								{t('sections.cultural.blue.desc')}
							</p>
						</div>
					</div>
				</section>

				<section className='space-y-4'>
					<h2 className='text-2xl font-semibold text-slate-900'>
						{t('sections.emotions.title')}
					</h2>
					<p className='text-slate-700 leading-relaxed'>
						{t('sections.emotions.content')}
					</p>
				</section>

				<section className='space-y-4'>
					<h2 className='text-2xl font-semibold text-slate-900'>
						{t('sections.branding.title')}
					</h2>
					<p className='text-slate-700 leading-relaxed'>
						{t('sections.branding.content')}
					</p>
				</section>

				<section className='space-y-4'>
					<h2 className='text-2xl font-semibold text-slate-900'>
						{t('sections.marketing.title')}
					</h2>
					<p className='text-slate-700 leading-relaxed'>
						{t('sections.marketing.content')}
					</p>
				</section>
			</div>
		</div>
	)
}

