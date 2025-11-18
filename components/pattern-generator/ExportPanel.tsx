/**
 * Export Panel Component
 * 
 * Provides download functionality for different formats.
 * 
 * @component
 */

'use client'

import { useTranslations } from 'next-intl'

interface ExportPanelProps {
	/** Callback to download pattern */
	onDownload: (format: 'png' | 'jpg' | 'webp') => void
	/** File size estimate in KB */
	fileSize: number
}

/**
 * Export Panel Component
 * 
 * @param {ExportPanelProps} props - Component props
 * @returns {JSX.Element} Export panel component
 */
export function ExportPanel({ onDownload, fileSize }: ExportPanelProps) {
	const t = useTranslations('tools.patternGenerator')

	return (
		<div className='bg-white rounded-lg border border-slate-200 p-6 space-y-4'>
			<h3 className='text-lg font-semibold text-slate-900'>{t('download')}</h3>

			<div className='flex gap-3'>
				<button
					onClick={() => onDownload('png')}
					className='flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium'
				>
					{t('downloadPng')}
				</button>
				<button
					onClick={() => onDownload('jpg')}
					className='flex-1 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium'
				>
					{t('downloadJpg')}
				</button>
				<button
					onClick={() => onDownload('webp')}
					className='flex-1 px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium'
				>
					{t('downloadWebp')}
				</button>
			</div>

			<div className='text-sm text-slate-500 text-center'>
				{t('fileSize')}: ~{fileSize} KB
			</div>
		</div>
	)
}

