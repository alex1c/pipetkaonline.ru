/**
 * Color Groups Component
 * 
 * Displays colors grouped by tone and family.
 * 
 * @component
 */

'use client'

import type { ColorGroups } from '@/hooks/useExtractColorsV2'
import { ColorSwatch } from './ColorSwatch'

interface ColorGroupsProps {
	/** Color groups object */
	groups: ColorGroups
}

/**
 * Color Groups Component
 * 
 * Displays colors organized by tone (light, mid, dark) and family (warm, cold, etc.).
 * 
 * @param {ColorGroupsProps} props - Component props
 * @returns {JSX.Element} Color groups component
 */
export function ColorGroupsComponent({ groups }: ColorGroupsProps) {
	/**
	 * Group configuration
	 */
	const groupConfigs = [
		{ key: 'light' as const, label: 'Light Tones', colors: groups.light },
		{ key: 'mid' as const, label: 'Mid Tones', colors: groups.mid },
		{ key: 'dark' as const, label: 'Dark Tones', colors: groups.dark },
		{ key: 'warm' as const, label: 'Warm Colors', colors: groups.warm },
		{ key: 'cold' as const, label: 'Cold Colors', colors: groups.cold },
		{ key: 'neutral' as const, label: 'Neutral Colors', colors: groups.neutral },
		{ key: 'vibrant' as const, label: 'Vibrant Colors', colors: groups.vibrant },
		{ key: 'muted' as const, label: 'Muted Colors', colors: groups.muted },
		{ key: 'pastel' as const, label: 'Pastel Colors', colors: groups.pastel },
		{ key: 'earth' as const, label: 'Earth Tones', colors: groups.earth },
	]

	return (
		<div className='space-y-8'>
			<h3 className='text-xl font-semibold text-slate-900'>Color Groups</h3>

			<div className='space-y-6'>
				{groupConfigs.map((config) => {
					if (config.colors.length === 0) return null

					return (
						<div key={config.key} className='space-y-3'>
							<h4 className='text-lg font-medium text-slate-700'>
								{config.label} ({config.colors.length})
							</h4>
							<div className='grid grid-cols-5 md:grid-cols-8 lg:grid-cols-10 gap-3'>
								{config.colors.map((color, index) => (
									<ColorSwatch
										key={`${config.key}-${color.hex}-${index}`}
										color={color.hex}
										percentage={color.percentage}
										size='sm'
									/>
								))}
							</div>
						</div>
					)
				})}
			</div>
		</div>
	)
}

