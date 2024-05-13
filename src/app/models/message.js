const { Schema, model, models } = require('mongoose')
import mongoose from 'mongoose'

const messageSchema = new Schema(
	{
		ticket: mongoose.Types.ObjectId,
		sender: mongoose.Types.ObjectId,
		text: String,
		photo: String,
	},
	{ timestamps: true }
)

export const Message = models?.Message || model('Message', messageSchema)
