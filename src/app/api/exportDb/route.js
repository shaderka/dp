import { connectMongoDB } from '@/app/lib/mongodb'
import mongoose from 'mongoose'
import { promisify } from 'util'
import fs from 'fs'
import { Message } from '@/app/models/message'
import { Category } from '@/app/models/category'
import { Extra } from '@/app/models/extra'
import { MenuItem } from '@/app/models/menuitem'
import { Order } from '@/app/models/order'
import { Status } from '@/app/models/status'
import Ticket from '@/app/models/ticket'
import User from '@/app/models/user'

const writeFileAsync = promisify(fs.writeFile)

function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1)
}

export async function GET(req, res) {
	await connectMongoDB()

	const collections = mongoose.connection.db.listCollections()
	let exportedData = {}
	exportedData['Message'] = await Message.find()
	exportedData['Category'] = await Category.find()
	exportedData['Extra'] = await Extra.find()
	exportedData['MenuItem'] = await MenuItem.find()
	exportedData['Order'] = await Order.find()
	exportedData['Status'] = await Status.find()
	exportedData['Ticket'] = await Ticket.find()
	exportedData['User'] = await User.find()
	// await Promise.all(
	// 	(
	// 		await collections.toArray()
	// 	).map(async ({ name }) => {
	// 		let Name = name
	// 		if (name == 'status') Name = 'statuss'

	// 		const model = mongoose.model(
	// 			capitalizeFirstLetter(Name.substring(0, Name.length - 1))
	// 		)
	// 		exportedData[name] = await model.find()
	// 	})
	// )

	const fileName = './public/db_export.json'
	fs.writeFileSync(fileName, JSON.stringify(exportedData, null, 2))
	// res.writeHead(200, {
	// 	'Content-Type': 'application/json',
	// 	'Content-Disposition': 'attachment; filename="database-export.json"',
	// })
	// res.status(200).sendFile(fileName, { root: './' })
	return Response.json(true)
}
