import { timeout } from '@/app/page'
import Image from 'next/image'
import { Toaster, toast } from 'sonner'
//
export default function EditableImage({ link, setLink }) {
	const handleFileChange = async e => {
		const files = e.target.files
		if (files?.length === 1) {
			const data = new FormData()
			data.set('file', files[0])

			const uploadPromise = fetch('/api/upload', {
				method: 'POST',
				body: data,
			}).then(res => {
				if (res.ok) {
					return res.json().then(async link => {
						await timeout(3000)
						setLink(link)
					})
				}
				throw new Error('Ошибка при загрузке файла')
			})

			await toast.promise(uploadPromise, {
				loading: 'Загрузка...',
				success: 'Успешно',
				error: 'Ошибка',
			})
		}
	}

	return (
		<div className='w-[200px]'>
			{link && (
				<img
					className='shadow-md border-blue-50 border-2 outline-none w-full rounded-lg mb-5'
					src={link}
				></img>
			)}
			{!link && (
				<div className='shadow-md flex items-center justify-center h-[200px] border-blue-50 border-2 outline-none w-full rounded-lg mb-5'>
					<span className=''>Нет изображения</span>
				</div>
			)}
			<input
				className='block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100'
				id='file_input'
				type='file'
				accept='image/*'
				onChange={handleFileChange}
			></input>
		</div>
	)
}
