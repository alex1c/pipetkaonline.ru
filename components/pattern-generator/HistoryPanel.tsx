/**
 * History Panel Component
 * 
 * Displays recently used patterns.
 * 
 * @component
 */

'use client'

import { useTranslations } from 'next-intl'
import type { PatternSettings } from '@/lib/pattern-renderers/types'

interface HistoryPanelProps {
	/** History of patterns */
	history: PatternSettings[]
	/** Callback when history item is selected */
	onHistorySelect: (settings: PatternSettings) => void
}

/**
 * History Panel Component
 * 
 * @param {HistoryPanelProps} props - Component props
 * @returns {JSX.Element} History panel component
 */
export function HistoryPanel({ history, onHistorySelect }: HistoryPanelProps) {
	const t = useTranslations('tools.patternGenerator')

	if (history.length === 0) {
		return (
			<div className='bg-white rounded-lg border border-slate-200 p-6'>
				<h3 className='text-lg font-semibold text-slate-900 mb-2'>{t('history')}</h3>
				<p className='text-sm text-slate-500'>{t('history.empty')}</p>
			</div>
		)
	}

	return (
		<div className='bg-white rounded-lg border border-slate-200 p-6 space-y-4'>
			<h3 className='text-lg font-semibold text-slate-900'>{t('history')}</h3>

			<div className='space-y-2'>
				{history.map((item, index) => (
					<button
						key={index}
						onClick={() => onHistorySelect(item)}
						className='w-full px-4 py-2 rounded-lg border border-slate-200 bg-white hover:border-blue-500 hover:bg-blue-50 transition-colors text-left text-sm text-slate-700'
					>
						<div className='font-medium'>{item.type}</div>
						<div className='text-xs text-slate-500'>
							{item.tileSize}px • {item.backgroundColor} / {item.elementColor}
						</div>
					</button>
				))}
			</div>
		</div>
	)
}

