'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'

/**
 * HSL and HSLA page
 */
export default function HSLPage() {
	const params = useParams()
	const locale = params.locale as string
	const t = useTranslations('learn.formats.hsl')

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
						{t('sections.components.title')}
					</h2>
					<div className='grid md:grid-cols-3 gap-4 mt-4'>
						<div className='bg-slate-50 p-4 rounded-lg'>
							<h3 className='font-semibold text-slate-900 mb-2'>
								{t('sections.components.hue.title')}
							</h3>
							<p className='text-sm text-slate-700'>
								{t('sections.components.hue.desc')}
							</p>
						</div>
						<div className='bg-slate-50 p-4 rounded-lg'>
							<h3 className='font-semibold text-slate-900 mb-2'>
								{t('sections.components.saturation.title')}
							</h3>
							<p className='text-sm text-slate-700'>
								{t('sections.components.saturation.desc')}
							</p>
						</div>
						<div className='bg-slate-50 p-4 rounded-lg'>
							<h3 className='font-semibold text-slate-900 mb-2'>
								{t('sections.components.lightness.title')}
							</h3>
							<p className='text-sm text-slate-700'>
								{t('sections.components.lightness.desc')}
							</p>
						</div>
					</div>
				</section>

				<section className='space-y-4'>
					<h2 className='text-2xl font-semibold text-slate-900'>
						{t('sections.examples.title')}
					</h2>
					<div className='bg-slate-50 p-6 rounded-lg mt-4'>
						<code className='text-slate-900 font-mono text-lg'>
							hsl(9, 100%, 60%)
						</code>
						<div className='bg-[hsl(9,100%,60%)] h-16 rounded mt-3'></div>
					</div>
					<div className='bg-slate-50 p-6 rounded-lg mt-4'>
						<code className='text-slate-900 font-mono text-lg'>
							hsla(195, 100%, 40%, 0.5)
						</code>
						<div className='bg-[hsla(195,100%,40%,0.5)] h-16 rounded mt-3 border border-slate-300'></div>
					</div>
				</section>

				<section className='space-y-4 bg-slate-50 p-6 rounded-lg'>
					<h2 className='text-2xl font-semibold text-slate-900'>
						{t('sections.advantages.title')}
					</h2>
					<p className='text-slate-700 leading-relaxed'>
						{t('sections.advantages.content')}
					</p>
				</section>
			</div>
		</div>
	)
}

