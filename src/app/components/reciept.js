'use client'

import Docxtemplater from 'docxtemplater'
import dateFormat, { masks } from 'dateformat'
import PizZip from 'pizzip'
import PizZipUtils from 'pizzip/utils/index.js'
import { saveAs } from 'file-saver'
// import template from '../reciept-template.docx'
import { Toaster, toast } from 'sonner'
import { useEffect, useState } from 'react'

export default function Reciept(order) {
	const path = 'https://dodo-shaderka.vercel.app/reciept-template.docx'

	const [items, setItems] = useState([])
	const [extras, setExtras] = useState([])

	useEffect(() => {
		fetch('/api/menu-items').then(res => {
			res.json().then(menuItems => setItems(menuItems))
		})
		fetch('/api/extras').then(res => {
			res.json().then(extras => setExtras(extras))
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
		for (const item of order.order.items) total += itemPrice(item)
		return total
	}

	const getItemsArray = order => {
		let array = []
		for (const item of order.order.items) {
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

	const resume = {
		id: order.order._id.slice(-4),
		day: dateFormat(new Date(), 'dd'),
		month: dateFormat(new Date(), 'mm'),
		year: dateFormat(new Date(), 'yy'),
		items: getItemsArray(order),
		sum: orderPrice(order),
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

				saveAs(generatedDoc, 'товарный чек.docx')
			})
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<button
			onClick={trigger}
			className='text-white bg-primary hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center'
		>
			Печать
		</button>
	)
}
