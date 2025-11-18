'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'
import { LearnSEOContent } from '@/components/learn-seo-content'

/**
 * CSS Color Keywords page
 */
export default function CSSPage() {
	const params = useParams()
	const locale = params.locale as string
	const t = useTranslations('learn.formats.css')

	return (
		<div className='space-y-8'>
			<Link
				href={`/${locale}/learn`}
				className='inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors'
			>
				← {t('back')}
			</Link>

			<header className='text-center space-y-4'>
				<div className='text-6xl mb-4'>💻</div>
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
						{t('sections.basic.title')}
					</h2>
					<div className='grid md:grid-cols-4 gap-4 mt-4'>
						<div className='space-y-2'>
							<div className='bg-red-500 h-20 rounded-lg'></div>
							<code className='text-sm font-mono text-slate-700'>red</code>
						</div>
						<div className='space-y-2'>
							<div className='bg-blue-500 h-20 rounded-lg'></div>
							<code className='text-sm font-mono text-slate-700'>blue</code>
						</div>
						<div className='space-y-2'>
							<div className='bg-green-500 h-20 rounded-lg'></div>
							<code className='text-sm font-mono text-slate-700'>green</code>
						</div>
						<div className='space-y-2'>
							<div className='bg-yellow-500 h-20 rounded-lg'></div>
							<code className='text-sm font-mono text-slate-700'>yellow</code>
						</div>
					</div>
				</section>

				<section className='space-y-4'>
					<h2 className='text-2xl font-semibold text-slate-900'>
						{t('sections.extended.title')}
					</h2>
					<p className='text-slate-700 leading-relaxed'>
						{t('sections.extended.content')}
					</p>
					<div className='grid md:grid-cols-4 gap-4 mt-4'>
						<div className='space-y-2'>
							<div className='bg-coral h-20 rounded-lg border border-slate-300'></div>
							<code className='text-sm font-mono text-slate-700'>coral</code>
						</div>
						<div className='space-y-2'>
							<div className='bg-skyblue h-20 rounded-lg border border-slate-300'></div>
							<code className='text-sm font-mono text-slate-700'>skyblue</code>
						</div>
						<div className='space-y-2'>
							<div className='bg-tomato h-20 rounded-lg'></div>
							<code className='text-sm font-mono text-slate-700'>tomato</code>
						</div>
						<div className='space-y-2'>
							<div className='bg-teal h-20 rounded-lg'></div>
							<code className='text-sm font-mono text-slate-700'>teal</code>
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
				namespace='learn.formats.css'
				toolLinks={[
					{ slug: 'color-name-finder', anchorText: 'поиск названия цвета' },
					{ slug: 'color-converter', anchorText: 'конвертер цветов' },
					{ slug: 'ui-tokens-generator', anchorText: 'генератор UI токенов' },
					{ slug: 'contrast-checker', anchorText: 'проверка контраста' },
					{ slug: 'palette-generator', anchorText: 'генератор палитр' },
				]}
			/>
		</div>
	)
}

