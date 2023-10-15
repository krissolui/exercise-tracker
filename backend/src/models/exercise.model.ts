import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const exerciseSchema = new Schema(
	{
		username: {
			type: String,
			requried: true,
		},
		description: {
			type: String,
			requried: true,
		},
		duration: {
			type: String,
			requried: true,
		},
		date: {
			type: Date,
			requried: true,
		},
	},
	{ timestamps: true }
);

const Exercise = mongoose.model('Exercise', exerciseSchema);

export default Exercise;
