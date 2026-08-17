import type { Locale } from '@/i18n'

const privacyMessages: Record<Locale, string> = {
	ru: 'Изображение обрабатывается в вашем браузере и не загружается на сервер.',
	en: 'Your image is processed in your browser and is not uploaded to a server.',
	de: 'Ihr Bild wird in Ihrem Browser verarbeitet und nicht auf einen Server hochgeladen.',
	es: 'La imagen se procesa en tu navegador y no se sube a ningún servidor.',
}

export function ToolServerIntro({ title, description, locale }: {
	title: string
	description: string
	locale: Locale
}) {
	return (
		<header className='text-center space-y-4' data-testid='tool-server-intro'>
			<h1 className='text-4xl md:text-5xl font-bold text-slate-900'>{title}</h1>
			<p className='text-lg text-slate-600 max-w-2xl mx-auto'>{description}</p>
			<p className='text-sm text-slate-500 max-w-2xl mx-auto'>{privacyMessages[locale]}</p>
		</header>
	)
}
