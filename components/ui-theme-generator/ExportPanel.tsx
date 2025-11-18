/**
 * Export Panel Component
 * 
 * Provides export functionality: CSS Variables, Tailwind config, JSON tokens, Figma tokens.
 * 
 * @component
 */

'use client'

import { useState } from 'react'

interface ExportPanelProps {
	/** Export CSS function */
	exportCSS: () => string
	/** Export Tailwind function */
	exportTailwind: () => string
	/** Export JSON function */
	exportJSON: () => string
	/** Export Figma function */
	exportFigma: () => string
}

/**
 * Export Panel Component
 * 
 * @param {ExportPanelProps} props - Component props
 * @returns {JSX.Element} Export panel component
 */
export function ExportPanel({
	exportCSS,
	exportTailwind,
	exportJSON,
	exportFigma,
}: ExportPanelProps) {
	const [activeTab, setActiveTab] = useState<'css' | 'tailwind' | 'json' | 'figma'>('css')
	const [copied, setCopied] = useState(false)

	/**
	 * Get export content
	 */
	const getContent = (): string => {
		switch (activeTab) {
			case 'css':
				return exportCSS()
			case 'tailwind':
				return exportTailwind()
			case 'json':
				return exportJSON()
			case 'figma':
				return exportFigma()
			default:
				return ''
		}
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
		const extensions = {
			css: 'css',
			tailwind: 'js',
			json: 'json',
			figma: 'json',
		}
		const ext = extensions[activeTab]
		const blob = new Blob([content], {
			type: activeTab === 'css' ? 'text/css' : activeTab === 'json' || activeTab === 'figma' ? 'application/json' : 'text/javascript',
		})
		const url = URL.createObjectURL(blob)
		const a = document.createElement('a')
		a.href = url
		a.download = `theme.${ext}`
		a.click()
		URL.revokeObjectURL(url)
	}

	/**
	 * Export all formats
	 */
	const handleExportAll = () => {
		const formats = [
			{ name: 'CSS Variables', content: exportCSS(), ext: 'css' },
			{ name: 'Tailwind Config', content: exportTailwind(), ext: 'js' },
			{ name: 'JSON Tokens', content: exportJSON(), ext: 'json' },
			{ name: 'Figma Tokens', content: exportFigma(), ext: 'json' },
		]

		formats.forEach((format) => {
			const blob = new Blob([format.content], {
				type: format.ext === 'css' ? 'text/css' : format.ext === 'json' ? 'application/json' : 'text/javascript',
			})
			const url = URL.createObjectURL(blob)
			const a = document.createElement('a')
			a.href = url
			a.download = `theme-${format.name.toLowerCase().replace(/\s+/g, '-')}.${format.ext}`
			a.click()
			URL.revokeObjectURL(url)
		})
	}

	const content = getContent()

	return (
		<div className='space-y-4'>
			<div className='flex items-center justify-between'>
				<h3 className='text-xl font-semibold text-slate-900'>Export</h3>
				<button
					onClick={handleExportAll}
					className='px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium'
				>
					Export All
				</button>
			</div>

			{/* Tabs */}
			<div className='flex gap-2 border-b border-slate-200'>
				{(['css', 'tailwind', 'json', 'figma'] as const).map((tab) => (
					<button
						key={tab}
						onClick={() => setActiveTab(tab)}
						className={`
							px-4 py-2 font-medium text-sm transition-colors capitalize
							${
								activeTab === tab
									? 'text-blue-600 border-b-2 border-blue-600'
									: 'text-slate-600 hover:text-slate-900'
							}
						`}
					>
						{tab === 'css' ? 'CSS Variables' : tab === 'tailwind' ? 'Tailwind Config' : tab === 'json' ? 'JSON Tokens' : 'Figma Tokens'}
					</button>
				))}
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

