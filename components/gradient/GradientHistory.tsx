'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { SavedGradient } from '@/hooks/useGradientGenerator'

interface GradientHistoryProps {
	gradients: SavedGradient[]
	onLoad: (gradient: SavedGradient) => void
	onDelete: (id: string) => void
}

/**
 * Component for displaying saved gradient history
 * Shows a grid of saved gradients with load and delete options
 */
export function GradientHistory({
	gradients,
	onLoad,
	onDelete,
}: GradientHistoryProps) {
	const t = useTranslations('tools.gradientGenerator')

	if (gradients.length === 0) {
		return null
	}

	return (
		<div className='bg-white rounded-xl shadow-md p-6'>
			<h3 className='text-lg font-semibold text-slate-900 mb-4'>
				{t('history.title')}
			</h3>
			<div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4'>
				{gradients.map((gradient) => {
					const sortedStops = [...gradient.stops].sort(
						(a, b) => a.position - b.position
					)
					const stopsString = sortedStops
						.map((stop) => `${stop.color} ${stop.position}%`)
						.join(', ')

					const css =
						gradient.type === 'linear'
							? `linear-gradient(${gradient.direction}, ${stopsString})`
							: `radial-gradient(${gradient.shape}, ${stopsString})`

					return (
						<div
							key={gradient.id}
							className='relative group rounded-lg overflow-hidden border border-slate-200'
						>
							<div
								className='w-full h-24 cursor-pointer'
								style={{ background: css }}
								onClick={() => onLoad(gradient)}
							/>
							<div className='absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100'>
								<button
									type='button'
									onClick={(e) => {
										e.stopPropagation()
										onLoad(gradient)
									}}
									className='px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-xs font-medium'
								>
									{t('history.load')}
								</button>
								<button
									type='button'
									onClick={(e) => {
										e.stopPropagation()
										onDelete(gradient.id)
									}}
									className='px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors text-xs font-medium'
								>
									{t('history.delete')}
								</button>
							</div>
						</div>
					)
				})}
			</div>
		</div>
	)
}


