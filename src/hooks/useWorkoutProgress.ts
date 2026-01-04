import { useState, useEffect, useCallback } from 'react';
import { WorkoutProgress, WorkoutHistoryEntry, DayStatus } from '@/types/workout';
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
  notes: {},
  dayStatuses: {},
  exerciseSwaps: {},
  totalWorkoutsCompleted: 0,
  longestStreak: 0,
  workoutHistory: [],
  achievements: [],
  hasSeenOnboarding: true, // Default to true so app loads immediately
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
        
        // Ensure all new fields exist
        const mergedProgress: WorkoutProgress = {
          ...getDefaultProgress(),
          ...parsed,
          notes: parsed.notes || {},
          dayStatuses: parsed.dayStatuses || {},
          exerciseSwaps: parsed.exerciseSwaps || {},
          totalWorkoutsCompleted: parsed.totalWorkoutsCompleted || 0,
          longestStreak: parsed.longestStreak || 0,
          workoutHistory: parsed.workoutHistory || [],
          achievements: parsed.achievements || [],
        };
        
        // Check if we need to reset for a new week
        if (mergedProgress.weekStartDate !== currentWeekStart) {
          // Save history entry for the completed week
          const wasLastWeekComplete = checkWeekComplete(mergedProgress.completedExercises);
          const allExerciseIds = workoutPlan.flatMap(day => day.exercises.map(e => e.id));
          const completedCount = allExerciseIds.filter(id => mergedProgress.completedExercises[id]).length;
          
          const historyEntry: WorkoutHistoryEntry = {
            weekStartDate: mergedProgress.weekStartDate,
            completedDays: workoutPlan.filter(day => {
              const dayExercises = day.exercises;
              return dayExercises.every(e => mergedProgress.completedExercises[e.id]);
            }).length,
            completedExercises: completedCount,
            totalExercises: allExerciseIds.length,
          };
          
          const newProgress: WorkoutProgress = {
            ...mergedProgress,
            completedExercises: {},
            weekStartDate: currentWeekStart,
            streak: wasLastWeekComplete ? mergedProgress.streak + 1 : 0,
            lastCompletedWeek: wasLastWeekComplete ? mergedProgress.weekStartDate : mergedProgress.lastCompletedWeek,
            notes: {},
            dayStatuses: {},
            longestStreak: Math.max(mergedProgress.longestStreak, wasLastWeekComplete ? mergedProgress.streak + 1 : mergedProgress.streak),
            workoutHistory: [...mergedProgress.workoutHistory, historyEntry].slice(-12), // Keep last 12 weeks
          };
          setProgress(newProgress);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(newProgress));
        } else {
          setProgress(mergedProgress);
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
    setProgress(prev => {
      const wasCompleted = prev.completedExercises[exerciseId];
      const newCompleted = {
        ...prev.completedExercises,
        [exerciseId]: !wasCompleted,
      };
      
      // Count total completed workouts
      const completedCount = Object.values(newCompleted).filter(Boolean).length;
      const prevCompletedCount = Object.values(prev.completedExercises).filter(Boolean).length;
      
      // Check for new achievements
      const newAchievements = [...prev.achievements];
      
      // First workout achievement
      if (!wasCompleted && !prev.achievements.includes('first_workout')) {
        newAchievements.push('first_workout');
      }
      
      // Early bird / Night owl
      const hour = new Date().getHours();
      if (!wasCompleted && hour < 8 && !prev.achievements.includes('early_bird')) {
        newAchievements.push('early_bird');
      }
      if (!wasCompleted && hour >= 21 && !prev.achievements.includes('night_owl')) {
        newAchievements.push('night_owl');
      }
      
      return {
        ...prev,
        completedExercises: newCompleted,
        totalWorkoutsCompleted: prev.totalWorkoutsCompleted + (!wasCompleted ? 1 : -1),
        achievements: newAchievements,
      };
    });
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

  const setDayNote = useCallback((dayId: string, note: string) => {
    setProgress(prev => {
      const newAchievements = [...prev.achievements];
      if (note && !prev.achievements.includes('note_taker')) {
        newAchievements.push('note_taker');
      }
      return {
        ...prev,
        notes: { ...prev.notes, [dayId]: note },
        achievements: newAchievements,
      };
    });
  }, []);

  const getDayNote = useCallback((dayId: string): string => {
    return progress.notes[dayId] || '';
  }, [progress.notes]);

  const skipDay = useCallback((dayId: string, reason: 'rest' | 'missed') => {
    setProgress(prev => ({
      ...prev,
      dayStatuses: {
        ...prev.dayStatuses,
        [dayId]: { completed: false, skipped: true, skippedReason: reason },
      },
    }));
  }, []);

  const isDaySkipped = useCallback((dayId: string): DayStatus | null => {
    return progress.dayStatuses[dayId] || null;
  }, [progress.dayStatuses]);

  const swapExercise = useCallback((exerciseId: string, alternativeName: string) => {
    setProgress(prev => ({
      ...prev,
      exerciseSwaps: { ...prev.exerciseSwaps, [exerciseId]: alternativeName },
    }));
  }, []);

  const getExerciseSwap = useCallback((exerciseId: string): string | null => {
    return progress.exerciseSwaps[exerciseId] || null;
  }, [progress.exerciseSwaps]);

  const unlockAchievement = useCallback((achievementId: string) => {
    setProgress(prev => {
      if (prev.achievements.includes(achievementId)) return prev;
      return {
        ...prev,
        achievements: [...prev.achievements, achievementId],
      };
    });
  }, []);

  const setReminderTime = useCallback((time: string | undefined) => {
    setProgress(prev => ({ ...prev, reminderTime: time }));
  }, []);

  const setAccentColor = useCallback((color: string) => {
    setProgress(prev => ({ ...prev, accentColor: color }));
  }, []);

  const markOnboardingComplete = useCallback(() => {
    setProgress(prev => ({ ...prev, hasSeenOnboarding: true }));
  }, []);

  return {
    progress,
    isLoaded,
    toggleExercise,
    getDayProgress,
    getWeekProgress,
    isExerciseCompleted,
    isDayCompleted,
    streak: progress.streak,
    setDayNote,
    getDayNote,
    skipDay,
    isDaySkipped,
    swapExercise,
    getExerciseSwap,
    unlockAchievement,
    achievements: progress.achievements,
    totalWorkoutsCompleted: progress.totalWorkoutsCompleted,
    longestStreak: progress.longestStreak,
    workoutHistory: progress.workoutHistory,
    setReminderTime,
    reminderTime: progress.reminderTime,
    setAccentColor,
    accentColor: progress.accentColor,
    hasSeenOnboarding: progress.hasSeenOnboarding,
    markOnboardingComplete,
  };
};
