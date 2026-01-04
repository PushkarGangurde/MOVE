import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Timer, Play } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Exercise } from '@/types/workout';
import { ExerciseTimer } from './ExerciseTimer';
import { ExerciseVideoModal } from './ExerciseVideoModal';
import { ExerciseSwapDialog } from './ExerciseSwapDialog';
import { getExerciseVideoId } from '@/data/exerciseVideos';
import { getAlternatives } from '@/data/exerciseAlternatives';
import { useCelebration } from '@/hooks/useCelebration';

interface ExerciseItemProps {
  exercise: Exercise;
  isCompleted: boolean;
  onToggle: () => void;
  currentSwap?: string | null;
  onSwap?: (alternativeName: string) => void;
  onResetSwap?: () => void;
}

// Parse time string to seconds
const parseTimeToSeconds = (reps: string): number | null => {
  const minMatch = reps.match(/(\d+)\s*min(?:ute)?s?/i);
  if (minMatch) {
    return parseInt(minMatch[1]) * 60;
  }
  
  const secRangeMatch = reps.match(/(\d+)-(\d+)\s*sec(?:ond)?s?/i);
  if (secRangeMatch) {
    return parseInt(secRangeMatch[2]);
  }
  
  const secMatch = reps.match(/(\d+)\s*sec(?:ond)?s?/i);
  if (secMatch) {
    return parseInt(secMatch[1]);
  }
  
  return null;
};

export const ExerciseItem = ({ 
  exercise, 
  isCompleted, 
  onToggle,
  currentSwap,
  onSwap,
  onResetSwap,
}: ExerciseItemProps) => {
  const [showTimer, setShowTimer] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const wasCompleted = useRef(isCompleted);
  const { celebrateExercise } = useCelebration();
  
  const alternatives = getAlternatives(exercise.name);
  const displayName = currentSwap || exercise.name;
  const displayReps = currentSwap 
    ? alternatives.find(a => a.name === currentSwap)?.reps || exercise.reps
    : exercise.reps;
  
  const timerDuration = parseTimeToSeconds(displayReps);
  const hasTimed = timerDuration !== null;
  const videoId = getExerciseVideoId(displayName);

  // Play sound when exercise is completed
  useEffect(() => {
    if (isCompleted && !wasCompleted.current) {
      celebrateExercise();
    }
    wasCompleted.current = isCompleted;
  }, [isCompleted, celebrateExercise]);

  const handleClick = () => {
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
      <motion.div
        layout
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        className={cn(
          'w-full flex items-center gap-3 p-3 rounded-lg transition-colors duration-200',
          'hover:bg-secondary/50',
          'group',
          'focus-within:ring-2 focus-within:ring-primary/50'
        )}
      >
        <motion.button
          onClick={handleClick}
          whileTap={{ scale: 0.9 }}
          className={cn(
            'w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all duration-200 shrink-0',
            'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
            isCompleted
              ? 'bg-primary border-primary'
              : 'border-muted-foreground/30 group-hover:border-primary/50'
          )}
          aria-label={isCompleted ? `Mark ${displayName} as incomplete` : `Mark ${displayName} as complete`}
        >
          <AnimatePresence mode="wait">
            {isCompleted && (
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Check className="w-4 h-4 text-primary-foreground" strokeWidth={3} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
        
        <button 
          onClick={handleClick}
          className={cn('flex-1 min-w-0 text-left focus:outline-none', isCompleted && 'exercise-checked')}
        >
          <motion.p 
            className={cn(
              'text-sm font-medium transition-colors duration-200',
              isCompleted ? 'text-muted-foreground' : 'text-foreground',
              currentSwap && 'text-primary'
            )}
            animate={isCompleted ? { x: [0, 2, 0] } : {}}
            transition={{ duration: 0.2 }}
          >
            {displayName}
            {currentSwap && (
              <span className="text-xs text-muted-foreground ml-1">(swapped)</span>
            )}
          </motion.p>
          <p className={cn(
            'text-xs text-muted-foreground transition-all duration-200',
            isCompleted && 'text-muted-foreground/60'
          )}>
            {displayReps}
          </p>
        </button>

        <motion.div 
          className="flex items-center gap-1 shrink-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {/* Exercise swap button */}
          {alternatives.length > 0 && onSwap && onResetSwap && (
            <ExerciseSwapDialog
              exerciseName={exercise.name}
              currentSwap={currentSwap || null}
              alternatives={alternatives}
              onSwap={onSwap}
              onReset={onResetSwap}
            />
          )}

          {videoId && (
            <motion.button
              onClick={handleVideoClick}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                'p-2 rounded-lg transition-colors duration-200',
                'bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground',
                'flex items-center justify-center',
                'focus:outline-none focus:ring-2 focus:ring-primary'
              )}
              title="Watch demonstration"
              aria-label={`Watch ${displayName} demonstration video`}
            >
              <Play className="w-4 h-4" />
            </motion.button>
          )}

          {hasTimed && !isCompleted && (
            <motion.button
              onClick={handleTimerClick}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                'p-2 rounded-lg transition-colors duration-200',
                'bg-primary/10 text-primary hover:bg-primary/20',
                'flex items-center justify-center',
                'focus:outline-none focus:ring-2 focus:ring-primary'
              )}
              title="Start timer"
              aria-label={`Start ${timerDuration} second timer for ${displayName}`}
            >
              <Timer className="w-4 h-4" />
            </motion.button>
          )}
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {showTimer && timerDuration && (
          <ExerciseTimer
            key={exercise.id}
            duration={timerDuration}
            exerciseName={displayName}
            onClose={handleTimerClose}
            onComplete={handleTimerComplete}
          />
        )}
      </AnimatePresence>

      {showVideo && videoId && (
        <ExerciseVideoModal
          isOpen={showVideo}
          onClose={() => setShowVideo(false)}
          exerciseName={displayName}
          videoId={videoId}
        />
      )}
    </>
  );
};