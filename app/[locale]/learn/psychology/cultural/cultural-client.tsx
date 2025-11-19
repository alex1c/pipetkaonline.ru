'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'
import { LearnSEOContent } from '@/components/learn-seo-content'

/**
 * Cultural Color Meanings page (Client Component)
 */
export function CulturalPageClient() {
	const params = useParams()
	const locale = params.locale as string
	const t = useTranslations('learn.psychology.cultural')

	return (
		<div className='space-y-8'>
			<Link
				href={`/${locale}/learn`}
				className='inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors'
			>
				← {t('back')}
			</Link>

			<header className='text-center space-y-4'>
				<div className='text-6xl mb-4'>🌍</div>
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
					<div className='bg-red-50 p-6 rounded-lg border-l-4 border-red-500'>
						<h3 className='font-semibold text-slate-900 mb-3 text-lg'>
							{t('sections.red.title')}
						</h3>
						<div className='space-y-2 text-slate-700'>
							<p className='font-medium'>{t('sections.red.western')}</p>
							<p className='text-sm'>{t('sections.red.westernDesc')}</p>
							<p className='font-medium mt-4'>{t('sections.red.asian')}</p>
							<p className='text-sm'>{t('sections.red.asianDesc')}</p>
						</div>
					</div>

					<div className='bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500'>
						<h3 className='font-semibold text-slate-900 mb-3 text-lg'>
							{t('sections.blue.title')}
						</h3>
						<p className='text-slate-700'>{t('sections.blue.content')}</p>
					</div>

					<div className='bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-500'>
						<h3 className='font-semibold text-slate-900 mb-3 text-lg'>
							{t('sections.yellow.title')}
						</h3>
						<p className='text-slate-700'>{t('sections.yellow.content')}</p>
					</div>

					<div className='bg-green-50 p-6 rounded-lg border-l-4 border-green-500'>
						<h3 className='font-semibold text-slate-900 mb-3 text-lg'>
							{t('sections.green.title')}
						</h3>
						<p className='text-slate-700'>{t('sections.green.content')}</p>
					</div>
				</div>

				<section className='space-y-4 bg-slate-50 p-6 rounded-lg'>
					<h2 className='text-2xl font-semibold text-slate-900'>
						{t('sections.importance.title')}
					</h2>
					<p className='text-slate-700 leading-relaxed'>
						{t('sections.importance.content')}
					</p>
				</section>
			</div>

			<LearnSEOContent
				namespace='learn.psychology.cultural'
				toolLinks={[
					{ slug: 'brand-color-analyzer', anchorText: 'анализ брендовых цветов' },
					{ slug: 'emotion-colors', anchorText: 'эмоции и цвет' },
					{ slug: 'palette-generator', anchorText: 'генератор палитр' },
				]}
			/>
		</div>
	)
}

