/**
 * Preview Grid Component
 * 
 * Displays solid color background previews in different sizes.
 * 
 * @component
 */

'use client'

import { useTranslations } from 'next-intl'
import type { BackgroundSize } from '@/hooks/useSolidBackground'

interface PreviewGridProps {
	/** Selected color */
	color: string
	/** Background sizes */
	sizes: BackgroundSize[]
}

/**
 * Preview Grid Component
 * 
 * @param {PreviewGridProps} props - Component props
 * @returns {JSX.Element} Preview grid component
 */
export function PreviewGrid({ color, sizes }: PreviewGridProps) {
	const t = useTranslations('tools.solidBackground')

	return (
		<div className='space-y-6'>
			<h2 className='text-2xl font-semibold text-slate-900'>{t('sizes')}</h2>

			<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
				{sizes.map((size) => {
					// Calculate aspect ratio
					const aspectRatio = size.width / size.height
					const maxWidth = 600
					const width = Math.min(maxWidth, size.width)
					const height = width / aspectRatio

					return (
						<div key={`${size.width}x${size.height}`} className='space-y-2'>
							<div className='flex items-center justify-between'>
								<h3 className='text-sm font-medium text-slate-700'>
									{size.name} ({size.width}×{size.height})
								</h3>
							</div>

							<div
								className='rounded-lg border-2 border-slate-200 shadow-md overflow-hidden'
								style={{
									width: `${width}px`,
									height: `${height}px`,
									backgroundColor: color,
									maxWidth: '100%',
								}}
							/>
						</div>
					)
				})}
			</div>
		</div>
	)
}

