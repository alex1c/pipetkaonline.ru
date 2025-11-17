'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'

/**
 * Color Wheel page
 * Educational content about color wheel
 */
export default function ColorWheelPage() {
	const params = useParams()
	const locale = params.locale as string
	const t = useTranslations('learn.fundamentals.colorWheel')

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
				<div className='text-6xl mb-4'>🎨</div>
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

				<section className='space-y-4'>
					<h2 className='text-2xl font-semibold text-slate-900'>
						{t('sections.primary.title')}
					</h2>
					<p className='text-slate-700 leading-relaxed'>
						{t('sections.primary.content')}
					</p>
					<div className='grid grid-cols-3 gap-4 mt-4'>
						<div className='bg-red-500 h-24 rounded-lg flex items-center justify-center text-white font-semibold'>
							{t('sections.primary.red')}
						</div>
						<div className='bg-blue-500 h-24 rounded-lg flex items-center justify-center text-white font-semibold'>
							{t('sections.primary.blue')}
						</div>
						<div className='bg-yellow-500 h-24 rounded-lg flex items-center justify-center text-slate-900 font-semibold'>
							{t('sections.primary.yellow')}
						</div>
					</div>
				</section>

				<section className='space-y-4'>
					<h2 className='text-2xl font-semibold text-slate-900'>
						{t('sections.secondary.title')}
					</h2>
					<p className='text-slate-700 leading-relaxed'>
						{t('sections.secondary.content')}
					</p>
					<div className='grid grid-cols-3 gap-4 mt-4'>
						<div className='bg-orange-500 h-24 rounded-lg flex items-center justify-center text-white font-semibold'>
							{t('sections.secondary.orange')}
						</div>
						<div className='bg-green-500 h-24 rounded-lg flex items-center justify-center text-white font-semibold'>
							{t('sections.secondary.green')}
						</div>
						<div className='bg-purple-500 h-24 rounded-lg flex items-center justify-center text-white font-semibold'>
							{t('sections.secondary.purple')}
						</div>
					</div>
				</section>

				<section className='space-y-4'>
					<h2 className='text-2xl font-semibold text-slate-900'>
						{t('sections.usage.title')}
					</h2>
					<p className='text-slate-700 leading-relaxed'>
						{t('sections.usage.content')}
					</p>
				</section>
			</div>
		</div>
	)
}

