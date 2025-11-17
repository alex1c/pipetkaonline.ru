import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'

/**
 * Generate metadata for the cookies policy page
 */
export async function generateMetadata({
	params: { locale },
}: {
	params: { locale: string }
}) {
	const t = await getTranslations({ locale, namespace: 'cookies' })

	return {
		title: t('title'),
		description: t('description'),
	}
}

/**
 * Cookies Policy page
 * Required for AdSense and Yandex.Direct compliance
 */
export default function CookiesPage() {
	const t = useTranslations('cookies')

	return (
		<div className='bg-white rounded-xl shadow-md p-8 space-y-6'>
			<h1 className='text-4xl font-bold text-slate-900'>{t('title')}</h1>
			<p className='text-slate-600'>{t('lastUpdated')}</p>

			<section className='space-y-4'>
				<h2 className='text-2xl font-semibold text-slate-900'>
					{t('sections.what.title')}
				</h2>
				<p className='text-slate-700 leading-relaxed'>
					{t('sections.what.content')}
				</p>
			</section>

			<section className='space-y-4'>
				<h2 className='text-2xl font-semibold text-slate-900'>
					{t('sections.how.title')}
				</h2>
				<p className='text-slate-700 leading-relaxed'>
					{t('sections.how.content')}
				</p>
			</section>

			<section className='space-y-4'>
				<h2 className='text-2xl font-semibold text-slate-900'>
					{t('sections.types.title')}
				</h2>
				<div className='space-y-4'>
					<div>
						<h3 className='text-xl font-semibold text-slate-800 mb-2'>
							{t('sections.types.essential.title')}
						</h3>
						<p className='text-slate-700 leading-relaxed'>
							{t('sections.types.essential.content')}
						</p>
					</div>
					<div>
						<h3 className='text-xl font-semibold text-slate-800 mb-2'>
							{t('sections.types.analytics.title')}
						</h3>
						<p className='text-slate-700 leading-relaxed'>
							{t('sections.types.analytics.content')}
						</p>
					</div>
					<div>
						<h3 className='text-xl font-semibold text-slate-800 mb-2'>
							{t('sections.types.advertising.title')}
						</h3>
						<p className='text-slate-700 leading-relaxed'>
							{t('sections.types.advertising.content')}
						</p>
					</div>
				</div>
			</section>

			<section className='space-y-4'>
				<h2 className='text-2xl font-semibold text-slate-900'>
					{t('sections.manage.title')}
				</h2>
				<p className='text-slate-700 leading-relaxed'>
					{t('sections.manage.content')}
				</p>
			</section>
		</div>
	)
}

