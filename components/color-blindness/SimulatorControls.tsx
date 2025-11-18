'use client'

import { useTranslations } from 'next-intl'
import { ColorBlindnessType } from '@/hooks/useColorBlindness'

interface SimulatorControlsProps {
	type: ColorBlindnessType
	setType: (type: ColorBlindnessType) => void
	splitView: boolean
	setSplitView: (split: boolean) => void
	compareMode: boolean
	setCompareMode: (compare: boolean) => void
}

/**
 * Component for controlling color blindness simulation type and view modes
 */
export function SimulatorControls({
	type,
	setType,
	splitView,
	setSplitView,
	compareMode,
	setCompareMode,
}: SimulatorControlsProps) {
	const t = useTranslations('tools.colorBlindnessSimulator')

	const types: ColorBlindnessType[] = [
		'none',
		'protanopia',
		'protanomaly',
		'deuteranopia',
		'deuteranomaly',
		'tritanopia',
		'tritanomaly',
		'achromatopsia',
		'achromatomaly',
	]

	return (
		<div className='bg-white rounded-xl shadow-md p-6 space-y-6'>
			<h3 className='text-lg font-semibold text-slate-900'>
				{t('controls.title')}
			</h3>

			{/* Color Blindness Type Selection */}
			<div className='space-y-3'>
				<label className='block text-sm font-medium text-slate-700'>
					{t('controls.type.label')}
				</label>
				<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3'>
					{types.map((typeOption) => (
						<button
							key={typeOption}
							type='button'
							onClick={() => setType(typeOption)}
							className={`
								px-4 py-3 rounded-lg border-2 transition-all
								font-medium text-sm text-left
								${
									type === typeOption
										? 'border-blue-500 bg-blue-50 text-blue-700'
										: 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
								}
							`}
							title={t(`controls.type.${typeOption}.description`)}
						>
							<div className='font-semibold'>{t(`controls.type.${typeOption}.name`)}</div>
							<div className='text-xs opacity-75 mt-1'>
								{t(`controls.type.${typeOption}.short`)}
							</div>
						</button>
					))}
				</div>
			</div>

			{/* View Mode Toggles */}
			<div className='flex flex-wrap gap-4 pt-4 border-t border-slate-200'>
				<label className='flex items-center gap-2 cursor-pointer'>
					<input
						type='checkbox'
						checked={splitView}
						onChange={(e) => setSplitView(e.target.checked)}
						className='w-4 h-4 text-blue-500 rounded focus:ring-blue-500'
					/>
					<span className='text-sm font-medium text-slate-700'>
						{t('controls.splitView')}
					</span>
				</label>

				<label className='flex items-center gap-2 cursor-pointer'>
					<input
						type='checkbox'
						checked={compareMode}
						onChange={(e) => setCompareMode(e.target.checked)}
						className='w-4 h-4 text-blue-500 rounded focus:ring-blue-500'
					/>
					<span className='text-sm font-medium text-slate-700'>
						{t('controls.compareMode')}
					</span>
				</label>
			</div>
		</div>
	)
}


