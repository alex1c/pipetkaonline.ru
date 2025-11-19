'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'
import { LearnSEOContent } from '@/components/learn-seo-content'

/**
 * HEX Color Codes page (Client Component)
 */
export function HEXPageClient() {
	const params = useParams()
	const locale = params.locale as string
	const t = useTranslations('learn.formats.hex')

	return (
		<div className='space-y-8'>
			<Link
				href={`/${locale}/learn`}
				className='inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors'
			>
				← {t('back')}
			</Link>

			<header className='text-center space-y-4'>
				<div className='text-6xl mb-4'>#</div>
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
						{t('sections.format.title')}
					</h2>
					<p className='text-slate-700 leading-relaxed'>
						{t('sections.format.content')}
					</p>
					<div className='bg-slate-50 p-6 rounded-lg mt-4'>
						<code className='text-slate-900 font-mono text-lg'>
							#RRGGBB
						</code>
					</div>
				</section>

				<section className='space-y-4'>
					<h2 className='text-2xl font-semibold text-slate-900'>
						{t('sections.examples.title')}
					</h2>
					<div className='grid md:grid-cols-3 gap-4 mt-4'>
						<div className='space-y-2'>
							<div className='bg-[#FF5733] h-24 rounded-lg'></div>
							<code className='text-sm font-mono text-slate-700'>#FF5733</code>
							<p className='text-sm text-slate-600'>{t('sections.examples.red')}</p>
						</div>
						<div className='space-y-2'>
							<div className='bg-[#00A8CC] h-24 rounded-lg'></div>
							<code className='text-sm font-mono text-slate-700'>#00A8CC</code>
							<p className='text-sm text-slate-600'>{t('sections.examples.blue')}</p>
						</div>
						<div className='space-y-2'>
							<div className='bg-[#F5F5F5] h-24 rounded-lg border border-slate-300'></div>
							<code className='text-sm font-mono text-slate-700'>#F5F5F5</code>
							<p className='text-sm text-slate-600'>{t('sections.examples.gray')}</p>
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

			{/* SEO Content */}
			<LearnSEOContent
				namespace='learn.formats.hex'
				toolLinks={[
					{ slug: 'color-converter', anchorText: 'конвертер цветов' },
					{ slug: 'color-lab', anchorText: 'выбор цвета' },
					{ slug: 'ui-tokens-generator', anchorText: 'генератор UI токенов' },
				]}
			/>
		</div>
	)
}

