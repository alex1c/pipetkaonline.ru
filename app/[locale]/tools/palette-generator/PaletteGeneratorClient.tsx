'use client'

import { useState, useCallback } from 'react'
import { useTranslations } from 'next-intl'
import { BaseColorInput } from '@/components/palette-generator/BaseColorInput'
import { PaletteModeSwitcher } from '@/components/palette-generator/PaletteModeSwitcher'
import { PaletteResult } from '@/components/palette-generator/PaletteResult'
import { usePaletteGenerator } from '@/hooks/usePaletteGenerator'
import { rgbToHex } from '@/lib/color-utils'
import { ServiceSEO } from '@/components/service-seo/ServiceSEO'

/**
 * Client component for Palette Generator tool
 * Handles all interactive functionality
 */
export function PaletteGeneratorClient() {
	const t = useTranslations('tools.paletteGenerator')
	const [baseColor, setBaseColor] = useState('#3498db')

	const { mode, setMode, palette } = usePaletteGenerator(baseColor)

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
				<PaletteModeSwitcher mode={mode} onModeChange={setMode} />
			</div>

			{/* Palette Result */}
			{palette.length > 0 && (
				<div className='bg-white rounded-xl shadow-md p-6'>
					<PaletteResult palette={palette} />
				</div>
			)}

			{/* SEO Content: Guide, How-To, FAQ */}
			<ServiceSEO namespace='tools.paletteGenerator.seo' />
		</div>
	)
}


