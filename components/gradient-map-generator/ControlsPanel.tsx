/**
 * Controls Panel Component
 * 
 * Provides controls for intensity, blend mode, and LAB option.
 * 
 * @component
 */

'use client'

import type { BlendMode } from '@/lib/gradient-map/applyGradientMap'

interface ControlsPanelProps {
	/** Intensity (0-1) */
	intensity: number
	/** Blend mode */
	blendMode: BlendMode
	/** Use LAB for luminance */
	useLAB: boolean
	/** Callback when intensity changes */
	onIntensityChange: (intensity: number) => void
	/** Callback when blend mode changes */
	onBlendModeChange: (mode: BlendMode) => void
	/** Callback when useLAB changes */
	onUseLABChange: (useLAB: boolean) => void
}

/**
 * Controls Panel Component
 * 
 * @param {ControlsPanelProps} props - Component props
 * @returns {JSX.Element} Controls panel component
 */
export function ControlsPanel({
	intensity,
	blendMode,
	useLAB,
	onIntensityChange,
	onBlendModeChange,
	onUseLABChange,
}: ControlsPanelProps) {
	return (
		<div className='space-y-6 bg-white rounded-lg border border-slate-200 p-6'>
			<h3 className='text-lg font-semibold text-slate-900'>Controls</h3>

			{/* Intensity */}
			<div>
				<label className='block text-sm font-medium text-slate-700 mb-2'>
					Intensity: {Math.round(intensity * 100)}%
				</label>
				<input
					type='range'
					min='0'
					max='100'
					step='1'
					value={intensity * 100}
					onChange={(e) => onIntensityChange(parseFloat(e.target.value) / 100)}
					className='w-full'
				/>
			</div>

			{/* Blend Mode */}
			<div>
				<label htmlFor='blend-mode' className='block text-sm font-medium text-slate-700 mb-2'>
					Blend Mode
				</label>
				<select
					id='blend-mode'
					value={blendMode}
					onChange={(e) => onBlendModeChange(e.target.value as BlendMode)}
					className='w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
				>
					<option value='normal'>Normal</option>
					<option value='multiply'>Multiply</option>
					<option value='screen'>Screen</option>
					<option value='overlay'>Overlay</option>
					<option value='soft-light'>Soft Light</option>
					<option value='color'>Color</option>
					<option value='luminosity'>Luminosity</option>
				</select>
			</div>

			{/* Use LAB */}
			<div>
				<label className='flex items-center gap-2'>
					<input
						type='checkbox'
						checked={useLAB}
						onChange={(e) => onUseLABChange(e.target.checked)}
						className='w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500'
					/>
					<span className='text-sm font-medium text-slate-700'>
						Use LAB for luminance (more perceptually uniform)
					</span>
				</label>
			</div>
		</div>
	)
}

