import { connectMongoDB } from '@/app/lib/mongodb'
import { Message } from '@/app/models/message'

export async function GET(req, { params }) {
	await connectMongoDB()

	const { ticketId } = params

	const messages = await Message.find({ ticket: ticketId })
	return Response.json(messages)
}
