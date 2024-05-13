'use client'
import { CartContext } from '@/app/Providers'
import { useContext, useDeferredValue, useEffect, useState } from 'react'
import MenuItemTile from './menuItemTile'

export default function MenuItem(menuItem, extrasList) {
	const { image, name, description, basePrice, sizes, extrasPrices, category } =
		menuItem

	const [selectedSize, setSelectedSize] = useState(sizes?.[0] || null)
	const [selectedExtras, setSelectedExtras] = useState([])
	const [showPopup, setShowPopup] = useState(false)
	const [extras, setExtras] = useState([])
	const { addToCart } = useContext(CartContext)

	useEffect(() => {
		fetch('/api/extras').then(res => {
			res.json().then(extras => {
				setExtras(extras)
			})
		})
	}, [])

	useEffect(() => {
		if (showPopup) document.body.classList.add('overflow-hidden')
		else document.body.classList.remove('overflow-hidden')
	}, [showPopup])

	const handleAddToCartClick = async () => {
		const hasOptions = category == '661fb2d5f22baee8656bb3ae'

		if (hasOptions && !showPopup) {
			setShowPopup(true)
			return
		}

		addToCart(menuItem, selectedSize, selectedExtras)
		//	await new Promise(resolve => setTimeout(resolve, 1000))

		setShowPopup(false)
	}

	const handleExtraClick = (ev, extra) => {
		const checked = ev.target.checked
		if (checked) {
			setSelectedExtras(prev => [...prev, extra])
		} else {
			setSelectedExtras(prev => {
				return prev.filter(e => e.extra !== extra.extra)
			})
		}
	}

	let selectedPrice = selectedSize ? selectedSize.price : basePrice
	if (selectedExtras?.length > 0) {
		for (const e of selectedExtras) {
			selectedPrice += e.price
		}
	}

	const findExtraName = id => {
		return extras.find(x => x._id == id).name
	}

	return (
		<>
			{showPopup && (
				<div
					onClick={() => {
						console.log(selectedExtras)
						setShowPopup(false)
					}}
					className='fixed inset-0 bg-black/80 flex items-center justify-center z-30'
				>
					<div
						onClick={e => e.stopPropagation()}
						className='my-8 bg-white p-2 rounded-lg max-w-[500px]'
					>
						<div
							className='overflow-y-scroll p-2 max-h-[calc(100vh-100px)]'
							// style={{ maxHeight: 'calc(100vh-100px)' }}
						>
							<img src={image} className='mx-auto max-h-72'></img>
							<h2 className='text-lg font-bold text-center mb-2'>{name}</h2>
							<p className='text-center text-gray-500 text-sm mb-\2'>
								{description}
							</p>

							{sizes?.length > 0 && (
								<div className='py-2 text-center'>
									<h3 className='text-center text-gray-700'>Выберите размер</h3>
									<div className='inline-flex min-w-[66%]'>
										{sizes.map(size => (
											<>
												<input
													className=' hidden'
													type='radio'
													id={size.name}
													name='size'
													onChange={() => setSelectedSize(size)}
													checked={selectedSize?.name === size.name}
												></input>
												<label
													key={size._id}
													htmlFor={size.name}
													className={
														(sizes.indexOf(size) == 0 ? 'rounded-l-md ' : '') +
														(sizes.indexOf(size) == sizes.length - 1
															? 'rounded-r-md '
															: '') +
														' text-center grow bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 cursor-pointer transition-all duration-150 ease-in-out'
													}
												>
													{size.name}
												</label>
											</>
										))}
									</div>
								</div>
							)}
							{extrasPrices?.length > 0 && (
								<div className='py-2 mt-6'>
									<h3 className='text-center text-gray-700'>
										Добавить по вкусу
									</h3>
									<div className='grid grid-cols-3 gap-2'>
										{extrasPrices.map(e => (
											<label
												htmlFor={e._id}
												key={e._id}
												className='extra-box inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 transition-all duration-300'
											>
												<input
													id={e._id}
													className='hidden peer'
													type='checkbox'
													onChange={ev => handleExtraClick(ev, e)}
													name={e.extra}
													checked={selectedExtras
														.map(ev => ev._id)
														.includes(e._id)}
												/>
												{findExtraName(e.extra)} +{e.price}₽
											</label>
										))}
									</div>
								</div>
							)}
							<button
								onClick={handleAddToCartClick}
								className='float-right bottom-2 mt-4 text-primary bg-orange-100 hover:bg-orange-200 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center'
							>
								<span>{'В корзину за ' + selectedPrice + '₽'}</span>
							</button>
						</div>
					</div>
				</div>
			)}
			<MenuItemTile onAddToCart={handleAddToCartClick} {...menuItem} />
		</>
	)
}
