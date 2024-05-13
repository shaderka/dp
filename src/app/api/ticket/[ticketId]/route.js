import { connectMongoDB } from '@/app/lib/mongodb'
import Ticket from '@/app/models/ticket'

export async function GET(req, { params }) {
	await connectMongoDB()

	const { ticketId } = params

	const ticket = await Ticket.findById(ticketId)
	return Response.json(ticket)
}

export async function PUT(req, { params }) {
	await connectMongoDB()

	const { ticketId } = params
	const closedAt = new Date()

	const updatedTicket = await Ticket.updateOne({ _id: ticketId }, { closedAt })
	console.log(updatedTicket)
	return Response.json(updatedTicket)
}
