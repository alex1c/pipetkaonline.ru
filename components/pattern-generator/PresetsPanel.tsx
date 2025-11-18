/**
 * Presets Panel Component
 * 
 * Displays pattern presets for quick access.
 * 
 * @component
 */

'use client'

import { useTranslations } from 'next-intl'
import type { PatternPreset } from '@/lib/pattern-renderers/types'

interface PresetsPanelProps {
	/** Available presets */
	presets: PatternPreset[]
	/** Callback when preset is selected */
	onPresetSelect: (preset: PatternPreset) => void
}

/**
 * Presets Panel Component
 * 
 * @param {PresetsPanelProps} props - Component props
 * @returns {JSX.Element} Presets panel component
 */
export function PresetsPanel({ presets, onPresetSelect }: PresetsPanelProps) {
	const t = useTranslations('tools.patternGenerator')

	return (
		<div className='bg-white rounded-lg border border-slate-200 p-6 space-y-4'>
			<h3 className='text-lg font-semibold text-slate-900'>{t('presets')}</h3>

			<div className='grid grid-cols-2 md:grid-cols-4 gap-2'>
				{presets.map((preset) => (
					<button
						key={preset.name}
						onClick={() => onPresetSelect(preset)}
						className='px-4 py-3 rounded-lg border-2 border-slate-200 bg-white hover:border-blue-500 hover:bg-blue-50 transition-colors text-sm font-medium text-slate-700'
					>
						{preset.name}
					</button>
				))}
			</div>
		</div>
	)
}

