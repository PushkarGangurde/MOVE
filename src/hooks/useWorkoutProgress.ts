import { useState, useEffect, useCallback } from 'react';
import { WorkoutProgress } from '@/types/workout';
import { workoutPlan } from '@/data/workoutPlan';

const STORAGE_KEY = 'workout-tracker-progress';

const getMonday = (date: Date): Date => {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  d.setDate(diff);
  d.setHours(0, 0, 0, 0);
  return d;
};

const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

const getDefaultProgress = (): WorkoutProgress => ({
  completedExercises: {},
  weekStartDate: formatDate(getMonday(new Date())),
  streak: 0,
  lastCompletedWeek: null,
});

export const useWorkoutProgress = () => {
  const [progress, setProgress] = useState<WorkoutProgress>(getDefaultProgress);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed: WorkoutProgress = JSON.parse(stored);
        const currentWeekStart = formatDate(getMonday(new Date()));
        
        // Check if we need to reset for a new week
        if (parsed.weekStartDate !== currentWeekStart) {
          // Check if last week was completed
          const wasLastWeekComplete = checkWeekComplete(parsed.completedExercises);
          
          const newProgress: WorkoutProgress = {
            completedExercises: {},
            weekStartDate: currentWeekStart,
            streak: wasLastWeekComplete ? parsed.streak + 1 : 0,
            lastCompletedWeek: wasLastWeekComplete ? parsed.weekStartDate : parsed.lastCompletedWeek,
          };
          setProgress(newProgress);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(newProgress));
        } else {
          setProgress(parsed);
        }
      } catch (e) {
        console.error('Failed to parse workout progress', e);
        setProgress(getDefaultProgress());
      }
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    }
  }, [progress, isLoaded]);

  const checkWeekComplete = (exercises: Record<string, boolean>): boolean => {
    const allExerciseIds = workoutPlan.flatMap(day => day.exercises.map(e => e.id));
    return allExerciseIds.every(id => exercises[id] === true);
  };

  const toggleExercise = useCallback((exerciseId: string) => {
    setProgress(prev => ({
      ...prev,
      completedExercises: {
        ...prev.completedExercises,
        [exerciseId]: !prev.completedExercises[exerciseId],
      },
    }));
  }, []);

  const getDayProgress = useCallback((dayId: string): { completed: number; total: number; percentage: number } => {
    const day = workoutPlan.find(d => d.id === dayId);
    if (!day) return { completed: 0, total: 0, percentage: 0 };
    
    const total = day.exercises.length;
    const completed = day.exercises.filter(e => progress.completedExercises[e.id]).length;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    
    return { completed, total, percentage };
  }, [progress.completedExercises]);

  const getWeekProgress = useCallback((): { completedDays: number; totalDays: number; percentage: number } => {
    let completedDays = 0;
    
    workoutPlan.forEach(day => {
      const dayProgress = getDayProgress(day.id);
      if (dayProgress.percentage === 100) {
        completedDays++;
      }
    });
    
    return {
      completedDays,
      totalDays: 7,
      percentage: Math.round((completedDays / 7) * 100),
    };
  }, [getDayProgress]);

  const isExerciseCompleted = useCallback((exerciseId: string): boolean => {
    return progress.completedExercises[exerciseId] === true;
  }, [progress.completedExercises]);

  const isDayCompleted = useCallback((dayId: string): boolean => {
    return getDayProgress(dayId).percentage === 100;
  }, [getDayProgress]);

  return {
    progress,
    isLoaded,
    toggleExercise,
    getDayProgress,
    getWeekProgress,
    isExerciseCompleted,
    isDayCompleted,
    streak: progress.streak,
  };
};
