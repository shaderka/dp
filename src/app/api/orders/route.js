import { connectMongoDB } from '@/app/lib/mongodb'
import { MenuItem } from '@/app/models/menuitem'
import { Order } from '@/app/models/order'
import User from '@/app/models/user'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/route'

export async function GET(req) {
	await connectMongoDB()
	const session = await getServerSession(authOptions)
	const user = session?.userData?.id
	const url = new URL(req.url)
	const _id = url.searchParams.get('_id')

	//let ord = []
	if (session?.userData?.isAdmin) {
		return Response.json(await Order.find())
	} else {
		return Response.json(await Order.find({ user }))
	}

	// orders.map(async order => {
	// 	const user = await User.findById(order.user)
	// 	ord.push({
	// 		_id: order._id,
	// 		user: order.user,
	// 		tel: user.tel,
	// 		name: user.fio,
	// 		streetAddress: order.streetAddress,

	// 	})
	// })

	//return Response.json(orders)
}
