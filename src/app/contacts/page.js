import Header from '@/app/components/layout/header'
import Footer from '@/app/components/layout/footer'

export default function ContactsPage() {
	return (
		<div className='flex flex-col h-screen w-full'>
			<Header />
			<div className='flex-grow relative'>
				<h1 className=' text-xl font-medium'>Мурманск</h1>
				<p>
					ул. Баумана, 18
					<br />
					<br />
					<br /> Доставка <br />
					<br />
					Пн-Вт: 09:00 — 22:00 <br />
					Ср: 09:00 — 20:00 <br />
					Чт: 09:00 — 22:00 <br /> Пт: 09:00 — 23:00 <br />
					Сб: 10:00 — 23:00 <br />
					Вс: 10:00 — 22:00 <br />
					<br />
					<br />
					Ресторан и самовывоз <br />
					<br />
					Пн-Вт: 09:00 — 22:00 <br />
					Ср: 09:00 — 20:00 <br />
					Чт: 09:00 — 22:00 <br />
					Пт: 09:00 — 23:00 <br />
					Сб: 10:00 — 23:00 <br />
					Вс: 10:00 — 22:00
				</p>
				<div className='absolute top-0 right-0 bg-slate-100 rounded-xl p-6 text-sm'>
					<p>
						<span className=' text-slate-700'>Телефон:</span>
						<br />8 800 333-00-60
						<br />
						<br />
						<span className=' text-slate-700'>
							Вопросы, отзывы и предложения:
						</span>
						<br />
						feedback@dodopizza.com
					</p>
				</div>
			</div>
			<Footer />
		</div>
	)
}
