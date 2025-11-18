/**
 * Results Panel Component
 * 
 * Displays accessibility analysis results: contrast ratio, WCAG compliance, recommendations.
 * 
 * @component
 */

'use client'

import type { AnalysisResult } from '@/hooks/useTextImageAccessibility'

interface ResultsPanelProps {
	/** Analysis result */
	result: AnalysisResult | null
}

/**
 * Results Panel Component
 * 
 * @param {ResultsPanelProps} props - Component props
 * @returns {JSX.Element} Results panel component
 */
export function ResultsPanel({ result }: ResultsPanelProps) {
	if (!result) {
		return (
			<div className='bg-white rounded-lg border border-slate-200 p-6'>
				<p className='text-sm text-slate-500'>Upload an image and configure text to see analysis results.</p>
			</div>
		)
	}

	return (
		<div className='space-y-4 bg-white rounded-lg border border-slate-200 p-6'>
			<h3 className='text-lg font-semibold text-slate-900'>Accessibility Analysis</h3>

			{/* Contrast Ratio */}
			<div className='bg-slate-50 rounded-lg p-4'>
				<div className='flex items-center justify-between mb-2'>
					<span className='text-sm font-medium text-slate-700'>Contrast Ratio</span>
					<span className='text-2xl font-bold text-slate-900'>
						{result.contrastRatio.toFixed(2)}:1
					</span>
				</div>
			</div>

			{/* WCAG Compliance */}
			<div className='space-y-2'>
				<h4 className='text-sm font-medium text-slate-700'>WCAG Compliance</h4>
				<div className='space-y-2'>
					<div className='flex items-center justify-between p-3 rounded-lg bg-slate-50'>
						<span className='text-sm text-slate-700'>WCAG AA (Small Text)</span>
						<span
							className={`text-sm font-medium ${
								result.wcag.aaSmall ? 'text-green-600' : 'text-red-600'
							}`}
						>
							{result.wcag.aaSmall ? '✓ Pass' : '✗ Fail'}
						</span>
					</div>
					<div className='flex items-center justify-between p-3 rounded-lg bg-slate-50'>
						<span className='text-sm text-slate-700'>WCAG AA (Large Text)</span>
						<span
							className={`text-sm font-medium ${
								result.wcag.aaLarge ? 'text-green-600' : 'text-red-600'
							}`}
						>
							{result.wcag.aaLarge ? '✓ Pass' : '✗ Fail'}
						</span>
					</div>
					<div className='flex items-center justify-between p-3 rounded-lg bg-slate-50'>
						<span className='text-sm text-slate-700'>WCAG AAA</span>
						<span
							className={`text-sm font-medium ${
								result.wcag.aaa ? 'text-green-600' : 'text-red-600'
							}`}
						>
							{result.wcag.aaa ? '✓ Pass' : '✗ Fail'}
						</span>
					</div>
				</div>
			</div>

			{/* Recommendation */}
			<div className='bg-blue-50 border border-blue-200 rounded-lg p-4'>
				<h4 className='text-sm font-medium text-blue-900 mb-2'>Recommendation</h4>
				<p className='text-sm text-blue-800'>{result.recommendation}</p>
			</div>
		</div>
	)
}

