'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'

/**
 * Color Blindness Considerations page
 */
export default function ColorBlindnessPage() {
	const params = useParams()
	const locale = params.locale as string
	const t = useTranslations('learn.accessibility.colorBlindness')

	return (
		<div className='space-y-8'>
			<Link
				href={`/${locale}/learn`}
				className='inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors'
			>
				← {t('back')}
			</Link>

			<header className='text-center space-y-4'>
				<div className='text-6xl mb-4'>👁️</div>
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
						{t('sections.types.title')}
					</h2>
					<div className='grid md:grid-cols-3 gap-4 mt-4'>
						<div className='bg-red-50 p-4 rounded-lg'>
							<h3 className='font-semibold text-slate-900 mb-2'>
								{t('sections.types.protanopia.title')}
							</h3>
							<p className='text-sm text-slate-700'>
								{t('sections.types.protanopia.desc')}
							</p>
						</div>
						<div className='bg-green-50 p-4 rounded-lg'>
							<h3 className='font-semibold text-slate-900 mb-2'>
								{t('sections.types.deuteranopia.title')}
							</h3>
							<p className='text-sm text-slate-700'>
								{t('sections.types.deuteranopia.desc')}
							</p>
						</div>
						<div className='bg-blue-50 p-4 rounded-lg'>
							<h3 className='font-semibold text-slate-900 mb-2'>
								{t('sections.types.tritanopia.title')}
							</h3>
							<p className='text-sm text-slate-700'>
								{t('sections.types.tritanopia.desc')}
							</p>
						</div>
					</div>
				</section>

				<section className='space-y-4'>
					<h2 className='text-2xl font-semibold text-slate-900'>
						{t('sections.solutions.title')}
					</h2>
					<ul className='list-disc list-inside space-y-2 text-slate-700 ml-4'>
						<li>{t('sections.solutions.items.0')}</li>
						<li>{t('sections.solutions.items.1')}</li>
						<li>{t('sections.solutions.items.2')}</li>
						<li>{t('sections.solutions.items.3')}</li>
					</ul>
				</section>
			</div>
		</div>
	)
}

