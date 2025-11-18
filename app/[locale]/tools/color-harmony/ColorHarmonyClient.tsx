'use client'

import { useState, useCallback } from 'react'
import { useTranslations } from 'next-intl'
import { BaseColorInput } from '@/components/color-harmony/BaseColorInput'
import { HarmonyModeSwitcher } from '@/components/color-harmony/HarmonyModeSwitcher'
import { HarmonyResult } from '@/components/color-harmony/HarmonyResult'
import { ColorRelationDiagram } from '@/components/color-harmony/ColorRelationDiagram'
import { useColorHarmony } from '@/hooks/useColorHarmony'
import { rgbToHex } from '@/lib/color-utils'
import { ServiceSEO } from '@/components/service-seo/ServiceSEO'
import { SimilarTools } from '@/components/similar-tools'

/**
 * Client component for Color Harmony Finder tool
 * Handles all interactive functionality
 */
export function ColorHarmonyClient() {
	const t = useTranslations('tools.colorHarmony')
	const [baseColor, setBaseColor] = useState('#3498db')

	const { mode, setMode, harmony, baseHsl } = useColorHarmony(baseColor)

	/**
	 * Generate random color
	 */
	const handleRandomColor = useCallback(() => {
		const r = Math.floor(Math.random() * 256)
		const g = Math.floor(Math.random() * 256)
		const b = Math.floor(Math.random() * 256)
		const hex = rgbToHex(r, g, b)
		setBaseColor(hex)
	}, [])

	return (
		<div className='space-y-8'>
			<header className='text-center space-y-4'>
				<h1 className='text-4xl font-bold text-slate-900'>{t('title')}</h1>
				<p className='text-lg text-slate-600 max-w-2xl mx-auto'>
					{t('description')}
				</p>
			</header>

			{/* Base Color Input */}
			<div className='bg-white rounded-xl shadow-md p-6'>
				<BaseColorInput
					value={baseColor}
					onChange={setBaseColor}
					onRandomClick={handleRandomColor}
					error={null}
				/>
			</div>

			{/* Mode Switcher */}
			<div className='bg-white rounded-xl shadow-md p-6'>
				<HarmonyModeSwitcher mode={mode} onModeChange={setMode} />
			</div>

			{/* Harmony Result */}
			{harmony.colors.length > 0 && (
				<div className='bg-white rounded-xl shadow-md p-6'>
					<HarmonyResult colors={harmony.colors} description={harmony.description} />
				</div>
			)}

			{/* Color Relation Diagram */}
			{harmony.colors.length > 0 && (
				<ColorRelationDiagram baseColor={baseHsl} colors={harmony.colors} />
			)}

			{/* Similar Tools */}
			<SimilarTools currentTool='color-harmony' />

			{/* SEO Content: Guide, How-To, FAQ */}
			<ServiceSEO namespace='tools.colorHarmony.seo' />
		</div>
	)
}


