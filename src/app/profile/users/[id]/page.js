'use client'

import Link from 'next/link'
import Header from '@/app/components/layout/header'
import Footer from '@/app/components/layout/footer'
import Nav from '@/app/components/usernav'
import { useSession } from 'next-auth/react'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Toaster, toast } from 'sonner'
import TicketsClosedDocument from '@/app/components/ticketsClosedByManager'
import OrdersDocument from '@/app/components/ordersDocument'

export default function PageOfUser() {
	const [user, setUser] = useState(null)
	const [fio, setFio] = useState('')
	const [email, setEmail] = useState('')
	const [admin, setAdmin] = useState(false)
	const [oldEmail, setOldEmail] = useState('')
	const { id } = useParams()

	const session = useSession()
	const { status } = session
	const isAdm = session?.data?.userData?.isAdmin
	const router = useRouter()

	if (!isAdm) {
		router.push('/profile')
	}

	useEffect(() => {
		fetch('/api/userById?_id=' + id).then(res => {
			res.json().then(u => {
				setUser(u)
				setEmail(u.email)
				setOldEmail(u.email)
				setFio(u.fio)
				setAdmin(u.admin)
			})
		})
	}, [])

	const handleSave = async (e, data) => {
		e.preventDefault()
		const resUE = await fetch('/api/userExists', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ email }),
		})

		const { user } = await resUE.json()
		console.log(user)

		if (user && email != oldEmail) {
			toast.error('Email уже используется')
			return
		}
		const res = await fetch('/api/userById', {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ ...data, _id: id }),
		})
		if (res.ok) {
			toast.success('Запись сохранена')
		}
	}

	return (
		<div className='flex flex-col h-screen w-full'>
			<Toaster position='top-center' richColors />
			<Header />
			<div className='flex-grow'>
				<Nav></Nav>
				<form
					className='max-w-md mx-auto mt-10'
					onSubmit={e => handleSave(e, { fio, admin, email })}
				>
					<div className='relative z-0 w-full mb-5 group'>
						<input
							onChange={e => {
								setEmail(e.target.value)
							}}
							type='email'
							name='email'
							id='email'
							className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer'
							placeholder=' '
							value={email}
						/>
						<label
							htmlFor='email'
							className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
						>
							Email
						</label>
					</div>
					<div className='relative z-0 w-full mb-5 group'>
						<input
							onChange={e => setFio(e.target.value)}
							type='text'
							name='fio'
							id='fio'
							value={fio}
							className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer'
							placeholder=' '
						/>
						<label
							htmlFor='fio'
							className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
						>
							Имя
						</label>
					</div>
					<div class='flex items-center mb-4'>
						<input
							onChange={e => setAdmin(e.target.checked)}
							id='admin'
							type='checkbox'
							checked={admin}
							value={'1'}
							class='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
						/>
						<label
							for='admin'
							class='admin ms-2 text-sm font-medium text-gray-900 dark:text-gray-300'
						>
							Администратор
						</label>
					</div>
					{admin && <TicketsClosedDocument user={user} />}
					<OrdersDocument user={user} />

					<div className='flex gap-4'>
						<button
							type='submit'
							className='text-white bg-primary hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center '
						>
							Сохранить
						</button>
						<Link
							href={'/profile/users'}
							className=' relative text-white bg-gray-400 hover:bg-gray-500 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center'
						>
							Назад
						</Link>
					</div>
				</form>
			</div>
			<Footer />
		</div>
	)
}
