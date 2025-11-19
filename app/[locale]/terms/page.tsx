import { getTranslations, setRequestLocale } from 'next-intl/server'

/**
 * Generate metadata for the terms of service page
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
export default async function TermsPage({
	params,
}: {
	params: Promise<{ locale: string }> | { locale: string }
}) {
	const resolvedParams = await Promise.resolve(params)
	const locale = resolvedParams.locale
	// Enable static rendering
	setRequestLocale(locale)
	
	const t = await getTranslations({ locale, namespace: 'terms' })

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
					{t('sections.age.title')}
				</h2>
				<p className='text-slate-700 leading-relaxed'>
					{t('sections.age.content')}
				</p>
			</section>

			<section className='space-y-4'>
				<h2 className='text-2xl font-semibold text-slate-900'>
					{t('sections.use.title')}
				</h2>
				<p className='text-slate-700 leading-relaxed'>
					{t('sections.use.content')}
				</p>
				{typeof t('sections.use.items.0') === 'string' && (
					<ul className='list-disc list-inside space-y-2 text-slate-700 ml-4 mt-2'>
						<li>{t('sections.use.items.0')}</li>
						<li>{t('sections.use.items.1')}</li>
						<li>{t('sections.use.items.2')}</li>
						<li>{t('sections.use.items.3')}</li>
						<li>{t('sections.use.items.4')}</li>
					</ul>
				)}
				{typeof t('sections.use.prohibited.title') === 'string' && (
					<div className='mt-4'>
						<h3 className='text-xl font-semibold text-slate-800 mb-2'>
							{t('sections.use.prohibited.title')}
						</h3>
						<p className='text-slate-700 leading-relaxed mb-2'>
							{t('sections.use.prohibited.content')}
						</p>
						<ul className='list-disc list-inside space-y-2 text-slate-700 ml-4'>
							<li>{t('sections.use.prohibited.items.0')}</li>
							<li>{t('sections.use.prohibited.items.1')}</li>
							<li>{t('sections.use.prohibited.items.2')}</li>
							<li>{t('sections.use.prohibited.items.3')}</li>
							<li>{t('sections.use.prohibited.items.4')}</li>
						</ul>
					</div>
				)}
			</section>

			<section className='space-y-4'>
				<h2 className='text-2xl font-semibold text-slate-900'>
					{t('sections.advertising.title')}
				</h2>
				<p className='text-slate-700 leading-relaxed'>
					{t('sections.advertising.content')}
				</p>
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
					{t('sections.userContent.title')}
				</h2>
				<p className='text-slate-700 leading-relaxed'>
					{t('sections.userContent.content')}
				</p>
			</section>

			<section className='space-y-4'>
				<h2 className='text-2xl font-semibold text-slate-900'>
					{t('sections.liability.title')}
				</h2>
				<p className='text-slate-700 leading-relaxed'>
					{t('sections.liability.content')}
				</p>
				{typeof t('sections.liability.items.0') === 'string' && (
					<ul className='list-disc list-inside space-y-2 text-slate-700 ml-4 mt-2'>
						<li>{t('sections.liability.items.0')}</li>
						<li>{t('sections.liability.items.1')}</li>
						<li>{t('sections.liability.items.2')}</li>
						<li>{t('sections.liability.items.3')}</li>
						<li>{t('sections.liability.items.4')}</li>
					</ul>
				)}
			</section>

			<section className='space-y-4'>
				<h2 className='text-2xl font-semibold text-slate-900'>
					{t('sections.indemnification.title')}
				</h2>
				<p className='text-slate-700 leading-relaxed'>
					{t('sections.indemnification.content')}
				</p>
			</section>

			<section className='space-y-4'>
				<h2 className='text-2xl font-semibold text-slate-900'>
					{t('sections.termination.title')}
				</h2>
				<p className='text-slate-700 leading-relaxed'>
					{t('sections.termination.content')}
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

			<section className='space-y-4'>
				<h2 className='text-2xl font-semibold text-slate-900'>
					{t('sections.governingLaw.title')}
				</h2>
				<p className='text-slate-700 leading-relaxed'>
					{t('sections.governingLaw.content')}
				</p>
			</section>

			<section className='space-y-4'>
				<h2 className='text-2xl font-semibold text-slate-900'>
					{t('sections.contact.title')}
				</h2>
				<p className='text-slate-700 leading-relaxed'>
					{t('sections.contact.content')}
				</p>
				{typeof t('sections.contact.email') === 'string' && (
					<div className='mt-4 space-y-2'>
						<p className='text-slate-700'>{t('sections.contact.email')}</p>
						<p className='text-slate-700'>{t('sections.contact.website')}</p>
					</div>
				)}
			</section>
		</div>
	)
}

