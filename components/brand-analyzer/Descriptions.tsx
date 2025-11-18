/**
 * Descriptions Component
 * 
 * Displays brand color descriptions: short, marketing, technical, recommendations.
 * 
 * @component
 */

'use client'

import { useState } from 'react'
import type { BrandDescriptions } from '@/lib/brand-analysis/descriptions'

interface DescriptionsProps {
	/** Brand descriptions */
	descriptions: BrandDescriptions
	/** Callback to regenerate descriptions */
	onRegenerate: () => void
}

/**
 * Descriptions Component
 * 
 * @param {DescriptionsProps} props - Component props
 * @returns {JSX.Element} Descriptions component
 */
export function DescriptionsComponent({ descriptions, onRegenerate }: DescriptionsProps) {
	const [copied, setCopied] = useState<string | null>(null)

	/**
	 * Copy text to clipboard
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

	return (
		<div className='space-y-6'>
			<div className='flex items-center justify-between'>
				<h3 className='text-xl font-semibold text-slate-900'>Brand Descriptions</h3>
				<button
					onClick={onRegenerate}
					className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium'
				>
					Regenerate
				</button>
			</div>

			<div className='grid md:grid-cols-2 gap-6'>
				{/* Short Description */}
				<div className='bg-white rounded-lg p-6 border border-slate-200'>
					<h4 className='text-sm font-medium text-slate-600 mb-2'>Short Description</h4>
					<p className='text-base text-slate-900 mb-4'>{descriptions.short}</p>
					<button
						onClick={() => handleCopy(descriptions.short, 'short')}
						className={`
							px-3 py-1.5 rounded-md text-sm font-medium transition-colors
							${
								copied === 'short'
									? 'bg-green-600 text-white'
									: 'bg-slate-100 text-slate-700 hover:bg-slate-200'
							}
						`}
					>
						{copied === 'short' ? '✓ Copied' : 'Copy'}
					</button>
				</div>

				{/* Marketing Description */}
				<div className='bg-white rounded-lg p-6 border border-slate-200'>
					<h4 className='text-sm font-medium text-slate-600 mb-2'>Marketing Description</h4>
					<p className='text-base text-slate-900 mb-4'>{descriptions.marketing}</p>
					<button
						onClick={() => handleCopy(descriptions.marketing, 'marketing')}
						className={`
							px-3 py-1.5 rounded-md text-sm font-medium transition-colors
							${
								copied === 'marketing'
									? 'bg-green-600 text-white'
									: 'bg-slate-100 text-slate-700 hover:bg-slate-200'
							}
						`}
					>
						{copied === 'marketing' ? '✓ Copied' : 'Copy'}
					</button>
				</div>

				{/* Technical Description */}
				<div className='bg-white rounded-lg p-6 border border-slate-200'>
					<h4 className='text-sm font-medium text-slate-600 mb-2'>Technical Description</h4>
					<pre className='text-sm text-slate-900 mb-4 whitespace-pre-wrap font-mono'>
						{descriptions.technical}
					</pre>
					<button
						onClick={() => handleCopy(descriptions.technical, 'technical')}
						className={`
							px-3 py-1.5 rounded-md text-sm font-medium transition-colors
							${
								copied === 'technical'
									? 'bg-green-600 text-white'
									: 'bg-slate-100 text-slate-700 hover:bg-slate-200'
							}
						`}
					>
						{copied === 'technical' ? '✓ Copied' : 'Copy'}
					</button>
				</div>

				{/* Recommendations */}
				<div className='bg-white rounded-lg p-6 border border-slate-200'>
					<h4 className='text-sm font-medium text-slate-600 mb-2'>Recommendations</h4>
					<pre className='text-sm text-slate-900 mb-4 whitespace-pre-wrap'>
						{descriptions.recommendations}
					</pre>
					<button
						onClick={() => handleCopy(descriptions.recommendations, 'recommendations')}
						className={`
							px-3 py-1.5 rounded-md text-sm font-medium transition-colors
							${
								copied === 'recommendations'
									? 'bg-green-600 text-white'
									: 'bg-slate-100 text-slate-700 hover:bg-slate-200'
							}
						`}
					>
						{copied === 'recommendations' ? '✓ Copied' : 'Copy'}
					</button>
				</div>
			</div>
		</div>
	)
}

