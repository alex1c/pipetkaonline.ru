/**
 * Token Grid Component
 * 
 * Displays all UI theme tokens in a structured grid/table format.
 * 
 * @component
 */

'use client'

import { useState } from 'react'
import type { UIThemeTokens } from '@/lib/theme-generator/semanticTokens'
import { ColorSwatch } from '@/components/extract-v2/ColorSwatch'

interface TokenGridProps {
	/** UI theme tokens */
	tokens: UIThemeTokens
}

/**
 * Token Grid Component
 * 
 * @param {TokenGridProps} props - Component props
 * @returns {JSX.Element} Token grid component
 */
export function TokenGrid({ tokens }: TokenGridProps) {
	const [copied, setCopied] = useState<string | null>(null)

	/**
	 * Copy color to clipboard
	 */
	const handleCopy = async (text: string, id: string) => {
		try {
			await navigator.clipboard.writeText(text)
			setCopied(id)
			setTimeout(() => setCopied(null), 2000)
		} catch (err) {
			console.error('Failed to copy:', err)
		}
	}

	/**
	 * Render token row
	 */
	const renderTokenRow = (name: string, color: string, id: string) => (
		<tr key={id} className='hover:bg-slate-50'>
			<td className='px-6 py-4 whitespace-nowrap'>
				<div className='flex items-center gap-3'>
					<ColorSwatch color={color} size='sm' />
					<span className='text-sm font-medium text-slate-900'>{name}</span>
				</div>
			</td>
			<td className='px-6 py-4 whitespace-nowrap'>
				<span className='text-sm font-mono text-slate-600'>{color}</span>
			</td>
			<td className='px-6 py-4 whitespace-nowrap'>
				<button
					onClick={() => handleCopy(color, id)}
					className={`
						px-3 py-1.5 rounded-md text-sm font-medium transition-colors
						${
							copied === id
								? 'bg-green-600 text-white'
								: 'bg-slate-100 text-slate-700 hover:bg-slate-200'
						}
					`}
				>
					{copied === id ? '✓ Copied' : 'Copy'}
				</button>
			</td>
		</tr>
	)

	return (
		<div className='space-y-8'>
			<h3 className='text-xl font-semibold text-slate-900'>Color Tokens</h3>

			{/* Primary Tokens */}
			<div>
				<h4 className='text-lg font-semibold text-slate-900 mb-4'>Primary</h4>
				<div className='bg-white rounded-lg border border-slate-200 overflow-hidden'>
					<table className='w-full'>
						<thead className='bg-slate-50'>
							<tr>
								<th className='px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider'>
									Token
								</th>
								<th className='px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider'>
									Value
								</th>
								<th className='px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider'>
									Action
								</th>
							</tr>
						</thead>
						<tbody className='divide-y divide-slate-200'>
							{renderTokenRow('primary', tokens.primary.base, 'primary-base')}
							{renderTokenRow('primary-hover', tokens.primary.hover, 'primary-hover')}
							{renderTokenRow('primary-active', tokens.primary.active, 'primary-active')}
							{renderTokenRow('primary-foreground', tokens.primary.foreground, 'primary-foreground')}
						</tbody>
					</table>
				</div>
			</div>

			{/* Secondary Tokens */}
			<div>
				<h4 className='text-lg font-semibold text-slate-900 mb-4'>Secondary</h4>
				<div className='bg-white rounded-lg border border-slate-200 overflow-hidden'>
					<table className='w-full'>
						<thead className='bg-slate-50'>
							<tr>
								<th className='px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider'>
									Token
								</th>
								<th className='px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider'>
									Value
								</th>
								<th className='px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider'>
									Action
								</th>
							</tr>
						</thead>
						<tbody className='divide-y divide-slate-200'>
							{renderTokenRow('secondary', tokens.secondary.base, 'secondary-base')}
							{renderTokenRow('secondary-hover', tokens.secondary.hover, 'secondary-hover')}
							{renderTokenRow('secondary-foreground', tokens.secondary.foreground, 'secondary-foreground')}
						</tbody>
					</table>
				</div>
			</div>

			{/* Neutral Tokens */}
			<div>
				<h4 className='text-lg font-semibold text-slate-900 mb-4'>Neutral</h4>
				<div className='bg-white rounded-lg border border-slate-200 overflow-hidden'>
					<table className='w-full'>
						<thead className='bg-slate-50'>
							<tr>
								<th className='px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider'>
									Token
								</th>
								<th className='px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider'>
									Value
								</th>
								<th className='px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider'>
									Action
								</th>
							</tr>
						</thead>
						<tbody className='divide-y divide-slate-200'>
							{renderTokenRow('background', tokens.neutral.background, 'neutral-background')}
							{renderTokenRow('foreground', tokens.neutral.foreground, 'neutral-foreground')}
							{renderTokenRow('card', tokens.neutral.card, 'neutral-card')}
							{renderTokenRow('muted', tokens.neutral.muted, 'neutral-muted')}
						</tbody>
					</table>
				</div>
			</div>

			{/* Status Tokens */}
			<div>
				<h4 className='text-lg font-semibold text-slate-900 mb-4'>Status</h4>
				<div className='bg-white rounded-lg border border-slate-200 overflow-hidden'>
					<table className='w-full'>
						<thead className='bg-slate-50'>
							<tr>
								<th className='px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider'>
									Token
								</th>
								<th className='px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider'>
									Value
								</th>
								<th className='px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider'>
									Action
								</th>
							</tr>
						</thead>
						<tbody className='divide-y divide-slate-200'>
							{renderTokenRow('success', tokens.status.success, 'status-success')}
							{renderTokenRow('warning', tokens.status.warning, 'status-warning')}
							{renderTokenRow('error', tokens.status.error, 'status-error')}
							{renderTokenRow('info', tokens.status.info, 'status-info')}
						</tbody>
					</table>
				</div>
			</div>

			{/* Borders Tokens */}
			<div>
				<h4 className='text-lg font-semibold text-slate-900 mb-4'>Borders</h4>
				<div className='bg-white rounded-lg border border-slate-200 overflow-hidden'>
					<table className='w-full'>
						<thead className='bg-slate-50'>
							<tr>
								<th className='px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider'>
									Token
								</th>
								<th className='px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider'>
									Value
								</th>
								<th className='px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider'>
									Action
								</th>
							</tr>
						</thead>
						<tbody className='divide-y divide-slate-200'>
							{renderTokenRow('border', tokens.borders.base, 'border-base')}
							{renderTokenRow('border-strong', tokens.borders.strong, 'border-strong')}
							{renderTokenRow('ring', tokens.borders.ring, 'border-ring')}
						</tbody>
					</table>
				</div>
			</div>

			{/* Shadows Tokens */}
			<div>
				<h4 className='text-lg font-semibold text-slate-900 mb-4'>Shadows</h4>
				<div className='bg-white rounded-lg border border-slate-200 overflow-hidden'>
					<table className='w-full'>
						<thead className='bg-slate-50'>
							<tr>
								<th className='px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider'>
									Token
								</th>
								<th className='px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider'>
									Value
								</th>
								<th className='px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider'>
									Action
								</th>
							</tr>
						</thead>
						<tbody className='divide-y divide-slate-200'>
							{renderTokenRow('shadow-sm', tokens.shadows.sm, 'shadow-sm')}
							{renderTokenRow('shadow-md', tokens.shadows.md, 'shadow-md')}
							{renderTokenRow('shadow-lg', tokens.shadows.lg, 'shadow-lg')}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	)
}

