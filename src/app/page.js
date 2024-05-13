'use client'

import { Sugar } from 'react-preloaders'
import Header from './components/layout/header'
import Footer from './components/layout/footer'
import Head from 'next/head'
import FloatingPizza from './components/floatingPizza'
import Filter from './components/filter'
import { useEffect, useState } from 'react'
import Categories from './profile/categories/page'
import MenuItemTile from './components/layout/menuItemTile'
import MenuItem from './components/layout/menuItem'
import Preloader from './components/preloader'

export async function timeout(delay) {
	return new Promise(res => setTimeout(res, delay))
}

export default function Home() {
	const [cats, setCats] = useState([])
	const [menuItems, setMenuItems] = useState([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		fetch('/api/categories').then(res => {
			res.json().then(cats => setCats(cats))
		})
		fetch('/api/menu-items').then(res => {
			res.json().then(async items => {
				setMenuItems(items)
				await timeout(1000)
				setLoading(false)
			})
		})
	}, [])

	cats.map(c => {
		if (c.name == 'Другое') cats.push(cats.splice(cats.indexOf(c), 1)[0])
		if (c.name == 'Пиццы') cats.unshift(cats.splice(cats.indexOf(c), 1)[0])
	})

	return (
		<div className='flex flex-col h-screen'>
			{loading && <Preloader />}

			<Header />
			<div className='flex-grow'>
				<Filter />
				{cats?.length > 0 &&
					cats.map(
						c =>
							menuItems.filter(item => item.category == c._id).length > 0 && (
								<div key={c._id} className=' mt-12 relative'>
									<div className='absolute -top-[120px]' id={c.name}></div>
									<h1 className='text-4xl font-extrabold'>{c.name}</h1>
									<div className='grid grid-cols-3 gap-4 mt-6 max-[930px]:grid-cols-2 max-[640px]:grid-cols-1'>
										{menuItems
											.filter(item => item.category == c._id)
											.map(item => (
												<MenuItem key={item._id} {...item} />
											))}
									</div>
								</div>
							)
					)}
			</div>
			<Footer />
		</div>
	)
}
