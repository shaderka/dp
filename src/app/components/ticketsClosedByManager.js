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

export default function TicketsClosedDocument(user) {
	const path = document.referrer + '/ticket-template.docx'
	const session = useSession()

	const [tickets, setTickets] = useState([])
	const [users, setUsers] = useState([])

	useEffect(() => {
		fetch('/api/ticket').then(res => {
			res.json().then(tickets => setTickets(tickets))
		})
		fetch('/api/users').then(res => {
			res.json().then(users => setUsers(users))
		})
	}, [])

	const kolvoTickets = id => {
		return tickets.filter(ticket => ticket.admin == id && ticket.closedAt)
			.length
	}

	const getTicketsArray = id => {
		let array = []
		for (const ticket of tickets?.filter(
			ticket => ticket.admin == id && ticket.closedAt
		)) {
			array.push({
				tel: users?.filter(user => user._id == ticket.user)[0]?.tel,
				order: ticket.order.slice(-4),
				created: dateFormat(new Date(ticket.createdAt), 'dd.mm.yy'),
				closed: dateFormat(new Date(ticket.closedAt), 'dd.mm.yy'),
			})
		}
		return array
	}

	const resume = {
		date: dateFormat(new Date(), 'dd.mm.yyyy'),
		period: dateFormat(new Date(), 'mmm yyyy'),
		sostavil: session?.data?.userData?.fio,
		sotrudnik: user.user.fio,
		kolvo: kolvoTickets(user.user._id),
		ticket: getTicketsArray(user.user._id),
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

				saveAs(generatedDoc, 'отчет о закрытых тикетах.docx')
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
			Отчет о закрытых тикетах
		</button>
	)
}
