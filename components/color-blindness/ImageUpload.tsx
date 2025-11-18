'use client'

import { useState, useRef, DragEvent, ChangeEvent } from 'react'
import { useTranslations } from 'next-intl'

interface ImageUploadProps {
	onImageLoad: (file: File) => void
	imageUrl: string | null
}

/**
 * Component for image upload with drag & drop support
 * Supports JPG, PNG, WEBP formats
 */
export function ImageUpload({ onImageLoad, imageUrl }: ImageUploadProps) {
	const t = useTranslations('tools.colorBlindnessSimulator')
	const fileInputRef = useRef<HTMLInputElement>(null)
	const [isDragging, setIsDragging] = useState(false)

	const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault()
		setIsDragging(true)
	}

	const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault()
		setIsDragging(false)
	}

	const handleDrop = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault()
		setIsDragging(false)

		const file = e.dataTransfer.files[0]
		if (file) {
			handleFile(file)
		}
	}

	const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (file) {
			handleFile(file)
		}
		// Reset input value to allow selecting the same file again
		if (e.target) {
			e.target.value = ''
		}
	}

	const handleFile = (file: File) => {
		if (!file.type.match(/^image\/(jpeg|jpg|png|webp)$/i)) {
			alert(t('upload.error'))
			return
		}
		onImageLoad(file)
	}

	const handleClick = (e?: React.MouseEvent) => {
		if (e) {
			e.preventDefault()
			e.stopPropagation()
		}
		if (fileInputRef.current) {
			fileInputRef.current.click()
		}
	}

	return (
		<div className='bg-white rounded-xl shadow-md p-6'>
			<h3 className='text-lg font-semibold text-slate-900 mb-4'>
				{t('upload.title')}
			</h3>

			{!imageUrl ? (
				<>
					<div
						onDragOver={handleDragOver}
						onDragLeave={handleDragLeave}
						onDrop={handleDrop}
						onClick={(e) => {
							// Only trigger if click is not on the button
							if ((e.target as HTMLElement).tagName !== 'BUTTON') {
								handleClick(e)
							}
						}}
						className={`
							border-2 border-dashed rounded-lg p-12 text-center cursor-pointer
							transition-all
							${
								isDragging
									? 'border-blue-500 bg-blue-50'
									: 'border-slate-300 hover:border-slate-400 hover:bg-slate-50'
							}
						`}
					>
						<div className='space-y-4'>
							<div className='text-4xl'>📷</div>
							<div>
								<p className='text-lg font-medium text-slate-700'>
									{t('upload.dragDrop')}
								</p>
								<p className='text-sm text-slate-500 mt-2'>
									{t('upload.or')}
								</p>
							<label
								htmlFor='file-upload-input'
								className='mt-4 inline-block px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium cursor-pointer'
								onClick={(e) => e.stopPropagation()}
							>
								{t('upload.selectFile')}
							</label>
							</div>
							<p className='text-xs text-slate-400'>
								{t('upload.formats')}
							</p>
						</div>
					</div>
					<input
						id='file-upload-input'
						ref={fileInputRef}
						type='file'
						accept='image/jpeg,image/jpg,image/png,image/webp'
						onChange={handleFileSelect}
						className='hidden'
					/>
				</>
			) : (
				<div className='space-y-4'>
					<div className='relative rounded-lg overflow-hidden border-2 border-slate-200'>
						<img
							src={imageUrl}
							alt={t('upload.preview')}
							className='w-full h-auto max-h-64 object-contain'
						/>
					</div>
				</div>
			)}
		</div>
	)
}

