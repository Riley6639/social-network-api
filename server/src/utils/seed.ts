// Import required dependencies
import mongoose from 'mongoose';
import User from '../models/users.js';
import Thought from '../models/thought.js';

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/socialNetwork', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
} as mongoose.ConnectOptions).then(() => console.log('Connected to MongoDB')).catch((err) => console.error('Connection error:', err));

// Seed data
const seedDatabase = async () => {
    try {
        // Clear existing data
        await User.deleteMany({});
        await Thought.deleteMany({});

        // Create users
        const users = await User.insertMany([
            { username: 'alice', email: 'alice@example.com' },
            { username: 'bob', email: 'bob@example.com' },
            { username: 'charlie', email: 'charlie@example.com' },
        ]);

        // Create thoughts
        const thoughts = await Thought.insertMany([
            {
                thoughtText: 'This is my first thought!',
                username: users[0].username,
                reactions: [
                    {
                        reactionBody: 'Great thought!',
                        username: users[1].username,
                    },
                ],
            },
            {
                thoughtText: 'Loving this social network.',
                username: users[1].username,
                reactions: [
                    {
                        reactionBody: 'Me too!',
                        username: users[0].username,
                    },
                    {
                        reactionBody: 'Absolutely!',
                        username: users[2].username,
                    },
                ],
            },
        ]);

        // Update users with thoughts
        await User.findByIdAndUpdate(users[0]._id, { $push: { thoughts: thoughts[0]._id } });
        await User.findByIdAndUpdate(users[1]._id, { $push: { thoughts: thoughts[1]._id } });

        // Add friends
        await User.findByIdAndUpdate(users[0]._id, { $push: { friends: [users[1]._id] } });
        await User.findByIdAndUpdate(users[1]._id, { $push: { friends: [users[0]._id, users[2]._id] } });

        console.log('Database seeded successfully!');
    } catch (err) {
        console.error('Error seeding the database:', err);
    } finally {
        await mongoose.connection.close();
    }
};

seedDatabase();
