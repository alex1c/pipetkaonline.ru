'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'

/**
 * Split-Complementary Colors page
 */
export default function SplitComplementaryPage() {
	const params = useParams()
	const locale = params.locale as string
	const t = useTranslations('learn.harmony.splitComplementary')

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
					<div className='space-y-4 mt-4'>
						<div className='grid grid-cols-3 gap-2'>
							<div className='bg-blue-500 h-24 rounded-lg flex items-center justify-center text-white font-semibold'>
								{t('sections.examples.base')}
							</div>
							<div className='bg-orange-500 h-24 rounded-lg flex items-center justify-center text-white font-semibold'>
								{t('sections.examples.split1')}
							</div>
							<div className='bg-red-500 h-24 rounded-lg flex items-center justify-center text-white font-semibold'>
								{t('sections.examples.split2')}
							</div>
						</div>
						<p className='text-sm text-slate-600'>
							{t('sections.examples.description')}
						</p>
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

