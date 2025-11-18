/**
 * Descriptions Component
 * 
 * Displays color descriptions: short, medium, and long.
 * Allows custom description input and tone selection.
 * 
 * @component
 */

'use client'

import { useState } from 'react'
import type { ColorDescription } from '@/hooks/useColorNameFinder'

interface DescriptionsProps {
	/** Color descriptions */
	descriptions: ColorDescription
	/** Custom description */
	customDescription: string
	/** Description tone */
	descriptionTone: 'neutral' | 'marketing' | 'artistic'
	/** Callback when custom description changes */
	onCustomDescriptionChange: (text: string) => void
	/** Callback when tone changes */
	onToneChange: (tone: 'neutral' | 'marketing' | 'artistic') => void
	/** Callback to regenerate descriptions */
	onRegenerate: () => void
}

/**
 * Descriptions Component
 * 
 * @param {DescriptionsProps} props - Component props
 * @returns {JSX.Element} Descriptions component
 */
export function Descriptions({
	descriptions,
	customDescription,
	descriptionTone,
	onCustomDescriptionChange,
	onToneChange,
	onRegenerate,
}: DescriptionsProps) {
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
				<h3 className='text-xl font-semibold text-slate-900'>Color Descriptions</h3>
				<button
					onClick={onRegenerate}
					className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium'
				>
					Regenerate
				</button>
			</div>

			{/* Tone Selector */}
			<div className='flex gap-2'>
				{(['neutral', 'marketing', 'artistic'] as const).map((tone) => (
					<button
						key={tone}
						onClick={() => onToneChange(tone)}
						className={`
							px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize
							${
								descriptionTone === tone
									? 'bg-blue-600 text-white'
									: 'bg-slate-100 text-slate-700 hover:bg-slate-200'
							}
						`}
					>
						{tone}
					</button>
				))}
			</div>

			{/* Description Cards */}
			<div className='grid md:grid-cols-3 gap-4'>
				{/* Short Description */}
				<div className='bg-white rounded-lg p-6 border border-slate-200'>
					<h4 className='text-sm font-medium text-slate-600 mb-2'>Short</h4>
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

				{/* Medium Description */}
				<div className='bg-white rounded-lg p-6 border border-slate-200'>
					<h4 className='text-sm font-medium text-slate-600 mb-2'>Medium</h4>
					<p className='text-base text-slate-900 mb-4'>{descriptions.medium}</p>
					<button
						onClick={() => handleCopy(descriptions.medium, 'medium')}
						className={`
							px-3 py-1.5 rounded-md text-sm font-medium transition-colors
							${
								copied === 'medium'
									? 'bg-green-600 text-white'
									: 'bg-slate-100 text-slate-700 hover:bg-slate-200'
							}
						`}
					>
						{copied === 'medium' ? '✓ Copied' : 'Copy'}
					</button>
				</div>

				{/* Long Description */}
				<div className='bg-white rounded-lg p-6 border border-slate-200'>
					<h4 className='text-sm font-medium text-slate-600 mb-2'>Long</h4>
					{descriptionTone === 'artistic' ? (
						<textarea
							value={customDescription || descriptions.long}
							onChange={(e) => onCustomDescriptionChange(e.target.value)}
							placeholder={descriptions.long}
							className='w-full h-32 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-slate-900 mb-4'
						/>
					) : (
						<p className='text-base text-slate-900 mb-4'>{descriptions.long}</p>
					)}
					<button
						onClick={() =>
							handleCopy(
								descriptionTone === 'artistic' ? customDescription || descriptions.long : descriptions.long,
								'long'
							)
						}
						className={`
							px-3 py-1.5 rounded-md text-sm font-medium transition-colors
							${
								copied === 'long'
									? 'bg-green-600 text-white'
									: 'bg-slate-100 text-slate-700 hover:bg-slate-200'
							}
						`}
					>
						{copied === 'long' ? '✓ Copied' : 'Copy'}
					</button>
				</div>
			</div>
		</div>
	)
}

