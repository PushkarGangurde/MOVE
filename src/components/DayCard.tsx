import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, CheckCircle2, Play, Coffee } from 'lucide-react';
import { cn } from '@/lib/utils';
import { DayWorkout, Exercise, DayStatus } from '@/types/workout';
import { ExerciseItem } from './ExerciseItem';
import { ProgressRing } from './ProgressRing';
import { GuidedWorkout } from './GuidedWorkout';
import { DayNotes } from './DayNotes';
import { SkipDayDialog } from './SkipDayDialog';
import { CalendarExport } from './CalendarExport';
import { getSectionLabel } from '@/data/workoutPlan';
import { useCelebration } from '@/hooks/useCelebration';
import { Button } from '@/components/ui/button';
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
  onDayComplete?: () => void;
  note?: string;
  onSaveNote?: (note: string) => void;
  dayStatus?: DayStatus | null;
  onSkipDay?: (reason: 'rest' | 'missed') => void;
  getExerciseSwap?: (exerciseId: string) => string | null;
  onSwapExercise?: (exerciseId: string, alternativeName: string) => void;
}

export const DayCard = ({
  day,
  progress,
  isCompleted,
  isExerciseCompleted,
  onToggleExercise,
  isToday = false,
  onDayComplete,
  note = '',
  onSaveNote,
  dayStatus,
  onSkipDay,
  getExerciseSwap,
  onSwapExercise,
}: DayCardProps) => {
  const [isOpen, setIsOpen] = useState(isToday);
  const [showGuidedWorkout, setShowGuidedWorkout] = useState(false);
  const wasCompleted = useRef(isCompleted);
  const { celebrateDay } = useCelebration();

  // Celebrate when day is completed
  useEffect(() => {
    if (isCompleted && !wasCompleted.current) {
      celebrateDay();
      onDayComplete?.();
    }
    wasCompleted.current = isCompleted;
  }, [isCompleted, celebrateDay, onDayComplete]);

  // Group exercises by section
  const sections = day.exercises.reduce((acc, exercise) => {
    if (!acc[exercise.section]) {
      acc[exercise.section] = [];
    }
    acc[exercise.section].push(exercise);
    return acc;
  }, {} as Record<string, Exercise[]>);

  const sectionOrder = ['warmup', 'main', 'core', 'cooldown'];
  const isSkipped = dayStatus?.skipped;

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <motion.div
        layout
        className={cn(
          'bg-card rounded-xl shadow-card',
          'border border-border/50',
          isOpen && 'shadow-hover',
          isToday && 'ring-2 ring-primary/20',
          isSkipped && 'opacity-60'
        )}
        initial={false}
        animate={{ 
          boxShadow: isOpen 
            ? '0 10px 40px -10px rgba(0,0,0,0.15)' 
            : '0 4px 20px -5px rgba(0,0,0,0.1)'
        }}
        transition={{ duration: 0.3 }}
      >
        <CollapsibleTrigger className="w-full">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-4">
              <motion.div 
                className="relative"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <ProgressRing percentage={progress.percentage} size={44} strokeWidth={4} />
                <AnimatePresence mode="wait">
                  {isCompleted && (
                    <motion.div 
                      className="absolute inset-0 flex items-center justify-center"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: 180 }}
                      transition={{ type: "spring", stiffness: 200 }}
                    >
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                    </motion.div>
                  )}
                  {isSkipped && (
                    <motion.div 
                      className="absolute inset-0 flex items-center justify-center"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                    >
                      <Coffee className="w-5 h-5 text-muted-foreground" />
                    </motion.div>
                  )}
                  {!isCompleted && !isSkipped && (
                    <motion.div 
                      className="absolute inset-0 flex items-center justify-center"
                      key={progress.percentage}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                    >
                      <span className="text-xs font-semibold text-foreground">
                        {progress.percentage}%
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
              
              <div className="text-left">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-foreground">{day.dayName}</h3>
                  {isToday && (
                    <motion.span 
                      className="px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide bg-primary/10 text-primary rounded-full"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      Today
                    </motion.span>
                  )}
                  {isSkipped && (
                    <span className="px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide bg-muted text-muted-foreground rounded-full">
                      {dayStatus?.skippedReason === 'rest' ? 'Rest Day' : 'Skipped'}
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
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <ChevronDown className="w-5 h-5 text-muted-foreground" />
              </motion.div>
            </div>
          </div>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <motion.div 
            className="px-4 pb-4 space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            {/* Action buttons */}
            <AnimatePresence>
              {!isCompleted && !isSkipped && (
                <motion.div 
                  className="flex flex-wrap gap-2"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      onClick={() => setShowGuidedWorkout(true)}
                      className="w-full gap-2"
                      size="lg"
                    >
                      <Play className="w-4 h-4" />
                      Start Guided Workout
                    </Button>
                  </motion.div>
                  {onSkipDay && (
                    <SkipDayDialog dayName={day.dayName} onSkip={onSkipDay} />
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Calendar export */}
            <div className="flex justify-end">
              <CalendarExport day={day} />
            </div>

            {/* Progress bar */}
            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-primary rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress.percentage}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>

            {/* All done message */}
            <AnimatePresence>
              {isCompleted && (
                <motion.div 
                  className="flex items-center justify-center gap-2 py-3 bg-success-light rounded-lg"
                  initial={{ opacity: 0, scale: 0.9, height: 0 }}
                  animate={{ opacity: 1, scale: 1, height: "auto" }}
                  exit={{ opacity: 0, scale: 0.9, height: 0 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    <CheckCircle2 className="w-5 h-5 text-success" />
                  </motion.div>
                  <span className="text-sm font-medium text-accent-foreground">
                    All done for today! 🎉
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Skipped message */}
            <AnimatePresence>
              {isSkipped && (
                <motion.div 
                  className="flex items-center justify-center gap-2 py-3 bg-muted rounded-lg"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                >
                  <Coffee className="w-5 h-5 text-muted-foreground" />
                  <span className="text-sm font-medium text-muted-foreground">
                    {dayStatus?.skippedReason === 'rest' ? 'Taking a rest day 😌' : 'Workout skipped'}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Exercise sections */}
            {!isSkipped && sectionOrder.map((sectionKey, sectionIndex) => {
              const exercises = sections[sectionKey];
              if (!exercises || exercises.length === 0) return null;

              return (
                <motion.div 
                  key={sectionKey} 
                  className="space-y-1"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: sectionIndex * 0.1 }}
                >
                  <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground px-1 mb-2">
                    {getSectionLabel(sectionKey)}
                  </h4>
                  <div className="space-y-0.5">
                    {exercises.map((exercise, exerciseIndex) => (
                      <motion.div
                        key={exercise.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: (sectionIndex * 0.1) + (exerciseIndex * 0.03) }}
                      >
                        <ExerciseItem
                          exercise={exercise}
                          isCompleted={isExerciseCompleted(exercise.id)}
                          onToggle={() => onToggleExercise(exercise.id)}
                          currentSwap={getExerciseSwap?.(exercise.id)}
                          onSwap={(alt) => onSwapExercise?.(exercise.id, alt)}
                          onResetSwap={() => onSwapExercise?.(exercise.id, '')}
                        />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              );
            })}

            {/* Notes section */}
            {onSaveNote && (
              <motion.div 
                className="pt-2 border-t border-border/50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <DayNotes dayId={day.id} note={note} onSave={onSaveNote} />
              </motion.div>
            )}
          </motion.div>
        </CollapsibleContent>
      </motion.div>

      {/* Guided Workout Modal */}
      <AnimatePresence>
        {showGuidedWorkout && (
          <GuidedWorkout
            day={day}
            isExerciseCompleted={isExerciseCompleted}
            onToggleExercise={onToggleExercise}
            onClose={() => setShowGuidedWorkout(false)}
            onComplete={() => setShowGuidedWorkout(false)}
          />
        )}
      </AnimatePresence>
    </Collapsible>
  );
};