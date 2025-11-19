'use client'

import { useTranslations } from 'next-intl'
import { GradientType, LinearDirection, RadialShape } from '@/hooks/useGradientGenerator'

interface GradientControlsProps {
	type: GradientType
	setType: (type: GradientType) => void
	direction: LinearDirection
	setDirection: (direction: LinearDirection) => void
	shape: RadialShape
	setShape: (shape: RadialShape) => void
	onRandom: () => void
	onSmooth: () => void
	onReverse: () => void
}

/**
 * Component for controlling gradient type, direction, and utility actions
 */
export function GradientControls({
	type,
	setType,
	direction,
	setDirection,
	shape,
	setShape,
	onRandom,
	onSmooth,
	onReverse,
}: GradientControlsProps) {
	const t = useTranslations('tools.gradientGenerator')

	const linearDirections: LinearDirection[] = [
		'to top',
		'to right',
		'to bottom',
		'to left',
		'to top right',
		'to bottom right',
		'to bottom left',
		'to top left',
	]

	return (
		<div className='bg-white rounded-xl shadow-md p-6 space-y-6'>
			<h3 className='text-lg font-semibold text-slate-900'>{t('controls.title')}</h3>

			{/* Gradient Type */}
			<div className='space-y-3'>
				<label className='block text-sm font-medium text-slate-700'>
					{t('controls.type.label')}
				</label>
				<div className='flex gap-3'>
					<button
						type='button'
						onClick={() => setType('linear')}
						className={`
							px-4 py-2 rounded-lg border-2 transition-all font-medium
							${
								type === 'linear'
									? 'border-blue-500 bg-blue-50 text-blue-700'
									: 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
							}
						`}
					>
						{t('controls.type.linear')}
					</button>
					<button
						type='button'
						onClick={() => setType('radial')}
						className={`
							px-4 py-2 rounded-lg border-2 transition-all font-medium
							${
								type === 'radial'
									? 'border-blue-500 bg-blue-50 text-blue-700'
									: 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
							}
						`}
					>
						{t('controls.type.radial')}
					</button>
				</div>
			</div>

			{/* Linear Direction */}
			{type === 'linear' && (
				<div className='space-y-3'>
					<label className='block text-sm font-medium text-slate-700'>
						{t('controls.direction.label')}
					</label>
					<div className='grid grid-cols-4 md:grid-cols-4 gap-2'>
						{linearDirections.map((dir) => (
							<button
								key={dir}
								type='button'
								onClick={() => setDirection(dir)}
								className={`
									px-3 py-2 rounded-lg border-2 transition-all text-sm font-medium
									${
										direction === dir
											? 'border-blue-500 bg-blue-50 text-blue-700'
											: 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
									}
								`}
							>
								{t(`controls.direction.${dir.replace(/\s/g, '')}`)}
							</button>
						))}
					</div>
				</div>
			)}

			{/* Radial Shape */}
			{type === 'radial' && (
				<div className='space-y-3'>
					<label className='block text-sm font-medium text-slate-700'>
						{t('controls.shape.label')}
					</label>
					<div className='flex gap-3'>
						<button
							type='button'
							onClick={() => setShape('circle')}
							className={`
								px-4 py-2 rounded-lg border-2 transition-all font-medium
								${
									shape === 'circle'
										? 'border-blue-500 bg-blue-50 text-blue-700'
										: 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
							}
						`}
						>
							{t('controls.shape.circle')}
						</button>
						<button
							type='button'
							onClick={() => setShape('ellipse')}
							className={`
								px-4 py-2 rounded-lg border-2 transition-all font-medium
								${
									shape === 'ellipse'
										? 'border-blue-500 bg-blue-50 text-blue-700'
										: 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
								}
						`}
						>
							{t('controls.shape.ellipse')}
						</button>
					</div>
				</div>
			)}

			{/* Utility Buttons */}
			<div className='flex flex-wrap gap-3 pt-4 border-t border-slate-200'>
				<button
					type='button'
					onClick={onRandom}
					className='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium'
				>
					{t('controls.random')}
				</button>
				<button
					type='button'
					onClick={onSmooth}
					className='px-4 py-2 bg-slate-500 text-white rounded-lg hover:bg-slate-600 transition-colors font-medium'
				>
					{t('controls.smooth')}
				</button>
				<button
					type='button'
					onClick={onReverse}
					className='px-4 py-2 bg-slate-500 text-white rounded-lg hover:bg-slate-600 transition-colors font-medium'
				>
					{t('controls.reverse')}
				</button>
			</div>
		</div>
	)
}



