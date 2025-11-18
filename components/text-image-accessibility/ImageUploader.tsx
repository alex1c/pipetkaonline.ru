/**
 * Image Uploader Component
 * 
 * Handles image upload via drag & drop or file selection.
 * 
 * @component
 */

'use client'

import { useState, useRef, DragEvent } from 'react'

interface ImageUploaderProps {
	/** Callback when image is uploaded */
	onImageUpload: (file: File) => void
	/** Current image URL */
	imageUrl: string | null
}

/**
 * Image Uploader Component
 * 
 * @param {ImageUploaderProps} props - Component props
 * @returns {JSX.Element} Image uploader component
 */
export function ImageUploader({ onImageUpload, imageUrl }: ImageUploaderProps) {
	const [isDragging, setIsDragging] = useState(false)
	const fileInputRef = useRef<HTMLInputElement>(null)

	/**
	 * Handle file selection
	 */
	const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (file && file.type.startsWith('image/')) {
			onImageUpload(file)
		}
	}

	/**
	 * Handle drag over
	 */
	const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault()
		setIsDragging(true)
	}

	/**
	 * Handle drag leave
	 */
	const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault()
		setIsDragging(false)
	}

	/**
	 * Handle drop
	 */
	const handleDrop = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault()
		setIsDragging(false)

		const file = e.dataTransfer.files?.[0]
		if (file && file.type.startsWith('image/')) {
			onImageUpload(file)
		}
	}

	return (
		<div className='space-y-4'>
			<label className='block text-sm font-medium text-slate-700'>Upload Image</label>

			{/* Drag & Drop Area */}
			<div
				onDragOver={handleDragOver}
				onDragLeave={handleDragLeave}
				onDrop={handleDrop}
				onClick={() => fileInputRef.current?.click()}
				className={`
					border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
					${
						isDragging
							? 'border-blue-500 bg-blue-50'
							: 'border-slate-300 hover:border-slate-400 bg-slate-50'
					}
				`}
			>
				<input
					ref={fileInputRef}
					type='file'
					accept='image/png,image/jpeg,image/webp'
					onChange={handleFileSelect}
					className='hidden'
				/>

				{imageUrl ? (
					<div className='space-y-2'>
						<img
							src={imageUrl}
							alt='Preview'
							className='max-h-64 mx-auto rounded-lg shadow-md'
						/>
						<p className='text-sm text-slate-600'>Click to change image</p>
					</div>
				) : (
					<div className='space-y-2'>
						<svg
							className='mx-auto h-12 w-12 text-slate-400'
							stroke='currentColor'
							fill='none'
							viewBox='0 0 48 48'
						>
							<path
								d='M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02'
								strokeWidth={2}
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
						</svg>
						<p className='text-sm text-slate-600'>
							Drag & drop an image here, or click to select
						</p>
						<p className='text-xs text-slate-500'>PNG, JPG, or WebP</p>
					</div>
				)}
			</div>
		</div>
	)
}

