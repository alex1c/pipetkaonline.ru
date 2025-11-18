'use client'

import { useTranslations } from 'next-intl'
import { HarmonyMode } from '@/hooks/useColorHarmony'

interface HarmonyModeSwitcherProps {
	mode: HarmonyMode
	onModeChange: (mode: HarmonyMode) => void
}

/**
 * Mode switcher component for color harmony generation
 * Displays available harmony modes as tabs/segmented control
 */
export function HarmonyModeSwitcher({
	mode,
	onModeChange,
}: HarmonyModeSwitcherProps) {
	const t = useTranslations('tools.colorHarmony')

	const modes: HarmonyMode[] = [
		'analogous',
		'monochromatic',
		'complementary',
		'splitComplementary',
		'triadic',
		'tetradic',
		'square',
		'neutral',
	]

	return (
		<div className='space-y-4'>
			<label className='block text-sm font-medium text-slate-700'>
				{t('mode.label')}
			</label>

			<div className='grid grid-cols-2 md:grid-cols-4 gap-3'>
				{modes.map((modeOption) => (
					<button
						key={modeOption}
						type='button'
						onClick={() => onModeChange(modeOption)}
						className={`
							px-4 py-3 rounded-lg border-2 transition-all
							font-medium text-sm
							${
								mode === modeOption
									? 'border-blue-500 bg-blue-50 text-blue-700'
									: 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
							}
						`}
					>
						{t(`modes.${modeOption}`)}
					</button>
				))}
			</div>
		</div>
	)
}


