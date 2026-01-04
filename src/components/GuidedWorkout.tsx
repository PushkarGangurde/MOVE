import { useState, useEffect, useCallback } from 'react';
import { X, Play, Pause, SkipForward, Check, Timer } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Exercise, DayWorkout } from '@/types/workout';
import { Button } from '@/components/ui/button';
import { ProgressRing } from './ProgressRing';

interface GuidedWorkoutProps {
  day: DayWorkout;
  isExerciseCompleted: (id: string) => boolean;
  onToggleExercise: (id: string) => void;
  onClose: () => void;
  onComplete: () => void;
}

const parseTimeToSeconds = (reps: string): number | null => {
  const minMatch = reps.match(/(\d+)\s*min(?:ute)?s?/i);
  if (minMatch) return parseInt(minMatch[1]) * 60;
  
  const secRangeMatch = reps.match(/(\d+)-(\d+)\s*sec(?:ond)?s?/i);
  if (secRangeMatch) return parseInt(secRangeMatch[2]);
  
  const secMatch = reps.match(/(\d+)\s*sec(?:ond)?s?/i);
  if (secMatch) return parseInt(secMatch[1]);
  
  return null;
};

export const GuidedWorkout = ({
  day,
  isExerciseCompleted,
  onToggleExercise,
  onClose,
  onComplete,
}: GuidedWorkoutProps) => {
  const exercises = day.exercises;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isResting, setIsResting] = useState(false);
  const [restTime, setRestTime] = useState(0);
  const [exerciseTime, setExerciseTime] = useState(0);
  const [isPaused, setIsPaused] = useState(true);

  const currentExercise = exercises[currentIndex];
  const timerDuration = currentExercise ? parseTimeToSeconds(currentExercise.reps) : null;
  const completedCount = exercises.filter(e => isExerciseCompleted(e.id)).length;
  const progress = Math.round((completedCount / exercises.length) * 100);

  // Rest timer
  useEffect(() => {
    if (!isResting || isPaused) return;
    if (restTime <= 0) {
      setIsResting(false);
      return;
    }
    const interval = setInterval(() => setRestTime(t => t - 1), 1000);
    return () => clearInterval(interval);
  }, [isResting, restTime, isPaused]);

  // Exercise timer for timed exercises
  useEffect(() => {
    if (isResting || isPaused || !timerDuration) return;
    if (exerciseTime >= timerDuration) {
      handleCompleteExercise();
      return;
    }
    const interval = setInterval(() => setExerciseTime(t => t + 1), 1000);
    return () => clearInterval(interval);
  }, [isResting, isPaused, exerciseTime, timerDuration]);

  const handleCompleteExercise = useCallback(() => {
    if (!currentExercise) return;
    
    if (!isExerciseCompleted(currentExercise.id)) {
      onToggleExercise(currentExercise.id);
    }
    
    if (currentIndex < exercises.length - 1) {
      setIsResting(true);
      setRestTime(15); // 15 second rest
      setExerciseTime(0);
      setCurrentIndex(i => i + 1);
    } else {
      onComplete();
    }
  }, [currentExercise, currentIndex, exercises.length, isExerciseCompleted, onToggleExercise, onComplete]);

  const handleSkip = () => {
    if (currentIndex < exercises.length - 1) {
      setCurrentIndex(i => i + 1);
      setExerciseTime(0);
      setIsResting(false);
    } else {
      onComplete();
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <ProgressRing percentage={progress} size={40} strokeWidth={4} />
          <div>
            <h2 className="font-semibold text-foreground">{day.dayName}</h2>
            <p className="text-xs text-muted-foreground">{completedCount}/{exercises.length} exercises</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="w-5 h-5" />
        </Button>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        {isResting ? (
          <div className="text-center space-y-6">
            <div className="w-32 h-32 rounded-full border-4 border-primary/20 flex items-center justify-center mx-auto">
              <span className="text-4xl font-bold text-primary">{restTime}</span>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-foreground">Rest</h3>
              <p className="text-muted-foreground mt-1">Next: {exercises[currentIndex]?.name}</p>
            </div>
            <Button onClick={() => setIsResting(false)} variant="outline">
              Skip Rest
            </Button>
          </div>
        ) : currentExercise ? (
          <div className="text-center space-y-6 max-w-md">
            {/* Exercise counter */}
            <div className="text-sm text-muted-foreground">
              Exercise {currentIndex + 1} of {exercises.length}
            </div>

            {/* Timer display for timed exercises */}
            {timerDuration ? (
              <div className="w-40 h-40 rounded-full border-4 border-primary flex items-center justify-center mx-auto relative">
                <div className="text-center">
                  <span className="text-4xl font-bold text-foreground">
                    {formatTime(timerDuration - exerciseTime)}
                  </span>
                  <p className="text-xs text-muted-foreground mt-1">remaining</p>
                </div>
                {/* Progress arc */}
                <svg className="absolute inset-0 -rotate-90" viewBox="0 0 160 160">
                  <circle
                    cx="80"
                    cy="80"
                    r="76"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    className="text-primary/20"
                  />
                  <circle
                    cx="80"
                    cy="80"
                    r="76"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeDasharray={`${(exerciseTime / timerDuration) * 478} 478`}
                    className="text-primary transition-all duration-1000"
                  />
                </svg>
              </div>
            ) : (
              <div className="w-40 h-40 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Timer className="w-16 h-16 text-primary" />
              </div>
            )}

            {/* Exercise info */}
            <div>
              <h3 className="text-2xl font-bold text-foreground">{currentExercise.name}</h3>
              <p className="text-lg text-muted-foreground mt-2">{currentExercise.reps}</p>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4 pt-4">
              <Button
                variant="outline"
                size="lg"
                onClick={() => setIsPaused(!isPaused)}
                className="w-16 h-16 rounded-full"
              >
                {isPaused ? <Play className="w-6 h-6" /> : <Pause className="w-6 h-6" />}
              </Button>
              
              <Button
                size="lg"
                onClick={handleCompleteExercise}
                className="h-16 px-8 rounded-full gap-2"
              >
                <Check className="w-5 h-5" />
                Done
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                onClick={handleSkip}
                className="w-16 h-16 rounded-full"
              >
                <SkipForward className="w-6 h-6" />
              </Button>
            </div>
          </div>
        ) : null}
      </div>

      {/* Exercise list preview */}
      <div className="p-4 border-t border-border bg-secondary/30">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {exercises.map((exercise, index) => (
            <div
              key={exercise.id}
              className={cn(
                'shrink-0 px-3 py-2 rounded-lg text-xs font-medium transition-all',
                index === currentIndex
                  ? 'bg-primary text-primary-foreground'
                  : isExerciseCompleted(exercise.id)
                  ? 'bg-success/20 text-success'
                  : 'bg-secondary text-muted-foreground'
              )}
            >
              {exercise.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
