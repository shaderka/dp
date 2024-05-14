'use client'

import { useParams, useRouter } from 'next/navigation'
import Docxtemplater from 'docxtemplater'
import dateFormat, { masks, i18n } from 'dateformat'
import PizZip from 'pizzip'
import PizZipUtils from 'pizzip/utils'
import { saveAs } from 'file-saver'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'

export default function OrderPage() {
	const path = 'https://dodo-shaderka.vercel.app/reciept-template.docx'
	//const path = 'http://localhost:3000/reciept-template.docx'
	const { orderId } = useParams()

	const [order, setOrder] = useState(null)
	const [items, setItems] = useState([])
	const [extras, setExtras] = useState([])

	const router = useRouter()

	useEffect(() => {
		fetch('/api/menu-items').then(res => {
			res.json().then(menuItems => {
				setItems(menuItems)
				fetch('/api/extras').then(res => {
					res.json().then(extras => {
						setExtras(extras)
						fetch('/api/orders').then(res => {
							res.json().then(orders => {
								for (const ord of orders) {
									if (ord._id == orderId) setOrder(ord)
								}
							})
						})
					})
				})
			})
		})
	}, [])

	const itemPrice = item => {
		let total = item.size
			? item.size.price
			: items?.filter(i => i._id == item._id)[0]?.basePrice
		for (const extra of item.extras) total += extra?.price
		return total
	}

	const orderPrice = order => {
		let total = 0
		for (const item of order.items) total += itemPrice(item)
		return total
	}

	const getItemsArray = order => {
		let array = []
		for (const item of order.items) {
			array.push({
				name: nameProduct(item),
				price: itemPrice(item),
				sum_price: itemPrice(item),
			})
		}
		return array
	}

	const nameProduct = product => {
		const origin = items?.filter(item => item._id == product._id)[0]
		const baseName = origin?.name
		const sizeName =
			origin?.category == '661fb2d5f22baee8656bb3ae'
				? ', ' + product.size.name + ' '
				: ''
		let extrasName = ''
		if (origin?.category == '661fb2d5f22baee8656bb3ae')
			product.extras.map(e => {
				extrasName +=
					'+' + extras.filter(ex => ex._id == e.extra)[0]?.name + ' '
			})
		return baseName + sizeName + extrasName
	}

	let triggered = false

	const trigger = () => {
		console.log(triggered)
		triggered = true
		const resume = {
			id: order._id?.slice(-4),
			day: dateFormat(new Date(), 'dd'),
			month: dateFormat(new Date(), 'mm'),
			year: dateFormat(new Date(), 'yy'),
			items: getItemsArray(order),
			sum: orderPrice(order),
		}

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

				saveAs(generatedDoc, 'товарный чек.docx')
			})
		} catch (error) {
			console.log(error)
		}
	}

	if (order !== null) {
		console.log(order)
		if (!triggered) trigger()
		router.push('/profile/orders')
	}

	return <></>
}
