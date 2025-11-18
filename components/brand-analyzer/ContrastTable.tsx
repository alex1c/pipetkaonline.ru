/**
 * Contrast Table Component
 * 
 * Displays contrast analysis for all colors with WCAG compliance indicators.
 * 
 * @component
 */

'use client'

import type { ContrastAnalysis } from '@/lib/brand-analysis/contrastAnalysis'
import { ColorSwatch } from '@/components/extract-v2/ColorSwatch'

interface ContrastTableProps {
	/** Contrast analysis results */
	contrastAnalysis: ContrastAnalysis[]
}

/**
 * Contrast Table Component
 * 
 * @param {ContrastTableProps} props - Component props
 * @returns {JSX.Element} Contrast table component
 */
export function ContrastTable({ contrastAnalysis }: ContrastTableProps) {
	if (contrastAnalysis.length === 0) return null

	return (
		<div className='space-y-6'>
			<h3 className='text-xl font-semibold text-slate-900'>Contrast & Accessibility</h3>

			<div className='bg-white rounded-lg border border-slate-200 overflow-hidden'>
				<table className='w-full'>
					<thead className='bg-slate-50'>
						<tr>
							<th className='px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider'>
								Color
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider'>
								Contrast (White)
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider'>
								Contrast (Black)
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider'>
								WCAG
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider'>
								Recommendations
							</th>
						</tr>
					</thead>
					<tbody className='divide-y divide-slate-200'>
						{contrastAnalysis.map((analysis, index) => (
							<tr
								key={index}
								className={!analysis.wcagAA ? 'bg-red-50' : 'bg-white'}
							>
								<td className='px-6 py-4 whitespace-nowrap'>
									<div className='flex items-center gap-3'>
										<ColorSwatch color={analysis.hex} size='sm' />
										<span className='text-sm font-mono text-slate-900'>{analysis.hex}</span>
									</div>
								</td>
								<td className='px-6 py-4 whitespace-nowrap'>
									<span className='text-sm font-medium text-slate-900'>
										{analysis.contrastWhite}:1
									</span>
								</td>
								<td className='px-6 py-4 whitespace-nowrap'>
									<span className='text-sm font-medium text-slate-900'>
										{analysis.contrastBlack}:1
									</span>
								</td>
								<td className='px-6 py-4 whitespace-nowrap'>
									<div className='flex flex-col gap-1'>
										{analysis.wcagAA && (
											<span className='text-xs font-medium text-green-600'>✓ AA</span>
										)}
										{analysis.wcagAAA && (
											<span className='text-xs font-medium text-green-700'>✓ AAA</span>
										)}
										{analysis.wcagAALarge && !analysis.wcagAA && (
											<span className='text-xs font-medium text-yellow-600'>AA Large</span>
										)}
										{!analysis.wcagAA && !analysis.wcagAALarge && (
											<span className='text-xs font-medium text-red-600'>✗ Below AA</span>
										)}
									</div>
								</td>
								<td className='px-6 py-4'>
									<ul className='text-xs text-slate-600 space-y-1'>
										{analysis.recommendations.map((rec, recIndex) => (
											<li key={recIndex}>• {rec}</li>
										))}
									</ul>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}

