import { useState } from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Exercise } from '@/types/workout';

interface ExerciseItemProps {
  exercise: Exercise;
  isCompleted: boolean;
  onToggle: () => void;
}

export const ExerciseItem = ({ exercise, isCompleted, onToggle }: ExerciseItemProps) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    if (!isCompleted) {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 300);
    }
    onToggle();
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        'w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200',
        'hover:bg-secondary/50 active:scale-[0.99]',
        'group text-left'
      )}
    >
      <div
        className={cn(
          'w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all duration-200',
          isCompleted
            ? 'bg-primary border-primary'
            : 'border-muted-foreground/30 group-hover:border-primary/50',
          isAnimating && 'animate-check-bounce'
        )}
      >
        {isCompleted && (
          <Check className="w-4 h-4 text-primary-foreground" strokeWidth={3} />
        )}
      </div>
      
      <div className={cn('flex-1 min-w-0', isCompleted && 'exercise-checked')}>
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
      </div>
    </button>
  );
};
