/**
 * History Panel Component
 * 
 * Displays recently selected colors from history.
 * 
 * @component
 */

'use client'

import { useTranslations } from 'next-intl'

interface HistoryPanelProps {
	/** History of colors */
	history: string[]
	/** Callback when history color is selected */
	onHistorySelect: (color: string) => void
}

/**
 * History Panel Component
 * 
 * @param {HistoryPanelProps} props - Component props
 * @returns {JSX.Element} History panel component
 */
export function HistoryPanel({ history, onHistorySelect }: HistoryPanelProps) {
	const t = useTranslations('tools.solidBackground')

	if (history.length === 0) {
		return (
			<div className='bg-white rounded-lg border border-slate-200 p-6'>
				<h3 className='text-lg font-semibold text-slate-900 mb-2'>{t('history.title')}</h3>
				<p className='text-sm text-slate-500'>{t('history.empty')}</p>
			</div>
		)
	}

	return (
		<div className='bg-white rounded-lg border border-slate-200 p-6 space-y-4'>
			<h3 className='text-lg font-semibold text-slate-900'>{t('history.title')}</h3>

			<div className='grid grid-cols-4 md:grid-cols-8 gap-2'>
				{history.map((color, index) => (
					<button
						key={`${color}-${index}`}
						onClick={() => onHistorySelect(color)}
						className='aspect-square rounded-lg border-2 border-slate-300 hover:border-blue-500 transition-colors shadow-sm hover:shadow-md'
						style={{ backgroundColor: color }}
						title={color}
					/>
				))}
			</div>
		</div>
	)
}

