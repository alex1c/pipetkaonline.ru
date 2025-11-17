import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'

/**
 * Generate metadata for the contact page
 */
export async function generateMetadata({
	params: { locale },
}: {
	params: { locale: string }
}) {
	const t = await getTranslations({ locale, namespace: 'contact' })

	return {
		title: t('title'),
		description: t('description'),
	}
}

/**
 * Contact page
 * Contact information and form
 */
export default function ContactPage() {
	const t = useTranslations('contact')

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
					{t('info.title')}
				</h2>
				<div className='space-y-3'>
					<div>
						<h3 className='font-semibold text-slate-800'>{t('info.email.label')}</h3>
						<p className='text-slate-700'>{t('info.email.value')}</p>
					</div>
					<div>
						<h3 className='font-semibold text-slate-800'>{t('info.response.title')}</h3>
						<p className='text-slate-700'>{t('info.response.content')}</p>
					</div>
				</div>
			</section>

			<section className='space-y-4'>
				<h2 className='text-2xl font-semibold text-slate-900'>
					{t('support.title')}
				</h2>
				<p className='text-slate-700 leading-relaxed'>
					{t('support.content')}
				</p>
			</section>
		</div>
	)
}

