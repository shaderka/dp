import { Category } from '@/app/models/category'
import { MenuItem } from '@/app/models/menuitem'
import { NextResponse } from 'next/server'

export async function POST(req) {
	const { name } = await req.json()
	const cat = await Category.findOne({ name })
	if (cat) return Response.json({ message: 'exists' }, { status: 444 })
	const catDoc = await Category.create({ name })
	return Response.json(true)
}

export async function PUT(req) {
	const { _id, name } = await req.json()
	const cat = await Category.findOne({ name })
	if (cat) return Response.json({ message: 'exists' }, { status: 444 })
	await Category.updateOne({ _id }, { name })
	return Response.json(true)
}

export async function GET() {
	return Response.json(await Category.find().sort({ name: 1 }))
}

export async function ONE(req) {
	const url = new URL(req.url)
	const _id = url.searchParams.get('_id')
	await Category.findOne({ _id })
	return Response.json(true)
}

export async function DELETE(req) {
	const url = new URL(req.url)
	const _id = url.searchParams.get('_id')
	const cat = await MenuItem.find({ category: _id })
	if (cat.length > 0)
		return Response.json({ message: 'exists' }, { status: 444 })
	await Category.deleteOne({ _id })
	return Response.json(true)
}
