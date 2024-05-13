'use client'
import { useState } from 'react'

export default function menuItemFormPizza({
	sizes,
	setSizes,
	extrasPrices,
	setExtrasPrices,
	extrasList,
}) {
	const [isSizesOpen, setIsSizesOpen] = useState(false)
	const [isExtrasOpen, setIsExtrasOpen] = useState(false)

	const addSize = () => {
		setSizes(oldSizes => {
			return [...oldSizes, { name: '', price: 0 }]
		})
	}

	const addExtra = () => {
		setExtrasPrices(oldExtrasPrices => {
			return [...oldExtrasPrices, { extra: extrasList?.[0]._id, price: 0 }]
		})
	}

	const editSize = (e, index, prop) => {
		const newValue = e.target.value
		setSizes(prevSizes => {
			const newSizes = [...prevSizes]
			newSizes[index][prop] = newValue
			return newSizes
		})
	}

	const editExtra = (e, index, prop) => {
		const newValue = e.target.value
		setExtrasPrices(prevExtras => {
			const newExtras = [...prevExtras]
			newExtras[index][prop] = newValue
			return newExtras
		})
	}

	const calcPx = x => {
		return x * 65 + 50
	}

	const removeSize = sizeIndex => {
		setSizes(prev => prev.filter((v, index) => index !== sizeIndex))
	}

	const removeExtra = extraIndex => {
		setExtrasPrices(prev => prev.filter((v, index) => index !== extraIndex))
	}

	return (
		<>
			<div className='bg-gray-50 p-2 rounded-md mb-6 shadow-md'>
				<button
					onClick={() => setIsSizesOpen(prev => !prev)}
					className='inline-flex p-1 border-0 justify-start'
					type='button'
				>
					{isSizesOpen && (
						<svg
							className='w-6 h-6 mr-4 text-gray-800 dark:text-white'
							aria-hidden='true'
							xmlns='http://www.w3.org/2000/svg'
							width='24'
							height='24'
							fill='none'
							viewBox='0 0 24 24'
						>
							<path
								stroke='currentColor'
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='2'
								d='m5 15 7-7 7 7'
							/>
						</svg>
					)}
					{!isSizesOpen && (
						<svg
							className='w-6 h-6 mr-4 text-gray-800 dark:text-white'
							aria-hidden='true'
							xmlns='http://www.w3.org/2000/svg'
							width='24'
							height='24'
							fill='none'
							viewBox='0 0 24 24'
						>
							<path
								stroke='currentColor'
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='2'
								d='m19 9-7 7-7-7'
							/>
						</svg>
					)}
					<span>Размеры</span>
					<span>({sizes?.length})</span>
				</button>
				<div className={isSizesOpen ? 'block' : 'hidden'}>
					{sizes?.length > 0 &&
						sizes.map((size, index) => (
							<div key={index} className='flex'>
								<div className='relative z-0 grow mb-5 group mr-6'>
									<input
										onChange={e => {
											editSize(e, index, 'name')
										}}
										type='text'
										name='sizeName'
										id='sizeName'
										className=' block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer'
										placeholder=' '
										value={size.name}
									/>
									<label
										htmlFor='sizeName'
										className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
									>
										Название
									</label>
								</div>
								<div className='relative z-0 grow mb-5 group mr-6'>
									<input
										onChange={e => {
											editSize(e, index, 'price')
										}}
										type='text'
										name='sizePrice'
										id='sizePrice'
										className=' block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer'
										placeholder=' '
										value={size.price}
									/>
									<label
										htmlFor='sizePrice'
										className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
									>
										Цена
									</label>
								</div>
								<div className='grid  ml-auto place-items-center justify-self-end'>
									<button
										className='relative z-10 h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-gray-500 transition-all hover:bg-gray-500/10 active:bg-blue-gray-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
										type='button'
										onClick={() => removeSize(index)}
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
					<div className='grid  ml-auto place-items-center justify-self-end'>
						<button
							className='relative z-10 h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-gray-500 transition-all hover:bg-gray-500/10 active:bg-blue-gray-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
							type='button'
							onClick={addSize}
						>
							<span className='absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2'>
								<svg
									className='w-6 h-6 text-gray-800 dark:text-white'
									aria-hidden='true'
									xmlns='http://www.w3.org/2000/svg'
									width='24'
									height='24'
									fill='none'
									viewBox='0 0 24 24'
								>
									<path
										stroke='currentColor'
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth='2'
										d='M5 12h14m-7 7V5'
									/>
								</svg>
							</span>
						</button>
					</div>
				</div>
			</div>
			<div className='bg-gray-50 p-2 rounded-md mb-6 shadow-md'>
				<button
					onClick={() => setIsExtrasOpen(prev => !prev)}
					className='inline-flex p-1 border-0 justify-start '
					type='button'
				>
					{isExtrasOpen && (
						<svg
							className='w-6 h-6 mr-4 text-gray-800 dark:text-white'
							aria-hidden='true'
							xmlns='http://www.w3.org/2000/svg'
							width='24'
							height='24'
							fill='none'
							viewBox='0 0 24 24'
						>
							<path
								stroke='currentColor'
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='2'
								d='m5 15 7-7 7 7'
							/>
						</svg>
					)}
					{!isExtrasOpen && (
						<svg
							className='w-6 h-6 mr-4 text-gray-800 dark:text-white'
							aria-hidden='true'
							xmlns='http://www.w3.org/2000/svg'
							width='24'
							height='24'
							fill='none'
							viewBox='0 0 24 24'
						>
							<path
								stroke='currentColor'
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='2'
								d='m19 9-7 7-7-7'
							/>
						</svg>
					)}
					<span>Допы</span>
					<span>({extrasPrices?.length})</span>
				</button>
				<div
					className={
						(isExtrasOpen
							? `max-h-[${calcPx(extrasPrices?.length)}px]`
							: 'max-h-0') + ' transition-all duration-1000 overflow-hidden'
					}
				>
					{extrasPrices?.length > 0 &&
						extrasPrices.map((extra, index) => (
							<div key={index} className={'flex h-[65px] pt-[5px]'}>
								<div className='relative z-0 grow group mr-6'>
									<select
										onChange={e => {
											editExtra(e, index, 'extra')
										}}
										name='extras'
										id='extras'
										className=' block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer'
										placeholder=' '
										value={extra.extra}
									>
										{extrasList?.length > 0 &&
											extrasList.map(e => (
												<option key={e._id} value={e._id}>
													{e.name}
												</option>
											))}
									</select>
									<label
										htmlFor='category'
										className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
									>
										Категория
									</label>
								</div>
								<div className='relative z-0 grow group mr-6'>
									<input
										onChange={e => {
											editExtra(e, index, 'price')
										}}
										type='text'
										name='extraPrice'
										id='extraPrice'
										className=' block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer'
										placeholder=' '
										value={extra.price}
									/>
									<label
										htmlFor='extraPrice'
										className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
									>
										Цена
									</label>
								</div>
								<div className='grid  ml-auto place-items-center justify-self-end'>
									<button
										className='relative z-10 h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-gray-500 transition-all hover:bg-gray-500/10 active:bg-blue-gray-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
										type='button'
										onClick={() => removeExtra(index)}
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
					<div className='grid  ml-auto place-items-center justify-self-end'>
						<button
							className='relative z-10 h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-gray-500 transition-all hover:bg-gray-500/10 active:bg-blue-gray-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
							type='button'
							onClick={addExtra}
						>
							<span className='absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2'>
								<svg
									className='w-6 h-6 text-gray-800 dark:text-white'
									aria-hidden='true'
									xmlns='http://www.w3.org/2000/svg'
									width='24'
									height='24'
									fill='none'
									viewBox='0 0 24 24'
								>
									<path
										stroke='currentColor'
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth='2'
										d='M5 12h14m-7 7V5'
									/>
								</svg>
							</span>
						</button>
					</div>
				</div>
			</div>
		</>
	)
}
