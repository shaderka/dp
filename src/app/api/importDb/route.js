import { connectMongoDB } from '@/app/lib/mongodb'
import mongoose from 'mongoose'

export async function POST(req) {
	await connectMongoDB()
	const data = await req.json()
	for (const collectionName in data) {
		const collectionData = data[collectionName]
		const model = mongoose.model(collectionName)
		await model.deleteMany()
		await model.insertMany(collectionData)
	}
	return Response.json(true)
}
