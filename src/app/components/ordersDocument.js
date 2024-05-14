'use client'

import Docxtemplater from 'docxtemplater'
import dateFormat, { masks, i18n } from 'dateformat'
import PizZip from 'pizzip'
import PizZipUtils from 'pizzip/utils/index.js'
import { saveAs } from 'file-saver'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'

i18n.monthNames = [
	'Январь',
	'Февраль',
	'Март',
	'Апрель',
	'Май',
	'Июнь',
	'Июль',
	'Август',
	'Сентябрь',
	'Октябрь',
	'Ноябрь',
	'Декабрь',
]

export default function OrdersDocument(user) {
	const path = 'https://dodo-shaderka.vercel.app/orders-template.docx'
	//const path = 'http://localhost:3000/orders-template.docx'

	const session = useSession()

	const [orders, setOrders] = useState([])
	const [items, setItems] = useState([])

	useEffect(() => {
		fetch('/api/menu-items').then(res => {
			res.json().then(menuItems => setItems(menuItems))
		})
		fetch('/api/orders').then(res => {
			res.json().then(orders => setOrders(orders))
		})
	}, [])

	const getOrdersArray = user => {
		let array = []
		for (const order of orders) {
			if (order.user == user?.user?._id)
				array.push({
					nomer: order._id.slice(-4),
					dorder: dateFormat(new Date(order.createdAt), 'dd.mm.yyyy'),
					summa: orderPrice(order),
				})
		}
		// orders
		// 	?.filter(order => order.user == user._id)
		// 	?.map(order => {
		// 		console.log(order)
		// 		array.push({
		// 			nomer: order._id.slice(-4),
		// 			dorder: dateFormat(new Date(order.createdAt), 'dd.mm.yyyy'),
		// 			summa: orderPrice(order),
		// 		})
		// 	})
		return array
	}

	const itemPrice = item => {
		let total = item.size
			? item.size.price
			: items?.filter(i => i._id == item._id)[0]?.basePrice
		for (const extra of item.extras) total += extra?.price
		return total
	}

	const orderPrice = order => {
		let total = 0
		for (const item of order?.items) total += itemPrice(item)
		return total
	}

	const getVsego = array => {
		let vsego = 0
		for (const order of array) {
			vsego += order.summa
		}
		return vsego
	}

	const resume = {
		date: dateFormat(new Date(), 'dd.mm.yyyy'),
		period: dateFormat(new Date(), 'mmm yyyy'),
		sostavil: session?.data?.userData?.fio,
		klient: user?.user?.fio,
		order: getOrdersArray(user),
		vsego: getVsego(getOrdersArray(user)),
	}

	const trigger = e => {
		e.preventDefault()
		return generateDocument(resume, path)
	}

	const generateDocument = async (resume, templatePath) => {
		try {
			PizZipUtils.getBinaryContent(templatePath, (error, content) => {
				if (error) throw error

				const zip = PizZip(content)

				const templateDoc = new Docxtemplater(zip, {
					paragraphLoop: true,
					linebreaks: true,
				})

				templateDoc.render(resume)
				const generatedDoc = templateDoc.getZip().generate({
					type: 'blob',
					mimeType:
						'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
					compression: 'DEFLATE',
				})

				saveAs(generatedDoc, 'сводный отчет о заказах.docx')
			})
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<button
			onClick={trigger}
			className=' mb-6 flex gap-2 items-center text-white bg-primary hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center'
		>
			<img
				className='h-[20px]'
				src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAjUlEQVR4nO2VMQrDIBRAvYZThi4ZumRxye0r6SEKydChQ6DQG7wgpK2xRYL9NkN84CS859dBpXYD0PHG5ggsKIEPCFDSUAJ/vyJgCKUR+pSAAe4r5A+gTZ2iAcaI3B3AJMm9SA1cv8hvwPEnuRepgIsnd+9zEJE/ATRwnpd+bRTEcL8UctjcgZPc6FszAT/X8tqE+OKaAAAAAElFTkSuQmCC'
			/>
			Сводный отчет о заказах
		</button>
	)
}
