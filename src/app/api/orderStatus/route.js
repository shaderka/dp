import { Status } from '@/app/models/status'
import { NextResponse } from 'next/server'

export async function GET() {
	return Response.json(await Status.find())
}
