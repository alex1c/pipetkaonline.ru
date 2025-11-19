'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'
import { LearnSEOContent } from '@/components/learn-seo-content'

/**
 * Analogous Colors page (Client Component)
 */
export function AnalogousPageClient() {
	const params = useParams()
	const locale = params.locale as string
	const t = useTranslations('learn.harmony.analogous')

	return (
		<div className='space-y-8'>
			<Link
				href={`/${locale}/learn`}
				className='inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors'
			>
				← {t('back')}
			</Link>

			<header className='text-center space-y-4'>
				<div className='text-6xl mb-4'>🌈</div>
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
					<div className='space-y-4 mt-4'>
						<div className='bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 h-24 rounded-lg flex items-center justify-center text-white font-semibold'>
							{t('sections.examples.blue')}
						</div>
						<div className='bg-gradient-to-r from-green-400 via-green-500 to-green-600 h-24 rounded-lg flex items-center justify-center text-white font-semibold'>
							{t('sections.examples.green')}
						</div>
						<div className='bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 h-24 rounded-lg flex items-center justify-center text-white font-semibold'>
							{t('sections.examples.orange')}
						</div>
					</div>
				</section>

				<section className='space-y-4 bg-slate-50 p-6 rounded-lg'>
					<h2 className='text-2xl font-semibold text-slate-900'>
						{t('sections.usage.title')}
					</h2>
					<p className='text-slate-700 leading-relaxed'>
						{t('sections.usage.content')}
					</p>
				</section>
			</div>

			<LearnSEOContent
				namespace='learn.harmony.analogous'
				toolLinks={[
					{ slug: 'color-harmony', anchorText: 'цветовая гармония' },
					{ slug: 'palette-generator', anchorText: 'генератор палитр' },
					{ slug: 'emotion-colors', anchorText: 'эмоции и цвет' },
					{ slug: 'brand-color-analyzer', anchorText: 'анализатор цветов бренда' },
					{ slug: 'contrast-checker', anchorText: 'проверка контраста' },
				]}
			/>
		</div>
	)
}

