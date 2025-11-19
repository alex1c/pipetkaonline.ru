'use client'

import { ChangeEvent } from 'react'
import { useTranslations } from 'next-intl'
import { GradientStop as GradientStopType } from '@/hooks/useGradientGenerator'

interface GradientStopProps {
	stop: GradientStopType
	onUpdate: (id: string, updates: Partial<GradientStopType>) => void
	onRemove: (id: string) => void
	canRemove: boolean
}

/**
 * Component for a single gradient stop
 * Allows editing color and position, and removing the stop
 */
export function GradientStop({ stop, onUpdate, onRemove, canRemove }: GradientStopProps) {
	const t = useTranslations('tools.gradientGenerator')

	const handleColorChange = (e: ChangeEvent<HTMLInputElement>) => {
		onUpdate(stop.id, { color: e.target.value })
	}

	const handlePositionChange = (e: ChangeEvent<HTMLInputElement>) => {
		const position = Math.max(0, Math.min(100, parseInt(e.target.value) || 0))
		onUpdate(stop.id, { position })
	}

	return (
		<div className='bg-white rounded-lg border border-slate-200 p-4 space-y-4'>
			<div className='flex items-center justify-between'>
				<h4 className='text-sm font-medium text-slate-700'>
					{t('stop.title')} {stop.id}
				</h4>
				{canRemove && (
					<button
						type='button'
						onClick={() => onRemove(stop.id)}
						className='px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors text-sm font-medium'
					>
						{t('stop.remove')}
					</button>
				)}
			</div>

			<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
				{/* Color Input */}
				<div className='space-y-2'>
					<label className='block text-xs font-medium text-slate-600'>
						{t('stop.color')}
					</label>
					<div className='flex items-center gap-3'>
						<input
							type='color'
							value={stop.color}
							onChange={handleColorChange}
							className='w-16 h-10 rounded border border-slate-300 cursor-pointer'
						/>
						<input
							type='text'
							value={stop.color}
							onChange={handleColorChange}
							className='flex-1 px-3 py-2 border border-slate-300 rounded-md font-mono text-sm'
							placeholder='#000000'
						/>
					</div>
				</div>

				{/* Position Input */}
				<div className='space-y-2'>
					<label className='block text-xs font-medium text-slate-600'>
						{t('stop.position')} ({stop.position}%)
					</label>
					<input
						type='range'
						min='0'
						max='100'
						value={stop.position}
						onChange={handlePositionChange}
						className='w-full'
					/>
					<input
						type='number'
						min='0'
						max='100'
						value={stop.position}
						onChange={handlePositionChange}
						className='w-full px-3 py-2 border border-slate-300 rounded-md text-sm'
					/>
				</div>
			</div>
		</div>
	)
}



