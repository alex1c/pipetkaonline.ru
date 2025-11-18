/**
 * Emotion Picker Component
 * 
 * Allows user to select an emotion or enter custom emotion text.
 * 
 * @component
 */

'use client'

import { useTranslations } from 'next-intl'

interface EmotionPickerProps {
	/** Selected emotion key */
	selectedEmotion: string | null
	/** Custom emotion text */
	customEmotion: string
	/** Callback when emotion is selected */
	onEmotionSelect: (emotionKey: string) => void
	/** Callback when custom emotion changes */
	onCustomEmotionChange: (text: string) => void
}

/**
 * Emotion Picker Component
 * 
 * @param {EmotionPickerProps} props - Component props
 * @returns {JSX.Element} Emotion picker component
 */
export function EmotionPicker({
	selectedEmotion,
	customEmotion,
	onEmotionSelect,
	onCustomEmotionChange,
}: EmotionPickerProps) {
	const t = useTranslations('tools.emotionColors')

	const emotions = [
		{ key: 'joy', label: t('emotions.joy') },
		{ key: 'calm', label: t('emotions.calm') },
		{ key: 'energy', label: t('emotions.energy') },
		{ key: 'nostalgia', label: t('emotions.nostalgia') },
		{ key: 'confidence', label: t('emotions.confidence') },
		{ key: 'anxiety', label: t('emotions.anxiety') },
		{ key: 'romance', label: t('emotions.romance') },
		{ key: 'inspiration', label: t('emotions.inspiration') },
	]

	return (
		<div className='space-y-6'>
			{/* Emotion Buttons */}
			<div>
				<label className='block text-sm font-medium text-slate-700 mb-3'>
					{t('selectEmotion')}
				</label>
				<div className='grid grid-cols-2 md:grid-cols-4 gap-3'>
					{emotions.map((emotion) => (
						<button
							key={emotion.key}
							onClick={() => onEmotionSelect(emotion.key)}
							className={`
								px-4 py-3 rounded-lg text-sm font-medium transition-all
								${
									selectedEmotion === emotion.key
										? 'bg-blue-600 text-white shadow-md scale-105'
										: 'bg-slate-100 text-slate-700 hover:bg-slate-200'
								}
							`}
						>
							{emotion.label}
						</button>
					))}
				</div>
			</div>

			{/* Custom Emotion Input */}
			<div>
				<label htmlFor='custom-emotion' className='block text-sm font-medium text-slate-700 mb-2'>
					{t('customEmotion')}
				</label>
				<input
					id='custom-emotion'
					type='text'
					value={customEmotion}
					onChange={(e) => onCustomEmotionChange(e.target.value)}
					placeholder={t('customEmotionPlaceholder')}
					className='w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
				/>
			</div>
		</div>
	)
}

