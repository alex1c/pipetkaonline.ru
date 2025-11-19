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
				<div className='space-y-6'>
					<div>
						<h3 className='text-xl font-semibold text-slate-800 mb-2'>
							{t('sections.types.essential.title')}
						</h3>
						<p className='text-slate-700 leading-relaxed'>
							{t('sections.types.essential.content')}
						</p>
						{typeof t('sections.types.essential.examples') === 'string' && (
							<p className='text-slate-600 text-sm mt-2'>
								{t('sections.types.essential.examples')}
							</p>
						)}
					</div>
					<div>
						<h3 className='text-xl font-semibold text-slate-800 mb-2'>
							{t('sections.types.analytics.title')}
						</h3>
						<p className='text-slate-700 leading-relaxed'>
							{t('sections.types.analytics.content')}
						</p>
						{typeof t('sections.types.analytics.link') === 'string' && (
							<p className='text-slate-600 text-sm mt-2'>
								{t('sections.types.analytics.link')}
							</p>
						)}
						{typeof t('sections.types.analytics.optout') === 'string' && (
							<p className='text-slate-600 text-sm mt-1'>
								{t('sections.types.analytics.optout')}
							</p>
						)}
					</div>
					<div>
						<h3 className='text-xl font-semibold text-slate-800 mb-2'>
							{t('sections.types.advertising.title')}
						</h3>
						<p className='text-slate-700 leading-relaxed mb-3'>
							{t('sections.types.advertising.content')}
						</p>
						{typeof t('sections.types.advertising.google.title') === 'string' && (
							<div className='ml-4 space-y-2'>
								<h4 className='text-lg font-semibold text-slate-800'>
									{t('sections.types.advertising.google.title')}
								</h4>
								<p className='text-slate-700 leading-relaxed'>
									{t('sections.types.advertising.google.content')}
								</p>
								<p className='text-slate-600 text-sm'>
									{t('sections.types.advertising.google.policy')}
								</p>
							</div>
						)}
						{typeof t('sections.types.advertising.yandex.title') === 'string' && (
							<div className='ml-4 space-y-2 mt-3'>
								<h4 className='text-lg font-semibold text-slate-800'>
									{t('sections.types.advertising.yandex.title')}
								</h4>
								<p className='text-slate-700 leading-relaxed'>
									{t('sections.types.advertising.yandex.content')}
								</p>
								<p className='text-slate-600 text-sm'>
									{t('sections.types.advertising.yandex.policy')}
								</p>
							</div>
						)}
					</div>
				</div>
			</section>

			<section className='space-y-4'>
				<h2 className='text-2xl font-semibold text-slate-900'>
					{t('sections.thirdParty.title')}
				</h2>
				<p className='text-slate-700 leading-relaxed'>
					{t('sections.thirdParty.content')}
				</p>
				{typeof t('sections.thirdParty.services.0') === 'string' && (
					<ul className='list-disc list-inside space-y-2 text-slate-700 ml-4 mt-2'>
						<li>{t('sections.thirdParty.services.0')}</li>
						<li>{t('sections.thirdParty.services.1')}</li>
					</ul>
				)}
			</section>

			<section className='space-y-4'>
				<h2 className='text-2xl font-semibold text-slate-900'>
					{t('sections.manage.title')}
				</h2>
				<p className='text-slate-700 leading-relaxed'>
					{t('sections.manage.content')}
				</p>
				{typeof t('sections.manage.methods.0') === 'string' && (
					<ul className='list-disc list-inside space-y-2 text-slate-700 ml-4 mt-2'>
						<li>{t('sections.manage.methods.0')}</li>
						<li>{t('sections.manage.methods.1')}</li>
						<li>{t('sections.manage.methods.2')}</li>
						<li>{t('sections.manage.methods.3')}</li>
					</ul>
				)}
				{typeof t('sections.manage.warning') === 'string' && (
					<p className='text-slate-600 text-sm mt-3 italic'>
						{t('sections.manage.warning')}
					</p>
				)}
			</section>

			<section className='space-y-4'>
				<h2 className='text-2xl font-semibold text-slate-900'>
					{t('sections.duration.title')}
				</h2>
				<p className='text-slate-700 leading-relaxed'>
					{t('sections.duration.content')}
				</p>
				{typeof t('sections.duration.types.0') === 'string' && (
					<ul className='list-disc list-inside space-y-2 text-slate-700 ml-4 mt-2'>
						<li>{t('sections.duration.types.0')}</li>
						<li>{t('sections.duration.types.1')}</li>
					</ul>
				)}
			</section>

			<section className='space-y-4'>
				<h2 className='text-2xl font-semibold text-slate-900'>
					{t('sections.localStorage.title')}
				</h2>
				<p className='text-slate-700 leading-relaxed'>
					{t('sections.localStorage.content')}
				</p>
			</section>
		</div>
	)
}

