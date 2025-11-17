'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'

/**
 * RGB vs CMYK page
 * Educational content about color models
 */
export default function RGBCMYKPage() {
	const params = useParams()
	const locale = params.locale as string
	const t = useTranslations('learn.fundamentals.rgbCmyk')

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
					<p className='text-slate-700 leading-relaxed text-lg'>
						{t('intro')}
					</p>
				</section>

				<div className='grid md:grid-cols-2 gap-6'>
					{/* RGB */}
					<div className='bg-gradient-to-br from-red-500 via-green-500 to-blue-500 p-6 rounded-xl text-white'>
						<h2 className='text-2xl font-bold mb-4'>{t('rgb.title')}</h2>
						<p className='mb-4'>{t('rgb.description')}</p>
						<div className='bg-white/20 p-4 rounded-lg'>
							<h3 className='font-semibold mb-2'>{t('rgb.uses.title')}</h3>
							<ul className='space-y-1 text-sm'>
								<li>• {t('rgb.uses.items.0')}</li>
								<li>• {t('rgb.uses.items.1')}</li>
								<li>• {t('rgb.uses.items.2')}</li>
							</ul>
						</div>
						<div className='mt-4 bg-white/20 p-3 rounded-lg'>
							<code className='text-sm font-mono'>
								rgb(255, 0, 0) = красный
							</code>
						</div>
					</div>

					{/* CMYK */}
					<div className='bg-gradient-to-br from-cyan-500 via-magenta-500 via-yellow-500 to-black p-6 rounded-xl text-white'>
						<h2 className='text-2xl font-bold mb-4'>{t('cmyk.title')}</h2>
						<p className='mb-4'>{t('cmyk.description')}</p>
						<div className='bg-white/20 p-4 rounded-lg'>
							<h3 className='font-semibold mb-2'>{t('cmyk.uses.title')}</h3>
							<ul className='space-y-1 text-sm'>
								<li>• {t('cmyk.uses.items.0')}</li>
								<li>• {t('cmyk.uses.items.1')}</li>
								<li>• {t('cmyk.uses.items.2')}</li>
							</ul>
						</div>
						<div className='mt-4 bg-white/20 p-3 rounded-lg'>
							<code className='text-sm font-mono'>
								cmyk(0%, 100%, 100%, 0%) = красный
							</code>
						</div>
					</div>
				</div>

				<section className='space-y-4 bg-slate-50 p-6 rounded-lg'>
					<h2 className='text-2xl font-semibold text-slate-900'>
						{t('comparison.title')}
					</h2>
					<p className='text-slate-700 leading-relaxed'>
						{t('comparison.content')}
					</p>
				</section>
			</div>
		</div>
	)
}

