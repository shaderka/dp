const { Schema, model, models } = require('mongoose')
import mongoose from 'mongoose'

const SizesSchema = new Schema({
	name: String,
	price: Number,
})

const ExtrasSchema = new Schema({
	extra: mongoose.Types.ObjectId,
	price: Number,
})

const MenuItemSchema = new Schema(
	{
		image: { type: String },
		name: { type: String },
		description: { type: String },
		weight: { type: Number },
		category: { type: mongoose.Types.ObjectId },
		basePrice: { type: Number },
		sizes: { type: [SizesSchema] },
		extrasPrices: { type: [ExtrasSchema] },
	},
	{ timestamps: true }
)

export const MenuItem = models?.MenuItem || model('MenuItem', MenuItemSchema)
