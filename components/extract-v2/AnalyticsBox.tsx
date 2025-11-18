/**
 * Analytics Box Component
 * 
 * Displays image analytics: average lightness, darkest/lightest colors,
 * dominant hue, and mood analysis.
 * 
 * @component
 */

'use client'

import type { ImageAnalytics } from '@/hooks/useExtractColorsV2'
import { ColorSwatch } from './ColorSwatch'

interface AnalyticsBoxProps {
	/** Image analytics data */
	analytics: ImageAnalytics
}

/**
 * Analytics Box Component
 * 
 * Displays comprehensive image color analytics.
 * 
 * @param {AnalyticsBoxProps} props - Component props
 * @returns {JSX.Element} Analytics box component
 */
export function AnalyticsBox({ analytics }: AnalyticsBoxProps) {
	/**
	 * Get mood description
	 */
	const getMoodDescription = (): string => {
		const parts: string[] = []
		parts.push(analytics.mood.temperature)
		parts.push(analytics.mood.brightness)
		parts.push(analytics.mood.vibrancy)
		parts.push(analytics.mood.contrast)
		return parts.join(' • ')
	}

	return (
		<div className='bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-6 border border-slate-200'>
			<h3 className='text-xl font-semibold text-slate-900 mb-6'>Image Analytics</h3>

			<div className='grid md:grid-cols-2 gap-6'>
				{/* Average Lightness */}
				<div className='space-y-2'>
					<p className='text-sm font-medium text-slate-600'>Average Lightness</p>
					<div className='flex items-center gap-3'>
						<div className='flex-1 bg-slate-200 rounded-full h-3 overflow-hidden'>
							<div
								className='bg-blue-500 h-full transition-all duration-300'
								style={{ width: `${analytics.averageLightness}%` }}
							/>
						</div>
						<span className='text-lg font-semibold text-slate-900'>
							{analytics.averageLightness}%
						</span>
					</div>
				</div>

				{/* Dominant Hue */}
				<div className='space-y-2'>
					<p className='text-sm font-medium text-slate-600'>Dominant Hue</p>
					<div className='flex items-center gap-3'>
						<div
							className='w-12 h-12 rounded-lg border-2 border-slate-300'
							style={{
								backgroundColor: `hsl(${analytics.dominantHue}, 70%, 50%)`,
							}}
						/>
						<span className='text-lg font-semibold text-slate-900'>
							{analytics.dominantHue}°
						</span>
					</div>
				</div>

				{/* Darkest Color */}
				{analytics.darkestColor && (
					<div className='space-y-2'>
						<p className='text-sm font-medium text-slate-600'>Darkest Color</p>
						<ColorSwatch color={analytics.darkestColor.hex} size='sm' />
					</div>
				)}

				{/* Lightest Color */}
				{analytics.lightestColor && (
					<div className='space-y-2'>
						<p className='text-sm font-medium text-slate-600'>Lightest Color</p>
						<ColorSwatch color={analytics.lightestColor.hex} size='sm' />
					</div>
				)}
			</div>

			{/* Mood */}
			<div className='mt-6 pt-6 border-t border-slate-300'>
				<p className='text-sm font-medium text-slate-600 mb-2'>Mood</p>
				<div className='flex flex-wrap gap-2'>
					{Object.entries(analytics.mood).map(([key, value]) => (
						<span
							key={key}
							className='px-3 py-1 bg-white rounded-full text-sm font-medium text-slate-700 border border-slate-200'
						>
							{value}
						</span>
					))}
				</div>
				<p className='text-xs text-slate-500 mt-2'>{getMoodDescription()}</p>
			</div>
		</div>
	)
}

