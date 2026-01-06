import { useState, useEffect, useCallback, useRef } from 'react';
import { WorkoutProgress, WorkoutHistoryEntry, DayStatus, DifficultyLevel } from '@/types/workout';
import { getWorkoutPlan } from '@/data/workoutPlans';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

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

interface ExtendedWorkoutProgress extends WorkoutProgress {
  difficulty: DifficultyLevel;
}

const getDefaultProgress = (): ExtendedWorkoutProgress => ({
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
  hasSeenOnboarding: true,
  difficulty: 'intermediate',
});

export type SyncStatus = 'idle' | 'syncing' | 'synced' | 'error' | 'offline';

export const useWorkoutProgress = () => {
  const { user } = useAuth();
  const [progress, setProgress] = useState<ExtendedWorkoutProgress>(getDefaultProgress);
  const [isLoaded, setIsLoaded] = useState(false);
  const [syncStatus, setSyncStatus] = useState<SyncStatus>('idle');
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const syncResetTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isInitialLoad = useRef(true);

  // Get current workout plan based on difficulty
  const currentPlan = getWorkoutPlan(progress.difficulty);

  const checkWeekComplete = useCallback((exercises: Record<string, boolean>, plan = currentPlan): boolean => {
    const allExerciseIds = plan.flatMap(day => day.exercises.map(e => e.id));
    return allExerciseIds.every(id => exercises[id] === true);
  }, [currentPlan]);

  // Merge and handle week reset logic
  const processProgress = useCallback((parsed: Partial<ExtendedWorkoutProgress>): ExtendedWorkoutProgress => {
    const currentWeekStart = formatDate(getMonday(new Date()));
    
    const mergedProgress: ExtendedWorkoutProgress = {
      ...getDefaultProgress(),
      ...parsed,
      notes: parsed.notes || {},
      dayStatuses: parsed.dayStatuses || {},
      exerciseSwaps: parsed.exerciseSwaps || {},
      totalWorkoutsCompleted: parsed.totalWorkoutsCompleted || 0,
      longestStreak: parsed.longestStreak || 0,
      workoutHistory: parsed.workoutHistory || [],
      achievements: parsed.achievements || [],
      difficulty: parsed.difficulty || 'intermediate',
    };
    
    const workoutPlan = getWorkoutPlan(mergedProgress.difficulty);
    
    // Check if we need to reset for a new week
    if (mergedProgress.weekStartDate !== currentWeekStart) {
      const wasLastWeekComplete = checkWeekComplete(mergedProgress.completedExercises, workoutPlan);
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
      
      return {
        ...mergedProgress,
        completedExercises: {},
        weekStartDate: currentWeekStart,
        streak: wasLastWeekComplete ? mergedProgress.streak + 1 : 0,
        lastCompletedWeek: wasLastWeekComplete ? mergedProgress.weekStartDate : mergedProgress.lastCompletedWeek,
        notes: {},
        dayStatuses: {},
        longestStreak: Math.max(mergedProgress.longestStreak, wasLastWeekComplete ? mergedProgress.streak + 1 : mergedProgress.streak),
        workoutHistory: [...mergedProgress.workoutHistory, historyEntry].slice(-12),
      };
    }
    
    return mergedProgress;
  }, [checkWeekComplete]);

  // Load progress from database or localStorage
  useEffect(() => {
    const loadProgress = async () => {
      if (user) {
        // Load from database for logged-in users
        const { data, error } = await supabase
          .from('workout_progress')
          .select('*')
          .eq('user_id', user.id)
          .maybeSingle();

        if (error) {
          console.error('Failed to load progress from database:', error);
        }

        if (data) {
          const localFields = getLocalOnlyFields();
          const dbProgress: Partial<ExtendedWorkoutProgress> = {
            completedExercises: (data.completed_exercises as unknown as Record<string, boolean>) || {},
            notes: (data.notes as unknown as Record<string, string>) || {},
            dayStatuses: (data.day_statuses as unknown as Record<string, DayStatus>) || {},
            exerciseSwaps: (data.exercise_swaps as unknown as Record<string, string>) || {},
            achievements: data.achievements || [],
            difficulty: (data.difficulty as DifficultyLevel) || 'intermediate',
            reminderTime: data.reminder_time || localFields.reminderTime,
            accentColor: data.accent_color || localFields.accentColor,
            // These fields are stored locally only
            weekStartDate: localFields.weekStartDate,
            streak: localFields.streak,
            lastCompletedWeek: localFields.lastCompletedWeek,
            totalWorkoutsCompleted: localFields.totalWorkoutsCompleted,
            longestStreak: localFields.longestStreak,
            workoutHistory: localFields.workoutHistory,
            hasSeenOnboarding: localFields.hasSeenOnboarding,
          };
          
          const processed = processProgress(dbProgress);
          setProgress(processed);
        } else {
          // No database record yet, check localStorage for migration
          const localProgress = getLocalProgress();
          if (localProgress) {
            const processed = processProgress(localProgress);
            setProgress(processed);
            // Save to database
            await saveToDatabase(processed, user.id);
          }
        }
      } else {
        // Load from localStorage for non-logged-in users
        const localProgress = getLocalProgress();
        if (localProgress) {
          const processed = processProgress(localProgress);
          setProgress(processed);
        }
      }
      
      setIsLoaded(true);
      isInitialLoad.current = false;
    };

    loadProgress();
  }, [user, processProgress]);

  // Get local-only fields from localStorage
  const getLocalOnlyFields = (): Partial<ExtendedWorkoutProgress> => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        return {
          weekStartDate: parsed.weekStartDate || formatDate(getMonday(new Date())),
          streak: parsed.streak || 0,
          lastCompletedWeek: parsed.lastCompletedWeek || null,
          totalWorkoutsCompleted: parsed.totalWorkoutsCompleted || 0,
          longestStreak: parsed.longestStreak || 0,
          workoutHistory: parsed.workoutHistory || [],
          hasSeenOnboarding: parsed.hasSeenOnboarding ?? true,
          reminderTime: parsed.reminderTime,
          accentColor: parsed.accentColor,
        };
      } catch {
        return {};
      }
    }
    return {};
  };

  // Get progress from localStorage
  const getLocalProgress = (): Partial<ExtendedWorkoutProgress> | null => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return null;
      }
    }
    return null;
  };

  // Save to database
  const saveToDatabase = async (data: ExtendedWorkoutProgress, userId: string) => {
    setSyncStatus('syncing');
    
    const { error } = await supabase
      .from('workout_progress')
      .update({
        completed_exercises: JSON.parse(JSON.stringify(data.completedExercises)),
        notes: JSON.parse(JSON.stringify(data.notes)),
        day_statuses: JSON.parse(JSON.stringify(data.dayStatuses)),
        exercise_swaps: JSON.parse(JSON.stringify(data.exerciseSwaps)),
        achievements: data.achievements,
        difficulty: data.difficulty,
        reminder_time: data.reminderTime,
        accent_color: data.accentColor,
      })
      .eq('user_id', userId);

    if (error) {
      console.error('Failed to save progress to database:', error);
      setSyncStatus('error');
    } else {
      setSyncStatus('synced');
      // Reset to idle after 2 seconds
      if (syncResetTimeoutRef.current) {
        clearTimeout(syncResetTimeoutRef.current);
      }
      syncResetTimeoutRef.current = setTimeout(() => {
        setSyncStatus('idle');
      }, 2000);
    }
  };

  // Debounced save to database and localStorage
  useEffect(() => {
    if (!isLoaded || isInitialLoad.current) return;

    // Always save to localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));

    // Debounced save to database if logged in
    if (user) {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
      saveTimeoutRef.current = setTimeout(() => {
        saveToDatabase(progress, user.id);
      }, 500);
    }

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [progress, isLoaded, user]);

  const setDifficulty = useCallback((difficulty: DifficultyLevel) => {
    setProgress(prev => ({
      ...prev,
      difficulty,
      completedExercises: {},
      notes: {},
      dayStatuses: {},
      exerciseSwaps: {},
    }));
  }, []);

  const toggleExercise = useCallback((exerciseId: string) => {
    setProgress(prev => {
      const wasCompleted = prev.completedExercises[exerciseId];
      const newCompleted = {
        ...prev.completedExercises,
        [exerciseId]: !wasCompleted,
      };
      
      const newAchievements = [...prev.achievements];
      
      if (!wasCompleted && !prev.achievements.includes('first_workout')) {
        newAchievements.push('first_workout');
      }
      
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
    const day = currentPlan.find(d => d.id === dayId);
    if (!day) return { completed: 0, total: 0, percentage: 0 };
    
    const total = day.exercises.length;
    const completed = day.exercises.filter(e => progress.completedExercises[e.id]).length;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    
    return { completed, total, percentage };
  }, [progress.completedExercises, currentPlan]);

  const getWeekProgress = useCallback((): { completedDays: number; totalDays: number; percentage: number } => {
    let completedDays = 0;
    
    currentPlan.forEach(day => {
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
  }, [getDayProgress, currentPlan]);

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
    syncStatus,
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
    difficulty: progress.difficulty,
    setDifficulty,
    currentPlan,
  };
};
