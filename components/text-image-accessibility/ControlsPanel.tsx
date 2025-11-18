/**
 * Controls Panel Component
 * 
 * Provides controls for text settings: text, color, size, weight, position, background, shadow.
 * 
 * @component
 */

'use client'

import { useState } from 'react'
import type { TextSettings } from '@/hooks/useTextImageAccessibility'

interface ControlsPanelProps {
	/** Text settings */
	textSettings: TextSettings
	/** Callback when settings change */
	onSettingsChange: (updates: Partial<TextSettings>) => void
	/** Show heatmap */
	showHeatmap: boolean
	/** Callback when heatmap toggle changes */
	onHeatmapToggle: (show: boolean) => void
}

/**
 * Controls Panel Component
 * 
 * @param {ControlsPanelProps} props - Component props
 * @returns {JSX.Element} Controls panel component
 */
export function ControlsPanel({
	textSettings,
	onSettingsChange,
	showHeatmap,
	onHeatmapToggle,
}: ControlsPanelProps) {
	const [colorInput, setColorInput] = useState(textSettings.color)

	return (
		<div className='space-y-6 bg-white rounded-lg border border-slate-200 p-6'>
			<h3 className='text-lg font-semibold text-slate-900'>Text Settings</h3>

			{/* Text Input */}
			<div>
				<label htmlFor='text-input' className='block text-sm font-medium text-slate-700 mb-2'>
					Text
				</label>
				<input
					id='text-input'
					type='text'
					value={textSettings.text}
					onChange={(e) => onSettingsChange({ text: e.target.value })}
					className='w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
				/>
			</div>

			{/* Color */}
			<div>
				<label className='block text-sm font-medium text-slate-700 mb-2'>Text Color</label>
				<div className='flex items-center gap-4'>
					<input
						type='color'
						value={textSettings.color}
						onChange={(e) => {
							setColorInput(e.target.value)
							onSettingsChange({ color: e.target.value })
						}}
						className='w-16 h-16 rounded-lg border-2 border-slate-300 cursor-pointer'
					/>
					<input
						type='text'
						value={colorInput}
						onChange={(e) => {
							setColorInput(e.target.value)
							onSettingsChange({ color: e.target.value })
						}}
						placeholder='#FFFFFF'
						className='flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
					/>
				</div>
			</div>

			{/* Font Size */}
			<div>
				<label htmlFor='font-size' className='block text-sm font-medium text-slate-700 mb-2'>
					Font Size: {textSettings.fontSize}px
				</label>
				<input
					id='font-size'
					type='range'
					min='12'
					max='120'
					value={textSettings.fontSize}
					onChange={(e) => onSettingsChange({ fontSize: parseInt(e.target.value) })}
					className='w-full'
				/>
			</div>

			{/* Font Weight */}
			<div>
				<label htmlFor='font-weight' className='block text-sm font-medium text-slate-700 mb-2'>
					Font Weight
				</label>
				<select
					id='font-weight'
					value={textSettings.fontWeight}
					onChange={(e) => onSettingsChange({ fontWeight: e.target.value })}
					className='w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
				>
					<option value='normal'>Normal</option>
					<option value='bold'>Bold</option>
					<option value='300'>Light</option>
					<option value='500'>Medium</option>
					<option value='700'>Bold</option>
				</select>
			</div>

			{/* Position */}
			<div>
				<label className='block text-sm font-medium text-slate-700 mb-2'>Position</label>
				<div className='grid grid-cols-2 gap-4'>
					<div>
						<label className='block text-xs text-slate-600 mb-1'>Horizontal</label>
						<select
							value={textSettings.position.horizontal}
							onChange={(e) =>
								onSettingsChange({
									position: {
										...textSettings.position,
										horizontal: e.target.value as 'left' | 'center' | 'right',
									},
								})
							}
							className='w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
						>
							<option value='left'>Left</option>
							<option value='center'>Center</option>
							<option value='right'>Right</option>
						</select>
					</div>
					<div>
						<label className='block text-xs text-slate-600 mb-1'>Vertical</label>
						<select
							value={textSettings.position.vertical}
							onChange={(e) =>
								onSettingsChange({
									position: {
										...textSettings.position,
										vertical: e.target.value as 'top' | 'middle' | 'bottom',
									},
								})
							}
							className='w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
						>
							<option value='top'>Top</option>
							<option value='middle'>Middle</option>
							<option value='bottom'>Bottom</option>
						</select>
					</div>
				</div>
			</div>

			{/* Shadow */}
			<div>
				<label className='flex items-center gap-2'>
					<input
						type='checkbox'
						checked={textSettings.shadow}
						onChange={(e) => onSettingsChange({ shadow: e.target.checked })}
						className='w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500'
					/>
					<span className='text-sm font-medium text-slate-700'>Text Shadow</span>
				</label>
			</div>

			{/* Background Overlay */}
			<div className='space-y-3 border-t border-slate-200 pt-4'>
				<label className='flex items-center gap-2'>
					<input
						type='checkbox'
						checked={textSettings.background.enabled}
						onChange={(e) =>
							onSettingsChange({
								background: {
									...textSettings.background,
									enabled: e.target.checked,
								},
							})
						}
						className='w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500'
					/>
					<span className='text-sm font-medium text-slate-700'>Background Overlay</span>
				</label>

				{textSettings.background.enabled && (
					<div className='space-y-3 pl-6'>
						<div>
							<label className='block text-sm font-medium text-slate-700 mb-2'>
								Overlay Color
							</label>
							<div className='flex items-center gap-4'>
								<input
									type='color'
									value={textSettings.background.color}
									onChange={(e) =>
										onSettingsChange({
											background: {
												...textSettings.background,
												color: e.target.value,
											},
										})
									}
									className='w-12 h-12 rounded-lg border-2 border-slate-300 cursor-pointer'
								/>
								<input
									type='text'
									value={textSettings.background.color}
									onChange={(e) =>
										onSettingsChange({
											background: {
												...textSettings.background,
												color: e.target.value,
											},
										})
									}
									placeholder='#000000'
									className='flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
								/>
							</div>
						</div>
						<div>
							<label className='block text-sm font-medium text-slate-700 mb-2'>
								Opacity: {Math.round(textSettings.background.opacity * 100)}%
							</label>
							<input
								type='range'
								min='0'
								max='1'
								step='0.01'
								value={textSettings.background.opacity}
								onChange={(e) =>
									onSettingsChange({
										background: {
											...textSettings.background,
											opacity: parseFloat(e.target.value),
										},
									})
								}
								className='w-full'
							/>
						</div>
					</div>
				)}
			</div>

			{/* Heatmap Toggle */}
			<div className='border-t border-slate-200 pt-4'>
				<label className='flex items-center gap-2'>
					<input
						type='checkbox'
						checked={showHeatmap}
						onChange={(e) => onHeatmapToggle(e.target.checked)}
						className='w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500'
					/>
					<span className='text-sm font-medium text-slate-700'>Show Heatmap</span>
				</label>
			</div>
		</div>
	)
}

