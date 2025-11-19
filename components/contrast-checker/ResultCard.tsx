'use client'

import { useTranslations } from 'next-intl'
import type { ContrastResult } from '@/hooks/useContrastChecker'

interface ResultCardProps {
	result: ContrastResult
}

/**
 * WCAG result card component
 * Displays contrast ratio and compliance levels
 */
export function ResultCard({ result }: ResultCardProps) {
	const t = useTranslations('tools.contrastChecker')

	const levels = [
		{
			key: 'aaNormal' as const,
			label: t('levels.aaNormal'),
			required: 4.5,
			passed: result.wcag.aaNormal,
		},
		{
			key: 'aaLarge' as const,
			label: t('levels.aaLarge'),
			required: 3.0,
			passed: result.wcag.aaLarge,
		},
		{
			key: 'aaaNormal' as const,
			label: t('levels.aaaNormal'),
			required: 7.0,
			passed: result.wcag.aaaNormal,
		},
		{
			key: 'aaaLarge' as const,
			label: t('levels.aaaLarge'),
			required: 4.5,
			passed: result.wcag.aaaLarge,
		},
	]

	return (
		<div className='bg-white rounded-xl shadow-md p-6 space-y-6'>
			{/* Contrast Ratio */}
			<div className='text-center'>
				<h3 className='text-sm font-medium text-slate-500 mb-2'>
					{t('ratio')}
				</h3>
				<div className='text-4xl font-bold text-slate-900'>
					{result.ratioFormatted}
				</div>
			</div>

			{/* WCAG Levels */}
			<div className='space-y-3'>
				{levels.map((level) => (
					<div
						key={level.key}
						className='flex items-center justify-between p-4 rounded-lg border-2 transition-colors'
						style={{
							borderColor: level.passed ? '#10b981' : '#ef4444',
							backgroundColor: level.passed ? '#f0fdf4' : '#fef2f2',
						}}
					>
						<div className='flex items-center gap-3'>
							<span className='text-2xl'>{level.passed ? '🟢' : '🔴'}</span>
							<div>
								<div className='font-semibold text-slate-900'>{level.label}</div>
								<div className='text-sm text-slate-500'>
									Requires: {level.required}:1
								</div>
							</div>
						</div>
						<div
							className={`px-3 py-1 rounded-full text-sm font-semibold ${
								level.passed
									? 'bg-green-100 text-green-800'
									: 'bg-red-100 text-red-800'
							}`}
						>
							{level.passed ? t('pass') : t('fail')}
						</div>
					</div>
				))}
			</div>
		</div>
	)
}



