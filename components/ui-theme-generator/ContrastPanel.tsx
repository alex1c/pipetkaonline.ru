/**
 * Contrast Panel Component
 * 
 * Displays contrast analysis for UI theme tokens with WCAG compliance indicators.
 * 
 * @component
 */

'use client'

import type { ContrastCheck } from '@/hooks/useUIThemeGenerator'

interface ContrastPanelProps {
	/** Contrast check results */
	contrastChecks: ContrastCheck[]
}

/**
 * Contrast Panel Component
 * 
 * @param {ContrastPanelProps} props - Component props
 * @returns {JSX.Element} Contrast panel component
 */
export function ContrastPanel({ contrastChecks }: ContrastPanelProps) {
	if (contrastChecks.length === 0) return null

	return (
		<div className='space-y-6'>
			<h3 className='text-xl font-semibold text-slate-900'>Contrast Analysis</h3>

			<div className='bg-white rounded-lg border border-slate-200 overflow-hidden'>
				<table className='w-full'>
					<thead className='bg-slate-50'>
						<tr>
							<th className='px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider'>
								Color Pair
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider'>
								Contrast Ratio
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider'>
								WCAG Compliance
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider'>
								Recommendation
							</th>
						</tr>
					</thead>
					<tbody className='divide-y divide-slate-200'>
						{contrastChecks.map((check, index) => (
							<tr
								key={index}
								className={!check.wcagAA ? 'bg-red-50' : 'bg-white'}
							>
								<td className='px-6 py-4 whitespace-nowrap'>
									<div className='flex items-center gap-3'>
										<div
											className='w-8 h-8 rounded border-2 border-slate-300'
											style={{ backgroundColor: check.color1 }}
										/>
										<span className='text-sm font-medium text-slate-900'>vs</span>
										<div
											className='w-8 h-8 rounded border-2 border-slate-300'
											style={{ backgroundColor: check.color2 }}
										/>
									</div>
								</td>
								<td className='px-6 py-4 whitespace-nowrap'>
									<span className='text-sm font-medium text-slate-900'>
										{check.ratio.toFixed(2)}:1
									</span>
								</td>
								<td className='px-6 py-4 whitespace-nowrap'>
									<div className='flex flex-col gap-1'>
										{check.wcagAA && (
											<span className='text-xs font-medium text-green-600'>✓ AA</span>
										)}
										{check.wcagAAA && (
											<span className='text-xs font-medium text-green-700'>✓ AAA</span>
										)}
										{check.wcagAALarge && !check.wcagAA && (
											<span className='text-xs font-medium text-yellow-600'>AA Large</span>
										)}
										{!check.wcagAA && !check.wcagAALarge && (
											<span className='text-xs font-medium text-red-600'>✗ Below AA</span>
										)}
									</div>
								</td>
								<td className='px-6 py-4'>
									{check.recommendation ? (
										<span className='text-sm text-slate-600'>{check.recommendation}</span>
									) : (
										<span className='text-sm text-green-600'>✓ Good contrast</span>
									)}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}

