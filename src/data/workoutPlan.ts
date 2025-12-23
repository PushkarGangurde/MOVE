import { DayWorkout } from '@/types/workout';

export const workoutPlan: DayWorkout[] = [
  {
    id: 'monday',
    dayName: 'Monday',
    focus: 'Upper Body Push',
    exercises: [
      { id: 'mon-w1', name: 'Arm Circles', reps: '30 sec each direction', section: 'warmup' },
      { id: 'mon-w2', name: 'Shoulder Rolls', reps: '20 reps', section: 'warmup' },
      { id: 'mon-w3', name: 'Jumping Jacks', reps: '1 min', section: 'warmup' },
      { id: 'mon-m1', name: 'Push-ups', reps: '3 × 12 reps', section: 'main' },
      { id: 'mon-m2', name: 'Diamond Push-ups', reps: '3 × 8 reps', section: 'main' },
      { id: 'mon-m3', name: 'Pike Push-ups', reps: '3 × 10 reps', section: 'main' },
      { id: 'mon-m4', name: 'Tricep Dips (chair)', reps: '3 × 12 reps', section: 'main' },
      { id: 'mon-m5', name: 'Incline Push-ups', reps: '3 × 15 reps', section: 'main' },
      { id: 'mon-c1', name: 'Plank Hold', reps: '45 sec', section: 'core' },
      { id: 'mon-c2', name: 'Dead Bug', reps: '20 reps', section: 'core' },
      { id: 'mon-d1', name: 'Chest Stretch', reps: '30 sec each side', section: 'cooldown' },
      { id: 'mon-d2', name: 'Tricep Stretch', reps: '30 sec each arm', section: 'cooldown' },
    ],
  },
  {
    id: 'tuesday',
    dayName: 'Tuesday',
    focus: 'Lower Body + Glutes',
    exercises: [
      { id: 'tue-w1', name: 'Leg Swings', reps: '15 each leg', section: 'warmup' },
      { id: 'tue-w2', name: 'Hip Circles', reps: '10 each direction', section: 'warmup' },
      { id: 'tue-w3', name: 'High Knees', reps: '1 min', section: 'warmup' },
      { id: 'tue-m1', name: 'Bodyweight Squats', reps: '3 × 15 reps', section: 'main' },
      { id: 'tue-m2', name: 'Lunges', reps: '3 × 12 each leg', section: 'main' },
      { id: 'tue-m3', name: 'Glute Bridges', reps: '3 × 15 reps', section: 'main' },
      { id: 'tue-m4', name: 'Single Leg Glute Bridge', reps: '3 × 10 each', section: 'main' },
      { id: 'tue-m5', name: 'Wall Sit', reps: '3 × 45 sec', section: 'main' },
      { id: 'tue-c1', name: 'Bicycle Crunches', reps: '3 × 20 reps', section: 'core' },
      { id: 'tue-c2', name: 'Leg Raises', reps: '3 × 12 reps', section: 'core' },
      { id: 'tue-d1', name: 'Quad Stretch', reps: '30 sec each leg', section: 'cooldown' },
      { id: 'tue-d2', name: 'Hamstring Stretch', reps: '30 sec each leg', section: 'cooldown' },
    ],
  },
  {
    id: 'wednesday',
    dayName: 'Wednesday',
    focus: 'Core + Cardio',
    exercises: [
      { id: 'wed-w1', name: 'Torso Twists', reps: '20 reps', section: 'warmup' },
      { id: 'wed-w2', name: 'Cat-Cow Stretch', reps: '10 reps', section: 'warmup' },
      { id: 'wed-w3', name: 'March in Place', reps: '1 min', section: 'warmup' },
      { id: 'wed-m1', name: 'Mountain Climbers', reps: '3 × 30 sec', section: 'main' },
      { id: 'wed-m2', name: 'Burpees (no jump)', reps: '3 × 8 reps', section: 'main' },
      { id: 'wed-m3', name: 'High Knees', reps: '3 × 45 sec', section: 'main' },
      { id: 'wed-m4', name: 'Skater Hops', reps: '3 × 20 reps', section: 'main' },
      { id: 'wed-c1', name: 'Plank', reps: '3 × 45 sec', section: 'core' },
      { id: 'wed-c2', name: 'Russian Twists', reps: '3 × 20 reps', section: 'core' },
      { id: 'wed-c3', name: 'Flutter Kicks', reps: '3 × 30 sec', section: 'core' },
      { id: 'wed-c4', name: 'Hollow Body Hold', reps: '3 × 20 sec', section: 'core' },
      { id: 'wed-d1', name: 'Child\'s Pose', reps: '45 sec', section: 'cooldown' },
      { id: 'wed-d2', name: 'Cobra Stretch', reps: '30 sec', section: 'cooldown' },
    ],
  },
  {
    id: 'thursday',
    dayName: 'Thursday',
    focus: 'Upper Body Pull',
    exercises: [
      { id: 'thu-w1', name: 'Arm Swings', reps: '30 sec', section: 'warmup' },
      { id: 'thu-w2', name: 'Shoulder Shrugs', reps: '15 reps', section: 'warmup' },
      { id: 'thu-w3', name: 'Jumping Jacks', reps: '1 min', section: 'warmup' },
      { id: 'thu-m1', name: 'Superman Hold', reps: '3 × 30 sec', section: 'main' },
      { id: 'thu-m2', name: 'Reverse Snow Angels', reps: '3 × 12 reps', section: 'main' },
      { id: 'thu-m3', name: 'Prone Y Raises', reps: '3 × 12 reps', section: 'main' },
      { id: 'thu-m4', name: 'Doorframe Rows', reps: '3 × 12 reps', section: 'main' },
      { id: 'thu-m5', name: 'Prone T Raises', reps: '3 × 12 reps', section: 'main' },
      { id: 'thu-c1', name: 'Bird Dog', reps: '3 × 10 each side', section: 'core' },
      { id: 'thu-c2', name: 'Dead Bug', reps: '3 × 12 reps', section: 'core' },
      { id: 'thu-d1', name: 'Shoulder Stretch', reps: '30 sec each', section: 'cooldown' },
      { id: 'thu-d2', name: 'Lat Stretch', reps: '30 sec each side', section: 'cooldown' },
    ],
  },
  {
    id: 'friday',
    dayName: 'Friday',
    focus: 'Full Body HIIT',
    exercises: [
      { id: 'fri-w1', name: 'Light Jog in Place', reps: '1 min', section: 'warmup' },
      { id: 'fri-w2', name: 'Dynamic Stretches', reps: '2 min', section: 'warmup' },
      { id: 'fri-m1', name: 'Jump Squats', reps: '4 × 10 reps', section: 'main' },
      { id: 'fri-m2', name: 'Push-up to Shoulder Tap', reps: '4 × 8 reps', section: 'main' },
      { id: 'fri-m3', name: 'Reverse Lunges', reps: '4 × 10 each leg', section: 'main' },
      { id: 'fri-m4', name: 'Plank Jacks', reps: '4 × 30 sec', section: 'main' },
      { id: 'fri-m5', name: 'Squat Pulses', reps: '4 × 20 sec', section: 'main' },
      { id: 'fri-c1', name: 'V-ups', reps: '3 × 12 reps', section: 'core' },
      { id: 'fri-c2', name: 'Plank Hip Dips', reps: '3 × 16 reps', section: 'core' },
      { id: 'fri-d1', name: 'Standing Forward Fold', reps: '45 sec', section: 'cooldown' },
      { id: 'fri-d2', name: 'Pigeon Pose', reps: '45 sec each side', section: 'cooldown' },
    ],
  },
  {
    id: 'saturday',
    dayName: 'Saturday',
    focus: 'Active Recovery + Mobility',
    exercises: [
      { id: 'sat-w1', name: 'Light Walking', reps: '3 min', section: 'warmup' },
      { id: 'sat-m1', name: 'Cat-Cow Stretch', reps: '2 × 10 reps', section: 'main' },
      { id: 'sat-m2', name: 'Thread the Needle', reps: '8 each side', section: 'main' },
      { id: 'sat-m3', name: 'Hip 90/90 Stretch', reps: '1 min each side', section: 'main' },
      { id: 'sat-m4', name: 'World\'s Greatest Stretch', reps: '5 each side', section: 'main' },
      { id: 'sat-m5', name: 'Deep Squat Hold', reps: '2 × 30 sec', section: 'main' },
      { id: 'sat-c1', name: 'Gentle Core Breathing', reps: '2 min', section: 'core' },
      { id: 'sat-d1', name: 'Full Body Stretch Flow', reps: '5 min', section: 'cooldown' },
    ],
  },
  {
    id: 'sunday',
    dayName: 'Sunday',
    focus: 'Light Core + Flexibility',
    exercises: [
      { id: 'sun-w1', name: 'Gentle Neck Rolls', reps: '1 min', section: 'warmup' },
      { id: 'sun-w2', name: 'Shoulder Circles', reps: '1 min', section: 'warmup' },
      { id: 'sun-m1', name: 'Bird Dog', reps: '2 × 8 each side', section: 'main' },
      { id: 'sun-m2', name: 'Glute Bridges', reps: '2 × 12 reps', section: 'main' },
      { id: 'sun-m3', name: 'Side-Lying Leg Raises', reps: '2 × 10 each', section: 'main' },
      { id: 'sun-c1', name: 'Dead Bug', reps: '2 × 10 reps', section: 'core' },
      { id: 'sun-c2', name: 'Gentle Plank', reps: '2 × 20 sec', section: 'core' },
      { id: 'sun-d1', name: 'Seated Forward Fold', reps: '1 min', section: 'cooldown' },
      { id: 'sun-d2', name: 'Supine Spinal Twist', reps: '1 min each side', section: 'cooldown' },
      { id: 'sun-d3', name: 'Happy Baby Pose', reps: '1 min', section: 'cooldown' },
    ],
  },
];

export const getSectionLabel = (section: string): string => {
  switch (section) {
    case 'warmup':
      return 'Warm-up';
    case 'main':
      return 'Main Workout';
    case 'core':
      return 'Core';
    case 'cooldown':
      return 'Cooldown';
    default:
      return section;
  }
};
