'use client'

import Link from 'next/link'
import { useState } from 'react'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
	const [tel, setTel] = useState('')
	const [pass, setPass] = useState('')
	const [error, setError] = useState('')
	const router = useRouter()

	const handleSubmit = async e => {
		e.preventDefault()

		try {
			const res = await signIn('credentials', {
				tel,
				pass,
				redirect: false,
			})

			if (res.error) {
				setError('Неверные данные')
				return
			}
			router.push('/')
			router.refresh()
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<>
			<form
				onSubmit={handleSubmit}
				className='login align-middle rounded-lg shadow-lg py-8 px-10 mx-auto font-medium text-center'
			>
				<div className='input font-medium mb-5'>
					<label htmlFor='tel'>Телефон</label>
					<input
						onChange={e => setTel(e.target.value)}
						type='tel'
						id='tel'
						className='outline-none shadow-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 '
					></input>
				</div>
				<div className='input font-medium mb-5'>
					<label htmlFor='pass'>Пароль</label>
					<input
						onChange={e => setPass(e.target.value)}
						type='password'
						id='pass'
						className='outline-none shadow-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 '
					></input>
				</div>
				<button
					type='submit'
					className='text-white bg-primary hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-4'
				>
					Войти
				</button>
				{error && (
					<div className='err py-1 px-3 mb-4 bg-red-500 text-white rounded-lg'>
						{error}
					</div>
				)}
				<p>
					Нет аккаунта?
					<Link className='text-primary hover:underline' href={'/register'}>
						Зарегистрироваться
					</Link>
				</p>
			</form>
		</>
	)
}
