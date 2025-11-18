'use client'

import { useRef, useState, DragEvent, ChangeEvent } from 'react'
import { useTranslations } from 'next-intl'

interface ImageUploaderProps {
	onImageLoad: (imageUrl: string) => void
	onError?: (error: string) => void
}

/**
 * Image uploader component with drag & drop support
 */
export function ImageUploader({ onImageLoad, onError }: ImageUploaderProps) {
	const t = useTranslations('tools.colorLab')
	const [isDragging, setIsDragging] = useState(false)
	const [preview, setPreview] = useState<string | null>(null)
	const fileInputRef = useRef<HTMLInputElement>(null)

	const acceptedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp']

	/**
	 * Validate and process image file
	 */
	const processFile = (file: File) => {
		if (!acceptedTypes.includes(file.type)) {
			onError?.('Invalid file type. Please upload PNG, JPG, or WEBP image.')
			return
		}

		if (file.size > 10 * 1024 * 1024) {
			onError?.('File size too large. Maximum size is 10MB.')
			return
		}

		const reader = new FileReader()
		reader.onload = (e) => {
			const imageUrl = e.target?.result as string
			setPreview(imageUrl)
			onImageLoad(imageUrl)
		}
		reader.onerror = () => {
			onError?.('Failed to read image file.')
		}
		reader.readAsDataURL(file)
	}

	/**
	 * Handle drag events
	 */
	const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault()
		setIsDragging(true)
	}

	const handleDragLeave = () => {
		setIsDragging(false)
	}

	const handleDrop = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault()
		setIsDragging(false)

		const file = e.dataTransfer.files[0]
		if (file) {
			processFile(file)
		}
	}

	/**
	 * Handle file input change
	 */
	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (file) {
			processFile(file)
		}
	}

	/**
	 * Trigger file input
	 */
	const handleClick = () => {
		fileInputRef.current?.click()
	}

	return (
		<div className='space-y-4'>
			{/* Upload area */}
			<div
				onDragOver={handleDragOver}
				onDragLeave={handleDragLeave}
				onDrop={handleDrop}
				onClick={handleClick}
				className={`
					relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer
					transition-all duration-200
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
					accept='image/png,image/jpeg,image/jpg,image/webp'
					onChange={handleFileChange}
					className='hidden'
				/>

				<div className='space-y-2'>
					<div className='text-4xl mb-2'>📸</div>
					<p className='text-slate-700 font-medium'>
						{isDragging ? 'Drop image here' : t('upload.dragDrop')}
					</p>
					<p className='text-sm text-slate-500'>
						{t('upload.formats')}
					</p>
				</div>
			</div>

			{/* Preview */}
			{preview && (
				<div className='relative rounded-lg overflow-hidden border border-slate-200'>
					<img
						src={preview}
						alt='Preview'
						className='w-full h-auto max-h-96 object-contain'
					/>
				</div>
			)}
		</div>
	)
}

