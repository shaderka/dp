const { Schema, model, models } = require('mongoose')
import mongoose from 'mongoose'
const userSchema = new Schema(
	{
		fio: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		tel: {
			type: String,
			required: true,
		},
		pass: {
			type: String,
			required: true,
		},
		admin: {
			type: Boolean,
			required: true,
			default: false,
		},
	},
	{ timestamps: true }
)

const User = models?.User || mongoose.model('User', userSchema)
export default User
