const { Schema, model, models } = require('mongoose')
import mongoose from 'mongoose'

const CategorySchema = new Schema(
	{
		name: { type: String, required: true },
	},
	{ timestamps: true }
)

export const Category = models?.Category || model('Category', CategorySchema)
