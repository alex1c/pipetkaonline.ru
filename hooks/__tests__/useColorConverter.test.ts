/**
 * useColorConverter Hook Tests
 * 
 * Tests for the useColorConverter custom hook to ensure:
 * - Color conversion between formats works correctly
 * - State updates properly
 * - Input validation works
 * 
 * @see https://testing-library.com/docs/react-hooks-testing-library/intro
 */

import { renderHook, act } from '@testing-library/react'
import { useColorConverter } from '../useColorConverter'

describe('useColorConverter Hook', () => {
	/**
	 * Test: Initializes with default values
	 * 
	 * Verifies that the hook initializes with correct
	 * default state values.
	 */
	it('initializes with default values', () => {
		const { result } = renderHook(() => useColorConverter())

		// Hook initializes with default black color
		expect(result.current).toBeDefined()
		expect(result.current.hexInput).toBe('#000000')
		expect(result.current.currentHex).toBe('#000000')
		expect(result.current.currentRgb).not.toBeNull()
		expect(result.current.currentHsl).not.toBeNull()
	})

	/**
	 * Test: Converts HEX to RGB and HSL
	 * 
	 * Verifies that setting a HEX value correctly
	 * converts to RGB and HSL formats.
	 */
	it('converts HEX to RGB and HSL', () => {
		const { result } = renderHook(() => useColorConverter())

		act(() => {
			result.current.handleHexChange('#FF5733')
		})

		expect(result.current.currentHex).toBe('#FF5733')
		expect(result.current.currentRgb).not.toBeNull()
		if (result.current.currentRgb) {
			expect(result.current.currentRgb.r).toBe(255)
			expect(result.current.currentRgb.g).toBe(87)
			expect(result.current.currentRgb.b).toBe(51)
		}
		if (result.current.currentHsl) {
			expect(result.current.currentHsl.h).toBeGreaterThan(0)
		}
	})

	/**
	 * Test: Converts RGB to HEX and HSL
	 * 
	 * Verifies that setting RGB values correctly
	 * converts to HEX and HSL formats.
	 */
	it('converts RGB to HEX and HSL', () => {
		const { result } = renderHook(() => useColorConverter())

		act(() => {
			result.current.handleRgbChange('rgb(255, 87, 51)')
		})

		expect(result.current.currentRgb).not.toBeNull()
		if (result.current.currentRgb) {
			expect(result.current.currentRgb.r).toBe(255)
			expect(result.current.currentRgb.g).toBe(87)
			expect(result.current.currentRgb.b).toBe(51)
		}
		expect(result.current.currentHex).toBe('#FF5733')
		if (result.current.currentHsl) {
			expect(result.current.currentHsl.h).toBeGreaterThan(0)
		}
	})

	/**
	 * Test: Converts HSL to RGB and HEX
	 * 
	 * Verifies that setting HSL values correctly
	 * converts to RGB and HEX formats.
	 */
	it('converts HSL to RGB and HEX', () => {
		const { result } = renderHook(() => useColorConverter())

		act(() => {
			result.current.handleHslChange('hsl(0, 100%, 50%)')
		})

		expect(result.current.currentHsl).not.toBeNull()
		if (result.current.currentHsl) {
			expect(result.current.currentHsl.h).toBeCloseTo(0, 0)
			expect(result.current.currentHsl.s).toBeCloseTo(100, 0)
			expect(result.current.currentHsl.l).toBeCloseTo(50, 0)
		}
		if (result.current.currentRgb) {
			expect(result.current.currentRgb.r).toBeCloseTo(255, 0)
			expect(result.current.currentRgb.g).toBeCloseTo(0, 0)
			expect(result.current.currentRgb.b).toBeCloseTo(0, 0)
		}
		expect(result.current.currentHex).toBe('#FF0000')
	})

	/**
	 * Test: Handles invalid HEX input
	 * 
	 * Verifies that invalid HEX values are handled
	 * gracefully without breaking the hook.
	 */
	it('handles invalid HEX input gracefully', () => {
		const { result } = renderHook(() => useColorConverter())

		act(() => {
			result.current.handleHexChange('invalid')
		})

		// Should not crash, but may keep previous value or reset
		expect(result.current).toBeDefined()
		expect(result.current.hexInput).toBe('invalid')
	})

	/**
	 * Test: Updates active format correctly
	 * 
	 * Verifies that the active format is set correctly
	 * when different input types are used.
	 */
	it('updates active format correctly', () => {
		const { result } = renderHook(() => useColorConverter())

		act(() => {
			result.current.handleHexChange('#FF0000')
		})
		expect(result.current.activeFormat).toBe('hex')

		act(() => {
			result.current.handleRgbChange('rgb(0, 255, 0)')
		})
		expect(result.current.activeFormat).toBe('rgb')

		act(() => {
			result.current.handleHslChange('hsl(240, 100%, 50%)')
		})
		expect(result.current.activeFormat).toBe('hsl')
	})

	/**
	 * Test: getTextColor returns correct contrast color
	 * 
	 * Verifies that getTextColor function returns
	 * appropriate text color based on background luminance.
	 */
	it('getTextColor returns correct contrast color', () => {
		const { result } = renderHook(() => useColorConverter())

		// Dark background should return white text
		act(() => {
			result.current.handleHexChange('#000000')
		})
		if (result.current.currentRgb) {
			const textColor = result.current.getTextColor(result.current.currentRgb)
			expect(textColor).toBe('#ffffff')
		}

		// Light background should return black text
		act(() => {
			result.current.handleHexChange('#FFFFFF')
		})
		if (result.current.currentRgb) {
			const textColor = result.current.getTextColor(result.current.currentRgb)
			expect(textColor).toBe('#000000')
		}
	})

	/**
	 * Test: Handles initial color parameter
	 * 
	 * Verifies that the hook accepts and uses
	 * an initial color parameter.
	 */
	it('handles initial color parameter', () => {
		const { result } = renderHook(() => useColorConverter('#FF5733'))

		expect(result.current.hexInput).toBe('#FF5733')
		expect(result.current.currentHex).toBe('#FF5733')
		expect(result.current.currentRgb).not.toBeNull()
	})
})

