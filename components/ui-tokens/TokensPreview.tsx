/**
 * Tokens Preview Component
 * 
 * Displays UI tokens in a visual preview with sample components.
 * Shows how tokens look in real UI elements.
 * 
 * @component
 */

'use client'

import type { UITokens } from '@/lib/ui-tokens-utils'

interface TokensPreviewProps {
	/** Generated UI tokens */
	tokens: UITokens
	/** Text color for primary elements */
	primaryTextColor: string
}

/**
 * Tokens Preview Component
 * 
 * Renders sample UI components using the generated tokens:
 * - Button (primary, hover, active states)
 * - Card (surface, border)
 * - Text (foreground colors)
 * - Background (bg, bg-muted)
 * 
 * @param {TokensPreviewProps} props - Component props
 * @returns {JSX.Element} Preview component
 */
export function TokensPreview({ tokens, primaryTextColor }: TokensPreviewProps) {
	return (
		<div className='space-y-6'>
			<h3 className='text-xl font-semibold text-slate-900'>Preview</h3>

			{/* Primary Button */}
			<div className='space-y-2'>
				<p className='text-sm font-medium text-slate-600'>Primary Button</p>
				<div className='flex gap-3 flex-wrap'>
					<button
						className='px-6 py-3 rounded-lg font-medium transition-colors'
						style={{
							backgroundColor: tokens.primary.base,
							color: primaryTextColor,
						}}
					>
						Primary
					</button>
					<button
						className='px-6 py-3 rounded-lg font-medium transition-colors'
						style={{
							backgroundColor: tokens.primary.hover,
							color: primaryTextColor,
						}}
					>
						Hover
					</button>
					<button
						className='px-6 py-3 rounded-lg font-medium transition-colors'
						style={{
							backgroundColor: tokens.primary.active,
							color: primaryTextColor,
						}}
					>
						Active
					</button>
					<button
						className='px-6 py-3 rounded-lg font-medium transition-colors border-2'
						style={{
							backgroundColor: tokens.primary.muted,
							color: tokens.primary.base,
							borderColor: tokens.primary.base,
						}}
					>
						Muted
					</button>
				</div>
			</div>

			{/* Card */}
			<div className='space-y-2'>
				<p className='text-sm font-medium text-slate-600'>Card</p>
				<div
					className='p-6 rounded-lg border-2 transition-colors'
					style={{
						backgroundColor: tokens.background.surface,
						borderColor: tokens.background.border,
					}}
				>
					<h4 className='text-lg font-semibold mb-2' style={{ color: tokens.primary.base }}>
						Card Title
					</h4>
					<p className='text-sm text-slate-600'>
						This card demonstrates surface and border colors from the generated tokens.
					</p>
				</div>
			</div>

			{/* Semantic Colors */}
			<div className='space-y-2'>
				<p className='text-sm font-medium text-slate-600'>Semantic Colors</p>
				<div className='flex gap-3 flex-wrap'>
					<div
						className='px-4 py-2 rounded-lg text-white font-medium'
						style={{ backgroundColor: tokens.semantic.success }}
					>
						Success
					</div>
					<div
						className='px-4 py-2 rounded-lg text-white font-medium'
						style={{ backgroundColor: tokens.semantic.warning }}
					>
						Warning
					</div>
					<div
						className='px-4 py-2 rounded-lg text-white font-medium'
						style={{ backgroundColor: tokens.semantic.danger }}
					>
						Danger
					</div>
				</div>
			</div>

			{/* Background Colors */}
			<div className='space-y-2'>
				<p className='text-sm font-medium text-slate-600'>Backgrounds</p>
				<div className='grid grid-cols-2 gap-3'>
					<div
						className='p-4 rounded-lg border-2'
						style={{
							backgroundColor: tokens.background.bg,
							borderColor: tokens.background.border,
						}}
					>
						<p className='text-sm font-medium'>Background</p>
					</div>
					<div
						className='p-4 rounded-lg border-2'
						style={{
							backgroundColor: tokens.background.bgMuted,
							borderColor: tokens.background.border,
						}}
					>
						<p className='text-sm font-medium'>Background Muted</p>
					</div>
				</div>
			</div>
		</div>
	)
}

