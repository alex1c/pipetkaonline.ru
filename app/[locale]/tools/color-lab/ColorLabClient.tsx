'use client'

import { useState, useEffect, useRef } from 'react'
import { useTranslations } from 'next-intl'
import { ImageUploader } from '@/components/color-lab/ImageUploader'
import { ColorPreview } from '@/components/color-lab/ColorPreview'
import { SimilarColors } from '@/components/color-lab/SimilarColors'
import { PaletteGenerator } from '@/components/color-lab/PaletteGenerator'
import { DominantColors } from '@/components/color-lab/DominantColors'
import { ColorLabSEO } from '@/components/color-lab/ColorLabSEO'
import { useColorPicker } from '@/hooks/useColorPicker'
import { SimilarTools } from '@/components/similar-tools'

/**
 * Color Lab client component
 * Main page for color extraction and palette generation
 */
export function ColorLabClient() {
	const t = useTranslations('tools.colorLab')
	const [imageUrl, setImageUrl] = useState<string | null>(null)
	const [error, setError] = useState<string | null>(null)
	const imageRef = useRef<HTMLImageElement>(null)

	const { color, canvasRef, handleMouseMove, handleClick } = useColorPicker()

	/**
	 * Handle image load
	 */
	const handleImageLoad = (url: string) => {
		setImageUrl(url)
		setError(null)
	}

	/**
	 * Handle image load error
	 */
	const handleError = (err: string) => {
		setError(err)
		setImageUrl(null)
	}

	/**
	 * Draw image on canvas when loaded
	 */
	useEffect(() => {
		if (!imageUrl || !imageRef.current || !canvasRef.current) return

		const img = imageRef.current
		const canvas = canvasRef.current
		const ctx = canvas.getContext('2d')
		if (!ctx) return

		img.onload = () => {
			// Set canvas size to match image
			canvas.width = img.naturalWidth
			canvas.height = img.naturalHeight

			// Draw image on canvas
			ctx.drawImage(img, 0, 0)
		}

		img.src = imageUrl
	}, [imageUrl, canvasRef])

	return (
		<div className='space-y-8'>
			{/* Page header */}
			<header className='text-center space-y-4'>
				<h1 className='text-4xl font-bold text-slate-900'>{t('title')}</h1>
				<p className='text-lg text-slate-600 max-w-2xl mx-auto'>
					{t('description')}
				</p>
			</header>

			{/* Error message */}
			{error && (
				<div className='bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg'>
					{error}
				</div>
			)}

			{/* Image upload section */}
			<div className='bg-white rounded-xl shadow-md p-6'>
				<h2 className='text-xl font-semibold text-slate-900 mb-4'>
					{t('upload.title')}
				</h2>
				<ImageUploader onImageLoad={handleImageLoad} onError={handleError} />
			</div>

			{/* Color picker section */}
			{imageUrl && (
				<div className='bg-white rounded-xl shadow-md p-6 space-y-4'>
					<h2 className='text-xl font-semibold text-slate-900'>
						{t('picker.title')}
					</h2>
					<p className='text-sm text-slate-600'>{t('picker.hint')}</p>

					{/* Hidden image for loading */}
					<img ref={imageRef} src={imageUrl} alt='Source' className='hidden' />

					{/* Canvas for color picking */}
					<div className='relative rounded-lg overflow-hidden border-2 border-slate-200'>
						<canvas
							ref={canvasRef}
							onMouseMove={handleMouseMove}
							onClick={handleClick}
							className='w-full h-auto cursor-crosshair max-h-[600px] object-contain'
							style={{
								imageRendering: 'auto',
							}}
						/>

						{/* Current color preview overlay */}
						{color.selectedColor && (
							<div
								className='absolute top-4 right-4 w-16 h-16 rounded-lg border-2 border-white shadow-lg'
								style={{
									backgroundColor: color.hex,
								}}
							/>
						)}
					</div>
				</div>
			)}

			{/* Color preview */}
			{color.selectedColor && (
				<ColorPreview hex={color.hex} rgb={color.rgb} hsl={color.hsl} />
			)}

			{/* Similar colors */}
			{color.selectedColor && (
				<SimilarColors baseColor={color.selectedColor} />
			)}

			{/* Palette generator */}
			{color.selectedColor && (
				<PaletteGenerator baseColor={color.selectedColor} />
			)}

			{/* Dominant colors */}
			<DominantColors imageUrl={imageUrl} />

			{/* Similar Tools */}
			<SimilarTools currentTool='color-lab' />

			{/* SEO Content: Guide, How-To, FAQ */}
			<ColorLabSEO />
		</div>
	)
}

