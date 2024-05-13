'use client'

import Header from '@/app/components/layout/header'
import Footer from '@/app/components/layout/footer'
import Nav from '@/app/components/usernav'
import { useSession } from 'next-auth/react'
import { useParams, useRouter, redirect } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Toaster, toast } from 'sonner'
import Link from 'next/link'
import Image from 'next/image'
import MenuItemForm from '@/app/components/layout/menuItemForm'

export default function EditItemPage() {
	const { id } = useParams()

	const [menuItem, setMenuItem] = useState({})
	const [myItem, setMyItem] = useState(null)
	const [redirectToItems, setRedirectToItems] = useState(false)

	const session = useSession()
	const { status } = session
	const isAdm = session?.data?.userData?.isAdmin
	const router = useRouter()

	useEffect(() => {
		fetch('/api/menu-items').then(res => {
			res.json().then(items => {
				const item = items.find(i => i._id === id)
				setMyItem(item)
			})
		})
	}, [])

	// useEffect(() => {
	// 	console.log(myItem)
	// }, [myItem])

	const handleEditItem = async (e, data) => {
		e.preventDefault()
		data = { ...data, _id: id }
		const res = await fetch('/api/menu-items', {
			method: 'PUT',
			body: JSON.stringify(data),
			headers: { 'Content-Type': 'application/json' },
		})
		if (res.ok) toast.success('Запись сохранена')
		setRedirectToItems(true)
	}

	if (!isAdm) {
		router.push('/profile')
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
				<MenuItemForm onSubmit={handleEditItem} menuItem={myItem} />
			</div>
			<Footer />
		</div>
	)
}
