'use client'

import Link from 'next/link'
import Header from '@/app/components/layout/header'
import Footer from '@/app/components/layout/footer'
import Nav from '@/app/components/usernav'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Toaster, toast } from 'sonner'
import Reciept from '@/app/components/reciept'

export default function OrdersPage() {
	const session = useSession()
	const { status } = session
	const isAdm = session?.data?.userData?.isAdmin

	const [orders, setOrders] = useState([])
	const [users, setUsers] = useState([])
	const [items, setItems] = useState([])
	const [statuses, setStatuses] = useState([])
	const [tickets, setTickets] = useState([])

	const router = useRouter()

	const itemPrice = item => {
		let total = item.size
			? item.size.price
			: items?.filter(i => i._id == item._id)[0]?.basePrice
		for (const extra of item.extras) total += extra?.price
		return total
	}

	const orderPrice = order => {
		let total = 0
		for (const item of order.items) total += itemPrice(item)
		return total
	}

	const handleCreateTicket = async order => {
		fetch('/api/ticket', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ order }),
		}).then(async res => {
			if (res.ok) {
				fetchTickets()
				fetchOrders()
				toast.success('Тикет создан')
			} else toast.error('Ошибка при создании тикета')
		})
	}

	if (status === 'unauthenticated') {
		router.push('/')
	}

	useEffect(() => {
		fetch('/api/orderStatus').then(res => {
			res.json().then(statuses => setStatuses(statuses))
		})
		fetch('/api/users').then(res => {
			res.json().then(users => setUsers(users))
		})
		fetch('/api/menu-items').then(res => {
			res.json().then(menuItems => setItems(menuItems))
		})
		fetchOrders()
		fetchTickets()
	}, [])

	const fetchOrders = () => {
		fetch('/api/orders').then(res => {
			res.json().then(orders => setOrders(orders))
		})
	}

	const fetchTickets = () => {
		fetch('/api/ticket').then(res => {
			res.json().then(tickets => setTickets(tickets))
		})
	}

	const getTicketOfOrder = order => {
		const ticket = tickets.find(t => t.order == order)
		if (ticket) return ticket._id
		else return ''
	}

	return (
		<div className='flex flex-col h-screen w-full'>
			<Toaster position='top-center' richColors />
			<Header />
			<div className='flex-grow'>
				<Nav></Nav>
				{orders?.length > 0 && (
					<div className='relative flex flex-col w-full bg-white shadow-md bg-clip-border rounded-xl'>
						<table className='w-full text-left table-auto min-w-max'>
							<thead>
								<tr>
									<th className='p-4 border-b border-gray-100 bg-gray-50'>
										<p className='block text-sm antialiased font-bold leading-none opacity-70'>
											Номер заказа
										</p>
									</th>
									{isAdm && (
										<>
											<th className='p-4 border-b border-gray-100 bg-gray-50'>
												<p className='block text-sm antialiased font-bold leading-none opacity-70'>
													Имя
												</p>
											</th>
											<th className='p-4 border-b border-gray-100 bg-gray-50'>
												<p className='block text-sm antialiased font-bold leading-none opacity-70'>
													Телефон
												</p>
											</th>
										</>
									)}

									<th className='p-4 border-b border-gray-100 bg-gray-50'>
										<p className='block text-sm antialiased font-bold leading-none opacity-70'>
											Адрес
										</p>
									</th>
									<th className='p-4 border-b border-gray-100 bg-gray-50'>
										<p className='block text-sm antialiased font-bold leading-none opacity-70'>
											Стоимость
										</p>
									</th>
									<th className='p-4 border-b border-gray-100 bg-gray-50'>
										<p className='block text-sm antialiased font-bold leading-none opacity-70'>
											Статус
										</p>
									</th>
									<th className='p-4 border-b border-gray-100 bg-gray-50'>
										<p className='block text-sm antialiased font-bold leading-none opacity-70'>
											Создан
										</p>
									</th>
									<th className='p-4 border-b border-gray-100 bg-gray-50'>
										<p className='block text-sm antialiased font-bold leading-none opacity-70'>
											{isAdm ? <>Товарный чек</> : <>Тикет</>}
										</p>
									</th>
								</tr>
							</thead>
							<tbody>
								{orders.map(order => (
									<tr key={order._id} className='even:bg-gray-50/50'>
										<td className='p-4'>
											<p className='block text-sm antialiased font-normal leading-normal text-blue-gray-900'>
												{order._id.slice(-4)}
											</p>
										</td>
										{isAdm && (
											<>
												<td className='p-4'>
													<p className='block text-sm antialiased font-normal leading-normal text-blue-gray-900'>
														{users.filter(u => u._id == order.user)[0]?.fio}
													</p>
												</td>
												<td className='p-4'>
													<p className='block text-sm antialiased font-normal leading-normal text-blue-gray-900'>
														{users.filter(u => u._id == order.user)[0]?.tel}
													</p>
												</td>
											</>
										)}

										<td className='p-4'>
											<p className='block text-sm antialiased font-normal leading-normal text-blue-gray-900'>
												{order.streetAddress}
											</p>
										</td>
										<td className='p-4'>
											<p className='block text-sm antialiased font-normal leading-normal text-blue-gray-900'>
												{orderPrice(order)}₽
											</p>
										</td>
										<td className='p-4'>
											<p className='block text-sm antialiased font-normal leading-normal text-blue-gray-900'>
												{statuses.filter(s => s._id == order.status)[0]?.name}
											</p>
										</td>
										<td className='p-4'>
											<p className='block text-sm antialiased font-normal leading-normal text-blue-gray-900'>
												{order.createdAt.replace('T', ' ').substring(0, 16)}
											</p>
										</td>
										<td className='p-4'>
											{isAdm ? (
												<Reciept order={order} />
											) : getTicketOfOrder(order._id) == '' ? (
												<button
													onClick={() => handleCreateTicket(order._id)}
													className='text-white bg-primary hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center'
												>
													Создать тикет
												</button>
											) : (
												<Link
													href={
														'/profile/tickets/' + getTicketOfOrder(order._id)
													}
													className='text-white bg-primary hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center'
												>
													Тикет №{getTicketOfOrder(order._id).slice(-4)}
												</Link>
											)}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)}
			</div>
			<Footer />
		</div>
	)
}
