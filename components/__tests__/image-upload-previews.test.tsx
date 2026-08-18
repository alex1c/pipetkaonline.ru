import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { ImageUploader as ColorLabUploader } from '@/components/color-lab/ImageUploader'
import { ImageUploader as ExtractUploader } from '@/components/extract-v2/ImageUploader'
import { ImageUploader as GradientMapUploader } from '@/components/gradient-map-generator/ImageUploader'
import { ImageUploader as TextAccessibilityUploader } from '@/components/text-image-accessibility/ImageUploader'
import { ImageUpload as ColorBlindnessUploader } from '@/components/color-blindness/ImageUpload'

const imageFile = new File(['image'], 'sample.png', { type: 'image/png' })

describe('dynamic image upload previews', () => {
	it.each([
		['gradient map', GradientMapUploader],
		['text accessibility', TextAccessibilityUploader],
	] as const)('%s uploader accepts a file and preserves a blob preview URL', (_name, Uploader) => {
		const onImageUpload = jest.fn()
		const { container, rerender } = render(
			<Uploader onImageUpload={onImageUpload} imageUrl={null} />
		)
		fireEvent.change(container.querySelector('input[type="file"]')!, {
			target: { files: [imageFile] },
		})
		expect(onImageUpload).toHaveBeenCalledWith(imageFile)

		rerender(<Uploader onImageUpload={onImageUpload} imageUrl='blob:test-preview' />)
		expect(screen.getByRole('img', { name: 'Preview' })).toHaveAttribute(
			'src',
			'blob:test-preview'
		)
	})

	it('extract uploader accepts a file and renders a data URL preview', () => {
		const onImageSelect = jest.fn()
		const { container, rerender } = render(
			<ExtractUploader onImageSelect={onImageSelect} preview={null} />
		)
		fireEvent.change(container.querySelector('input[type="file"]')!, {
			target: { files: [imageFile] },
		})
		expect(onImageSelect).toHaveBeenCalledWith(imageFile)

		rerender(<ExtractUploader onImageSelect={onImageSelect} preview='data:image/png;base64,AA==' />)
		expect(screen.getByRole('img', { name: 'Preview' })).toHaveAttribute(
			'src',
			'data:image/png;base64,AA=='
		)
	})

	it('color blindness uploader accepts a file and renders a blob preview', () => {
		const onImageLoad = jest.fn()
		const { container, rerender } = render(
			<ColorBlindnessUploader onImageLoad={onImageLoad} imageUrl={null} />
		)
		fireEvent.change(container.querySelector('input[type="file"]')!, {
			target: { files: [imageFile] },
		})
		expect(onImageLoad).toHaveBeenCalledWith(imageFile)

		rerender(<ColorBlindnessUploader onImageLoad={onImageLoad} imageUrl='blob:simulator' />)
		expect(screen.getByRole('img')).toHaveAttribute('src', 'blob:simulator')
	})

	it('color lab keeps FileReader data local and displays its preview', async () => {
		const onImageLoad = jest.fn()
		const { container } = render(<ColorLabUploader onImageLoad={onImageLoad} />)
		fireEvent.change(container.querySelector('input[type="file"]')!, {
			target: { files: [imageFile] },
		})

		await waitFor(() => expect(onImageLoad).toHaveBeenCalled())
		expect(screen.getByRole('img', { name: 'Preview' }).getAttribute('src')).toMatch(
			/^data:image\/png;base64,/
		)
	})
})
