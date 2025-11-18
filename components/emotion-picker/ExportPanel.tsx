/**
 * Export Panel Component
 * 
 * Provides export functionality for the palette.
 * 
 * @component
 */

'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'

interface ExportPanelProps {
	/** Callback to export as JSON */
	onExportJSON: () => void
	/** Callback to export as CSS */
	onExportCSS: () => void
	/** Callback to save to collection */
	onSaveToCollection: () => void
}

/**
 * Export Panel Component
 * 
 * @param {ExportPanelProps} props - Component props
 * @returns {JSX.Element} Export panel component
 */
export function ExportPanel({
	onExportJSON,
	onExportCSS,
	onSaveToCollection,
}: ExportPanelProps) {
	const t = useTranslations('tools.emotionColors')
	const [cssCopied, setCssCopied] = useState(false)

	/**
	 * Handle CSS export
	 */
	const handleExportCSS = async () => {
		await onExportCSS()
		setCssCopied(true)
		setTimeout(() => setCssCopied(false), 2000)
	}

	return (
		<div className='bg-white rounded-lg border border-slate-200 p-6 space-y-3'>
			<h3 className='text-lg font-semibold text-slate-900'>{t('export.title')}</h3>

			<div className='flex flex-col gap-2'>
				<button
					onClick={onExportJSON}
					className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium'
				>
					{t('export.json')}
				</button>

				<button
					onClick={handleExportCSS}
					className={`
						px-4 py-2 rounded-lg transition-colors text-sm font-medium
						${
							cssCopied
								? 'bg-green-600 text-white'
								: 'bg-green-600 text-white hover:bg-green-700'
						}
					`}
				>
					{cssCopied ? '✓ CSS Copied' : t('export.css')}
				</button>

				<button
					onClick={onSaveToCollection}
					className='px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors text-sm font-medium'
				>
					{t('export.saveToCollection')}
				</button>
			</div>
		</div>
	)
}

