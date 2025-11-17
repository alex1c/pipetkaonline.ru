'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'

/**
 * Brand Color Strategies page
 */
export default function BrandingPage() {
	const params = useParams()
	const locale = params.locale as string
	const t = useTranslations('learn.psychology.branding')

	return (
		<div className='space-y-8'>
			<Link
				href={`/${locale}/learn`}
				className='inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors'
			>
				← {t('back')}
			</Link>

			<header className='text-center space-y-4'>
				<div className='text-6xl mb-4'>🏢</div>
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
						{t('sections.examples.title')}
					</h2>
					<div className='grid md:grid-cols-2 gap-4 mt-4'>
						<div className='bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500'>
							<h3 className='font-semibold text-slate-900 mb-2'>
								{t('sections.examples.tech.title')}
							</h3>
							<p className='text-slate-700 text-sm'>
								{t('sections.examples.tech.desc')}
							</p>
						</div>
						<div className='bg-green-50 p-6 rounded-lg border-l-4 border-green-500'>
							<h3 className='font-semibold text-slate-900 mb-2'>
								{t('sections.examples.eco.title')}
							</h3>
							<p className='text-slate-700 text-sm'>
								{t('sections.examples.eco.desc')}
							</p>
						</div>
						<div className='bg-red-50 p-6 rounded-lg border-l-4 border-red-500'>
							<h3 className='font-semibold text-slate-900 mb-2'>
								{t('sections.examples.food.title')}
							</h3>
							<p className='text-slate-700 text-sm'>
								{t('sections.examples.food.desc')}
							</p>
						</div>
						<div className='bg-purple-50 p-6 rounded-lg border-l-4 border-purple-500'>
							<h3 className='font-semibold text-slate-900 mb-2'>
								{t('sections.examples.luxury.title')}
							</h3>
							<p className='text-slate-700 text-sm'>
								{t('sections.examples.luxury.desc')}
							</p>
						</div>
					</div>
				</section>

				<section className='space-y-4 bg-slate-50 p-6 rounded-lg'>
					<h2 className='text-2xl font-semibold text-slate-900'>
						{t('sections.strategy.title')}
					</h2>
					<p className='text-slate-700 leading-relaxed'>
						{t('sections.strategy.content')}
					</p>
				</section>
			</div>
		</div>
	)
}

