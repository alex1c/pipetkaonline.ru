import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'

/**
 * Generate metadata for the about page
 */
export async function generateMetadata({
	params: { locale },
}: {
	params: { locale: string }
}) {
	const t = await getTranslations({ locale, namespace: 'about' })

	return {
		title: t('title'),
		description: t('description'),
	}
}

/**
 * About page
 * Information about the website and its purpose
 */
export default function AboutPage() {
	const t = useTranslations('about')

	return (
		<div className='bg-white rounded-xl shadow-md p-8 space-y-6'>
			<h1 className='text-4xl font-bold text-slate-900'>{t('title')}</h1>

			<section className='space-y-4'>
				<p className='text-lg text-slate-700 leading-relaxed'>
					{t('intro')}
				</p>
			</section>

			<section className='space-y-4'>
				<h2 className='text-2xl font-semibold text-slate-900'>
					{t('mission.title')}
				</h2>
				<p className='text-slate-700 leading-relaxed'>
					{t('mission.content')}
				</p>
			</section>

			<section className='space-y-4'>
				<h2 className='text-2xl font-semibold text-slate-900'>
					{t('features.title')}
				</h2>
				<ul className='list-disc list-inside space-y-2 text-slate-700 ml-4'>
					<li>{t('features.items.0')}</li>
					<li>{t('features.items.1')}</li>
					<li>{t('features.items.2')}</li>
					<li>{t('features.items.3')}</li>
				</ul>
			</section>
		</div>
	)
}

