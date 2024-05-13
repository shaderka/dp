'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function RegisterPage() {
	const [fio, setFio] = useState('')
	const [tel, setTel] = useState('')
	const [email, setEmail] = useState('')
	const [pass, setPass] = useState('')
	const [repass, setRepass] = useState('')
	const [error, setError] = useState('')
	const router = useRouter()

	const handleSubmit = async e => {
		e.preventDefault()

		if (!fio || !tel || !email || !pass || !repass) {
			setError('Все поля должны быть заполнены')
			return
		} else if (pass !== repass) {
			setError('Пароли должны совпадать')
			return
		} else {
			setError('')
			try {
				const resUE = await fetch('api/userExists', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ email, tel }),
				})

				const { user } = await resUE.json()

				if (user) {
					setError('Пользователь уже существует')
					return
				}

				const res = await fetch('api/register', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						fio,
						tel,
						email,
						pass,
					}),
				})

				if (res.ok) {
					const form = e.target
					form.reset()
					router.push('/')
				} else {
					console.log('Регистрация пользователя не удалась')
				}
			} catch (error) {
				console.log('Ошибка при регистрации: ', error)
			}
		}
	}

	return (
		<>
			<form
				onSubmit={handleSubmit}
				className='login reg align-middle rounded-lg shadow-lg py-8 px-10 mx-auto font-medium text-center'
			>
				<div className='input font-medium mb-5'>
					<label htmlFor='fio'>ФИО</label>
					<input
						type='text'
						id='fio'
						onChange={e => setFio(e.target.value)}
						className='outline-none shadow-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 '
					></input>
				</div>
				<div className='input font-medium mb-5'>
					<label htmlFor='tel'>Телефон</label>
					<input
						type='tel'
						id='tel'
						onChange={e => setTel(e.target.value)}
						className='outline-none shadow-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 '
					></input>
				</div>
				<div className='input font-medium mb-5'>
					<label htmlFor='email'>Email</label>
					<input
						type='email'
						id='email'
						onChange={e => setEmail(e.target.value)}
						placeholder='test@example.com'
						className='outline-none shadow-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 '
					></input>
				</div>
				<div className='input font-medium mb-5'>
					<label htmlFor='pass'>Пароль</label>
					<input
						type='password'
						id='pass'
						onChange={e => setPass(e.target.value)}
						className='outline-none shadow-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 '
					></input>
				</div>
				<div className='input font-medium mb-5'>
					<label htmlFor='repass'>Повторите пароль</label>
					<input
						type='password'
						id='repass'
						onChange={e => setRepass(e.target.value)}
						className='outline-none shadow-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 '
					></input>
				</div>
				<button
					type='submit'
					className='text-white bg-primary hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-4'
				>
					Зарегистрироваться
				</button>
				{error && (
					<div className='err py-1 px-3 mb-4 bg-red-500 text-white rounded-lg'>
						{error}
					</div>
				)}

				<p>
					Есть аккаунт?
					<Link className='text-primary hover:underline' href={'/login'}>
						Войти
					</Link>
				</p>
			</form>
		</>
	)
}
