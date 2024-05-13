export default function MenuItemTile({ onAddToCart, ...item }) {
	const { image, description, name, basePrice, sizes, extrasPrices, category } =
		item
	const hasSizesOrExtras = category == '661fb2d5f22baee8656bb3ae'

	const lowestPrice = Math.min.apply(
		Math,
		sizes.map(s => {
			return s.price
		})
	)

	return (
		<div className='p-4 hover:shadow-lg rounded-md transition-all duration-300 ease-in-out'>
			<div className='text-center'>
				<img src={image} className='max-h-auto max-h-48 block mx-auto' />
			</div>
			<h4 className='font-semibold text-xl my-3'>{name}</h4>
			<p className='text-gray-500 text-sm line-clamp-3'>{description}</p>
			<div className='flex justify-between items-center mt-10'>
				<span className='text-lg font-medium'>
					{!hasSizesOrExtras ? basePrice + ' ₽' : 'от ' + lowestPrice + ' ₽'}
				</span>
				<button
					onClick={onAddToCart}
					className='text-primary bg-orange-100 hover:bg-orange-200 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center'
				>
					<span>{hasSizesOrExtras ? 'Выбрать' : 'В корзину'}</span>
				</button>
			</div>
		</div>
	)
}
