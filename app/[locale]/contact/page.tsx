import { getTranslations, setRequestLocale } from 'next-intl/server'
import { ContactForm } from '@/components/contact-form'

/**
 * Generate metadata for the contact page
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
	
	const t = await getTranslations({ locale, namespace: 'contact' })

	return {
		title: t('title'),
		description: t('description'),
	}
}

/**
 * Contact page
 * Contact form for sending messages via Telegram
 */
export default async function ContactPage({
	params,
}: {
	params: Promise<{ locale: string }> | { locale: string }
}) {
	const resolvedParams = await Promise.resolve(params)
	const locale = resolvedParams.locale
	// Enable static rendering
	setRequestLocale(locale)
	
	const t = await getTranslations({ locale, namespace: 'contact' })

	return (
		<div className='bg-white rounded-xl shadow-md p-8 space-y-8'>
			<h1 className='text-4xl font-bold text-slate-900'>{t('title')}</h1>

			<section className='space-y-4'>
				<p className='text-lg text-slate-700 leading-relaxed'>
					{t('intro')}
				</p>
			</section>

			<section className='space-y-6'>
				<h2 className='text-2xl font-semibold text-slate-900'>
					{t('form.title')}
				</h2>
				<ContactForm />
			</section>

			<section className='space-y-4'>
				<h2 className='text-2xl font-semibold text-slate-900'>
					{t('info.response.title')}
				</h2>
				<p className='text-slate-700'>{t('info.response.content')}</p>
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

