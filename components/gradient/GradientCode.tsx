'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'

type CodeFormat = 'css' | 'tailwind' | 'string'

interface GradientCodeProps {
	css: string
	fullCss: string
	tailwind: string
}

/**
 * Component for displaying generated CSS code
 * Supports multiple formats: CSS, TailwindCSS, and plain string
 */
export function GradientCode({ css, fullCss, tailwind }: GradientCodeProps) {
	const t = useTranslations('tools.gradientGenerator')
	const [format, setFormat] = useState<CodeFormat>('css')
	const [copied, setCopied] = useState(false)

	const getCode = () => {
		switch (format) {
			case 'css':
				return fullCss
			case 'tailwind':
				return tailwind
			case 'string':
				return css
			default:
				return css
		}
	}

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(getCode())
			setCopied(true)
			setTimeout(() => setCopied(false), 2000)
		} catch (err) {
			console.error('Failed to copy:', err)
		}
	}

	return (
		<div className='bg-white rounded-xl shadow-md p-6 space-y-4'>
			<div className='flex items-center justify-between'>
				<h3 className='text-lg font-semibold text-slate-900'>
					{t('code.title')}
				</h3>
				<button
					type='button'
					onClick={handleCopy}
					className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors font-medium text-sm'
				>
					{copied ? t('code.copied') : t('code.copy')}
				</button>
			</div>

			{/* Format Selector */}
			<div className='flex gap-2'>
				<button
					type='button'
					onClick={() => setFormat('css')}
					className={`
						px-4 py-2 rounded-lg border-2 transition-all font-medium text-sm
						${
							format === 'css'
								? 'border-blue-500 bg-blue-50 text-blue-700'
								: 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
						}
					`}
				>
					CSS
				</button>
				<button
					type='button'
					onClick={() => setFormat('tailwind')}
					className={`
						px-4 py-2 rounded-lg border-2 transition-all font-medium text-sm
						${
							format === 'tailwind'
								? 'border-blue-500 bg-blue-50 text-blue-700'
								: 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
						}
					`}
				>
					TailwindCSS
				</button>
				<button
					type='button'
					onClick={() => setFormat('string')}
					className={`
						px-4 py-2 rounded-lg border-2 transition-all font-medium text-sm
						${
							format === 'string'
								? 'border-blue-500 bg-blue-50 text-blue-700'
								: 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
						}
					`}
				>
					{t('code.string')}
				</button>
			</div>

			{/* Code Display */}
			<pre className='bg-slate-50 border border-slate-200 rounded-lg p-4 overflow-x-auto'>
				<code className='text-sm text-slate-800 font-mono'>{getCode()}</code>
			</pre>
		</div>
	)
}


