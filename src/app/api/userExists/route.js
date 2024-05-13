import { connectMongoDB } from '@/app/lib/mongodb'
import User from '@/app/models/user'
import { NextResponse } from 'next/server'

export async function POST(req) {
	try {
		await connectMongoDB()
		const { email, tel } = await req.json()
		const user = await User.findOne({ $or: [{ tel }, { email }] }).select('_id')
		console.log('user: ', user)
		return NextResponse.json({ user })
	} catch (error) {
		console.log(error)
	}
}
