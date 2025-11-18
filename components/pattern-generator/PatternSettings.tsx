/**
 * Pattern Settings Component
 * 
 * Provides controls for pattern settings.
 * 
 * @component
 */

'use client'

import { useTranslations } from 'next-intl'
import type { PatternSettings } from '@/lib/pattern-renderers/types'

interface PatternSettingsProps {
	/** Current settings */
	settings: PatternSettings
	/** Callback when settings change */
	onSettingsChange: (updates: Partial<PatternSettings>) => void
}

/**
 * Pattern Settings Component
 * 
 * @param {PatternSettingsProps} props - Component props
 * @returns {JSX.Element} Pattern settings component
 */
export function PatternSettings({
	settings,
	onSettingsChange,
}: PatternSettingsProps) {
	const t = useTranslations('tools.patternGenerator')

	return (
		<div className='space-y-6 bg-white rounded-lg border border-slate-200 p-6'>
			<h3 className='text-lg font-semibold text-slate-900'>{t('settings')}</h3>

			{/* Tile Size */}
			<div>
				<label className='block text-sm font-medium text-slate-700 mb-2'>
					{t('tileSize')}
				</label>
				<select
					value={settings.tileSize}
					onChange={(e) =>
						onSettingsChange({ tileSize: parseInt(e.target.value) })
					}
					className='w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
				>
					<option value={128}>128px</option>
					<option value={256}>256px</option>
					<option value={512}>512px</option>
					<option value={1024}>1024px</option>
				</select>
			</div>

			{/* Background Color */}
			<div>
				<label className='block text-sm font-medium text-slate-700 mb-2'>
					{t('backgroundColor')}
				</label>
				<div className='flex items-center gap-3'>
					<input
						type='color'
						value={settings.backgroundColor}
						onChange={(e) => onSettingsChange({ backgroundColor: e.target.value })}
						className='w-16 h-16 rounded-lg border-2 border-slate-300 cursor-pointer'
					/>
					<input
						type='text'
						value={settings.backgroundColor}
						onChange={(e) => onSettingsChange({ backgroundColor: e.target.value })}
						className='flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono'
					/>
				</div>
			</div>

			{/* Element Color */}
			<div>
				<label className='block text-sm font-medium text-slate-700 mb-2'>
					{t('elementColor')}
				</label>
				<div className='flex items-center gap-3'>
					<input
						type='color'
						value={settings.elementColor}
						onChange={(e) => onSettingsChange({ elementColor: e.target.value })}
						className='w-16 h-16 rounded-lg border-2 border-slate-300 cursor-pointer'
					/>
					<input
						type='text'
						value={settings.elementColor}
						onChange={(e) => onSettingsChange({ elementColor: e.target.value })}
						className='flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono'
					/>
				</div>
			</div>

			{/* Density */}
			<div>
				<label className='block text-sm font-medium text-slate-700 mb-2'>
					{t('density')}: {settings.density}
				</label>
				<input
					type='range'
					min='0'
					max='100'
					value={settings.density}
					onChange={(e) => onSettingsChange({ density: parseInt(e.target.value) })}
					className='w-full'
				/>
			</div>

			{/* Element Size */}
			<div>
				<label className='block text-sm font-medium text-slate-700 mb-2'>
					{t('elementSize')}: {settings.elementSize}
				</label>
				<input
					type='range'
					min='0'
					max='100'
					value={settings.elementSize}
					onChange={(e) => onSettingsChange({ elementSize: parseInt(e.target.value) })}
					className='w-full'
				/>
			</div>

			{/* Rotation */}
			<div>
				<label className='block text-sm font-medium text-slate-700 mb-2'>
					{t('rotation')}: {settings.rotation}°
				</label>
				<input
					type='range'
					min='0'
					max='360'
					value={settings.rotation}
					onChange={(e) => onSettingsChange({ rotation: parseInt(e.target.value) })}
					className='w-full'
				/>
			</div>

			{/* Randomness */}
			<div>
				<label className='block text-sm font-medium text-slate-700 mb-2'>
					{t('randomness')}: {settings.randomness}%
				</label>
				<input
					type='range'
					min='0'
					max='100'
					value={settings.randomness}
					onChange={(e) => onSettingsChange({ randomness: parseInt(e.target.value) })}
					className='w-full'
				/>
			</div>

			{/* Additional settings based on pattern type */}
			{settings.type === 'stripes' && (
				<div>
					<label className='block text-sm font-medium text-slate-700 mb-2'>
						{t('direction')}
					</label>
					<select
						value={settings.additional?.direction || 'vertical'}
						onChange={(e) =>
							onSettingsChange({
								additional: {
									...settings.additional,
									direction: e.target.value as 'vertical' | 'horizontal' | 'diagonal',
								},
							})
						}
						className='w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
					>
						<option value='vertical'>{t('directionVertical')}</option>
						<option value='horizontal'>{t('directionHorizontal')}</option>
						<option value='diagonal'>{t('directionDiagonal')}</option>
					</select>
				</div>
			)}

			{settings.type === 'waves' && (
				<>
					<div>
						<label className='block text-sm font-medium text-slate-700 mb-2'>
							{t('amplitude')}: {settings.additional?.amplitude || 20}
						</label>
						<input
							type='range'
							min='5'
							max='50'
							value={settings.additional?.amplitude || 20}
							onChange={(e) =>
								onSettingsChange({
									additional: {
										...settings.additional,
										amplitude: parseInt(e.target.value),
									},
								})
							}
							className='w-full'
						/>
					</div>
					<div>
						<label className='block text-sm font-medium text-slate-700 mb-2'>
							{t('frequency')}: {(settings.additional?.frequency || 0.02).toFixed(3)}
						</label>
						<input
							type='range'
							min='0.01'
							max='0.1'
							step='0.001'
							value={settings.additional?.frequency || 0.02}
							onChange={(e) =>
								onSettingsChange({
									additional: {
										...settings.additional,
										frequency: parseFloat(e.target.value),
									},
								})
							}
							className='w-full'
						/>
					</div>
				</>
			)}

			{settings.type === 'polka-dots' && (
				<div>
					<label className='block text-sm font-medium text-slate-700 mb-2'>
						{t('shape')}
					</label>
					<select
						value={settings.additional?.shape || 'circle'}
						onChange={(e) =>
							onSettingsChange({
								additional: {
									...settings.additional,
									shape: e.target.value as 'circle' | 'square',
								},
							})
						}
						className='w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
					>
						<option value='circle'>{t('shapeCircle')}</option>
						<option value='square'>{t('shapeSquare')}</option>
					</select>
				</div>
			)}

			{settings.type === 'grid' && (
				<div>
					<label className='block text-sm font-medium text-slate-700 mb-2'>
						{t('lineWidth')}: {settings.additional?.lineWidth || 2}
					</label>
					<input
						type='range'
						min='1'
						max='10'
						value={settings.additional?.lineWidth || 2}
						onChange={(e) =>
							onSettingsChange({
								additional: {
									...settings.additional,
									lineWidth: parseInt(e.target.value),
								},
							})
						}
						className='w-full'
					/>
				</div>
			)}
		</div>
	)
}

