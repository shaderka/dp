import { connectMongoDB } from '@/app/lib/mongodb'
import User from '@/app/models/user'
import mongoose from 'mongoose'
export async function GET() {
	await connectMongoDB()
	const users = await User.find()
	return Response.json(users)
}
