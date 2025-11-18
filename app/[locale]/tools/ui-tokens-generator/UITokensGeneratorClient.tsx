/**
 * UI Tokens Generator Client Component
 * 
 * Main client component for the UI Tokens Generator tool.
 * Orchestrates all sub-components and manages the tool's functionality.
 * 
 * @component
 */

'use client'

import { useTranslations } from 'next-intl'
import { useUITokens } from '@/hooks/useUITokens'
import { BaseColorInput } from '@/components/ui-tokens/BaseColorInput'
import { TokensPreview } from '@/components/ui-tokens/TokensPreview'
import { TokensEditor } from '@/components/ui-tokens/TokensEditor'
import { TokensExport } from '@/components/ui-tokens/TokensExport'
import { ServiceSEO } from '@/components/service-seo/ServiceSEO'
import { SimilarTools } from '@/components/similar-tools'

/**
 * UI Tokens Generator Client Component
 * 
 * Main component that brings together all functionality:
 * - Base color input
 * - Token generation
 * - Token preview
 * - Token editor/viewer
 * - Token export
 * 
 * @returns {JSX.Element} Complete UI tokens generator tool
 */
export function UITokensGeneratorClient() {
	const t = useTranslations('tools.uiTokensGenerator')

	const {
		baseColor,
		setBaseColor,
		tokens,
		isValidColor,
		getPrimaryTextColor,
	} = useUITokens('#3B82F6')

	const primaryTextColor = getPrimaryTextColor()

	return (
		<div className='space-y-12'>
			{/* Header */}
			<header className='text-center space-y-4'>
				<h1 className='text-4xl md:text-5xl font-bold text-slate-900'>
					{t('title')}
				</h1>
				<p className='text-lg text-slate-600 max-w-2xl mx-auto'>
					{t('description')}
				</p>
			</header>

			{/* Base Color Input Section */}
			<section className='bg-white rounded-xl shadow-md p-8'>
				<h2 className='text-2xl font-semibold text-slate-900 mb-6'>
					{t('sections.baseColor.title')}
				</h2>
				<p className='text-slate-600 mb-6'>
					{t('sections.baseColor.description')}
				</p>
				<BaseColorInput
					value={baseColor}
					onChange={setBaseColor}
					isValid={isValidColor}
				/>
			</section>

			{/* Tokens Preview Section */}
			{tokens && (
				<section className='bg-white rounded-xl shadow-md p-8'>
					<h2 className='text-2xl font-semibold text-slate-900 mb-6'>
						{t('sections.preview.title')}
					</h2>
					<TokensPreview tokens={tokens} primaryTextColor={primaryTextColor} />
				</section>
			)}

			{/* Tokens Editor Section */}
			{tokens && (
				<section className='bg-white rounded-xl shadow-md p-8'>
					<h2 className='text-2xl font-semibold text-slate-900 mb-6'>
						{t('sections.tokens.title')}
					</h2>
					<TokensEditor tokens={tokens} />
				</section>
			)}

			{/* Export Section */}
			{tokens && (
				<section className='bg-white rounded-xl shadow-md p-8'>
					<TokensExport tokens={tokens} />
				</section>
			)}

			{/* Similar Tools */}
			<SimilarTools currentTool='ui-tokens-generator' />

			{/* SEO Content: Guide, How-To, FAQ */}
			<ServiceSEO namespace='tools.uiTokensGenerator.seo' />
		</div>
	)
}

