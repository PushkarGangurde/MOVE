import { ExerciseAlternative } from '@/types/workout';

export const exerciseAlternatives: Record<string, ExerciseAlternative[]> = {
  'Bodyweight Squats': [
    { name: 'Chair Squats', difficulty: 'easier', reps: '3 × 12 reps' },
    { name: 'Jump Squats', difficulty: 'harder', reps: '3 × 10 reps' },
  ],
  'Incline Push-Ups (hands on bed/table)': [
    { name: 'Wall Push-Ups', difficulty: 'easier', reps: '3 × 12 reps' },
    { name: 'Standard Push-Ups', difficulty: 'harder', reps: '3 × 8 reps' },
  ],
  'Knee Push-Ups / Incline Push-Ups': [
    { name: 'Wall Push-Ups', difficulty: 'easier', reps: '3 × 15 reps' },
    { name: 'Standard Push-Ups', difficulty: 'harder', reps: '3 × 8 reps' },
  ],
  'Glute Bridges': [
    { name: 'Glute Squeeze', difficulty: 'easier', reps: '3 × 20 reps' },
    { name: 'Single-Leg Glute Bridge', difficulty: 'harder', reps: '3 × 8 each leg' },
  ],
  'Plank (knees down if needed)': [
    { name: 'Forearm Plank on Knees', difficulty: 'easier', reps: '3 × 15-20 seconds' },
    { name: 'High Plank', difficulty: 'harder', reps: '3 × 30-45 seconds' },
  ],
  'Plank (knees down allowed)': [
    { name: 'Forearm Plank on Knees', difficulty: 'easier', reps: '3 × 15-20 seconds' },
    { name: 'High Plank', difficulty: 'harder', reps: '3 × 30-45 seconds' },
  ],
  'Plank': [
    { name: 'Forearm Plank on Knees', difficulty: 'easier', reps: '3 × 15-20 seconds' },
    { name: 'Plank with Shoulder Taps', difficulty: 'harder', reps: '3 × 30 seconds' },
  ],
  'Plank Hold': [
    { name: 'Forearm Plank on Knees', difficulty: 'easier', reps: '3 × 30 seconds' },
    { name: 'Plank with Leg Raises', difficulty: 'harder', reps: '3 × 40 seconds' },
  ],
  'Static Lunges': [
    { name: 'Assisted Lunges (hold wall)', difficulty: 'easier', reps: '3 × 6 each leg' },
    { name: 'Walking Lunges', difficulty: 'harder', reps: '3 × 10 each leg' },
  ],
  'Wall Sit': [
    { name: 'Half Wall Sit', difficulty: 'easier', reps: '3 × 15-20 seconds' },
    { name: 'Wall Sit with Calf Raises', difficulty: 'harder', reps: '3 × 30 seconds' },
  ],
  'Russian Twists (slow)': [
    { name: 'Seated Twists', difficulty: 'easier', reps: '3 × 12 twists' },
    { name: 'Weighted Russian Twists', difficulty: 'harder', reps: '3 × 20 twists' },
  ],
  'Lying Leg Raises (bend knees if hard)': [
    { name: 'Bent Knee Raises', difficulty: 'easier', reps: '3 × 8 reps' },
    { name: 'Straight Leg Raises', difficulty: 'harder', reps: '3 × 12 reps' },
  ],
  'Lying Leg Raises': [
    { name: 'Bent Knee Raises', difficulty: 'easier', reps: '3 × 8 reps' },
    { name: 'Hanging Leg Raises', difficulty: 'harder', reps: '3 × 8 reps' },
  ],
  'Flutter Kicks': [
    { name: 'Bent Knee Flutter', difficulty: 'easier', reps: '3 × 15 seconds' },
    { name: 'Scissor Kicks', difficulty: 'harder', reps: '3 × 25 seconds' },
  ],
  'Superman Hold': [
    { name: 'Bird-Dog Hold', difficulty: 'easier', reps: '3 × 15-20 seconds' },
    { name: 'Superman Pulses', difficulty: 'harder', reps: '3 × 15 reps' },
  ],
  'Tricep Dips (chair/bed)': [
    { name: 'Assisted Tricep Dips', difficulty: 'easier', reps: '3 × 8 reps' },
    { name: 'Straight Leg Dips', difficulty: 'harder', reps: '3 × 12 reps' },
  ],
  'Shoulder Taps (from knees)': [
    { name: 'Wall Shoulder Taps', difficulty: 'easier', reps: '3 × 12 taps' },
    { name: 'High Plank Shoulder Taps', difficulty: 'harder', reps: '3 × 20 taps' },
  ],
  'Bird-Dog': [
    { name: 'Bird-Dog (arm only)', difficulty: 'easier', reps: '3 × 6 each side' },
    { name: 'Bird-Dog with hold', difficulty: 'harder', reps: '3 × 10 each side' },
  ],
  'Side Plank (knees down)': [
    { name: 'Side Lying Leg Lift', difficulty: 'easier', reps: '3 × 15 sec each side' },
    { name: 'Full Side Plank', difficulty: 'harder', reps: '3 × 25 sec each side' },
  ],
  'Calf Raises': [
    { name: 'Seated Calf Raises', difficulty: 'easier', reps: '3 × 15 reps' },
    { name: 'Single-Leg Calf Raises', difficulty: 'harder', reps: '3 × 12 each leg' },
  ],
  'Jumping Jacks': [
    { name: 'Step Jacks', difficulty: 'easier', reps: '1 minute' },
    { name: 'Star Jumps', difficulty: 'harder', reps: '1 minute' },
  ],
  'Jumping Jacks (slow)': [
    { name: 'Step Jacks', difficulty: 'easier', reps: '1 minute' },
    { name: 'Regular Jumping Jacks', difficulty: 'harder', reps: '1 minute' },
  ],
  'Jumping Jacks (slow/moderate)': [
    { name: 'March in Place', difficulty: 'easier', reps: '3 × 40 sec work, 20 sec rest' },
    { name: 'Fast Jumping Jacks', difficulty: 'harder', reps: '3 × 40 sec work, 20 sec rest' },
  ],
};

export const getAlternatives = (exerciseName: string): ExerciseAlternative[] => {
  return exerciseAlternatives[exerciseName] || [];
};
