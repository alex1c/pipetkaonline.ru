'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'

/**
 * Complementary Colors page
 */
export default function ComplementaryPage() {
	const params = useParams()
	const locale = params.locale as string
	const t = useTranslations('learn.harmony.complementary')

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
						{t('sections.examples.title')}
					</h2>
					<div className='grid md:grid-cols-2 gap-4 mt-4'>
						<div className='bg-gradient-to-r from-red-500 to-green-500 h-32 rounded-lg flex items-center justify-center text-white font-semibold text-lg'>
							{t('sections.examples.redGreen')}
						</div>
						<div className='bg-gradient-to-r from-blue-500 to-orange-500 h-32 rounded-lg flex items-center justify-center text-white font-semibold text-lg'>
							{t('sections.examples.blueOrange')}
						</div>
						<div className='bg-gradient-to-r from-yellow-500 to-purple-500 h-32 rounded-lg flex items-center justify-center text-white font-semibold text-lg'>
							{t('sections.examples.yellowPurple')}
						</div>
						<div className='bg-gradient-to-r from-cyan-500 to-red-500 h-32 rounded-lg flex items-center justify-center text-white font-semibold text-lg'>
							{t('sections.examples.cyanRed')}
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
		</div>
	)
}

