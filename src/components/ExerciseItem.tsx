import { useState, useRef, useEffect } from 'react';
import { Check, Timer, Play } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Exercise } from '@/types/workout';
import { ExerciseTimer } from './ExerciseTimer';
import { ExerciseVideoModal } from './ExerciseVideoModal';
import { getExerciseVideoId } from '@/data/exerciseVideos';
import { useCelebration } from '@/hooks/useCelebration';

interface ExerciseItemProps {
  exercise: Exercise;
  isCompleted: boolean;
  onToggle: () => void;
}

// Parse time string to seconds
const parseTimeToSeconds = (reps: string): number | null => {
  const timePatterns = [
    /(\d+)\s*min(?:ute)?s?/i,
    /(\d+)\s*sec(?:ond)?s?/i,
    /(\d+)-(\d+)\s*sec(?:ond)?s?/i,
  ];
  
  // Check for minutes
  const minMatch = reps.match(/(\d+)\s*min(?:ute)?s?/i);
  if (minMatch) {
    return parseInt(minMatch[1]) * 60;
  }
  
  // Check for seconds range (e.g., "20-30 seconds")
  const secRangeMatch = reps.match(/(\d+)-(\d+)\s*sec(?:ond)?s?/i);
  if (secRangeMatch) {
    return parseInt(secRangeMatch[2]); // Use the higher value
  }
  
  // Check for seconds
  const secMatch = reps.match(/(\d+)\s*sec(?:ond)?s?/i);
  if (secMatch) {
    return parseInt(secMatch[1]);
  }
  
  return null;
};

const isTimedExercise = (reps: string): boolean => {
  return parseTimeToSeconds(reps) !== null;
};

export const ExerciseItem = ({ exercise, isCompleted, onToggle }: ExerciseItemProps) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [showTimer, setShowTimer] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const wasCompleted = useRef(isCompleted);
  const { celebrateExercise } = useCelebration();
  
  const timerDuration = parseTimeToSeconds(exercise.reps);
  const hasTimed = timerDuration !== null;
  const videoId = getExerciseVideoId(exercise.name);

  // Play sound when exercise is completed
  useEffect(() => {
    if (isCompleted && !wasCompleted.current) {
      celebrateExercise();
    }
    wasCompleted.current = isCompleted;
  }, [isCompleted, celebrateExercise]);

  const handleClick = () => {
    if (!isCompleted) {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 300);
    }
    onToggle();
  };

  const handleTimerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowTimer(true);
  };

  const handleTimerClose = () => {
    setShowTimer(false);
  };

  const handleTimerComplete = () => {
    onToggle();
    setShowTimer(false);
  };

  const handleVideoClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowVideo(true);
  };

  return (
    <>
      <div
        className={cn(
          'w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200',
          'hover:bg-secondary/50 active:scale-[0.99]',
          'group'
        )}
      >
        <button
          onClick={handleClick}
          className={cn(
            'w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all duration-200 shrink-0',
            isCompleted
              ? 'bg-primary border-primary'
              : 'border-muted-foreground/30 group-hover:border-primary/50'
          )}
        >
          {isCompleted && (
            <Check className="w-4 h-4 text-primary-foreground" strokeWidth={3} />
          )}
        </button>
        
        <button 
          onClick={handleClick}
          className={cn('flex-1 min-w-0 text-left', isCompleted && 'exercise-checked')}
        >
          <p className={cn(
            'text-sm font-medium text-foreground transition-all duration-200',
            isCompleted && 'text-muted-foreground'
          )}>
            {exercise.name}
          </p>
          <p className={cn(
            'text-xs text-muted-foreground transition-all duration-200',
            isCompleted && 'text-muted-foreground/60'
          )}>
            {exercise.reps}
          </p>
        </button>

        <div className="flex items-center gap-1 shrink-0">
          {videoId && (
            <button
              onClick={handleVideoClick}
              className={cn(
                'p-2 rounded-lg transition-all duration-200',
                'bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground',
                'flex items-center justify-center'
              )}
              title="Watch demonstration"
            >
              <Play className="w-4 h-4" />
            </button>
          )}

          {hasTimed && !isCompleted && (
            <button
              onClick={handleTimerClick}
              className={cn(
                'p-2 rounded-lg transition-all duration-200',
                'bg-primary/10 text-primary hover:bg-primary/20',
                'flex items-center justify-center'
              )}
              title="Start timer"
            >
              <Timer className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {showTimer && timerDuration && (
        <ExerciseTimer
          key={exercise.id}
          duration={timerDuration}
          exerciseName={exercise.name}
          onClose={handleTimerClose}
          onComplete={handleTimerComplete}
        />
      )}

      {showVideo && videoId && (
        <ExerciseVideoModal
          isOpen={showVideo}
          onClose={() => setShowVideo(false)}
          exerciseName={exercise.name}
          videoId={videoId}
        />
      )}
    </>
  );
};
