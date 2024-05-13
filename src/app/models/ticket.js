const { Schema, model, models } = require('mongoose')
import mongoose from 'mongoose'

const ticketSchema = new Schema(
	{
		user: mongoose.Types.ObjectId,
		admin: { type: mongoose.Types.ObjectId, default: null },
		order: mongoose.Types.ObjectId,
		closedAt: { type: Date, default: null },
	},
	{ timestamps: true }
)

const Ticket = models?.Ticket || mongoose.model('Ticket', ticketSchema)
export default Ticket
