'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'

/**
 * Color in Marketing page
 */
export default function MarketingPage() {
	const params = useParams()
	const locale = params.locale as string
	const t = useTranslations('learn.psychology.marketing')

	return (
		<div className='space-y-8'>
			<Link
				href={`/${locale}/learn`}
				className='inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors'
			>
				← {t('back')}
			</Link>

			<header className='text-center space-y-4'>
				<div className='text-6xl mb-4'>📊</div>
				<h1 className='text-4xl font-bold text-slate-900'>{t('title')}</h1>
				<p className='text-lg text-slate-600 max-w-2xl mx-auto'>
					{t('description')}
				</p>
			</header>

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
						{t('sections.cta.title')}
					</h2>
					<p className='text-slate-700 leading-relaxed'>
						{t('sections.cta.content')}
					</p>
					<div className='bg-red-500 text-white p-6 rounded-lg mt-4 text-center font-semibold text-lg'>
						{t('sections.cta.example')}
					</div>
				</section>

				<section className='space-y-4'>
					<h2 className='text-2xl font-semibold text-slate-900'>
						{t('sections.trust.title')}
					</h2>
					<p className='text-slate-700 leading-relaxed'>
						{t('sections.trust.content')}
					</p>
				</section>

				<section className='space-y-4 bg-slate-50 p-6 rounded-lg'>
					<h2 className='text-2xl font-semibold text-slate-900'>
						{t('sections.bestPractices.title')}
					</h2>
					<ul className='list-disc list-inside space-y-2 text-slate-700 ml-4'>
						<li>{t('sections.bestPractices.items.0')}</li>
						<li>{t('sections.bestPractices.items.1')}</li>
						<li>{t('sections.bestPractices.items.2')}</li>
						<li>{t('sections.bestPractices.items.3')}</li>
					</ul>
				</section>
			</div>
		</div>
	)
}

