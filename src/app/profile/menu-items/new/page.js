'use client'

import Header from '@/app/components/layout/header'
import Footer from '@/app/components/layout/footer'
import Nav from '@/app/components/usernav'
import { useSession } from 'next-auth/react'
import { redirect, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Toaster, toast } from 'sonner'
import Link from 'next/link'
import MenuItemForm from '@/app/components/layout/menuItemForm'

export default function NewItemPage() {
	const session = useSession()
	const { status } = session
	const isAdm = session?.data?.userData?.isAdmin
	const router = useRouter()

	const [redirectToItems, setRedirectToItems] = useState(false)

	if (!isAdm) {
		router.push('/profile')
	}

	const handleNewItem = async (e, data) => {
		e.preventDefault()
		console.log(e, data)

		const res = await fetch('/api/menu-items', {
			method: 'POST',
			body: JSON.stringify(data),
			headers: { 'Content-Type': 'application/json' },
		})

		if (res.ok) {
			toast.success('Запись сохранена')
		} else toast.error('Ошибка')

		setRedirectToItems(true)
	}

	if (redirectToItems) return redirect('/profile/menu-items')

	return (
		<div className='flex flex-col h-screen w-full'>
			<Toaster position='top-center' richColors />
			<Header />
			<div className='flex-grow'>
				<Nav></Nav>
				<Link
					href={'/profile/menu-items'}
					className=' relative text-white bg-gray-400 hover:bg-gray-500 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center'
				>
					Назад
				</Link>
				<MenuItemForm menuItem={null} onSubmit={handleNewItem} />
			</div>
			<Footer />
		</div>
	)
}
