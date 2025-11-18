'use client'

import { useTranslations } from 'next-intl'
import { PaletteMode } from '@/hooks/usePaletteGenerator'

interface PaletteModeSwitcherProps {
	mode: PaletteMode
	onModeChange: (mode: PaletteMode) => void
}

/**
 * Mode switcher component for palette generation
 * Displays available modes as tabs/segmented control
 */
export function PaletteModeSwitcher({
	mode,
	onModeChange,
}: PaletteModeSwitcherProps) {
	const t = useTranslations('tools.paletteGenerator')

	const modes: PaletteMode[] = [
		'monochromatic',
		'analogous',
		'complementary',
		'triad',
		'tetradic',
		'shades',
		'tints',
		'tones',
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


