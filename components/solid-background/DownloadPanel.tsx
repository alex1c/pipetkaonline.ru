/**
 * Download Panel Component
 * 
 * Provides download functionality for different formats and sizes.
 * 
 * @component
 */

'use client'

import { useTranslations } from 'next-intl'
import type { BackgroundSize } from '@/hooks/useSolidBackground'

interface DownloadPanelProps {
	/** Selected color */
	color: string
	/** Background sizes */
	sizes: BackgroundSize[]
	/** Callback to download background */
	onDownload: (format: 'png' | 'jpg' | 'webp', size: BackgroundSize) => void
}

/**
 * Download Panel Component
 * 
 * @param {DownloadPanelProps} props - Component props
 * @returns {JSX.Element} Download panel component
 */
export function DownloadPanel({ color, sizes, onDownload }: DownloadPanelProps) {
	const t = useTranslations('tools.solidBackground')

	return (
		<div className='bg-white rounded-lg border border-slate-200 p-6 space-y-4'>
			<h3 className='text-lg font-semibold text-slate-900'>{t('download')}</h3>

			<div className='space-y-4'>
				{sizes.map((size) => (
					<div key={`${size.width}x${size.height}`} className='space-y-2'>
						<div className='text-sm font-medium text-slate-700'>
							{size.name} ({size.width}×{size.height})
						</div>
						<div className='flex gap-2'>
							<button
								onClick={() => onDownload('png', size)}
								className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium'
							>
								{t('downloadPng')}
							</button>
							<button
								onClick={() => onDownload('jpg', size)}
								className='px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium'
							>
								{t('downloadJpg')}
							</button>
							<button
								onClick={() => onDownload('webp', size)}
								className='px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium'
							>
								{t('downloadWebp')}
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

