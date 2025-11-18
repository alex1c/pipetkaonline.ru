/**
 * Technical Data Component
 * 
 * Displays technical color information: HEX, RGB, HSL, LAB, LCH, contrast ratios, and tags.
 * 
 * @component
 */

'use client'

import type { TechnicalData } from '@/hooks/useColorNameFinder'

interface TechnicalDataProps {
	/** Technical color data */
	data: TechnicalData
}

/**
 * Technical Data Component
 * 
 * @param {TechnicalDataProps} props - Component props
 * @returns {JSX.Element} Technical data component
 */
export function TechnicalDataComponent({ data }: TechnicalDataProps) {
	return (
		<div className='space-y-6'>
			<h3 className='text-xl font-semibold text-slate-900'>Technical Data</h3>

			{/* Color Formats Table */}
			<div className='bg-white rounded-lg border border-slate-200 overflow-hidden'>
				<table className='w-full'>
					<thead className='bg-slate-50'>
						<tr>
							<th className='px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider'>
								Format
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider'>
								Values
							</th>
						</tr>
					</thead>
					<tbody className='divide-y divide-slate-200'>
						{/* HEX */}
						<tr>
							<td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900'>
								HEX
							</td>
							<td className='px-6 py-4 whitespace-nowrap text-sm font-mono text-slate-600'>
								{data.hex}
							</td>
						</tr>

						{/* RGB */}
						<tr>
							<td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900'>
								RGB
							</td>
							<td className='px-6 py-4 whitespace-nowrap text-sm font-mono text-slate-600'>
								{data.rgb.r}, {data.rgb.g}, {data.rgb.b}
							</td>
						</tr>

						{/* HSL */}
						<tr>
							<td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900'>
								HSL
							</td>
							<td className='px-6 py-4 whitespace-nowrap text-sm font-mono text-slate-600'>
								{data.hsl.h}°, {data.hsl.s}%, {data.hsl.l}%
							</td>
						</tr>

						{/* LAB */}
						<tr>
							<td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900'>
								LAB
							</td>
							<td className='px-6 py-4 whitespace-nowrap text-sm font-mono text-slate-600'>
								L: {data.lab.l}, A: {data.lab.a}, B: {data.lab.b}
							</td>
						</tr>

						{/* LCH */}
						<tr>
							<td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900'>
								LCH
							</td>
							<td className='px-6 py-4 whitespace-nowrap text-sm font-mono text-slate-600'>
								L: {data.lch.l}, C: {data.lch.c}, H: {data.lch.h}°
							</td>
						</tr>
					</tbody>
				</table>
			</div>

			{/* Contrast Ratios */}
			<div className='grid md:grid-cols-2 gap-4'>
				<div className='bg-white rounded-lg p-6 border border-slate-200'>
					<h4 className='text-sm font-medium text-slate-600 mb-2'>Contrast with White</h4>
					<p className='text-2xl font-bold text-slate-900'>{data.contrastWhite}:1</p>
					<p className='text-xs text-slate-500 mt-1'>
						{data.contrastWhite >= 4.5 ? 'WCAG AA ✓' : data.contrastWhite >= 3 ? 'WCAG AA Large ✓' : 'Below WCAG'}
					</p>
				</div>

				<div className='bg-white rounded-lg p-6 border border-slate-200'>
					<h4 className='text-sm font-medium text-slate-600 mb-2'>Contrast with Black</h4>
					<p className='text-2xl font-bold text-slate-900'>{data.contrastBlack}:1</p>
					<p className='text-xs text-slate-500 mt-1'>
						{data.contrastBlack >= 4.5 ? 'WCAG AA ✓' : data.contrastBlack >= 3 ? 'WCAG AA Large ✓' : 'Below WCAG'}
					</p>
				</div>
			</div>

			{/* Tags */}
			<div className='bg-white rounded-lg p-6 border border-slate-200'>
				<h4 className='text-sm font-medium text-slate-600 mb-3'>Color Tags</h4>
				<div className='flex flex-wrap gap-2'>
					{data.tags.map((tag, index) => (
						<span
							key={index}
							className='px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium capitalize'
						>
							{tag}
						</span>
					))}
				</div>
			</div>
		</div>
	)
}

