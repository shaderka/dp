'use client'

import Link from 'next/link'
import Header from '@/app/components/layout/header'
import Footer from '@/app/components/layout/footer'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Toaster, toast } from 'sonner'
import Nav from '@/app/components/usernav'
import dateFormat, { masks } from 'dateformat'

export default function TicketsPage() {
	const session = useSession()
	const { status } = session
	const isAdm = session?.data?.userData?.isAdmin
	const router = useRouter()

	const [tickets, setTickets] = useState([])

	if (status === 'unauthenticated') {
		router.push('/')
	}

	if (!isAdm) {
		router.push('/profile/orders')
	}

	useEffect(() => {
		fetchTickets()
	}, [])

	const fetchTickets = () => {
		fetch('/api/ticket').then(res => {
			res.json().then(tickets => setTickets(tickets))
		})
	}

	const handleSettingAdmin = _id => {
		fetch('/api/ticket', {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ _id }),
		}).then(async res => {
			if (res.ok) {
				fetchTickets()
				toast.success('Теперь вы решаете этот тикет')
			} else toast.error('Ошибка')
		})
	}

	return (
		<div className='flex flex-col h-screen w-full'>
			<Toaster position='top-center' richColors />
			<Header />
			<div className='flex-grow'>
				<Nav />
				<div className='gap-1 p-2 mt-6 max-w-xl mx-auto relative flex flex-col bg-white shadow-md rounded-xl bg-clip-border'>
					{tickets?.length > 0 ? (
						tickets.map(ticket => (
							<div
								key={ticket._id}
								className='cat my-1.5 flex items-center justify-between gap-7 w-full  pr-1 leading-tight transition-all rounded-lg outline-none text-start hover:bg-gray-200 hover:bg-opacity-80 hover:text-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900'
							>
								{ticket.closedAt ? (
									<span className='ml-4 h-full leading-[35px] rounded-md px-2 bg-green-600/60'>
										Закрыт{' '}
										{dateFormat(new Date(ticket?.closedAt), 'dd.mm.yy HH:MM')}
									</span>
								) : (
									<span className='ml-4 h-full leading-[35px] bg-blue-500/60 rounded-md px-2'>
										{ticket.admin ? 'Решается' : 'Новый'}
									</span>
								)}

								<span className='ml-4 h-full leading-[50px]'>
									Заказ №{ticket.order.slice(-4)}
								</span>

								<span className='ml-4 h-full leading-[50px]'>
									{ticket.admin ? (
										<Link
											href={'/profile/tickets/' + ticket._id}
											className='text-white bg-primary hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center'
										>
											Открыть тикет
										</Link>
									) : (
										<button
											onClick={() => handleSettingAdmin(ticket._id)}
											className='text-white bg-primary hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center'
										>
											Решить тикет
										</button>
									)}
								</span>
							</div>
						))
					) : (
						<div className='cat my-1.5 flex items-center w-full  pr-1 leading-tight transition-all rounded-lg outline-none text-start'>
							<span className='ml-4 grow h-full leading-[50px] text-center'>
								Нет новых тикетов
							</span>
						</div>
					)}
				</div>
			</div>
			<Footer />
		</div>
	)
}
