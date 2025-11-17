import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'

/**
 * Generate metadata for the privacy policy page
 */
export async function generateMetadata({
	params: { locale },
}: {
	params: { locale: string }
}) {
	const t = await getTranslations({ locale, namespace: 'privacy' })

	return {
		title: t('title'),
		description: t('description'),
	}
}

/**
 * Privacy Policy page
 * Required for AdSense and Yandex.Direct compliance
 */
export default function PrivacyPage() {
	const t = useTranslations('privacy')

	return (
		<div className='bg-white rounded-xl shadow-md p-8 space-y-6'>
			<h1 className='text-4xl font-bold text-slate-900'>{t('title')}</h1>
			<p className='text-slate-600'>{t('lastUpdated')}</p>

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
					{t('sections.data.title')}
				</h2>
				<p className='text-slate-700 leading-relaxed'>
					{t('sections.data.content')}
				</p>
				<ul className='list-disc list-inside space-y-2 text-slate-700 ml-4'>
					<li>{t('sections.data.items.0')}</li>
					<li>{t('sections.data.items.1')}</li>
					<li>{t('sections.data.items.2')}</li>
				</ul>
			</section>

			<section className='space-y-4'>
				<h2 className='text-2xl font-semibold text-slate-900'>
					{t('sections.cookies.title')}
				</h2>
				<p className='text-slate-700 leading-relaxed'>
					{t('sections.cookies.content')}
				</p>
			</section>

			<section className='space-y-4'>
				<h2 className='text-2xl font-semibold text-slate-900'>
					{t('sections.thirdParty.title')}
				</h2>
				<p className='text-slate-700 leading-relaxed'>
					{t('sections.thirdParty.content')}
				</p>
			</section>

			<section className='space-y-4'>
				<h2 className='text-2xl font-semibold text-slate-900'>
					{t('sections.rights.title')}
				</h2>
				<p className='text-slate-700 leading-relaxed'>
					{t('sections.rights.content')}
				</p>
			</section>

			<section className='space-y-4'>
				<h2 className='text-2xl font-semibold text-slate-900'>
					{t('sections.contact.title')}
				</h2>
				<p className='text-slate-700 leading-relaxed'>
					{t('sections.contact.content')}
				</p>
			</section>
		</div>
	)
}

