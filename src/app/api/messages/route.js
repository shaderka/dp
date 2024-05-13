import { connectMongoDB } from '@/app/lib/mongodb'
import { pusherServer } from '@/app/lib/pusher'
import { Message } from '@/app/models/message'

export async function POST(req) {
	try {
		await connectMongoDB()

		const { ticketId, currentUserId, text, photo } = await req.json()

		const newMessage = await Message.create({
			ticket: ticketId,
			sender: currentUserId,
			text,
			photo,
		})

		await pusherServer.trigger(ticketId, 'new-message', newMessage)

		return Response.json(newMessage)
	} catch (error) {
		console.log(error)
	}
}
