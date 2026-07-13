import mongoose from 'mongoose';
import { User } from '../models/user.js';
import { Team } from '../models/team.js';
import { Activity } from '../models/activity.js';
import { Leaderboard } from '../models/leaderboard.js';
import { Workout } from '../models/workout.js';
/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
    const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
    try {
        await mongoose.connect(connectionString);
        console.log('Connected to octofit_db');
        await Promise.all([
            User.deleteMany({}),
            Team.deleteMany({}),
            Activity.deleteMany({}),
            Leaderboard.deleteMany({}),
            Workout.deleteMany({}),
        ]);
        const users = await User.insertMany([
            {
                name: 'Ava Morales',
                email: 'ava@example.com',
                age: 29,
                fitnessGoal: 'Marathon prep',
                location: 'Seattle',
            },
            {
                name: 'Liam Chen',
                email: 'liam@example.com',
                age: 34,
                fitnessGoal: 'Strength gains',
                location: 'Austin',
            },
        ]);
        await Team.create({
            name: 'North Stars',
            sport: 'Running',
            members: [users[0]._id, users[1]._id],
            captain: users[0]._id,
        });
        await Activity.insertMany([
            {
                user: users[0]._id,
                type: 'Run',
                durationMinutes: 45,
                caloriesBurned: 480,
                date: new Date('2026-07-10T06:30:00Z'),
            },
            {
                user: users[1]._id,
                type: 'Strength',
                durationMinutes: 60,
                caloriesBurned: 520,
                date: new Date('2026-07-11T18:00:00Z'),
            },
        ]);
        await Leaderboard.insertMany([
            {
                user: users[0]._id,
                score: 1280,
                streak: 7,
                rank: 1,
            },
            {
                user: users[1]._id,
                score: 1150,
                streak: 4,
                rank: 2,
            },
        ]);
        await Workout.insertMany([
            {
                title: 'HIIT Circuit',
                difficulty: 'Intermediate',
                durationMinutes: 30,
                focus: 'Cardio',
                equipment: ['jump rope', 'mat'],
            },
            {
                title: 'Upper Body Power',
                difficulty: 'Advanced',
                durationMinutes: 45,
                focus: 'Strength',
                equipment: ['dumbbells'],
            },
        ]);
        console.log('Seed data created for users, teams, activities, leaderboard, and workouts');
        await mongoose.disconnect();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
