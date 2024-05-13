const { Schema, model, models } = require('mongoose')
import mongoose from 'mongoose'

const StatusSchema = new Schema(
	{
		name: { type: String, required: true },
	},
	{ timestamps: true }
)

export const Status = models?.Status || model('Status', StatusSchema)
