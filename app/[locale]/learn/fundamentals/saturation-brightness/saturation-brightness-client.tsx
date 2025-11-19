'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'
import { LearnSEOContent } from '@/components/learn-seo-content'

/**
 * Saturation and Brightness page (Client Component)
 */
export function SaturationBrightnessPageClient() {
	const params = useParams()
	const locale = params.locale as string
	const t = useTranslations('learn.fundamentals.saturationBrightness')

	return (
		<div className='space-y-8'>
			<Link
				href={`/${locale}/learn`}
				className='inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors'
			>
				← {t('back')}
			</Link>

			<header className='text-center space-y-4'>
				<div className='text-6xl mb-4'>✨</div>
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
						{t('sections.saturation.title')}
					</h2>
					<p className='text-slate-700 leading-relaxed'>
						{t('sections.saturation.description')}
					</p>
					<div className='grid grid-cols-4 gap-2 mt-4'>
						<div className='bg-red-900 h-20 rounded'></div>
						<div className='bg-red-600 h-20 rounded'></div>
						<div className='bg-red-400 h-20 rounded'></div>
						<div className='bg-red-200 h-20 rounded'></div>
					</div>
					<p className='text-sm text-slate-600 mt-2'>
						{t('sections.saturation.example')}
					</p>
				</section>

				<section className='space-y-4'>
					<h2 className='text-2xl font-semibold text-slate-900'>
						{t('sections.brightness.title')}
					</h2>
					<p className='text-slate-700 leading-relaxed'>
						{t('sections.brightness.description')}
					</p>
					<div className='grid grid-cols-5 gap-2 mt-4'>
						<div className='bg-slate-900 h-20 rounded'></div>
						<div className='bg-slate-600 h-20 rounded'></div>
						<div className='bg-slate-400 h-20 rounded'></div>
						<div className='bg-slate-200 h-20 rounded'></div>
						<div className='bg-slate-50 h-20 rounded border border-slate-300'></div>
					</div>
					<p className='text-sm text-slate-600 mt-2'>
						{t('sections.brightness.example')}
					</p>
				</section>

				<section className='space-y-4 bg-slate-50 p-6 rounded-lg'>
					<h2 className='text-2xl font-semibold text-slate-900'>
						{t('sections.combination.title')}
					</h2>
					<p className='text-slate-700 leading-relaxed'>
						{t('sections.combination.content')}
					</p>
				</section>
			</div>

			<LearnSEOContent
				namespace='learn.fundamentals.saturationBrightness'
				toolLinks={[
					{ slug: 'ui-theme-generator', anchorText: 'генератор UI темы' },
					{ slug: 'color-harmony', anchorText: 'цветовая гармония' },
					{ slug: 'palette-generator', anchorText: 'генератор палитр' },
					{ slug: 'contrast-checker', anchorText: 'проверка контраста' },
					{ slug: 'brand-color-analyzer', anchorText: 'анализ брендовых цветов' },
					{ slug: 'emotion-colors', anchorText: 'эмоции и цвет' },
				]}
			/>
		</div>
	)
}

