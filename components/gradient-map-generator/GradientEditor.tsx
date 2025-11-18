/**
 * Gradient Editor Component
 * 
 * Visual editor for gradient stops with add/remove/move/color controls.
 * 
 * @component
 */

'use client'

import { useState } from 'react'
import type { GradientStop } from '@/lib/gradient-map/interpolateColors'
import { gradientPresets } from '@/lib/gradient-map/gradientPresets'

interface GradientEditorProps {
	/** Gradient stops */
	stops: GradientStop[]
	/** Callback when stop is added */
	onAddStop: (position: number, color: string) => void
	/** Callback when stop is removed */
	onRemoveStop: (index: number) => void
	/** Callback when stop is updated */
	onUpdateStop: (index: number, updates: Partial<GradientStop>) => void
	/** Callback when preset is applied */
	onApplyPreset: (presetName: string) => void
}

/**
 * Gradient Editor Component
 * 
 * @param {GradientEditorProps} props - Component props
 * @returns {JSX.Element} Gradient editor component
 */
export function GradientEditor({
	stops,
	onAddStop,
	onRemoveStop,
	onUpdateStop,
	onApplyPreset,
}: GradientEditorProps) {
	const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

	/**
	 * Handle gradient bar click
	 */
	const handleGradientBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
		const rect = e.currentTarget.getBoundingClientRect()
		const x = e.clientX - rect.left
		const position = Math.max(0, Math.min(1, x / rect.width))
		onAddStop(position, '#808080')
	}

	/**
	 * Generate CSS gradient for preview
	 */
	const gradientCSS = stops
		.sort((a, b) => a.position - b.position)
		.map((stop) => `${stop.color} ${Math.round(stop.position * 100)}%`)
		.join(', ')

	const sortedStops = [...stops].sort((a, b) => a.position - b.position)

	return (
		<div className='space-y-6'>
			{/* Presets */}
			<div>
				<label className='block text-sm font-medium text-slate-700 mb-2'>Presets</label>
				<select
					onChange={(e) => {
						if (e.target.value) {
							onApplyPreset(e.target.value)
						}
					}}
					className='w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
				>
					<option value=''>Select a preset...</option>
					{gradientPresets.map((preset) => (
						<option key={preset.name} value={preset.name}>
							{preset.name} - {preset.description}
						</option>
					))}
				</select>
			</div>

			{/* Gradient Preview Bar */}
			<div>
				<label className='block text-sm font-medium text-slate-700 mb-2'>
					Gradient Preview
				</label>
				<div
					onClick={handleGradientBarClick}
					className='w-full h-16 rounded-lg border-2 border-slate-300 cursor-crosshair relative overflow-hidden'
					style={{
						background: `linear-gradient(to right, ${gradientCSS})`,
					}}
				>
					{/* Stop markers */}
					{sortedStops.map((stop, index) => {
						const actualIndex = stops.indexOf(stop)
						return (
							<div
								key={actualIndex}
								onClick={(e) => {
									e.stopPropagation()
									setSelectedIndex(actualIndex)
								}}
								className={`
									absolute top-0 w-1 h-full cursor-pointer
									${selectedIndex === actualIndex ? 'bg-white' : 'bg-slate-800'}
								`}
								style={{ left: `${stop.position * 100}%` }}
							>
								<div
									className={`
										absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2
										${selectedIndex === actualIndex ? 'border-white bg-slate-800' : 'border-slate-800 bg-white'}
									`}
									style={{ backgroundColor: stop.color }}
								/>
							</div>
						)
					})}
				</div>
				<p className='text-xs text-slate-500 mt-1'>Click on gradient bar to add a stop</p>
			</div>

			{/* Stop Controls */}
			{selectedIndex !== null && sortedStops.length > 0 && (
				<div className='bg-slate-50 rounded-lg p-4 space-y-4'>
					<div className='flex items-center justify-between'>
						<h4 className='text-sm font-medium text-slate-900'>
							Stop {selectedIndex + 1} of {stops.length}
						</h4>
						{stops.length > 2 && (
							<button
								onClick={() => {
									onRemoveStop(selectedIndex)
									setSelectedIndex(null)
								}}
								className='px-3 py-1.5 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700 transition-colors'
							>
								Remove
							</button>
						)}
					</div>

					{/* Position */}
					<div>
						<label className='block text-sm font-medium text-slate-700 mb-2'>
							Position: {Math.round(sortedStops[selectedIndex].position * 100)}%
						</label>
						<input
							type='range'
							min='0'
							max='100'
							step='0.1'
							value={sortedStops[selectedIndex].position * 100}
							onChange={(e) => {
								const position = parseFloat(e.target.value) / 100
								onUpdateStop(selectedIndex, { position })
							}}
							className='w-full'
						/>
					</div>

					{/* Color */}
					<div>
						<label className='block text-sm font-medium text-slate-700 mb-2'>Color</label>
						<div className='flex items-center gap-4'>
							<input
								type='color'
								value={sortedStops[selectedIndex].color}
								onChange={(e) => {
									onUpdateStop(selectedIndex, { color: e.target.value })
								}}
								className='w-16 h-16 rounded-lg border-2 border-slate-300 cursor-pointer'
							/>
							<input
								type='text'
								value={sortedStops[selectedIndex].color}
								onChange={(e) => {
									onUpdateStop(selectedIndex, { color: e.target.value })
								}}
								placeholder='#000000'
								className='flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
							/>
						</div>
					</div>
				</div>
			)}

			{/* Stops List */}
			<div>
				<label className='block text-sm font-medium text-slate-700 mb-2'>Gradient Stops</label>
				<div className='space-y-2'>
					{sortedStops.map((stop, index) => {
						const actualIndex = stops.indexOf(stop)
						return (
							<div
								key={actualIndex}
								onClick={() => setSelectedIndex(actualIndex)}
								className={`
									flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors
									${
										selectedIndex === actualIndex
											? 'border-blue-500 bg-blue-50'
											: 'border-slate-200 hover:border-slate-300'
									}
								`}
							>
								<div
									className='w-8 h-8 rounded border-2 border-slate-300'
									style={{ backgroundColor: stop.color }}
								/>
								<div className='flex-1'>
									<div className='text-sm font-medium text-slate-900'>
										{Math.round(stop.position * 100)}%
									</div>
									<div className='text-xs text-slate-500'>{stop.color}</div>
								</div>
								{stops.length > 2 && (
									<button
										onClick={(e) => {
											e.stopPropagation()
											onRemoveStop(actualIndex)
											if (selectedIndex === actualIndex) {
												setSelectedIndex(null)
											}
										}}
										className='px-2 py-1 text-red-600 hover:bg-red-50 rounded text-sm'
									>
										×
									</button>
								)}
							</div>
						)
					})}
				</div>
			</div>
		</div>
	)
}

