import { Schema, model } from 'mongoose';

const workoutSchema = new Schema(
  {
    title: { type: String, required: true },
    difficulty: { type: String, required: true },
    durationMinutes: Number,
    focus: String,
    equipment: [String],
  },
  { timestamps: true },
);

export const Workout = model('Workout', workoutSchema);
