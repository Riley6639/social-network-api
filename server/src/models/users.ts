import { Schema, model, Document } from 'mongoose';

interface IUser extends Document {
    thoughts: [{ type: Schema.Types.ObjectId, ref: 'Thought' }];
    friends: [{ type: Schema.Types.ObjectId, ref: 'User' }];
    username: string;
    email: string;
    friendCount: number;
}

const userSchema = new Schema<IUser>({
    thoughts: [{ type: Schema.Types.ObjectId, ref: 'Thought' }],
    friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Must match a valid email address'],
    },
}, {
    toJSON: {
        virtuals: true,
    },
    toObject: {
        virtuals: true,
    },
});

// Virtual for friend count
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

    
const User = model('User', userSchema);

export default User;




