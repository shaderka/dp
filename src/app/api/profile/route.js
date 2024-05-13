import { connectMongoDB } from '@/app/lib/mongodb'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/route'
import User from '@/app/models/user'

export async function PUT(req) {
	await connectMongoDB()
	const data = await req.json()
	const session = await getServerSession(authOptions)
	const tel = session.userData.tel

	if ('name' in data) {
		await User.updateOne({ tel }, { fio: data.name, email: data.email })
	}

	return Response.json(true)
}

export async function GET() {
	await connectMongoDB()
	const session = await getServerSession(authOptions)
	const tel = session.userData.tel
	return Response.json(await User.findOne({ tel }))
}
