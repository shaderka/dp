import { connectMongoDB } from '@/app/lib/mongodb'
import User from '@/app/models/user'
import mongoose from 'mongoose'

export async function GET(req) {
	await connectMongoDB()
	const url = new URL(req.url)
	const _id = url.searchParams.get('_id')

	const user = await User.findOne({ _id }).lean()
	return Response.json({ ...user })
}

export async function PUT(req) {
	await connectMongoDB()
	const data = await req.json()
	const { _id, fio, email, admin } = data
	const user = await User.findOne({ _id })
	await User.updateOne({ _id }, { fio, email, admin })
	return Response.json(true)
}
