import { render, screen } from '@testing-library/react'
import { ToolServerIntro } from '../tool-server-intro'

describe('ToolServerIntro', () => {
	it('renders crawlable semantic content and a truthful localized privacy notice', () => {
		render(<ToolServerIntro title='Пипетка' description='Определите цвет изображения' locale='ru' />)
		expect(screen.getByRole('heading', { level: 1, name: 'Пипетка' })).toBeInTheDocument()
		expect(screen.getByText('Определите цвет изображения')).toBeInTheDocument()
		expect(screen.getByText(/не загружается на сервер/)).toBeInTheDocument()
	})
})
