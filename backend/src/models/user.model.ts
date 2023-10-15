import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema(
	{
		username: {
			type: String,
			requried: true,
			unique: true,
			trim: true,
			minlength: 3,
		},
	},
	{ timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;
