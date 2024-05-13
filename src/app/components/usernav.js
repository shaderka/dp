'use client'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export default function userNav() {
	const [isAdm, setIsAdm] = useState(false)
	const path = usePathname()

	const session = useSession()
	const isAdmin = session?.data?.userData?.isAdmin

	// fetch('api/profile').then(response => {
	// 	response?.json().then(data => {
	// 		setIsAdm(data.admin)
	// 	})
	// })

	return (
		<div className='flex rounded-md justify-center mb-10' role='group'>
			<Link
				href={'/profile'}
				className={
					(path.endsWith('profile') ? 'active ' : ' ') +
					' rounded-s-lg px-4 py-2 text-sm font-medium text-gray-600 bg-transparent border border-gray-600 hover:bg-primary hover:text-white focus:z-10 focus:ring-2 focus:ring-orange-300 focus:bg-primary focus:text-white hover:border-primary focus:border-primary'
				}
			>
				Профиль
			</Link>
			{isAdmin && (
				<>
					<Link
						href={'/profile/categories'}
						className={
							(path.endsWith('categories') ? 'active ' : ' ') +
							'px-4 py-2 text-sm font-medium text-gray-600 bg-transparent border-t border-b border-r border-gray-600 hover:bg-primary hover:text-white focus:z-10 focus:ring-2 focus:ring-orange-300 focus:bg-primary focus:text-white hover:border-primary focus:border-primary'
						}
					>
						Категории
					</Link>
					<Link
						href={'/profile/extras'}
						className={
							(path.endsWith('extras') ? 'active ' : ' ') +
							'px-4 py-2 text-sm font-medium text-gray-600 bg-transparent border-t border-b border-r border-gray-600 hover:bg-primary hover:text-white focus:z-10 focus:ring-2 focus:ring-orange-300 focus:bg-primary focus:text-white hover:border-primary focus:border-primary'
						}
					>
						Допы
					</Link>
					<Link
						href={'/profile/menu-items'}
						className={
							(path.includes('menu-items') ? 'active ' : ' ') +
							'px-4 py-2 text-sm font-medium text-gray-600 bg-transparent border-t border-b border-r border-gray-600 hover:bg-primary hover:text-white focus:z-10 focus:ring-2 focus:ring-orange-300 focus:bg-primary focus:text-white hover:border-primary focus:border-primary'
						}
					>
						Пункты меню
					</Link>
					<Link
						href={'/profile/users'}
						className={
							(path.includes('users') ? 'active ' : ' ') +
							'px-4 py-2 text-sm font-medium text-gray-600 bg-transparent border-t border-b border-r border-gray-600 hover:bg-primary hover:text-white focus:z-10 focus:ring-2 focus:ring-orange-300 focus:bg-primary focus:text-white hover:border-primary focus:border-primary'
						}
					>
						Пользователи
					</Link>
					<Link
						href={'/profile/tickets'}
						className={
							(path.includes('tickets') ? 'active ' : ' ') +
							'px-4 py-2 text-sm font-medium text-gray-600 bg-transparent border-t border-b border-gray-600 hover:bg-primary hover:text-white focus:z-10 focus:ring-2 focus:ring-orange-300 focus:bg-primary focus:text-white hover:border-primary focus:border-primary'
						}
					>
						Тикеты
					</Link>
				</>
			)}
			<Link
				href={'/profile/orders'}
				className={
					(path.includes('orders') ? 'active ' : ' ') +
					'px-4 py-2 text-sm font-medium text-gray-600 bg-transparent border border-gray-600 rounded-e-lg hover:bg-primary hover:text-white focus:z-10 focus:ring-2 focus:ring-orange-300 focus:bg-primary focus:text-white hover:border-primary focus:border-primary'
				}
			>
				Заказы
			</Link>
		</div>
	)
}
