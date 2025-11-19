'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'
import { LearnSEOContent } from '@/components/learn-seo-content'

/**
 * RGB and RGBA page (Client Component)
 */
export function RGBPageClient() {
	const params = useParams()
	const locale = params.locale as string
	const t = useTranslations('learn.formats.rgb')

	return (
		<div className='space-y-8'>
			<Link
				href={`/${locale}/learn`}
				className='inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors'
			>
				← {t('back')}
			</Link>

			<header className='text-center space-y-4'>
				<div className='text-6xl mb-4'>🎨</div>
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
						{t('sections.rgb.title')}
					</h2>
					<p className='text-slate-700 leading-relaxed'>
						{t('sections.rgb.content')}
					</p>
					<div className='bg-slate-50 p-6 rounded-lg mt-4'>
						<code className='text-slate-900 font-mono text-lg'>
							rgb(255, 87, 51)
						</code>
						<div className='bg-[rgb(255,87,51)] h-16 rounded mt-3'></div>
					</div>
				</section>

				<section className='space-y-4'>
					<h2 className='text-2xl font-semibold text-slate-900'>
						{t('sections.rgba.title')}
					</h2>
					<p className='text-slate-700 leading-relaxed'>
						{t('sections.rgba.content')}
					</p>
					<div className='bg-slate-50 p-6 rounded-lg mt-4'>
						<code className='text-slate-900 font-mono text-lg'>
							rgba(0, 168, 204, 0.5)
						</code>
						<div className='bg-[rgba(0,168,204,0.5)] h-16 rounded mt-3 border border-slate-300'></div>
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

			{/* SEO Content */}
			<LearnSEOContent
				namespace='learn.formats.rgb'
				toolLinks={[
					{ slug: 'color-converter', anchorText: 'конвертер цветов' },
					{ slug: 'extract-colors-v2', anchorText: 'извлечение цветов' },
					{ slug: 'color-harmony', anchorText: 'цветовая гармония' },
					{ slug: 'contrast-checker', anchorText: 'проверка контраста' },
					{ slug: 'brand-color-analyzer', anchorText: 'анализ брендовых цветов' },
				]}
			/>
		</div>
	)
}

