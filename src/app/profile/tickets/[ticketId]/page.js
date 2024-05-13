'use client'

import Link from 'next/link'
import Header from '@/app/components/layout/header'
import Footer from '@/app/components/layout/footer'
import { useSession } from 'next-auth/react'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { Toaster, toast } from 'sonner'
import { pusherClient } from '@/app/lib/pusher'
import dateFormat, { masks } from 'dateformat'
import MessageBox from '@/app/components/layout/messageBox'

export default function TicketPage() {
	const session = useSession()
	const { status } = session
	const router = useRouter()
	const { ticketId } = useParams()
	const bottomRef = useRef(null)

	const [ticket, setTicket] = useState({})
	const [messages, setMessages] = useState([])
	const [text, setText] = useState('')
	const [users, setUsers] = useState([])

	useEffect(() => {
		fetch('/api/users').then(res => {
			res.json().then(users => {
				setUsers(users)
			})
		})
	}, [])

	const currentUser = session?.data?.userData

	const getTicketDetails = async () => {
		const res = await fetch('/api/ticket/' + ticketId, {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' },
		})
		const data = await res.json()
		setTicket(data)
		const resMessages = await fetch('/api/messages/' + ticketId, {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' },
		})
		const dataMessages = await resMessages.json()
		setMessages(dataMessages)
	}

	useEffect(() => {
		if (currentUser && ticketId) getTicketDetails()
	}, [currentUser, ticketId])

	const sendText = async e => {
		e.preventDefault()

		if (text !== '') {
			const res = await fetch('/api/messages', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ ticketId, currentUserId: currentUser.id, text }),
			})
			if (res.ok) {
				setText('')
			} else toast.error('Ошибка')
		}
	}

	const sendPhoto = async photo => {
		const res = await fetch('/api/messages', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ ticketId, currentUserId: currentUser.id, photo }),
		})
		if (!res.ok) toast.error('Ошибка')
	}

	const closeTicket = async () => {
		const res = await fetch('/api/ticket/' + ticketId, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
		})
		if (res.ok) {
			getTicketDetails()
			toast.success('Тикет закрыт')
		}
	}

	const handleFileChange = async e => {
		const files = e.target.files
		if (files?.length === 1) {
			const data = new FormData()
			data.set('file', files[0])

			fetch('/api/upload', {
				method: 'POST',
				body: data,
			}).then(res => {
				if (res.ok) {
					return res.json().then(link => {
						sendPhoto(link)
					})
				}
			})
		}
	}

	useEffect(() => {
		pusherClient.subscribe(ticketId)

		const handleMessage = async newMessage => {
			setMessages(prevMessages => [...prevMessages, newMessage])
		}

		pusherClient.bind('new-message', handleMessage)

		return () => {
			pusherClient.unsubscribe(ticketId)
			pusherClient.unbind('new-message', handleMessage)
		}
	}, [ticketId])

	useEffect(() => {
		bottomRef.current?.scrollIntoView({
			behavior: 'smooth',
		})
	}, [messages])

	if (status === 'unauthenticated') {
		router.push('/')
	}

	console.log(messages)

	return (
		<div className='flex flex-col h-screen w-full' id='ticket'>
			<Toaster position='top-center' richColors />
			<Header />
			<div className='flex-grow overflow-hidden'>
				<div className='flex flex-col w-full h-full bg-white shadow-md rounded-xl p-4 mx-3'>
					<div className='flex pb-2 border-b'>
						<button
							onClick={() => {
								if (currentUser?.isAdmin) router.push('/profile/tickets')
								else router.push('/profile/orders')
							}}
							className='flex gap-2 items-center text-white bg-primary hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center'
						>
							<img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAWElEQVR4nGNgGAU0Bf///1f+//9/3v///5mpYZj6////n/2HAEVKDVP7////U6hhFcPXMD6kMPv+////M0Tik////7ehvYFU9/KQNFSDagmbJllvFDAQCwBTGv2MdzswxwAAAABJRU5ErkJggg==' />
							Назад
						</button>
						<div className='grow border-l  ml-8 pl-8 flex items-center gap-4 font-medium'>
							<span>Тикет №{ticket?._id?.slice(-4)}</span>
							&#183;
							<span>
								{dateFormat(new Date(ticket?.createdAt || null), 'dd.mm.yy')}
							</span>
							&#183;
							<span>
								{ticket?.admin
									? ticket?.closedAt
										? 'Закрыт'
										: 'Решается'
									: 'Новый'}
							</span>
						</div>
						{currentUser?.isAdmin && (
							<button
								onClick={closeTicket}
								className='flex gap-2 items-center text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center disabled:bg-gray-500 disabled:hover:bg-gray-500'
								disabled={ticket?.closedAt ? true : false}
							>
								Закрыть тикет
							</button>
						)}
					</div>
					<div className='flex-1 flex flex-col gap-5 p-5 overflow-y-scroll'>
						{messages?.length > 0 &&
							messages.map((message, index) => (
								<MessageBox
									key={index}
									message={message}
									currentUser={currentUser}
									user={users?.filter(user => user._id == message.sender)[0]}
								/>
							))}
						<div ref={bottomRef} />
					</div>
					<form onSubmit={sendText} className='flex items-center gap-4 mt-4'>
						<label className=' cursor-pointer'>
							<svg
								viewBox='0 0 20 20'
								className=' fill-current text-blue-600 hover:text-blue-700 w-6 h-6'
							>
								<path d='M11,13 L8,10 L2,16 L11,16 L18,16 L13,11 L11,13 Z M0,3.99406028 C0,2.8927712 0.898212381,2 1.99079514,2 L18.0092049,2 C19.1086907,2 20,2.89451376 20,3.99406028 L20,16.0059397 C20,17.1072288 19.1017876,18 18.0092049,18 L1.99079514,18 C0.891309342,18 0,17.1054862 0,16.0059397 L0,3.99406028 Z M15,9 C16.1045695,9 17,8.1045695 17,7 C17,5.8954305 16.1045695,5 15,5 C13.8954305,5 13,5.8954305 13,7 C13,8.1045695 13.8954305,9 15,9 Z'></path>
							</svg>
							<input
								type='file'
								accept='image/*'
								className='hidden'
								onChange={handleFileChange}
								disabled={ticket?.closedAt ? true : false}
							/>
						</label>
						<input
							onChange={e => setText(e.target.value)}
							value={text}
							type='text'
							placeholder='Введите ваше сообщение'
							class='peer h-full grow rounded-[7px]  !border  !border-gray-300 border-t-transparent bg-transparent bg-white px-3 py-2.5 text-sm font-normal text-blue-gray-700 outline outline-0 ring-4 ring-transparent transition-all placeholder:text-gray-500 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2  focus:!border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 focus:ring-gray-900/10 disabled:border-0 disabled:bg-blue-gray-50'
							disabled={ticket?.closedAt ? true : false}
						/>
						<button
							type='submit'
							className='flex gap-2 items-center text-white bg-primary hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center'
						>
							Отправить
							<img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAABEklEQVR4nM3Tvy5EQRiG8UOjxboDFBIqUbAVPYm9AD2XoNpb0LkBCs0WShcgcQ1CRUEiQSRWYn8yMZKzx5xz9o/CU53zTeaZyffOl2X/DTSwhclxJFNooYOubzZHEa3iCA/66WJuUMkC2rguSHr4iN+dOsk09nARNxZ5x3lurVXWl22c5fqS4h77eIv/T2FvUbaER/VcYQ13udpxWZ9eamSnmI3SPM2yvm3gOSHqxVAmcFJYuw31qjCK0lfsxrXDxGHtynTjxmaU3mAl1nbwmbj5Yq0wCmZ+ksNySX8vB5IlnlK4aYqDbFjiTVNBhXfaGFoYwHpCWj1qI0h/j1o2JDH9EE6YqP5RG0M6H8b0T2SD8gX3f3FkHrM+OAAAAABJRU5ErkJggg=='></img>
						</button>
					</form>
				</div>
			</div>
			<Footer />
		</div>
	)
}
