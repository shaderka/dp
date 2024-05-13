import { connectMongoDB } from '@/app/lib/mongodb'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/route'
import Ticket from '@/app/models/ticket'
import { NextResponse } from 'next/server'

export async function POST(req) {
	await connectMongoDB()

	const session = await getServerSession(authOptions)
	const user = session?.userData?.id

	const { order } = await req.json()

	const ticketDoc = await Ticket.create({
		user,
		order,
	})
	return Response.json(ticketDoc)
}

export async function GET(req) {
	await connectMongoDB()

	const session = await getServerSession(authOptions)
	const user = session?.userData?.id
	if (session?.userData?.isAdmin)
		return Response.json(
			await Ticket.find({ $or: [{ admin: user }, { admin: null }] }).sort({
				closedAt: -1,
			})
		)
	else return Response.json(await Ticket.find())
}

export async function PUT(req) {
	await connectMongoDB()
	const session = await getServerSession(authOptions)
	const admin = session?.userData?.id
	const { _id } = await req.json()
	await Ticket.updateOne({ _id }, { admin })
	return Response.json(true)
}
