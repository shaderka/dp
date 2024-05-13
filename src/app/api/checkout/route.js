import { connectMongoDB } from '@/app/lib/mongodb'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/route'
import { Order } from '@/app/models/order'

export async function POST(req) {
	await connectMongoDB()

	const { cartProducts: cart, address: streetAddress } = await req.json()
	const session = await getServerSession(authOptions)
	const user = session?.userData?.id
	const items = cart.map(p => {
		return { _id: p._id, size: p.size, extras: p.extras }
	})
	const status = '66223601a67aa71b8d711049'

	const orderDoc = await Order.create({
		user,
		streetAddress,
		items,
		status,
	})

	return Response.json(orderDoc)
}
