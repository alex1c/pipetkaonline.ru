/**
 * Image Uploader Component
 * 
 * Handles image file upload with drag & drop support.
 * Supports JPG, PNG, and WebP formats.
 * 
 * @component
 */

'use client'

import { useCallback, useRef, useState } from 'react'

interface ImageUploaderProps {
	/** Callback when image is selected */
	onImageSelect: (file: File) => void
	/** Current preview URL */
	preview?: string | null
	/** Whether image is being processed */
	isProcessing?: boolean
}

/**
 * Image Uploader Component
 * 
 * Provides drag & drop and file selection for image upload.
 * 
 * @param {ImageUploaderProps} props - Component props
 * @returns {JSX.Element} Image uploader component
 */
export function ImageUploader({
	onImageSelect,
	preview,
	isProcessing = false,
}: ImageUploaderProps) {
	const [isDragging, setIsDragging] = useState(false)
	const fileInputRef = useRef<HTMLInputElement>(null)

	/**
	 * Handle file selection
	 */
	const handleFileSelect = useCallback(
		(file: File) => {
			if (file.type.startsWith('image/')) {
				onImageSelect(file)
			}
		},
		[onImageSelect]
	)

	/**
	 * Handle drag over
	 */
	const handleDragOver = useCallback((e: React.DragEvent) => {
		e.preventDefault()
		setIsDragging(true)
	}, [])

	/**
	 * Handle drag leave
	 */
	const handleDragLeave = useCallback((e: React.DragEvent) => {
		e.preventDefault()
		setIsDragging(false)
	}, [])

	/**
	 * Handle drop
	 */
	const handleDrop = useCallback(
		(e: React.DragEvent) => {
			e.preventDefault()
			setIsDragging(false)

			const file = e.dataTransfer.files[0]
			if (file) {
				handleFileSelect(file)
			}
		},
		[handleFileSelect]
	)

	/**
	 * Handle file input change
	 */
	const handleInputChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const file = e.target.files?.[0]
			if (file) {
				handleFileSelect(file)
			}
		},
		[handleFileSelect]
	)

	/**
	 * Trigger file input
	 */
	const handleClick = useCallback(() => {
		fileInputRef.current?.click()
	}, [])

	return (
		<div className='space-y-4'>
			{/* Upload Area */}
			<div
				onDragOver={handleDragOver}
				onDragLeave={handleDragLeave}
				onDrop={handleDrop}
				onClick={handleClick}
				className={`
					relative border-2 border-dashed rounded-xl p-12
					cursor-pointer transition-all duration-200
					${
						isDragging
							? 'border-blue-500 bg-blue-50'
							: 'border-slate-300 hover:border-slate-400 hover:bg-slate-50'
					}
					${isProcessing ? 'opacity-50 pointer-events-none' : ''}
				`}
			>
				<input
					ref={fileInputRef}
					type='file'
					accept='image/jpeg,image/png,image/webp'
					onChange={handleInputChange}
					className='hidden'
					aria-label='Upload image'
				/>

				{preview ? (
					<div className='space-y-4'>
						<img
							src={preview}
							alt='Preview'
							className='max-w-full max-h-64 mx-auto rounded-lg shadow-md'
						/>
						<p className='text-center text-sm text-slate-600'>
							Click or drag to replace image
						</p>
					</div>
				) : (
					<div className='text-center space-y-4'>
						<div className='text-6xl mb-4'>📸</div>
						<p className='text-lg font-medium text-slate-700'>
							Drag & drop image here
						</p>
						<p className='text-sm text-slate-500'>or click to select</p>
						<p className='text-xs text-slate-400'>JPG, PNG, WebP (max 10MB)</p>
					</div>
				)}

				{isProcessing && (
					<div className='absolute inset-0 flex items-center justify-center bg-white/80 rounded-xl'>
						<div className='text-center'>
							<div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-2' />
							<p className='text-sm text-slate-600'>Processing image...</p>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}

