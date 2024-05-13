import dateFormat, { masks } from 'dateformat'

export default function MessageBox({ message, currentUser, user }) {
	const myMessage = message?.sender == currentUser.id

	return (
		<div
			className={'flex gap-3 items-start' + (myMessage ? ' justify-end' : '')}
		>
			<div className={'flex flex-col gap-2' + (myMessage ? ' items-end' : '')}>
				<p className=' text-gray-700 text-sm'>
					{user?.fio},{' '}
					{dateFormat(new Date(message?.createdAt || null), 'HH:MM')}
				</p>
				{message?.text ? (
					<p
						className={
							'max-w-[400px] p-4 rounded-lg break-words' +
							(myMessage ? ' bg-blue-600 text-white' : ' bg-gray-200')
						}
					>
						{message?.text}
					</p>
				) : (
					<div
						onClick={() => window.open(message?.photo)}
						className=" relative  cursor-pointer before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-black/20 before:rounded-lg before:content-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAABLklEQVR4nO2UMU7DQBBFXSEQoQiEjgIkkmskpCdcAcEhEAk9zm2Cwy2ggAKXQBOgTg7w0Ci/sFY7jk0RUeRLK1n75/8Z78xukmzwrwHsA9dABuTAQivX3pXF/MV4B7iT2SpYzMg0Vc2PgGfq4xU4WWXeAb4j4gnQBXa1ejqiED9A2zM/BD4jopuSgoaRePNoxYIfY5UnS24LGANfwAxIbU/cNKLLQvML51y74s0wRCruzNEOigls7GJoiLeqQ8zE7TnafK0JBk5Qr+SI7sX1He152IfMaxbLJqf6k7DJseF4iE1RC/iIBA9LxtRue4h34MATtJ2LNtW0NLT6TuWmPfUKKj4VT9THC3Bcal5Isq1buqhgPAduTVPJPEjUBC71Fr3JbK7vibhmbeMN1opf3VjSfhroNRYAAAAASUVORK5CYII=')] before:hidden before:items-center before:justify-center hover:before:flex"
					>
						<img
							src={message?.photo}
							className='rounded-lg max-w-[200px] max-h-[200px]'
						/>
					</div>
				)}
			</div>
		</div>
	)
}
