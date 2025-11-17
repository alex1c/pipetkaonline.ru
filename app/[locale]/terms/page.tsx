import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'

/**
 * Generate metadata for the terms of service page
 */
export async function generateMetadata({
	params: { locale },
}: {
	params: { locale: string }
}) {
	const t = await getTranslations({ locale, namespace: 'terms' })

	return {
		title: t('title'),
		description: t('description'),
	}
}

/**
 * Terms of Service page
 * Required for AdSense and Yandex.Direct compliance
 */
export default function TermsPage() {
	const t = useTranslations('terms')

	return (
		<div className='bg-white rounded-xl shadow-md p-8 space-y-6'>
			<h1 className='text-4xl font-bold text-slate-900'>{t('title')}</h1>
			<p className='text-slate-600'>{t('lastUpdated')}</p>

			<section className='space-y-4'>
				<h2 className='text-2xl font-semibold text-slate-900'>
					{t('sections.acceptance.title')}
				</h2>
				<p className='text-slate-700 leading-relaxed'>
					{t('sections.acceptance.content')}
				</p>
			</section>

			<section className='space-y-4'>
				<h2 className='text-2xl font-semibold text-slate-900'>
					{t('sections.use.title')}
				</h2>
				<p className='text-slate-700 leading-relaxed'>
					{t('sections.use.content')}
				</p>
				<ul className='list-disc list-inside space-y-2 text-slate-700 ml-4'>
					<li>{t('sections.use.items.0')}</li>
					<li>{t('sections.use.items.1')}</li>
					<li>{t('sections.use.items.2')}</li>
				</ul>
			</section>

			<section className='space-y-4'>
				<h2 className='text-2xl font-semibold text-slate-900'>
					{t('sections.intellectual.title')}
				</h2>
				<p className='text-slate-700 leading-relaxed'>
					{t('sections.intellectual.content')}
				</p>
			</section>

			<section className='space-y-4'>
				<h2 className='text-2xl font-semibold text-slate-900'>
					{t('sections.liability.title')}
				</h2>
				<p className='text-slate-700 leading-relaxed'>
					{t('sections.liability.content')}
				</p>
			</section>

			<section className='space-y-4'>
				<h2 className='text-2xl font-semibold text-slate-900'>
					{t('sections.changes.title')}
				</h2>
				<p className='text-slate-700 leading-relaxed'>
					{t('sections.changes.content')}
				</p>
			</section>
		</div>
	)
}

