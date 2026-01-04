import { DayWorkout, DifficultyLevel } from '@/types/workout';

// ================== BEGINNER PLAN ==================
const beginnerPlan: DayWorkout[] = [
  {
    id: 'monday',
    dayName: 'Monday',
    focus: 'Full Body (Beginner Friendly)',
    exercises: [
      { id: 'mon-w1', name: 'Jumping Jacks', reps: '1 minute', section: 'warmup' },
      { id: 'mon-w2', name: 'Arm Circles', reps: '30 sec forward + 30 sec backward', section: 'warmup' },
      { id: 'mon-w3', name: 'Standing High Knees (slow)', reps: '1 minute', section: 'warmup' },
      { id: 'mon-w4', name: 'Hip Rotations', reps: '1 minute', section: 'warmup' },
      { id: 'mon-w5', name: 'Shoulder Rolls', reps: '1 minute', section: 'warmup' },
      { id: 'mon-w6', name: 'Standing Toe Touches', reps: '1 minute', section: 'warmup' },
      { id: 'mon-m1', name: 'Bodyweight Squats', reps: '3 × 15 reps', section: 'main' },
      { id: 'mon-m2', name: 'Incline Push-Ups', reps: '3 × 10 reps', section: 'main' },
      { id: 'mon-m3', name: 'Glute Bridges', reps: '3 × 15 reps', section: 'main' },
      { id: 'mon-m4', name: 'Standing March in Place', reps: '3 × 30 seconds', section: 'main' },
      { id: 'mon-m5', name: 'Plank (knees down)', reps: '3 × 20-30 seconds', section: 'main' },
      { id: 'mon-d1', name: 'Standing Quad Stretch', reps: '30 sec each leg', section: 'cooldown' },
      { id: 'mon-d2', name: 'Hamstring Stretch', reps: '30 sec each leg', section: 'cooldown' },
      { id: 'mon-d3', name: 'Chest Stretch', reps: '30 sec', section: 'cooldown' },
      { id: 'mon-d4', name: "Child's Pose", reps: '1 minute', section: 'cooldown' },
      { id: 'mon-d5', name: 'Deep Breathing', reps: '2 minutes', section: 'cooldown' },
    ],
  },
  {
    id: 'tuesday',
    dayName: 'Tuesday',
    focus: 'Lower Body (Legs & Glutes)',
    exercises: [
      { id: 'tue-w1', name: 'March in Place', reps: '1 minute', section: 'warmup' },
      { id: 'tue-w2', name: 'Arm Swings', reps: '1 minute', section: 'warmup' },
      { id: 'tue-w3', name: 'Hip Circles', reps: '1 minute', section: 'warmup' },
      { id: 'tue-w4', name: 'Half Squats', reps: '15 reps', section: 'warmup' },
      { id: 'tue-w5', name: 'Leg Swings', reps: '1 minute each leg', section: 'warmup' },
      { id: 'tue-m1', name: 'Bodyweight Squats', reps: '3 × 20 reps', section: 'main' },
      { id: 'tue-m2', name: 'Static Lunges', reps: '3 × 8 reps each leg', section: 'main' },
      { id: 'tue-m3', name: 'Wall Sit', reps: '3 × 25-30 seconds', section: 'main' },
      { id: 'tue-m4', name: 'Glute Bridges', reps: '3 × 15 reps', section: 'main' },
      { id: 'tue-m5', name: 'Calf Raises', reps: '3 × 20 reps', section: 'main' },
      { id: 'tue-d1', name: 'Standing Quad Stretch', reps: '30 sec each leg', section: 'cooldown' },
      { id: 'tue-d2', name: 'Seated Hamstring Stretch', reps: '1 minute', section: 'cooldown' },
      { id: 'tue-d3', name: 'Calf Stretch', reps: '1 minute', section: 'cooldown' },
      { id: 'tue-d4', name: 'Hip Stretch', reps: '30 sec each side', section: 'cooldown' },
      { id: 'tue-d5', name: 'Deep Breathing', reps: '2 minutes', section: 'cooldown' },
    ],
  },
  {
    id: 'wednesday',
    dayName: 'Wednesday',
    focus: 'Core & Abs (Beginner)',
    exercises: [
      { id: 'wed-w1', name: 'Jumping Jacks (slow)', reps: '1 minute', section: 'warmup' },
      { id: 'wed-w2', name: 'Torso Twists', reps: '1 minute', section: 'warmup' },
      { id: 'wed-w3', name: 'Standing Side Bends', reps: '1 minute', section: 'warmup' },
      { id: 'wed-w4', name: 'Arm Swings', reps: '1 minute', section: 'warmup' },
      { id: 'wed-w5', name: 'Shoulder Rolls', reps: '1 minute', section: 'warmup' },
      { id: 'wed-m1', name: 'Plank (knees allowed)', reps: '3 × 20-30 seconds', section: 'main' },
      { id: 'wed-m2', name: 'Lying Leg Raises', reps: '3 × 10 reps', section: 'main' },
      { id: 'wed-m3', name: 'Russian Twists', reps: '3 × 16 twists', section: 'main' },
      { id: 'wed-m4', name: 'Flutter Kicks', reps: '3 × 20 seconds', section: 'main' },
      { id: 'wed-m5', name: 'Superman Hold', reps: '3 × 20-30 seconds', section: 'main' },
      { id: 'wed-d1', name: 'Cobra Stretch', reps: '1 minute', section: 'cooldown' },
      { id: 'wed-d2', name: 'Cat-Cow Stretch', reps: '1 minute', section: 'cooldown' },
      { id: 'wed-d3', name: 'Lying Spinal Twist', reps: '30 sec each side', section: 'cooldown' },
      { id: 'wed-d4', name: "Child's Pose", reps: '1 minute', section: 'cooldown' },
      { id: 'wed-d5', name: 'Deep Breathing', reps: '2 minutes', section: 'cooldown' },
    ],
  },
  {
    id: 'thursday',
    dayName: 'Thursday',
    focus: 'Upper Body (Arms, Chest, Shoulders)',
    exercises: [
      { id: 'thu-w1', name: 'Arm Circles', reps: '1 minute', section: 'warmup' },
      { id: 'thu-w2', name: 'Shoulder Rolls', reps: '1 minute', section: 'warmup' },
      { id: 'thu-w3', name: 'Wrist Rotations', reps: '1 minute', section: 'warmup' },
      { id: 'thu-w4', name: 'Jumping Jacks', reps: '1 minute', section: 'warmup' },
      { id: 'thu-w5', name: 'Torso Twists', reps: '1 minute', section: 'warmup' },
      { id: 'thu-w6', name: 'Neck Rotations', reps: '1 minute', section: 'warmup' },
      { id: 'thu-m1', name: 'Knee Push-Ups', reps: '3 × 10 reps', section: 'main' },
      { id: 'thu-m2', name: 'Shoulder Taps (knees)', reps: '3 × 16 taps', section: 'main' },
      { id: 'thu-m3', name: 'Tricep Dips (bent knees)', reps: '3 × 10 reps', section: 'main' },
      { id: 'thu-m4', name: 'Pike Hold', reps: '3 × 20 seconds', section: 'main' },
      { id: 'thu-m5', name: 'Plank', reps: '3 × 20-30 seconds', section: 'main' },
      { id: 'thu-d1', name: 'Chest Stretch', reps: '30 sec', section: 'cooldown' },
      { id: 'thu-d2', name: 'Triceps Stretch', reps: '30 sec each arm', section: 'cooldown' },
      { id: 'thu-d3', name: 'Shoulder Stretch', reps: '30 sec each arm', section: 'cooldown' },
      { id: 'thu-d4', name: 'Cobra Pose', reps: '1 minute', section: 'cooldown' },
      { id: 'thu-d5', name: 'Deep Breathing', reps: '2 minutes', section: 'cooldown' },
    ],
  },
  {
    id: 'friday',
    dayName: 'Friday',
    focus: 'Full Body Light Cardio',
    exercises: [
      { id: 'fri-w1', name: 'March in Place', reps: '1 minute', section: 'warmup' },
      { id: 'fri-w2', name: 'Arm Swings', reps: '1 minute', section: 'warmup' },
      { id: 'fri-w3', name: 'High Knees (slow)', reps: '1 minute', section: 'warmup' },
      { id: 'fri-w4', name: 'Hip Circles', reps: '1 minute', section: 'warmup' },
      { id: 'fri-w5', name: 'Shoulder Rolls', reps: '1 minute', section: 'warmup' },
      { id: 'fri-w6', name: 'Light Stretch', reps: '1 minute', section: 'warmup' },
      { id: 'fri-m1', name: 'Jumping Jacks', reps: '3 × 40 sec work, 20 sec rest', section: 'main' },
      { id: 'fri-m2', name: 'Bodyweight Squats', reps: '3 × 40 sec work, 20 sec rest', section: 'main' },
      { id: 'fri-m3', name: 'Incline Push-Ups', reps: '3 × 40 sec work, 20 sec rest', section: 'main' },
      { id: 'fri-m4', name: 'Standing Knee Raises', reps: '3 × 40 sec work, 20 sec rest', section: 'main' },
      { id: 'fri-m5', name: 'Plank Hold', reps: '3 × 40 sec work, 20 sec rest', section: 'main' },
      { id: 'fri-d1', name: 'Standing Forward Fold', reps: '1 minute', section: 'cooldown' },
      { id: 'fri-d2', name: 'Hamstring Stretch', reps: '1 minute', section: 'cooldown' },
      { id: 'fri-d3', name: 'Shoulder Stretch', reps: '1 minute', section: 'cooldown' },
      { id: 'fri-d4', name: 'Butterfly Stretch', reps: '1 minute', section: 'cooldown' },
      { id: 'fri-d5', name: 'Deep Breathing', reps: '2 minutes', section: 'cooldown' },
    ],
  },
  {
    id: 'saturday',
    dayName: 'Saturday',
    focus: 'Core + Stretch (Holiday Day)',
    exercises: [
      { id: 'sat-w1', name: 'Arm Circles', reps: '1 minute', section: 'warmup' },
      { id: 'sat-w2', name: 'Torso Twists', reps: '1 minute', section: 'warmup' },
      { id: 'sat-w3', name: 'Standing March', reps: '1 minute', section: 'warmup' },
      { id: 'sat-w4', name: 'Side Bends', reps: '1 minute', section: 'warmup' },
      { id: 'sat-w5', name: 'Ankle Rotations', reps: '1 minute', section: 'warmup' },
      { id: 'sat-m1', name: 'Bird-Dog', reps: '3 × 8 reps each side', section: 'main' },
      { id: 'sat-m2', name: 'Glute Bridges', reps: '3 × 15 reps', section: 'main' },
      { id: 'sat-m3', name: 'Side Plank (knees)', reps: '3 × 20 sec each side', section: 'main' },
      { id: 'sat-m4', name: 'Lying Leg Raises', reps: '3 × 10 reps', section: 'main' },
      { id: 'sat-m5', name: 'Superman Hold', reps: '3 × 30 seconds', section: 'main' },
      { id: 'sat-d1', name: 'Seated Forward Fold', reps: '1 minute', section: 'cooldown' },
      { id: 'sat-d2', name: 'Butterfly Stretch', reps: '1 minute', section: 'cooldown' },
      { id: 'sat-d3', name: 'Cobra Pose', reps: '1 minute', section: 'cooldown' },
      { id: 'sat-d4', name: 'Shoulder Stretch', reps: '1 minute', section: 'cooldown' },
      { id: 'sat-d5', name: 'Deep Breathing / Relaxation', reps: '3-5 minutes', section: 'cooldown' },
    ],
  },
  {
    id: 'sunday',
    dayName: 'Sunday',
    focus: 'Rest & Recovery',
    exercises: [
      { id: 'sun-w1', name: 'Neck Rolls', reps: '1 minute', section: 'warmup' },
      { id: 'sun-w2', name: 'Shoulder Rolls', reps: '1 minute', section: 'warmup' },
      { id: 'sun-m1', name: 'Standing Toe Touch', reps: '1 minute', section: 'main' },
      { id: 'sun-m2', name: 'Hip Circles', reps: '1 minute', section: 'main' },
      { id: 'sun-m3', name: 'Cat-Cow Stretch', reps: '1 minute', section: 'main' },
      { id: 'sun-m4', name: "Child's Pose", reps: '1 minute', section: 'main' },
      { id: 'sun-m5', name: 'Butterfly Stretch', reps: '1 minute', section: 'main' },
      { id: 'sun-m6', name: 'Hamstring Stretch', reps: '1 minute', section: 'main' },
      { id: 'sun-m7', name: 'Chest Stretch', reps: '1 minute', section: 'main' },
      { id: 'sun-d1', name: 'Deep Breathing / Meditation', reps: '5-10 minutes', section: 'cooldown' },
    ],
  },
];

// ================== INTERMEDIATE PLAN ==================
const intermediatePlan: DayWorkout[] = [
  {
    id: 'monday',
    dayName: 'Monday',
    focus: 'Full Body Strength + Cardio',
    exercises: [
      { id: 'mon-w1', name: 'Jumping Jacks', reps: '1 minute', section: 'warmup' },
      { id: 'mon-w2', name: 'High Knees', reps: '1 minute', section: 'warmup' },
      { id: 'mon-w3', name: 'Arm Circles', reps: '1 minute', section: 'warmup' },
      { id: 'mon-w4', name: 'Hip Rotations', reps: '1 minute', section: 'warmup' },
      { id: 'mon-w5', name: 'Leg Swings', reps: '1 minute each leg', section: 'warmup' },
      { id: 'mon-w6', name: 'Shoulder Rolls', reps: '1 minute', section: 'warmup' },
      { id: 'mon-m1', name: 'Jump Squats', reps: '4 × 15 reps', section: 'main' },
      { id: 'mon-m2', name: 'Push-Ups', reps: '4 × 12 reps', section: 'main' },
      { id: 'mon-m3', name: 'Reverse Lunges', reps: '4 × 10 reps each leg', section: 'main' },
      { id: 'mon-m4', name: 'Mountain Climbers', reps: '4 × 30 seconds', section: 'main' },
      { id: 'mon-m5', name: 'Plank', reps: '4 × 40 seconds', section: 'main' },
      { id: 'mon-d1', name: 'Standing Quad Stretch', reps: '30 sec each leg', section: 'cooldown' },
      { id: 'mon-d2', name: 'Hamstring Stretch', reps: '30 sec each leg', section: 'cooldown' },
      { id: 'mon-d3', name: 'Chest Stretch', reps: '30 sec', section: 'cooldown' },
      { id: 'mon-d4', name: "Child's Pose", reps: '1 minute', section: 'cooldown' },
      { id: 'mon-d5', name: 'Deep Breathing', reps: '2-3 minutes', section: 'cooldown' },
    ],
  },
  {
    id: 'tuesday',
    dayName: 'Tuesday',
    focus: 'Legs & Glutes (Strength Focus)',
    exercises: [
      { id: 'tue-w1', name: 'March in Place', reps: '1 minute', section: 'warmup' },
      { id: 'tue-w2', name: 'Jumping Jacks', reps: '1 minute', section: 'warmup' },
      { id: 'tue-w3', name: 'Hip Circles', reps: '1 minute', section: 'warmup' },
      { id: 'tue-w4', name: 'Bodyweight Squats', reps: '20 reps', section: 'warmup' },
      { id: 'tue-w5', name: 'Walking Lunges', reps: '10 reps each leg', section: 'warmup' },
      { id: 'tue-m1', name: 'Squats', reps: '4 × 25 reps', section: 'main' },
      { id: 'tue-m2', name: 'Bulgarian Split Squats', reps: '4 × 10 reps each leg', section: 'main' },
      { id: 'tue-m3', name: 'Wall Sit', reps: '4 × 40-45 seconds', section: 'main' },
      { id: 'tue-m4', name: 'Glute Bridges', reps: '4 × 20 reps', section: 'main' },
      { id: 'tue-m5', name: 'Calf Raises', reps: '4 × 30 reps', section: 'main' },
      { id: 'tue-d1', name: 'Quad Stretch', reps: '30 sec each leg', section: 'cooldown' },
      { id: 'tue-d2', name: 'Seated Hamstring Stretch', reps: '1 minute', section: 'cooldown' },
      { id: 'tue-d3', name: 'Hip Flexor Stretch', reps: '30 sec each side', section: 'cooldown' },
      { id: 'tue-d4', name: 'Calf Stretch', reps: '1 minute', section: 'cooldown' },
      { id: 'tue-d5', name: 'Deep Breathing', reps: '2 minutes', section: 'cooldown' },
    ],
  },
  {
    id: 'wednesday',
    dayName: 'Wednesday',
    focus: 'Core & Abs (Intermediate)',
    exercises: [
      { id: 'wed-w1', name: 'Jumping Jacks', reps: '1 minute', section: 'warmup' },
      { id: 'wed-w2', name: 'Torso Twists', reps: '1 minute', section: 'warmup' },
      { id: 'wed-w3', name: 'Standing Side Bends', reps: '1 minute', section: 'warmup' },
      { id: 'wed-w4', name: 'Arm Swings', reps: '1 minute', section: 'warmup' },
      { id: 'wed-w5', name: 'Shoulder Rolls', reps: '1 minute', section: 'warmup' },
      { id: 'wed-m1', name: 'Plank', reps: '4 × 45 seconds', section: 'main' },
      { id: 'wed-m2', name: 'Leg Raises', reps: '4 × 15 reps', section: 'main' },
      { id: 'wed-m3', name: 'Bicycle Crunches', reps: '4 × 20 reps', section: 'main' },
      { id: 'wed-m4', name: 'Flutter Kicks', reps: '4 × 40 seconds', section: 'main' },
      { id: 'wed-m5', name: 'Superman Hold', reps: '4 × 40 seconds', section: 'main' },
      { id: 'wed-d1', name: 'Cobra Stretch', reps: '1 minute', section: 'cooldown' },
      { id: 'wed-d2', name: 'Cat-Cow Stretch', reps: '1 minute', section: 'cooldown' },
      { id: 'wed-d3', name: 'Lying Spinal Twist', reps: '30 sec each side', section: 'cooldown' },
      { id: 'wed-d4', name: "Child's Pose", reps: '1 minute', section: 'cooldown' },
      { id: 'wed-d5', name: 'Deep Breathing', reps: '2 minutes', section: 'cooldown' },
    ],
  },
  {
    id: 'thursday',
    dayName: 'Thursday',
    focus: 'Upper Body & Core',
    exercises: [
      { id: 'thu-w1', name: 'Arm Circles', reps: '1 minute', section: 'warmup' },
      { id: 'thu-w2', name: 'Shoulder Rolls', reps: '1 minute', section: 'warmup' },
      { id: 'thu-w3', name: 'Wrist Rotations', reps: '1 minute', section: 'warmup' },
      { id: 'thu-w4', name: 'Jumping Jacks', reps: '1 minute', section: 'warmup' },
      { id: 'thu-w5', name: 'Torso Twists', reps: '1 minute', section: 'warmup' },
      { id: 'thu-w6', name: 'Neck Rotations', reps: '1 minute', section: 'warmup' },
      { id: 'thu-m1', name: 'Push-Ups', reps: '4 × 15 reps', section: 'main' },
      { id: 'thu-m2', name: 'Tricep Dips', reps: '4 × 15 reps', section: 'main' },
      { id: 'thu-m3', name: 'Pike Push-Ups', reps: '4 × 10 reps', section: 'main' },
      { id: 'thu-m4', name: 'Shoulder Taps', reps: '4 × 24 taps', section: 'main' },
      { id: 'thu-m5', name: 'Forearm Plank', reps: '4 × 45 seconds', section: 'main' },
      { id: 'thu-d1', name: 'Shoulder Stretch', reps: '30 sec each arm', section: 'cooldown' },
      { id: 'thu-d2', name: 'Triceps Stretch', reps: '30 sec each arm', section: 'cooldown' },
      { id: 'thu-d3', name: 'Chest Stretch', reps: '30 sec', section: 'cooldown' },
      { id: 'thu-d4', name: 'Cobra Pose', reps: '1 minute', section: 'cooldown' },
      { id: 'thu-d5', name: 'Deep Breathing', reps: '2 minutes', section: 'cooldown' },
    ],
  },
  {
    id: 'friday',
    dayName: 'Friday',
    focus: 'Full Body HIIT (Fat Burn)',
    exercises: [
      { id: 'fri-w1', name: 'Jumping Jacks', reps: '1 minute', section: 'warmup' },
      { id: 'fri-w2', name: 'High Knees', reps: '1 minute', section: 'warmup' },
      { id: 'fri-w3', name: 'Arm Swings', reps: '1 minute', section: 'warmup' },
      { id: 'fri-w4', name: 'Hip Circles', reps: '1 minute', section: 'warmup' },
      { id: 'fri-w5', name: 'Dynamic Toe Touches', reps: '1 minute', section: 'warmup' },
      { id: 'fri-m1', name: 'Burpees', reps: '4 × 40 sec work, 20 sec rest', section: 'main' },
      { id: 'fri-m2', name: 'Jump Squats', reps: '4 × 40 sec work, 20 sec rest', section: 'main' },
      { id: 'fri-m3', name: 'Push-Ups', reps: '4 × 40 sec work, 20 sec rest', section: 'main' },
      { id: 'fri-m4', name: 'Plank Jacks', reps: '4 × 40 sec work, 20 sec rest', section: 'main' },
      { id: 'fri-m5', name: 'Mountain Climbers', reps: '4 × 40 sec work, 20 sec rest', section: 'main' },
      { id: 'fri-d1', name: 'Standing Forward Fold', reps: '1 minute', section: 'cooldown' },
      { id: 'fri-d2', name: 'Hamstring Stretch', reps: '1 minute', section: 'cooldown' },
      { id: 'fri-d3', name: 'Butterfly Stretch', reps: '1 minute', section: 'cooldown' },
      { id: 'fri-d4', name: 'Shoulder Stretch', reps: '1 minute', section: 'cooldown' },
      { id: 'fri-d5', name: 'Deep Breathing', reps: '2 minutes', section: 'cooldown' },
    ],
  },
  {
    id: 'saturday',
    dayName: 'Saturday',
    focus: 'Core + Stability (Holiday Day)',
    exercises: [
      { id: 'sat-w1', name: 'Arm Circles', reps: '1 minute', section: 'warmup' },
      { id: 'sat-w2', name: 'Hip Circles', reps: '1 minute', section: 'warmup' },
      { id: 'sat-w3', name: 'Standing March', reps: '1 minute', section: 'warmup' },
      { id: 'sat-w4', name: 'Side Bends', reps: '1 minute', section: 'warmup' },
      { id: 'sat-w5', name: 'Ankle Rotations', reps: '1 minute', section: 'warmup' },
      { id: 'sat-m1', name: 'Bird-Dog', reps: '4 × 10 reps each side', section: 'main' },
      { id: 'sat-m2', name: 'Side Plank', reps: '4 × 30 seconds each side', section: 'main' },
      { id: 'sat-m3', name: 'Hollow Hold', reps: '4 × 30-35 seconds', section: 'main' },
      { id: 'sat-m4', name: 'Glute Bridge March', reps: '4 × 20 reps', section: 'main' },
      { id: 'sat-m5', name: 'Superman Hold', reps: '4 × 45 seconds', section: 'main' },
      { id: 'sat-d1', name: 'Seated Forward Fold', reps: '1 minute', section: 'cooldown' },
      { id: 'sat-d2', name: 'Butterfly Stretch', reps: '1 minute', section: 'cooldown' },
      { id: 'sat-d3', name: 'Cobra Pose', reps: '1 minute', section: 'cooldown' },
      { id: 'sat-d4', name: 'Hip Opener Stretch', reps: '1 minute each side', section: 'cooldown' },
      { id: 'sat-d5', name: 'Deep Breathing / Relaxation', reps: '4-5 minutes', section: 'cooldown' },
    ],
  },
  {
    id: 'sunday',
    dayName: 'Sunday',
    focus: 'Active Recovery & Mobility',
    exercises: [
      { id: 'sun-w1', name: 'Neck Rolls', reps: '1 minute', section: 'warmup' },
      { id: 'sun-w2', name: 'Shoulder Rolls', reps: '1 minute', section: 'warmup' },
      { id: 'sun-m1', name: 'Cat-Cow Stretch', reps: '1 minute', section: 'main' },
      { id: 'sun-m2', name: "Child's Pose", reps: '1 minute', section: 'main' },
      { id: 'sun-m3', name: 'Cobra Stretch', reps: '1 minute', section: 'main' },
      { id: 'sun-m4', name: 'Seated Spinal Twist', reps: '1 minute each side', section: 'main' },
      { id: 'sun-m5', name: 'Standing Forward Fold', reps: '1 minute', section: 'main' },
      { id: 'sun-m6', name: 'Hip Flexor Stretch', reps: '1 minute each leg', section: 'main' },
      { id: 'sun-m7', name: 'Butterfly Stretch', reps: '1 minute', section: 'main' },
      { id: 'sun-d1', name: 'Deep Breathing / Meditation', reps: '5-10 minutes', section: 'cooldown' },
    ],
  },
];

// ================== HARDCORE PLAN (Coming Soon) ==================
const hardcorePlan: DayWorkout[] = [
  {
    id: 'monday',
    dayName: 'Monday',
    focus: 'Coming Soon - Hardcore Full Body',
    exercises: [
      { id: 'mon-m1', name: 'Hardcore plan coming soon!', reps: 'Stay tuned', section: 'main' },
    ],
  },
  {
    id: 'tuesday',
    dayName: 'Tuesday',
    focus: 'Coming Soon - Hardcore Legs',
    exercises: [
      { id: 'tue-m1', name: 'Hardcore plan coming soon!', reps: 'Stay tuned', section: 'main' },
    ],
  },
  {
    id: 'wednesday',
    dayName: 'Wednesday',
    focus: 'Coming Soon - Hardcore Core',
    exercises: [
      { id: 'wed-m1', name: 'Hardcore plan coming soon!', reps: 'Stay tuned', section: 'main' },
    ],
  },
  {
    id: 'thursday',
    dayName: 'Thursday',
    focus: 'Coming Soon - Hardcore Upper',
    exercises: [
      { id: 'thu-m1', name: 'Hardcore plan coming soon!', reps: 'Stay tuned', section: 'main' },
    ],
  },
  {
    id: 'friday',
    dayName: 'Friday',
    focus: 'Coming Soon - Hardcore HIIT',
    exercises: [
      { id: 'fri-m1', name: 'Hardcore plan coming soon!', reps: 'Stay tuned', section: 'main' },
    ],
  },
  {
    id: 'saturday',
    dayName: 'Saturday',
    focus: 'Coming Soon - Hardcore Core',
    exercises: [
      { id: 'sat-m1', name: 'Hardcore plan coming soon!', reps: 'Stay tuned', section: 'main' },
    ],
  },
  {
    id: 'sunday',
    dayName: 'Sunday',
    focus: 'Coming Soon - Hardcore Recovery',
    exercises: [
      { id: 'sun-m1', name: 'Hardcore plan coming soon!', reps: 'Stay tuned', section: 'main' },
    ],
  },
];

// ================== PLAN METADATA ==================
export interface PlanInfo {
  id: DifficultyLevel;
  name: string;
  description: string;
  duration: string;
  level: string;
  icon: string;
  available: boolean;
}

export const planInfo: Record<DifficultyLevel, PlanInfo> = {
  beginner: {
    id: 'beginner',
    name: 'Beginner',
    description: 'Perfect for those starting their fitness journey',
    duration: '25-35 min/day',
    level: '3 rounds per exercise',
    icon: '🌱',
    available: true,
  },
  intermediate: {
    id: 'intermediate',
    name: 'Intermediate',
    description: 'Build strength, stamina & better core control',
    duration: '40-50 min/day',
    level: '4 rounds per exercise',
    icon: '💪',
    available: true,
  },
  hardcore: {
    id: 'hardcore',
    name: 'Hardcore',
    description: 'Maximum intensity for advanced athletes',
    duration: '50-60 min/day',
    level: '5 rounds per exercise',
    icon: '🔥',
    available: false,
  },
};

export const workoutPlans: Record<DifficultyLevel, DayWorkout[]> = {
  beginner: beginnerPlan,
  intermediate: intermediatePlan,
  hardcore: hardcorePlan,
};

export const getWorkoutPlan = (difficulty: DifficultyLevel): DayWorkout[] => {
  return workoutPlans[difficulty] || intermediatePlan;
};

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