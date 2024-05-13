import { connectMongoDB } from '@/app/lib/mongodb'
import { Category } from '@/app/models/category'

export async function POST(req) {
	await connectMongoDB()
	const { _id } = await req.json()
	const cat = await Category.findOne({ _id })
	console.log(cat)
	return Response.json(cat)
}
