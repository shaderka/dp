import { connectMongoDB } from '@/app/lib/mongodb'
import { Status } from '@/app/models/status'
import { NextResponse } from 'next/server'

export async function GET() {
	await connectMongoDB()
	const res = await Status.find()
	return Response.json(res)
}
