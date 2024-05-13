'use client'
import Link from 'next/link'
import { signOut } from 'next-auth/react'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

export default function Acc() {
	const session = useSession()
	const { status } = session
	const [name, setName] = useState('')
	useEffect(() => {
		if (status === 'authenticated')
			fetch('/api/profile').then(response => {
				response?.json().then(data => {
					setName(data.fio)
				})
			})
	}, [session, status])

	return (
		<>
			<Link className='profile' href='/profile'>
				<img
					width='25'
					height='25'
					src='https://img.icons8.com/ios/50/user-male-circle--v1.png'
					alt='user-male-circle--v1'
				/>
				<p className='text-md font-medium ml-2'>{name}</p>
			</Link>
			<button
				onClick={() => signOut()}
				className='text-primary hover:text-white border border-primary hover:bg-primary focus:ring-4
						focus:ring-orange-200 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center'
			>
				Выйти
			</button>
		</>
	)
}
