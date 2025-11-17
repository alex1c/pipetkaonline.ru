'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'

/**
 * Warm and Cool Colors page
 * Educational content about color temperature
 */
export default function WarmCoolColorsPage() {
	const params = useParams()
	const locale = params.locale as string
	const t = useTranslations('learn.fundamentals.warmCool')

	return (
		<div className='space-y-8'>
			{/* Back link */}
			<Link
				href={`/${locale}/learn`}
				className='inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors'
			>
				← {t('back')}
			</Link>

			{/* Page header */}
			<header className='text-center space-y-4'>
				<div className='text-6xl mb-4'>🌡️</div>
				<h1 className='text-4xl font-bold text-slate-900'>{t('title')}</h1>
				<p className='text-lg text-slate-600 max-w-2xl mx-auto'>
					{t('description')}
				</p>
			</header>

			{/* Content */}
			<div className='bg-white rounded-xl shadow-md p-8 space-y-8'>
				<section className='space-y-4'>
					<h2 className='text-2xl font-semibold text-slate-900'>
						{t('sections.intro.title')}
					</h2>
					<p className='text-slate-700 leading-relaxed'>
						{t('sections.intro.content')}
					</p>
				</section>

				{/* Warm colors */}
				<section className='space-y-4'>
					<h2 className='text-2xl font-semibold text-slate-900'>
						{t('sections.warm.title')}
					</h2>
					<p className='text-slate-700 leading-relaxed'>
						{t('sections.warm.description')}
					</p>
					<div className='bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 p-8 rounded-xl mt-4'>
						<h3 className='text-white font-semibold text-lg mb-4'>
							{t('sections.warm.examples')}
						</h3>
						<ul className='space-y-2 text-white'>
							<li>• {t('sections.warm.items.0')}</li>
							<li>• {t('sections.warm.items.1')}</li>
							<li>• {t('sections.warm.items.2')}</li>
						</ul>
					</div>
				</section>

				{/* Cool colors */}
				<section className='space-y-4'>
					<h2 className='text-2xl font-semibold text-slate-900'>
						{t('sections.cool.title')}
					</h2>
					<p className='text-slate-700 leading-relaxed'>
						{t('sections.cool.description')}
					</p>
					<div className='bg-gradient-to-r from-blue-500 via-cyan-500 to-green-500 p-8 rounded-xl mt-4'>
						<h3 className='text-white font-semibold text-lg mb-4'>
							{t('sections.cool.examples')}
						</h3>
						<ul className='space-y-2 text-white'>
							<li>• {t('sections.cool.items.0')}</li>
							<li>• {t('sections.cool.items.1')}</li>
							<li>• {t('sections.cool.items.2')}</li>
						</ul>
					</div>
				</section>

				<section className='space-y-4 bg-slate-50 p-6 rounded-lg'>
					<h2 className='text-2xl font-semibold text-slate-900'>
						{t('sections.application.title')}
					</h2>
					<p className='text-slate-700 leading-relaxed'>
						{t('sections.application.content')}
					</p>
				</section>
			</div>
		</div>
	)
}

