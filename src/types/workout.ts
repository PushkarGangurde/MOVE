export interface Exercise {
  id: string;
  name: string;
  reps: string;
  section: 'warmup' | 'main' | 'core' | 'cooldown';
}

export interface DayWorkout {
  id: string;
  dayName: string;
  focus: string;
  exercises: Exercise[];
}

export interface WorkoutProgress {
  completedExercises: Record<string, boolean>;
  weekStartDate: string;
  streak: number;
  lastCompletedWeek: string | null;
}

export type DayId = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
