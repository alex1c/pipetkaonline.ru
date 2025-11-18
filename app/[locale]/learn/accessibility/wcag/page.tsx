'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'
import { LearnSEOContent } from '@/components/learn-seo-content'

/**
 * WCAG Contrast Guidelines page
 */
export default function WCAGPage() {
	const params = useParams()
	const locale = params.locale as string
	const t = useTranslations('learn.accessibility.wcag')

	return (
		<div className='space-y-8'>
			<Link
				href={`/${locale}/learn`}
				className='inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors'
			>
				← {t('back')}
			</Link>

			<header className='text-center space-y-4'>
				<div className='text-6xl mb-4'>♿</div>
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

				<div className='grid md:grid-cols-2 gap-6'>
					<div className='bg-green-50 p-6 rounded-lg border-l-4 border-green-500'>
						<h3 className='font-semibold text-slate-900 mb-3 text-lg'>
							{t('sections.aa.title')}
						</h3>
						<p className='text-slate-700 mb-4'>{t('sections.aa.description')}</p>
						<div className='bg-white p-4 rounded'>
							<p className='text-sm font-mono text-slate-900'>
								{t('sections.aa.ratio')}
							</p>
						</div>
					</div>

					<div className='bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500'>
						<h3 className='font-semibold text-slate-900 mb-3 text-lg'>
							{t('sections.aaa.title')}
						</h3>
						<p className='text-slate-700 mb-4'>
							{t('sections.aaa.description')}
						</p>
						<div className='bg-white p-4 rounded'>
							<p className='text-sm font-mono text-slate-900'>
								{t('sections.aaa.ratio')}
							</p>
						</div>
					</div>
				</div>

				<section className='space-y-4 bg-slate-50 p-6 rounded-lg'>
					<h2 className='text-2xl font-semibold text-slate-900'>
						{t('sections.tools.title')}
					</h2>
					<p className='text-slate-700 leading-relaxed'>
						{t('sections.tools.content')}
					</p>
				</section>
			</div>

			{/* SEO Content */}
			<LearnSEOContent
				namespace='learn.accessibility.wcag'
				toolLinks={[
					{ slug: 'contrast-checker', anchorText: 'проверка контраста' },
					{ slug: 'text-image-accessibility', anchorText: 'проверка доступности текста' },
					{ slug: 'color-blindness-simulator', anchorText: 'симулятор цветовой слепоты' },
					{ slug: 'brand-color-analyzer', anchorText: 'анализ брендовых цветов' },
				]}
			/>
		</div>
	)
}

