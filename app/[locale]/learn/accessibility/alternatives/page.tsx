'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'

/**
 * Alternative Color Indicators page
 */
export default function AlternativesPage() {
	const params = useParams()
	const locale = params.locale as string
	const t = useTranslations('learn.accessibility.alternatives')

	return (
		<div className='space-y-8'>
			<Link
				href={`/${locale}/learn`}
				className='inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors'
			>
				← {t('back')}
			</Link>

			<header className='text-center space-y-4'>
				<div className='text-6xl mb-4'>🔔</div>
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
						{t('sections.indicators.title')}
					</h2>
					<div className='grid md:grid-cols-2 gap-4 mt-4'>
						<div className='bg-slate-50 p-6 rounded-lg'>
							<h3 className='font-semibold text-slate-900 mb-2'>
								{t('sections.indicators.icons.title')}
							</h3>
							<p className='text-slate-700 text-sm'>
								{t('sections.indicators.icons.desc')}
							</p>
							<div className='mt-3 flex gap-2'>
								<span className='text-2xl'>✅</span>
								<span className='text-2xl'>❌</span>
								<span className='text-2xl'>⚠️</span>
							</div>
						</div>
						<div className='bg-slate-50 p-6 rounded-lg'>
							<h3 className='font-semibold text-slate-900 mb-2'>
								{t('sections.indicators.text.title')}
							</h3>
							<p className='text-slate-700 text-sm'>
								{t('sections.indicators.text.desc')}
							</p>
						</div>
						<div className='bg-slate-50 p-6 rounded-lg'>
							<h3 className='font-semibold text-slate-900 mb-2'>
								{t('sections.indicators.shapes.title')}
							</h3>
							<p className='text-slate-700 text-sm'>
								{t('sections.indicators.shapes.desc')}
							</p>
							<div className='mt-3 flex gap-2'>
								<div className='w-8 h-8 bg-red-500 rounded-full'></div>
								<div className='w-8 h-8 bg-green-500 rounded-square'></div>
								<div className='w-8 h-8 bg-blue-500 rounded'></div>
							</div>
						</div>
						<div className='bg-slate-50 p-6 rounded-lg'>
							<h3 className='font-semibold text-slate-900 mb-2'>
								{t('sections.indicators.patterns.title')}
							</h3>
							<p className='text-slate-700 text-sm'>
								{t('sections.indicators.patterns.desc')}
							</p>
						</div>
					</div>
				</section>

				<section className='space-y-4 bg-slate-50 p-6 rounded-lg'>
					<h2 className='text-2xl font-semibold text-slate-900'>
						{t('sections.examples.title')}
					</h2>
					<p className='text-slate-700 leading-relaxed'>
						{t('sections.examples.content')}
					</p>
				</section>
			</div>
		</div>
	)
}

