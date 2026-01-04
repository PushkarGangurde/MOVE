export interface ExerciseAlternative {
  name: string;
  difficulty: 'easier' | 'harder';
  reps: string;
}

export interface Exercise {
  id: string;
  name: string;
  reps: string;
  section: 'warmup' | 'main' | 'core' | 'cooldown';
  alternatives?: ExerciseAlternative[];
}

export interface DayWorkout {
  id: string;
  dayName: string;
  focus: string;
  exercises: Exercise[];
}

export interface DayStatus {
  completed: boolean;
  skipped: boolean;
  skippedReason?: 'rest' | 'missed';
}

export interface WorkoutProgress {
  completedExercises: Record<string, boolean>;
  weekStartDate: string;
  streak: number;
  lastCompletedWeek: string | null;
  notes: Record<string, string>; // dayId -> note
  dayStatuses: Record<string, DayStatus>; // dayId -> status
  exerciseSwaps: Record<string, string>; // exerciseId -> alternative name
  totalWorkoutsCompleted: number;
  longestStreak: number;
  workoutHistory: WorkoutHistoryEntry[];
  achievements: string[];
  reminderTime?: string; // HH:MM format
  accentColor?: string;
  hasSeenOnboarding?: boolean;
}

export interface WorkoutHistoryEntry {
  weekStartDate: string;
  completedDays: number;
  completedExercises: number;
  totalExercises: number;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: string;
}

export type DayId = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
