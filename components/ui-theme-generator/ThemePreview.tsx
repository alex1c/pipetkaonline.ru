/**
 * Theme Preview Component
 * 
 * Displays UI theme preview with sample components:
 * buttons, text blocks, card, form, navigation panel.
 * 
 * @component
 */

'use client'

import type { UIThemeTokens } from '@/lib/theme-generator/semanticTokens'

interface ThemePreviewProps {
	/** UI theme tokens */
	tokens: UIThemeTokens
}

/**
 * Theme Preview Component
 * 
 * @param {ThemePreviewProps} props - Component props
 * @returns {JSX.Element} Theme preview component
 */
export function ThemePreview({ tokens }: ThemePreviewProps) {
	return (
		<div className='space-y-6'>
			<h3 className='text-xl font-semibold text-slate-900'>Theme Preview</h3>

			{/* Preview Container */}
			<div
				className='rounded-xl p-8 border-2 border-slate-200'
				style={{ backgroundColor: tokens.neutral.background }}
			>
				{/* Navigation Bar */}
				<nav
					className='mb-6 p-4 rounded-lg flex items-center justify-between'
					style={{ backgroundColor: tokens.neutral.card }}
				>
					<div className='flex items-center gap-4'>
						<div
							className='w-8 h-8 rounded'
							style={{ backgroundColor: tokens.primary.base }}
						/>
						<span
							className='font-semibold'
							style={{ color: tokens.neutral.foreground }}
						>
							Brand
						</span>
					</div>
					<div className='flex gap-2'>
						<button
							className='px-3 py-1.5 rounded text-sm font-medium transition-colors'
							style={{
								backgroundColor: tokens.secondary.base,
								color: tokens.secondary.foreground,
							}}
							onMouseEnter={(e) => {
								e.currentTarget.style.backgroundColor = tokens.secondary.hover
							}}
							onMouseLeave={(e) => {
								e.currentTarget.style.backgroundColor = tokens.secondary.base
							}}
						>
							Menu
						</button>
					</div>
				</nav>

				{/* Card */}
				<div
					className='mb-6 p-6 rounded-lg border'
					style={{
						backgroundColor: tokens.neutral.card,
						borderColor: tokens.borders.base,
					}}
				>
					<h4
						className='text-lg font-semibold mb-2'
						style={{ color: tokens.neutral.foreground }}
					>
						Card Title
					</h4>
					<p
						className='text-sm mb-4'
						style={{ color: tokens.neutral.foreground }}
					>
						This is a sample card component demonstrating the theme colors.
					</p>

					{/* Buttons */}
					<div className='flex gap-3 flex-wrap'>
						<button
							className='px-4 py-2 rounded-lg font-medium transition-colors'
							style={{
								backgroundColor: tokens.primary.base,
								color: tokens.primary.foreground,
							}}
							onMouseEnter={(e) => {
								e.currentTarget.style.backgroundColor = tokens.primary.hover
							}}
							onMouseLeave={(e) => {
								e.currentTarget.style.backgroundColor = tokens.primary.base
							}}
							onMouseDown={(e) => {
								e.currentTarget.style.backgroundColor = tokens.primary.active
							}}
							onMouseUp={(e) => {
								e.currentTarget.style.backgroundColor = tokens.primary.hover
							}}
						>
							Primary Button
						</button>
						<button
							className='px-4 py-2 rounded-lg font-medium transition-colors border'
							style={{
								backgroundColor: 'transparent',
								color: tokens.secondary.base,
								borderColor: tokens.borders.base,
							}}
						>
							Secondary Button
						</button>
					</div>
				</div>

				{/* Form */}
				<div
					className='mb-6 p-6 rounded-lg border'
					style={{
						backgroundColor: tokens.neutral.card,
						borderColor: tokens.borders.base,
					}}
				>
					<h4
						className='text-lg font-semibold mb-4'
						style={{ color: tokens.neutral.foreground }}
					>
						Form Example
					</h4>
					<div className='space-y-4'>
						<div>
							<label
								className='block text-sm font-medium mb-1'
								style={{ color: tokens.neutral.foreground }}
							>
								Email
							</label>
							<input
								type='email'
								placeholder='Enter your email'
								className='w-full px-4 py-2 rounded-lg border focus:ring-2 focus:outline-none'
								style={{
									backgroundColor: tokens.neutral.background,
									borderColor: tokens.borders.base,
									color: tokens.neutral.foreground,
									'--tw-ring-color': tokens.borders.ring,
								} as React.CSSProperties}
							/>
						</div>
						<div>
							<label
								className='block text-sm font-medium mb-1'
								style={{ color: tokens.neutral.foreground }}
							>
								Password
							</label>
							<input
								type='password'
								placeholder='Enter your password'
								className='w-full px-4 py-2 rounded-lg border focus:ring-2 focus:outline-none'
								style={{
									backgroundColor: tokens.neutral.background,
									borderColor: tokens.borders.base,
									color: tokens.neutral.foreground,
									'--tw-ring-color': tokens.borders.ring,
								} as React.CSSProperties}
							/>
						</div>
					</div>
				</div>

				{/* Status Colors */}
				<div className='flex gap-3 flex-wrap'>
					<div
						className='px-4 py-2 rounded-lg text-sm font-medium'
						style={{
							backgroundColor: tokens.status.success,
							color: '#FFFFFF',
						}}
					>
						Success
					</div>
					<div
						className='px-4 py-2 rounded-lg text-sm font-medium'
						style={{
							backgroundColor: tokens.status.warning,
							color: '#000000',
						}}
					>
						Warning
					</div>
					<div
						className='px-4 py-2 rounded-lg text-sm font-medium'
						style={{
							backgroundColor: tokens.status.error,
							color: '#FFFFFF',
						}}
					>
						Error
					</div>
					<div
						className='px-4 py-2 rounded-lg text-sm font-medium'
						style={{
							backgroundColor: tokens.status.info,
							color: '#FFFFFF',
						}}
					>
						Info
					</div>
				</div>
			</div>
		</div>
	)
}

