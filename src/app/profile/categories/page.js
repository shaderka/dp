'use client'
import Header from '@/app/components/layout/header'
import Footer from '@/app/components/layout/footer'
import Nav from '@/app/components/usernav'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Toaster, toast } from 'sonner'

export default function Categories() {
	const session = useSession()
	const { status } = session
	const isAdm = session?.data?.userData?.isAdmin
	const router = useRouter()

	const [newCat, setNewCat] = useState('')
	const [cats, setCats] = useState([])
	const [editedCat, setEditedCat] = useState(null)

	if (!isAdm) {
		router.push('/profile')
	}

	useEffect(() => {
		fetchCat()
	}, [])

	const fetchCat = () => {
		fetch('/api/categories').then(res => {
			res.json().then(categories => {
				setCats(categories)
			})
		})
	}

	const handleNewCat = async e => {
		e.preventDefault()

		const data = { name: newCat }
		if (editedCat) {
			data._id = editedCat._id
		}
		const res = await fetch('/api/categories', {
			method: editedCat ? 'PUT' : 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data),
		})
		const { status } = res
		if (res.ok) {
			if (editedCat) toast.success('Запись изменена')
			else toast.success('Категория создана')
			fetchCat()
			setNewCat('')
			setEditedCat(null)
		} else {
			if (status === 444) toast.warning('Запись уже существует')
			else toast.error('Ошибка')
		}
	}

	const handleDeleteClick = async _id => {
		const res = await fetch('/api/categories?_id=' + _id, {
			method: 'DELETE',
		})

		if (res.ok) toast.success('Запись удалена')
		else {
			if (res.status === 444) toast.warning('Запись используется')
			else toast.error('Ошибка')
		}

		fetchCat()
	}

	return (
		<div className='flex flex-col h-screen w-full'>
			<Toaster position='top-center' richColors />
			<Header />
			<div className='flex-grow'>
				<Nav></Nav>
				<form
					className='new-cat max-w-md mx-auto mt-10'
					onSubmit={handleNewCat}
				>
					<div className='relative z-0 grow mb-5 group mr-6'>
						{editedCat && (
							<svg
								className='absolute top-0 right-0 cursor-pointer'
								onClick={() => {
									setEditedCat(null)
									setNewCat('')
								}}
								xmlns='http://www.w3.org/2000/svg'
								x='0px'
								y='0px'
								width='20'
								height='20'
								viewBox='0 0 24 24'
							>
								<path d='M 12 2 C 6.4889971 2 2 6.4889971 2 12 C 2 17.511003 6.4889971 22 12 22 C 17.511003 22 22 17.511003 22 12 C 22 6.4889971 17.511003 2 12 2 z M 12 4 C 16.430123 4 20 7.5698774 20 12 C 20 16.430123 16.430123 20 12 20 C 7.5698774 20 4 16.430123 4 12 C 4 7.5698774 7.5698774 4 12 4 z M 8.7070312 7.2929688 L 7.2929688 8.7070312 L 10.585938 12 L 7.2929688 15.292969 L 8.7070312 16.707031 L 12 13.414062 L 15.292969 16.707031 L 16.707031 15.292969 L 13.414062 12 L 16.707031 8.7070312 L 15.292969 7.2929688 L 12 10.585938 L 8.7070312 7.2929688 z'></path>
							</svg>
						)}
						<input
							onChange={e => {
								setNewCat(e.target.value)
							}}
							type='text'
							name='newCat'
							id='newCat'
							className=' block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer'
							placeholder=' '
							value={newCat}
						/>
						<label
							htmlFor='newCat'
							className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
						>
							{editedCat ? 'Редактирование записи' : 'Новая категория'}
							{editedCat && (
								<>
									: <b>{editedCat.name}</b>
								</>
							)}
						</label>
					</div>
					<button
						type='submit'
						className='text-white bg-primary hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center mb-4'
					>
						{editedCat ? 'Изменить' : 'Добавить'}
					</button>
				</form>

				<div className='gap-1 p-2 mx-auto relative flex flex-col text-gray-700 bg-white shadow-md w-96 rounded-xl bg-clip-border'>
					{cats?.length > 0 &&
						cats.map(c => (
							<div
								key={c._id}
								role='button'
								className='cat my-1.5 flex items-center w-full  pr-1 leading-tight transition-all rounded-lg outline-none text-start hover:bg-gray-200 hover:bg-opacity-80 hover:text-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900'
							>
								<span
									className='ml-4 grow h-full leading-[50px]'
									onClick={() => {
										setEditedCat(c)
										setNewCat(c.name)
									}}
								>
									{c.name}
								</span>

								<div className='grid  ml-auto place-items-center justify-self-end'>
									<button
										className='relative z-10 h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-gray-500 transition-all hover:bg-gray-500/10 active:bg-blue-gray-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
										type='button'
										onClick={() => {
											toast.message('Вы действительно хотите удалить запись?', {
												action: {
													label: 'Да',
													onClick: () => {
														handleDeleteClick(c._id)
														setEditedCat(null)
														setNewCat('')
													},
												},
											})
										}}
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
					{cats?.length == 0 && (
						<div className='cat my-1.5 flex items-center w-full  pr-1 leading-tight transition-all rounded-lg outline-none text-start'>
							<span className='ml-4 grow h-full leading-[50px] text-center'>
								Нет записей
							</span>
						</div>
					)}
				</div>
			</div>
			<Footer />
		</div>
	)
}
