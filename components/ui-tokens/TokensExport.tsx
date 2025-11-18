/**
 * Tokens Export Component
 * 
 * Provides export functionality for UI tokens in multiple formats.
 * Includes tabs for CSS Variables, Tailwind Config, and JSON.
 * 
 * @component
 */

'use client'

import { useState } from 'react'
import type { UITokens } from '@/lib/ui-tokens-utils'
import {
	exportAsCSSVariables,
	exportAsTailwindConfig,
	exportAsJSON,
} from '@/lib/ui-tokens-utils'

interface TokensExportProps {
	/** Generated UI tokens */
	tokens: UITokens
}

/**
 * Export format type
 */
type ExportFormat = 'css' | 'tailwind' | 'json'

/**
 * Tokens Export Component
 * 
 * Provides tabbed interface for exporting tokens in different formats:
 * - CSS Variables
 * - Tailwind Config
 * - JSON (Design Tokens)
 * 
 * Each tab shows formatted code with copy-to-clipboard functionality.
 * 
 * @param {TokensExportProps} props - Component props
 * @returns {JSX.Element} Export component
 */
export function TokensExport({ tokens }: TokensExportProps) {
	const [activeTab, setActiveTab] = useState<ExportFormat>('css')
	const [copied, setCopied] = useState(false)

	/**
	 * Get export content based on active tab
	 */
	const getExportContent = (): string => {
		switch (activeTab) {
			case 'css':
				return exportAsCSSVariables(tokens)
			case 'tailwind':
				return exportAsTailwindConfig(tokens)
			case 'json':
				return exportAsJSON(tokens)
			default:
				return ''
		}
	}

	/**
	 * Copy content to clipboard
	 */
	const handleCopy = async () => {
		const content = getExportContent()
		try {
			await navigator.clipboard.writeText(content)
			setCopied(true)
			setTimeout(() => setCopied(false), 2000)
		} catch (err) {
			console.error('Failed to copy:', err)
		}
	}

	const tabs: { id: ExportFormat; label: string }[] = [
		{ id: 'css', label: 'CSS Variables' },
		{ id: 'tailwind', label: 'Tailwind Config' },
		{ id: 'json', label: 'JSON Tokens' },
	]

	const content = getExportContent()

	return (
		<div className='space-y-4'>
			<h3 className='text-xl font-semibold text-slate-900'>Export</h3>

			{/* Tabs */}
			<div className='flex gap-2 border-b border-slate-200'>
				{tabs.map((tab) => (
					<button
						key={tab.id}
						onClick={() => setActiveTab(tab.id)}
						className={`
							px-4 py-2 font-medium text-sm transition-colors
							${
								activeTab === tab.id
									? 'text-blue-600 border-b-2 border-blue-600'
									: 'text-slate-600 hover:text-slate-900'
							}
						`}
					>
						{tab.label}
					</button>
				))}
			</div>

			{/* Code Block */}
			<div className='relative'>
				<pre className='bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-sm font-mono'>
					<code>{content}</code>
				</pre>

				{/* Copy Button */}
				<button
					onClick={handleCopy}
					className={`
						absolute top-4 right-4 px-3 py-1.5 rounded-md text-sm font-medium
						transition-colors
						${
							copied
								? 'bg-green-600 text-white'
								: 'bg-slate-700 text-slate-100 hover:bg-slate-600'
						}
					`}
				>
					{copied ? '✓ Copied' : 'Copy'}
				</button>
			</div>
		</div>
	)
}

