'use client'

import Link from 'next/link'
import Header from '@/app/components/layout/header'
import Footer from '@/app/components/layout/footer'
import Nav from '@/app/components/usernav'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Toaster, toast } from 'sonner'

export default function UsersPage() {
	const [users, setUsers] = useState([])

	const session = useSession()
	const { status } = session
	const isAdm = session?.data?.userData?.isAdmin
	const router = useRouter()

	if (!isAdm) {
		router.push('/profile')
	}

	useEffect(() => {
		fetch('/api/users').then(res => {
			res.json().then(users => {
				setUsers(users)
			})
		})
	}, [])

	return (
		<div className='flex flex-col h-screen w-full'>
			<Toaster position='top-center' richColors />
			<Header />
			<div className='flex-grow'>
				<Nav></Nav>
				<div className='max-w-[600px] mx-auto'>
					<a
						href={'https://dodo-shaderka.vercel.app/logs.txt'}
						//href={'http://localhost:3000/logs.txt'}
						download='логи'
						className=' inline-flex gap-2 items-center text-white bg-primary hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
					>
						<img
							className='h-[20px]'
							src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAjUlEQVR4nO2VMQrDIBRAvYZThi4ZumRxye0r6SEKydChQ6DQG7wgpK2xRYL9NkN84CS859dBpXYD0PHG5ggsKIEPCFDSUAJ/vyJgCKUR+pSAAe4r5A+gTZ2iAcaI3B3AJMm9SA1cv8hvwPEnuRepgIsnd+9zEJE/ATRwnpd+bRTEcL8UctjcgZPc6FszAT/X8tqE+OKaAAAAAElFTkSuQmCC'
						/>
						Логи
					</a>
					<div className='gap-1 p-2 mt-6 mx-auto relative flex flex-col text-gray-700 bg-white shadow-md rounded-xl bg-clip-border'>
						{users?.length > 0 &&
							users.map(c => (
								<Link
									href={'/profile/users/' + c._id}
									key={c._id}
									role='button'
									className='cat my-1.5 flex items-center justify-between gap-7 w-full  pr-1 leading-tight transition-all rounded-lg outline-none text-start hover:bg-gray-200 hover:bg-opacity-80 hover:text-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900'
								>
									<span className='ml-4 h-full leading-[50px]'>{c.fio}</span>

									<span className='ml-4 h-full leading-[50px]'>
										<b>{c.tel}</b>
									</span>

									<span className='ml-4 h-full leading-[50px]'>{c.email}</span>
								</Link>
							))}
						{users?.length == 0 && (
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
