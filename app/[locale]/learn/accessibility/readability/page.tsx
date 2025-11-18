'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'
import { LearnSEOContent } from '@/components/learn-seo-content'

/**
 * Text Readability page
 */
export default function ReadabilityPage() {
	const params = useParams()
	const locale = params.locale as string
	const t = useTranslations('learn.accessibility.readability')

	return (
		<div className='space-y-8'>
			<Link
				href={`/${locale}/learn`}
				className='inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors'
			>
				← {t('back')}
			</Link>

			<header className='text-center space-y-4'>
				<div className='text-6xl mb-4'>📖</div>
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
						{t('sections.contrast.title')}
					</h2>
					<div className='space-y-4 mt-4'>
						<div className='bg-slate-900 text-white p-6 rounded-lg'>
							<p className='text-lg'>
								{t('sections.contrast.good')} — {t('sections.contrast.goodDesc')}
							</p>
						</div>
						<div className='bg-slate-400 text-white p-6 rounded-lg'>
							<p className='text-lg'>
								{t('sections.contrast.bad')} — {t('sections.contrast.badDesc')}
							</p>
						</div>
					</div>
				</section>

				<section className='space-y-4'>
					<h2 className='text-2xl font-semibold text-slate-900'>
						{t('sections.fontSize.title')}
					</h2>
					<p className='text-slate-700 leading-relaxed'>
						{t('sections.fontSize.content')}
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
					</ul>
				</section>
			</div>

			{/* SEO Content */}
			<LearnSEOContent
				namespace='learn.accessibility.readability'
				toolLinks={[
					{ slug: 'contrast-checker', anchorText: 'проверка контраста' },
					{ slug: 'text-image-accessibility', anchorText: 'проверка доступности текста' },
					{ slug: 'color-blindness-simulator', anchorText: 'симулятор цветовой слепоты' },
				]}
			/>
		</div>
	)
}

