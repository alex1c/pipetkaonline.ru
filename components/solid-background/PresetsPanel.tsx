/**
 * Presets Panel Component
 * 
 * Displays color presets organized by categories.
 * 
 * @component
 */

'use client'

import { useTranslations } from 'next-intl'
import { allPresets } from '@/lib/solid-background-presets'

interface PresetsPanelProps {
	/** Callback when preset is selected */
	onPresetSelect: (color: string) => void
}

/**
 * Presets Panel Component
 * 
 * @param {PresetsPanelProps} props - Component props
 * @returns {JSX.Element} Presets panel component
 */
export function PresetsPanel({ onPresetSelect }: PresetsPanelProps) {
	const t = useTranslations('tools.solidBackground')

	const categoryLabels: Record<string, string> = {
		neutral: t('presets.neutral'),
		pastel: t('presets.pastel'),
		bright: t('presets.bright'),
		dark: t('presets.dark'),
	}

	return (
		<div className='bg-white rounded-lg border border-slate-200 p-6 space-y-6'>
			<h3 className='text-lg font-semibold text-slate-900'>{t('presets.title')}</h3>

			{allPresets.map((category) => (
				<div key={category.category} className='space-y-3'>
					<h4 className='text-sm font-medium text-slate-700'>
						{categoryLabels[category.category] || category.category}
					</h4>
					<div className='grid grid-cols-4 md:grid-cols-8 gap-2'>
						{category.colors.map((preset) => (
							<button
								key={preset.color}
								onClick={() => onPresetSelect(preset.color)}
								className='aspect-square rounded-lg border-2 border-slate-300 hover:border-blue-500 transition-colors shadow-sm hover:shadow-md'
								style={{ backgroundColor: preset.color }}
								title={preset.name}
							/>
						))}
					</div>
				</div>
			))}
		</div>
	)
}

