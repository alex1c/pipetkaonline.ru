/**
 * Tokens Editor Component
 * 
 * Displays all generated tokens in an editable/viewable format.
 * Shows color scales and individual token values.
 * 
 * @component
 */

'use client'

import type { UITokens } from '@/lib/ui-tokens-utils'

interface TokensEditorProps {
	/** Generated UI tokens */
	tokens: UITokens
}

/**
 * Tokens Editor Component
 * 
 * Displays all generated tokens organized by category:
 * - Primary tokens and scale
 * - Background tokens
 * - Semantic tokens
 * 
 * Each token shows its name, value, and color preview.
 * 
 * @param {TokensEditorProps} props - Component props
 * @returns {JSX.Element} Tokens editor component
 */
export function TokensEditor({ tokens }: TokensEditorProps) {
	/**
	 * Color scale shades in order
	 */
	const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]

	return (
		<div className='space-y-8'>
			{/* Primary Tokens */}
			<div>
				<h3 className='text-xl font-semibold text-slate-900 mb-4'>Primary Tokens</h3>
				<div className='grid md:grid-cols-2 gap-4 mb-6'>
					<TokenItem name='--color-primary' value={tokens.primary.base} />
					<TokenItem name='--color-primary-hover' value={tokens.primary.hover} />
					<TokenItem name='--color-primary-active' value={tokens.primary.active} />
					<TokenItem name='--color-primary-muted' value={tokens.primary.muted} />
					<TokenItem name='--color-primary-foreground' value={tokens.primary.foreground} />
				</div>

				{/* Primary Scale */}
				<div>
					<h4 className='text-lg font-medium text-slate-700 mb-3'>Primary Scale</h4>
					<div className='grid grid-cols-5 md:grid-cols-10 gap-2'>
						{shades.map((shade) => {
							const color = tokens.primary.scale[shade.toString()]
							return (
								<div key={shade} className='space-y-1'>
									<div
										className='w-full h-16 rounded-lg border-2 border-slate-200'
										style={{ backgroundColor: color }}
									/>
									<div className='text-center'>
										<p className='text-xs font-medium text-slate-600'>{shade}</p>
										<p className='text-xs font-mono text-slate-500'>{color}</p>
									</div>
								</div>
							)
						})}
					</div>
				</div>
			</div>

			{/* Background Tokens */}
			<div>
				<h3 className='text-xl font-semibold text-slate-900 mb-4'>Background Tokens</h3>
				<div className='grid md:grid-cols-2 gap-4'>
					<TokenItem name='--color-bg' value={tokens.background.bg} />
					<TokenItem name='--color-bg-muted' value={tokens.background.bgMuted} />
					<TokenItem name='--color-surface' value={tokens.background.surface} />
					<TokenItem name='--color-surface-hover' value={tokens.background.surfaceHover} />
					<TokenItem name='--color-border' value={tokens.background.border} />
				</div>
			</div>

			{/* Semantic Tokens */}
			<div>
				<h3 className='text-xl font-semibold text-slate-900 mb-4'>Semantic Tokens</h3>
				<div className='grid md:grid-cols-3 gap-4'>
					<TokenItem name='--color-success' value={tokens.semantic.success} />
					<TokenItem name='--color-warning' value={tokens.semantic.warning} />
					<TokenItem name='--color-danger' value={tokens.semantic.danger} />
				</div>
			</div>
		</div>
	)
}

/**
 * Token Item Component
 * 
 * Displays a single token with name, value, and color preview.
 * 
 * @param {Object} props - Component props
 * @param {string} props.name - Token name (CSS variable name)
 * @param {string} props.value - Token value (HEX color)
 * @returns {JSX.Element} Token item component
 */
function TokenItem({ name, value }: { name: string; value: string }) {
	return (
		<div className='flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200'>
			{/* Color Preview */}
			<div
				className='w-12 h-12 rounded-lg border-2 border-slate-300 flex-shrink-0'
				style={{ backgroundColor: value }}
			/>

			{/* Token Info */}
			<div className='flex-1 min-w-0'>
				<p className='text-sm font-mono text-slate-700 truncate'>{name}</p>
				<p className='text-xs font-mono text-slate-500'>{value}</p>
			</div>
		</div>
	)
}

