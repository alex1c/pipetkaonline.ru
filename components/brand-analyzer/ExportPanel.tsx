/**
 * Export Panel Component
 * 
 * Provides export functionality: JSON and CSS variables.
 * 
 * @component
 */

'use client'

import { useState } from 'react'

interface ExportPanelProps {
	/** Export JSON function */
	exportJSON: () => string
	/** Export CSS function */
	exportCSS: () => string
}

/**
 * Export Panel Component
 * 
 * @param {ExportPanelProps} props - Component props
 * @returns {JSX.Element} Export panel component
 */
export function ExportPanel({ exportJSON, exportCSS }: ExportPanelProps) {
	const [activeTab, setActiveTab] = useState<'json' | 'css'>('json')
	const [copied, setCopied] = useState(false)

	/**
	 * Get export content
	 */
	const getContent = (): string => {
		return activeTab === 'json' ? exportJSON() : exportCSS()
	}

	/**
	 * Copy to clipboard
	 */
	const handleCopy = async () => {
		const content = getContent()
		try {
			await navigator.clipboard.writeText(content)
			setCopied(true)
			setTimeout(() => setCopied(false), 2000)
		} catch (err) {
			console.error('Failed to copy:', err)
		}
	}

	/**
	 * Download file
	 */
	const handleDownload = () => {
		const content = getContent()
		const blob = new Blob([content], { type: activeTab === 'json' ? 'application/json' : 'text/css' })
		const url = URL.createObjectURL(blob)
		const a = document.createElement('a')
		a.href = url
		a.download = activeTab === 'json' ? 'brandColors.json' : 'brandColors.css'
		a.click()
		URL.revokeObjectURL(url)
	}

	const content = getContent()

	return (
		<div className='space-y-4'>
			<h3 className='text-xl font-semibold text-slate-900'>Export</h3>

			{/* Tabs */}
			<div className='flex gap-2 border-b border-slate-200'>
				<button
					onClick={() => setActiveTab('json')}
					className={`
						px-4 py-2 font-medium text-sm transition-colors
						${
							activeTab === 'json'
								? 'text-blue-600 border-b-2 border-blue-600'
								: 'text-slate-600 hover:text-slate-900'
						}
					`}
				>
					JSON
				</button>
				<button
					onClick={() => setActiveTab('css')}
					className={`
						px-4 py-2 font-medium text-sm transition-colors
						${
							activeTab === 'css'
								? 'text-blue-600 border-b-2 border-blue-600'
								: 'text-slate-600 hover:text-slate-900'
						}
					`}
				>
					CSS Variables
				</button>
			</div>

			{/* Code Block */}
			<div className='relative'>
				<pre className='bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-sm font-mono'>
					<code>{content}</code>
				</pre>

				{/* Actions */}
				<div className='absolute top-4 right-4 flex gap-2'>
					<button
						onClick={handleCopy}
						className={`
							px-3 py-1.5 rounded-md text-sm font-medium transition-colors
							${
								copied
									? 'bg-green-600 text-white'
									: 'bg-slate-700 text-slate-100 hover:bg-slate-600'
							}
						`}
					>
						{copied ? '✓ Copied' : 'Copy'}
					</button>
					<button
						onClick={handleDownload}
						className='px-3 py-1.5 rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors'
					>
						Download
					</button>
				</div>
			</div>
		</div>
	)
}

