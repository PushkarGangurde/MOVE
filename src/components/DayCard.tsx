import { useState } from 'react';
import { ChevronDown, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { DayWorkout, Exercise } from '@/types/workout';
import { ExerciseItem } from './ExerciseItem';
import { ProgressRing } from './ProgressRing';
import { getSectionLabel } from '@/data/workoutPlan';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

interface DayCardProps {
  day: DayWorkout;
  progress: { completed: number; total: number; percentage: number };
  isCompleted: boolean;
  isExerciseCompleted: (id: string) => boolean;
  onToggleExercise: (id: string) => void;
  isToday?: boolean;
}

export const DayCard = ({
  day,
  progress,
  isCompleted,
  isExerciseCompleted,
  onToggleExercise,
  isToday = false,
}: DayCardProps) => {
  const [isOpen, setIsOpen] = useState(isToday);

  // Group exercises by section
  const sections = day.exercises.reduce((acc, exercise) => {
    if (!acc[exercise.section]) {
      acc[exercise.section] = [];
    }
    acc[exercise.section].push(exercise);
    return acc;
  }, {} as Record<string, Exercise[]>);

  const sectionOrder = ['warmup', 'main', 'core', 'cooldown'];

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div
        className={cn(
          'bg-card rounded-xl shadow-card transition-all duration-300',
          'border border-border/50',
          isOpen && 'shadow-hover',
          isToday && 'ring-2 ring-primary/20'
        )}
      >
        <CollapsibleTrigger className="w-full">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <ProgressRing percentage={progress.percentage} size={44} strokeWidth={4} />
                {isCompleted && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                  </div>
                )}
                {!isCompleted && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-semibold text-foreground">
                      {progress.percentage}%
                    </span>
                  </div>
                )}
              </div>
              
              <div className="text-left">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-foreground">{day.dayName}</h3>
                  {isToday && (
                    <span className="px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide bg-primary/10 text-primary rounded-full">
                      Today
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{day.focus}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground hidden sm:block">
                {progress.completed}/{progress.total}
              </span>
              <ChevronDown
                className={cn(
                  'w-5 h-5 text-muted-foreground transition-transform duration-200',
                  isOpen && 'rotate-180'
                )}
              />
            </div>
          </div>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className="px-4 pb-4 space-y-4">
            {/* Progress bar */}
            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress.percentage}%` }}
              />
            </div>

            {/* All done message */}
            {isCompleted && (
              <div className="flex items-center justify-center gap-2 py-3 bg-success-light rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-success" />
                <span className="text-sm font-medium text-accent-foreground">
                  All done for today!
                </span>
              </div>
            )}

            {/* Exercise sections */}
            {sectionOrder.map(sectionKey => {
              const exercises = sections[sectionKey];
              if (!exercises || exercises.length === 0) return null;

              return (
                <div key={sectionKey} className="space-y-1">
                  <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground px-1 mb-2">
                    {getSectionLabel(sectionKey)}
                  </h4>
                  <div className="space-y-0.5">
                    {exercises.map(exercise => (
                      <ExerciseItem
                        key={exercise.id}
                        exercise={exercise}
                        isCompleted={isExerciseCompleted(exercise.id)}
                        onToggle={() => onToggleExercise(exercise.id)}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
};
