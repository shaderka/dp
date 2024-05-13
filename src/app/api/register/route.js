import { NextResponse } from 'next/server'
import { connectMongoDB } from '../../lib/mongodb'

import bcrypt from 'bcryptjs'
import User from '@/app/models/user'

export async function POST(req) {
	try {
		const { fio, email, pass, tel } = await req.json()
		const hashedPass = await bcrypt.hash(pass, 10)
		await connectMongoDB()
		await User.create({ fio, email, tel, pass: hashedPass })

		return NextResponse.json(
			{ message: 'Пользователь зарегистрирован' },
			{ status: 201 }
		)
	} catch (error) {
		console.log(error)
		return NextResponse.json(
			{ message: 'Ошибка при регистрации пользователя: ', error },
			{ status: 500 }
		)
	}
}
