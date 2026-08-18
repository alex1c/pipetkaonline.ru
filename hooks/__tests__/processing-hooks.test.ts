import { act, renderHook, waitFor } from '@testing-library/react'
import { useExtractColorsV2 } from '@/hooks/useExtractColorsV2'
import { useGradientMapGenerator } from '@/hooks/useGradientMapGenerator'
import { applyGradientMap } from '@/lib/gradient-map/applyGradientMap'

jest.mock('@/lib/gradient-map/applyGradientMap', () => ({
	applyGradientMap: jest.fn(),
}))

const mockedApplyGradientMap = jest.mocked(applyGradientMap)

class LoadedImage {
	onload: (() => void) | null = null
	width = 2
	height = 1

	set src(_value: string) {
		this.onload?.()
	}
}

describe('image-processing hooks', () => {
	const imageData = {
		data: new Uint8ClampedArray([255, 0, 0, 255, 0, 0, 255, 255]),
		width: 2,
		height: 1,
		colorSpace: 'srgb',
	} as ImageData
	const processedImageData = {
		...imageData,
		data: new Uint8ClampedArray(imageData.data),
	} as ImageData
	const drawImage = jest.fn()
	const getImageData = jest.fn(() => imageData)

	beforeEach(() => {
		jest.clearAllMocks()
		Object.defineProperty(globalThis, 'Image', { configurable: true, value: LoadedImage })
		Object.defineProperty(globalThis.URL, 'createObjectURL', {
			configurable: true,
			value: jest.fn(() => 'blob:test-image'),
		})
		Object.defineProperty(globalThis.URL, 'revokeObjectURL', {
			configurable: true,
			value: jest.fn(),
		})
		const createElement = document.createElement.bind(document)
		jest.spyOn(document, 'createElement').mockImplementation(((tagName: string) => {
			if (tagName === 'canvas') {
				return {
					width: 0,
					height: 0,
					getContext: () => ({ drawImage, getImageData }),
				} as unknown as HTMLCanvasElement
			}
			return createElement(tagName)
		}) as typeof document.createElement)
		mockedApplyGradientMap.mockReturnValue(processedImageData)
	})

	afterEach(() => {
		jest.restoreAllMocks()
	})

	it('extracts the selected image once without a stale callback or render loop', async () => {
		const { result, rerender } = renderHook(() => useExtractColorsV2())
		const initialHandler = result.current.handleImageSelect
		const file = new File(['pixels'], 'sample.png', { type: 'image/png' })

		expect(result.current.imageFile).toBeNull()
		expect(result.current.dominantColors).toEqual([])

		act(() => result.current.handleImageSelect(file))

		await waitFor(() => expect(result.current.imageFile).toBe(file))
		expect(getImageData).toHaveBeenCalledTimes(1)
		expect(URL.createObjectURL).toHaveBeenCalledTimes(1)
		expect(URL.revokeObjectURL).toHaveBeenCalledWith('blob:test-image')
		expect(result.current.isProcessing).toBe(false)

		rerender()
		expect(result.current.handleImageSelect).toBe(initialHandler)
		expect(getImageData).toHaveBeenCalledTimes(1)
	})

	it('ignores an empty non-image input without starting image processing', () => {
		const { result } = renderHook(() => useExtractColorsV2())
		const file = new File([], 'empty.txt', { type: 'text/plain' })

		act(() => result.current.handleImageSelect(file))

		expect(result.current.imageFile).toBeNull()
		expect(URL.createObjectURL).not.toHaveBeenCalled()
		expect(getImageData).not.toHaveBeenCalled()
	})

	it('reprocesses only when a meaningful gradient input changes', async () => {
		const { result, rerender, unmount } = renderHook(() => useGradientMapGenerator())
		const file = new File(['pixels'], 'gradient.png', { type: 'image/png' })

		expect(mockedApplyGradientMap).not.toHaveBeenCalled()
		act(() => result.current.handleImageUpload(file))
		await waitFor(() => expect(mockedApplyGradientMap).toHaveBeenCalledTimes(1))
		expect(mockedApplyGradientMap).toHaveBeenLastCalledWith(
			imageData,
			result.current.gradientStops,
			1,
			'normal',
			true
		)

		rerender()
		expect(mockedApplyGradientMap).toHaveBeenCalledTimes(1)

		act(() => result.current.setIntensity(0.5))
		await waitFor(() => expect(mockedApplyGradientMap).toHaveBeenCalledTimes(2))
		expect(mockedApplyGradientMap).toHaveBeenLastCalledWith(
			imageData,
			result.current.gradientStops,
			0.5,
			'normal',
			true
		)

		act(() => result.current.setIntensity(0.5))
		expect(mockedApplyGradientMap).toHaveBeenCalledTimes(2)

		act(() => result.current.setBlendMode('multiply'))
		await waitFor(() => expect(mockedApplyGradientMap).toHaveBeenCalledTimes(3))
		act(() => result.current.setUseLAB(false))
		await waitFor(() => expect(mockedApplyGradientMap).toHaveBeenCalledTimes(4))
		act(() => result.current.updateGradientStop(0, { color: '#112233' }))
		await waitFor(() => expect(mockedApplyGradientMap).toHaveBeenCalledTimes(5))

		expect(result.current.processedImageData).toBe(processedImageData)
		expect(mockedApplyGradientMap).toHaveBeenCalledTimes(5)

		unmount()
		expect(URL.revokeObjectURL).toHaveBeenCalledWith('blob:test-image')
	})

	it('does not process an upload when image data cannot be read', () => {
		getImageData.mockImplementationOnce(() => {
			throw new Error('image read failed')
		})
		const { result } = renderHook(() => useGradientMapGenerator())
		const file = new File([], 'broken.png', { type: 'image/png' })

		expect(() => act(() => result.current.handleImageUpload(file))).toThrow('image read failed')
		expect(mockedApplyGradientMap).not.toHaveBeenCalled()
	})
})
