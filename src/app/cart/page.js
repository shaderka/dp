'use client'

import { useSelectedLayoutSegment } from 'next/navigation'
import { useContext, useEffect, useState } from 'react'
import { CartContext, cartProductPrice } from '../Providers'
import { Toaster, toast } from 'sonner'
import Header from '@/app/components/layout/header'
import Footer from '@/app/components/layout/footer'
import { useSession } from 'next-auth/react'

export default function CartPage() {
	const session = useSession()
	const { status, update } = session

	const { cartProducts, removeCartProduct, clearCart } = useContext(CartContext)
	const [address, setAddress] = useState(' ')
	const [extras, setExtras] = useState([])

	let subtotal = 0
	for (const p of cartProducts) {
		subtotal += cartProductPrice(p)
	}

	useEffect(() => {
		fetch('/api/extras').then(res => {
			res.json().then(extras => setExtras(extras))
		})
	}, [])

	const handelCheckout = async e => {
		e.preventDefault()

		fetch('/api/checkout', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ cartProducts, address }),
		}).then(async res => {
			if (res.ok) {
				clearCart()
				toast.success('Заказ создан')
			} else toast.error('Ошибка при создании заказа')
		})
	}

	const nameProduct = product => {
		const baseName = product.name
		const sizeName =
			product.category == '661fb2d5f22baee8656bb3ae'
				? ', ' + product.size.name + ' '
				: ''
		let extrasName = ''
		if (product.category == '661fb2d5f22baee8656bb3ae')
			product.extras.map(e => {
				extrasName +=
					'+' + extras.filter(ex => ex._id == e.extra)[0]?.name + ' '
			})
		return baseName + sizeName + extrasName
	}

	return (
		<div className='flex flex-col h-screen w-full'>
			<Toaster position='top-center' richColors />
			<Header />
			<div className='flex-grow'>
				{cartProducts?.length === 0 ? (
					<div className=' w-full text-center'>
						<img
							className='select-none mx-auto'
							src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAC2ElEQVR4nO2bv2sUQRTHP+dPBH+ABkQRkQNFawsVg4VF1CaNsVcrG8UIMVqowSI5wYtaWKhJwMLGv0BQGwshqSQKIqhHohDwR6FIMIoZGXjqY7lVuJ29nXH2A49ddo/ZN1/ezZs3swslJSUlJb/ZAvQB/Qnrk3v/Pa8Ak2IviVwAQwRsBs4BNWVRCdCMUgD+iNAfmB0F1pERE7h9AwaASqwCGLFBFwLUArJLwCPl+/dW5zIm4CywALin/D8dmwCWE8r/a0QowJjy/0xsAiwGPir/d8YmwAHl+3SrqdAELIAO/8utNmICFSAZ/jtiE2C/i/APWYBR5Xc9S0MmQAFs+H/IOvqHLICz8A9VAGfhH6IATsM/RAH2KX/fZA3/EAUYUf4Ou2jQBCTAIuCd8ndXbAJ0uQ7/0AS45Tr8QxIgl/APSYBcwt8yJ43ao8/cVAJcddlwDfgCDOF3+L9XAuwmMrpU59/KanBUPFACXCEyjqjOzwPbiIRlwFnghxLAVoG5UQH2AL0F7/heBO4CM4kUPQmszKvzVWDiH5uPRdpjYG1ene8ApjzoZDOblq0vmwZzo64e+FXKzSJ3fS8Ax2SZeyFtoKEEOEiEzCkBlhMhDSVADxFST4wBo21IdcdlMdOLKW1HgVngKdCJB1SB8YJEsGNQNx5QUTPBvFPdHeCzEsGerycyNgGvXezvh0y3EuC5T3+BXjl3tu6Wwiopca0AsxRINaUYmpB7LtgInGryMuNDedZ9PE2DU/KbLKxWEy571CwFtgNLKIh6k2JoRM5dDVCDqi1b53tFI6UY6lHX7WidhWeqrcOJe+dlVfo6nhVDKxKRkQW9n6/f77dT4U9yfV72/r0phg45jIDJlAjQr7rYdX9viqExx2PAQOIDh9uy0zOrrt/A4yywJuMz7GLmi788Y6boqXA1pRgadzgP2JD4wOGXPQG24gGVNs0E7bb2SZkU7c17TeAn1Z2pSI7IhVYAAAAASUVORK5CYII='
						></img>
						<h1 className='text-4xl font-bold text-gray-500'>
							Ваша корзина пуста
						</h1>
					</div>
				) : (
					<div className='flex w-hull max-[700px]:flex-col'>
						<div className='grow pr-10'>
							{cartProducts.map((product, index) => (
								<div
									key={index}
									className='cat my-1.5 flex items-center w-full  pr-1 leading-tight transition-all rounded-lg outline-none text-start hover:bg-gray-200 hover:bg-opacity-80 hover:text-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900'
								>
									<img
										src={product.image}
										className='rounded-md ml-1 w-[50px]'
									/>
									<span className='ml-4 grow h-full leading-[50px]'>
										{nameProduct(product)}
									</span>
									<span className='ml-4 h-full leading-[50px] '>
										{cartProductPrice(product)}₽
									</span>
									<div className='grid  ml-2 place-items-center justify-self-end'>
										<button
											className='relative z-10 h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-gray-500 transition-all hover:bg-gray-500/10 active:bg-blue-gray-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
											type='button'
											onClick={() => removeCartProduct(index)}
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
						</div>
						<form
							onSubmit={handelCheckout}
							className=' float-right rounded-md w-[40%] shadow-lg p-10 h-fit sticky top-6 bg-white z-30 max-[700px]:w-[95%] max-[700px]:bottom-0 max-[700px]:mx-auto'
						>
							<div className='relative z-0 w-full mb-5 group'>
								<input
									onChange={e => setAddress(e.target.value)}
									type='text'
									name='address'
									id='address'
									value={address}
									className='block mb-10 py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer'
									placeholder={
										'                        Улица, дом, квартира, этаж, домофон '
									}
								/>
								<label
									htmlFor='address'
									className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
								>
									Адрес
								</label>
							</div>
							<h3 className='text-xl font-medium'>
								Всего: <span>{subtotal}₽</span>
							</h3>
							<button
								type='submit'
								className='text-white mt-4 bg-primary hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm w-auto px-5 py-2.5 text-center '
							>
								Оформить заказ
							</button>
						</form>
					</div>
				)}
			</div>
			<Footer />
		</div>
	)
}
