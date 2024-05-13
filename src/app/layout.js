import { Montserrat } from 'next/font/google'
import './globals.css'
import { AuthProvider } from './Providers'
import Head from 'next/head'

const montserrat = Montserrat({ subsets: ['latin', 'cyrillic'] })

export const metadata = {
	title: 'Додо Пицца',
	description: 'Пиццерия по адресу ул. Баумана, 18',
}

export default function RootLayout({ children }) {
	return (
		<html lang='ru' className=' scroll-smooth'>
			<Head>
				<title>Додо Пицца</title>
			</Head>
			<body className={montserrat.className}>
				<main className='max-w-6xl mx-auto'>
					<AuthProvider>{children}</AuthProvider>
				</main>
			</body>
		</html>
	)
}
