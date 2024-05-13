'use client'

import Header from '@/app/components/layout/header'
import Footer from '@/app/components/layout/footer'
import Nav from '@/app/components/usernav'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Toaster, toast } from 'sonner'
import Link from 'next/link'
import Image from 'next/image'

export default function MenuItemsPage() {
	const session = useSession()
	const { status } = session
	const isAdm = session?.data?.userData?.isAdmin
	const router = useRouter()

	const [items, setItems] = useState([])

	if (!isAdm) {
		router.push('/profile')
	}

	const fetchCatName = async _id => {
		const res = await fetch('/api/getNameOfCategory', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ _id }),
		})

		const { category } = await res.json()

		console.log(res)
		return category
	}

	const handleDeleteClick = async _id => {
		const res = await fetch('/api/menu-items?_id=' + _id, {
			method: 'DELETE',
		})

		if (res.ok) toast.success('Запись удалена')
		else {
			if (res.status === 444) toast.warning('Запись используется')
			else toast.error('Ошибка')
		}

		fetch('/api/menu-items').then(res => {
			res.json().then(menuItems => setItems(menuItems))
		})
	}

	useEffect(() => {
		fetch('/api/menu-items').then(res => {
			res.json().then(menuItems => setItems(menuItems))
		})
	}, [])

	return (
		<div className='flex flex-col h-screen w-full'>
			<Toaster position='top-center' richColors />
			<Header />
			<div className='flex-grow'>
				<Nav></Nav>
				<div className='max-w-[600px] mx-auto'>
					<Link
						href={'/profile/menu-items/new'}
						className='text-white bg-primary hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center'
					>
						Добавить
					</Link>
					<div className='gap-1 p-2 mt-6 mx-auto relative flex flex-col text-gray-700 bg-white shadow-md rounded-xl bg-clip-border'>
						{items?.length > 0 &&
							items.map(c => (
								<div
									key={c._id}
									className='cat my-1.5 flex items-center w-full  pr-1 leading-tight transition-all rounded-lg outline-none text-start hover:bg-gray-200 hover:bg-opacity-80 hover:text-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900'
								>
									<Link
										href={'/profile/menu-items/edit/' + c._id}
										className='flex grow'
									>
										<Image
											src={c.image}
											width={50}
											height={50}
											className='rounded-md ml-1'
										/>
										<span className='ml-4 grow h-full leading-[50px]'>
											{c.name}
										</span>
									</Link>

									<div className='grid  ml-auto place-items-center justify-self-end'>
										<button
											className='relative z-10 h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-gray-500 transition-all hover:bg-gray-500/10 active:bg-blue-gray-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
											type='button'
											onClick={e => {
												e.stopPropagation()
												toast.message(
													'Вы действительно хотите удалить запись?',
													{
														action: {
															label: 'Да',
															onClick: () => {
																handleDeleteClick(c._id)
															},
														},
													}
												)
											}}
										>
											<span className='absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2'>
												<svg
													xmlns='http://www.w3.org/2000/svg'
													viewBox='0 0 24 24'
													fill='currentColor'
													className='w-5 h-5'
												>
													<path
														fill-rule='evenodd'
														d='M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z'
														clip-rule='evenodd'
													></path>
												</svg>
											</span>
										</button>
									</div>
								</div>
							))}
						{items?.length == 0 && (
							<div className='cat my-1.5 flex items-center w-full  pr-1 leading-tight transition-all rounded-lg outline-none text-start'>
								<span className='ml-4 grow h-full leading-[50px] text-center'>
									Нет записей
								</span>
							</div>
						)}
					</div>
				</div>
			</div>
			<Footer />
		</div>
	)
}
