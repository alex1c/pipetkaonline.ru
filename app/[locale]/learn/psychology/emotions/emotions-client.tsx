'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'
import { LearnSEOContent } from '@/components/learn-seo-content'

/**
 * Emotional Associations page (Client Component)
 */
export function EmotionsPageClient() {
	const params = useParams()
	const locale = params.locale as string
	const t = useTranslations('learn.psychology.emotions')

	return (
		<div className='space-y-8'>
			<Link
				href={`/${locale}/learn`}
				className='inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors'
			>
				← {t('back')}
			</Link>

			<header className='text-center space-y-4'>
				<div className='text-6xl mb-4'>💭</div>
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
					<div className='space-y-4'>
						<h3 className='text-xl font-semibold text-slate-900'>
							{t('sections.warm.title')}
						</h3>
						<div className='space-y-3'>
							<div className='bg-red-50 p-4 rounded-lg'>
								<h4 className='font-semibold text-slate-900 mb-1'>
									{t('sections.warm.red.title')}
								</h4>
								<p className='text-sm text-slate-700'>
									{t('sections.warm.red.desc')}
								</p>
							</div>
							<div className='bg-orange-50 p-4 rounded-lg'>
								<h4 className='font-semibold text-slate-900 mb-1'>
									{t('sections.warm.orange.title')}
								</h4>
								<p className='text-sm text-slate-700'>
									{t('sections.warm.orange.desc')}
								</p>
							</div>
							<div className='bg-yellow-50 p-4 rounded-lg'>
								<h4 className='font-semibold text-slate-900 mb-1'>
									{t('sections.warm.yellow.title')}
								</h4>
								<p className='text-sm text-slate-700'>
									{t('sections.warm.yellow.desc')}
								</p>
							</div>
						</div>
					</div>

					<div className='space-y-4'>
						<h3 className='text-xl font-semibold text-slate-900'>
							{t('sections.cool.title')}
						</h3>
						<div className='space-y-3'>
							<div className='bg-blue-50 p-4 rounded-lg'>
								<h4 className='font-semibold text-slate-900 mb-1'>
									{t('sections.cool.blue.title')}
								</h4>
								<p className='text-sm text-slate-700'>
									{t('sections.cool.blue.desc')}
								</p>
							</div>
							<div className='bg-green-50 p-4 rounded-lg'>
								<h4 className='font-semibold text-slate-900 mb-1'>
									{t('sections.cool.green.title')}
								</h4>
								<p className='text-sm text-slate-700'>
									{t('sections.cool.green.desc')}
								</p>
							</div>
							<div className='bg-purple-50 p-4 rounded-lg'>
								<h4 className='font-semibold text-slate-900 mb-1'>
									{t('sections.cool.purple.title')}
								</h4>
								<p className='text-sm text-slate-700'>
									{t('sections.cool.purple.desc')}
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			<LearnSEOContent
				namespace='learn.psychology.emotions'
				toolLinks={[
					{ slug: 'emotion-colors', anchorText: 'эмоции и цвет' },
					{ slug: 'palette-generator', anchorText: 'генератор палитр' },
					{ slug: 'brand-color-analyzer', anchorText: 'анализ брендовых цветов' },
				]}
			/>
		</div>
	)
}

