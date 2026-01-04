import { ExerciseAlternative } from '@/types/workout';

export const exerciseAlternatives: Record<string, ExerciseAlternative[]> = {
  // Squats & Legs
  'Squats': [
    { name: 'Chair Squats', difficulty: 'easier', reps: '4 × 20 reps' },
    { name: 'Pistol Squats', difficulty: 'harder', reps: '4 × 5 each leg' },
  ],
  'Jump Squats': [
    { name: 'Regular Squats', difficulty: 'easier', reps: '4 × 15 reps' },
    { name: 'Box Jumps', difficulty: 'harder', reps: '4 × 12 reps' },
  ],
  'Bulgarian Split Squats': [
    { name: 'Regular Lunges', difficulty: 'easier', reps: '4 × 12 each leg' },
    { name: 'Weighted Bulgarian Split Squats', difficulty: 'harder', reps: '4 × 8 each leg' },
  ],
  'Reverse Lunges': [
    { name: 'Stationary Lunges', difficulty: 'easier', reps: '4 × 8 each leg' },
    { name: 'Jumping Lunges', difficulty: 'harder', reps: '4 × 8 each leg' },
  ],
  'Wall Sit': [
    { name: 'Half Wall Sit', difficulty: 'easier', reps: '4 × 30 seconds' },
    { name: 'Single Leg Wall Sit', difficulty: 'harder', reps: '4 × 20 sec each leg' },
  ],
  'Glute Bridges': [
    { name: 'Hip Raises', difficulty: 'easier', reps: '4 × 15 reps' },
    { name: 'Single-Leg Glute Bridge', difficulty: 'harder', reps: '4 × 10 each leg' },
  ],
  'Glute Bridge March': [
    { name: 'Regular Glute Bridge', difficulty: 'easier', reps: '4 × 20 reps' },
    { name: 'Single-Leg Glute Bridge', difficulty: 'harder', reps: '4 × 12 each leg' },
  ],
  'Calf Raises': [
    { name: 'Seated Calf Raises', difficulty: 'easier', reps: '4 × 20 reps' },
    { name: 'Single-Leg Calf Raises', difficulty: 'harder', reps: '4 × 15 each leg' },
  ],

  // Push-Ups & Upper Body
  'Push-Ups': [
    { name: 'Knee Push-Ups', difficulty: 'easier', reps: '4 × 12 reps' },
    { name: 'Diamond Push-Ups', difficulty: 'harder', reps: '4 × 10 reps' },
  ],
  'Pike Push-Ups': [
    { name: 'Incline Pike Push-Ups', difficulty: 'easier', reps: '4 × 8 reps' },
    { name: 'Handstand Push-Ups (wall)', difficulty: 'harder', reps: '4 × 5 reps' },
  ],
  'Tricep Dips': [
    { name: 'Bench Dips (bent knees)', difficulty: 'easier', reps: '4 × 12 reps' },
    { name: 'Straight Leg Dips', difficulty: 'harder', reps: '4 × 15 reps' },
  ],
  'Shoulder Taps': [
    { name: 'Kneeling Shoulder Taps', difficulty: 'easier', reps: '4 × 16 taps' },
    { name: 'Shoulder Taps with Push-Up', difficulty: 'harder', reps: '4 × 16 taps' },
  ],

  // Core & Planks
  'Plank': [
    { name: 'Knee Plank', difficulty: 'easier', reps: '4 × 30 seconds' },
    { name: 'Plank with Shoulder Taps', difficulty: 'harder', reps: '4 × 45 seconds' },
  ],
  'Forearm Plank': [
    { name: 'Forearm Plank on Knees', difficulty: 'easier', reps: '4 × 30 seconds' },
    { name: 'Forearm Plank with Leg Lifts', difficulty: 'harder', reps: '4 × 45 seconds' },
  ],
  'Side Plank': [
    { name: 'Side Plank on Knees', difficulty: 'easier', reps: '4 × 20 sec each side' },
    { name: 'Side Plank with Hip Dips', difficulty: 'harder', reps: '4 × 30 sec each side' },
  ],
  'Hollow Hold': [
    { name: 'Tuck Hollow Hold', difficulty: 'easier', reps: '4 × 20 seconds' },
    { name: 'Hollow Rock', difficulty: 'harder', reps: '4 × 30 seconds' },
  ],
  'Leg Raises': [
    { name: 'Bent Knee Raises', difficulty: 'easier', reps: '4 × 12 reps' },
    { name: 'Hanging Leg Raises', difficulty: 'harder', reps: '4 × 10 reps' },
  ],
  'Bicycle Crunches': [
    { name: 'Regular Crunches', difficulty: 'easier', reps: '4 × 20 reps' },
    { name: 'V-Ups', difficulty: 'harder', reps: '4 × 15 reps' },
  ],
  'Flutter Kicks': [
    { name: 'Bent Knee Flutter', difficulty: 'easier', reps: '4 × 30 seconds' },
    { name: 'Scissor Kicks', difficulty: 'harder', reps: '4 × 45 seconds' },
  ],
  'Superman Hold': [
    { name: 'Bird-Dog Hold', difficulty: 'easier', reps: '4 × 30 seconds' },
    { name: 'Superman Pulses', difficulty: 'harder', reps: '4 × 20 reps' },
  ],
  'Bird-Dog': [
    { name: 'Bird-Dog (arm only)', difficulty: 'easier', reps: '4 × 8 each side' },
    { name: 'Bird-Dog with pause', difficulty: 'harder', reps: '4 × 12 each side' },
  ],
  'Mountain Climbers': [
    { name: 'Slow Mountain Climbers', difficulty: 'easier', reps: '4 × 20 seconds' },
    { name: 'Cross-Body Mountain Climbers', difficulty: 'harder', reps: '4 × 40 seconds' },
  ],

  // HIIT Exercises
  'Burpees': [
    { name: 'Step-Back Burpees', difficulty: 'easier', reps: '4 × 40 sec work, 20 sec rest' },
    { name: 'Burpee with Tuck Jump', difficulty: 'harder', reps: '4 × 40 sec work, 20 sec rest' },
  ],
  'Plank Jacks': [
    { name: 'Stepping Plank Jacks', difficulty: 'easier', reps: '4 × 40 sec work, 20 sec rest' },
    { name: 'Plank Jacks with Push-Up', difficulty: 'harder', reps: '4 × 40 sec work, 20 sec rest' },
  ],

  // Cardio
  'Jumping Jacks': [
    { name: 'Step Jacks', difficulty: 'easier', reps: '1 minute' },
    { name: 'Star Jumps', difficulty: 'harder', reps: '1 minute' },
  ],
  'High Knees': [
    { name: 'Marching in Place', difficulty: 'easier', reps: '1 minute' },
    { name: 'High Knees Sprint', difficulty: 'harder', reps: '1 minute' },
  ],
};

export const getAlternatives = (exerciseName: string): ExerciseAlternative[] => {
  return exerciseAlternatives[exerciseName] || [];
};