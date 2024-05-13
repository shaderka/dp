const { Schema, model, models } = require('mongoose')
import mongoose from 'mongoose'

const OrderSchema = new Schema(
	{
		user: mongoose.Types.ObjectId,
		streetAddress: String,
		items: Object,
		status: mongoose.Types.ObjectId,
	},
	{ timestamps: true }
)

export const Order = models?.Order || model('Order', OrderSchema)
