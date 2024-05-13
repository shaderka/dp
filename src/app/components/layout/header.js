'use client'
import Link from 'next/link'
// import { authOptions } from '@/app/api/auth/[...nextauth]/route'
// import { getServerSession } from 'next-auth'
import Acc from '../account'
import { useSession } from 'next-auth/react'

export default function header() {
	const { status } = useSession()

	return (
		<>
			<header className='flex items-center pt-5 justify-between'>
				<Link className='logo text-primary font-semibold' href={'/'}>
					DODO <span className=' max-[700px]:hidden'>PIZZA</span>
				</Link>
				<nav className='flex gap-4 items-center'>
					<Link href={'/'}>О нас</Link>
					<Link href={'/'}>Контакты</Link>
					{status != 'unauthenticated' ? (
						<Acc></Acc>
					) : (
						<Link
							className='text-primary hover:text-white border border-primary hover:bg-primary focus:ring-4
						focus:ring-orange-200 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center'
							href={'/login'}
						>
							Войти
						</Link>
					)}
				</nav>
			</header>
			<span className='block my-4 border-t border-orange-gray-50' />
		</>
	)
}
