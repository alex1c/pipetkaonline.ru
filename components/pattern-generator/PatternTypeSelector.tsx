/**
 * Pattern Type Selector Component
 * 
 * Allows user to select pattern type.
 * 
 * @component
 */

'use client'

import { useTranslations } from 'next-intl'
import type { PatternType } from '@/lib/pattern-renderers/types'

interface PatternTypeSelectorProps {
	/** Selected pattern type */
	selectedType: PatternType
	/** Callback when type changes */
	onTypeChange: (type: PatternType) => void
}

/**
 * Pattern type options with labels
 */
const patternTypes: { value: PatternType; label: string; icon: string }[] = [
	{ value: 'polka-dots', label: 'Polka Dots', icon: '⚫' },
	{ value: 'stripes', label: 'Stripes', icon: '▬' },
	{ value: 'grid', label: 'Grid', icon: '▦' },
	{ value: 'triangles', label: 'Triangles', icon: '▲' },
	{ value: 'zigzag', label: 'Zigzag', icon: '〰️' },
	{ value: 'waves', label: 'Waves', icon: '〰️' },
	{ value: 'crosses', label: 'Crosses', icon: '➕' },
	{ value: 'noise', label: 'Noise', icon: '▫️' },
	{ value: 'minimalistic-shapes', label: 'Shapes', icon: '🔷' },
]

/**
 * Pattern Type Selector Component
 * 
 * @param {PatternTypeSelectorProps} props - Component props
 * @returns {JSX.Element} Pattern type selector component
 */
export function PatternTypeSelector({
	selectedType,
	onTypeChange,
}: PatternTypeSelectorProps) {
	const t = useTranslations('tools.patternGenerator')

	return (
		<div className='space-y-4'>
			<label className='block text-sm font-medium text-slate-700'>
				{t('patternType')}
			</label>
			<div className='grid grid-cols-3 md:grid-cols-5 gap-2'>
				{patternTypes.map((type) => (
					<button
						key={type.value}
						onClick={() => onTypeChange(type.value)}
						className={`
							px-4 py-3 rounded-lg border-2 transition-all
							${
								selectedType === type.value
									? 'border-blue-500 bg-blue-50 text-blue-700'
									: 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
							}
						`}
					>
						<div className='text-2xl mb-1'>{type.icon}</div>
						<div className='text-xs font-medium'>{type.label}</div>
					</button>
				))}
			</div>
		</div>
	)
}

