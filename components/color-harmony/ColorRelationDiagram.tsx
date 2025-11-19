'use client'

import { useTranslations } from 'next-intl'
import { HarmonyColor } from '@/hooks/useColorHarmony'

interface ColorRelationDiagramProps {
	baseColor: { h: number; s: number; l: number }
	colors: HarmonyColor[]
}

/**
 * SVG diagram showing color relationships on a color wheel
 * Displays base color and harmonious colors with angle labels
 */
export function ColorRelationDiagram({
	baseColor,
	colors,
}: ColorRelationDiagramProps) {
	const t = useTranslations('tools.colorHarmony')

	const size = 300
	const center = size / 2
	const radius = 120

	/**
	 * Convert HSL angle to SVG coordinates
	 */
	const angleToCoords = (angle: number, r: number) => {
		// HSL hue starts at 0° (red) pointing right, but SVG 0° points up
		// Adjust: subtract 90° to align with SVG coordinate system
		const adjustedAngle = (angle - 90) * (Math.PI / 180)
		const x = center + r * Math.cos(adjustedAngle)
		const y = center + r * Math.sin(adjustedAngle)
		return { x, y }
	}

	/**
	 * Get color at specific angle on color wheel
	 */
	const getColorAtAngle = (angle: number) => {
		const { h, s, l } = baseColor
		// For diagram, use full saturation and medium lightness for visibility
		return `hsl(${angle}, 70%, 50%)`
	}

	return (
		<div className='bg-white rounded-xl shadow-md p-6'>
			<h3 className='text-lg font-semibold text-slate-900 mb-4'>
				{t('diagram.title')}
			</h3>

			<svg
				width={size}
				height={size}
				className='mx-auto'
				viewBox={`0 0 ${size} ${size}`}
			>
				{/* Color Wheel Background (simplified) */}
				<circle
					cx={center}
					cy={center}
					r={radius}
					fill='none'
					stroke='#e2e8f0'
					strokeWidth='2'
				/>

				{/* Draw color wheel segments */}
				{Array.from({ length: 12 }).map((_, i) => {
					const angle = (i * 30) % 360
					const startAngle = ((angle - 15 - 90) * Math.PI) / 180
					const endAngle = ((angle + 15 - 90) * Math.PI) / 180
					const x1 = center + radius * Math.cos(startAngle)
					const y1 = center + radius * Math.sin(startAngle)
					const x2 = center + radius * Math.cos(endAngle)
					const y2 = center + radius * Math.sin(endAngle)

					return (
						<path
							key={i}
							d={`M ${center} ${center} L ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2} Z`}
							fill={getColorAtAngle(angle)}
							opacity={0.3}
						/>
					)
				})}

				{/* Draw lines connecting colors */}
				{colors.map((color, index) => {
					if (index === 0) return null // Skip base color for lines
					const baseCoords = angleToCoords(baseColor.h, radius)
					const colorCoords = angleToCoords(
						baseColor.h + (color.angle || 0),
						radius
					)

					return (
						<line
							key={`line-${index}`}
							x1={baseCoords.x}
							y1={baseCoords.y}
							x2={colorCoords.x}
							y2={colorCoords.y}
							stroke='#94a3b8'
							strokeWidth='1'
							strokeDasharray='4 4'
							opacity={0.5}
						/>
					)
				})}

				{/* Draw color points */}
				{colors.map((color, index) => {
					const angle = baseColor.h + (color.angle || 0)
					const coords = angleToCoords(angle, radius)

					return (
						<g key={`color-${index}`}>
							{/* Color circle */}
							<circle
								cx={coords.x}
								cy={coords.y}
								r='12'
								fill={color.hex}
								stroke='#ffffff'
								strokeWidth='2'
							/>
							{/* Angle label */}
							{color.angle !== undefined && color.angle !== 0 && (
								<text
									x={coords.x}
									y={coords.y - 20}
									textAnchor='middle'
									fontSize='10'
									fill='#64748b'
									fontWeight='500'
								>
									{color.angle > 0 ? '+' : ''}
									{color.angle}°
								</text>
							)}
						</g>
					)
				})}

				{/* Center point (base color) */}
				<circle
					cx={center}
					cy={center}
					r='8'
					fill={colors[0]?.hex || '#000000'}
					stroke='#ffffff'
					strokeWidth='3'
				/>
			</svg>

			<p className='text-sm text-slate-600 text-center mt-4'>
				{t('diagram.description')}
			</p>
		</div>
	)
}



