import { ArrowRightLeft, ChevronDown, ChevronUp } from 'lucide-react';
import { ExerciseAlternative } from '@/types/workout';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ExerciseSwapDialogProps {
  exerciseName: string;
  currentSwap: string | null;
  alternatives: ExerciseAlternative[];
  onSwap: (alternativeName: string) => void;
  onReset: () => void;
}

export const ExerciseSwapDialog = ({
  exerciseName,
  currentSwap,
  alternatives,
  onSwap,
  onReset,
}: ExerciseSwapDialogProps) => {
  if (alternatives.length === 0) return null;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className={cn(
            'p-1.5 rounded-md transition-all duration-200',
            'text-muted-foreground hover:text-foreground hover:bg-secondary',
            currentSwap && 'text-primary'
          )}
          title="Swap exercise"
        >
          <ArrowRightLeft className="w-3.5 h-3.5" />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Swap Exercise</DialogTitle>
          <DialogDescription>
            Choose an easier or harder alternative for {exerciseName}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3 py-4">
          {/* Original exercise */}
          <Button
            variant={!currentSwap ? "secondary" : "outline"}
            className="w-full justify-start gap-3 h-auto py-3"
            onClick={onReset}
          >
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-xs font-bold text-primary">STD</span>
            </div>
            <div className="text-left">
              <p className="font-medium">{exerciseName}</p>
              <p className="text-xs text-muted-foreground">Standard version</p>
            </div>
          </Button>

          {/* Alternatives */}
          {alternatives.map((alt) => (
            <Button
              key={alt.name}
              variant={currentSwap === alt.name ? "secondary" : "outline"}
              className="w-full justify-start gap-3 h-auto py-3"
              onClick={() => onSwap(alt.name)}
            >
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center",
                alt.difficulty === 'easier' ? 'bg-success/10' : 'bg-destructive/10'
              )}>
                {alt.difficulty === 'easier' ? (
                  <ChevronDown className="w-4 h-4 text-success" />
                ) : (
                  <ChevronUp className="w-4 h-4 text-destructive" />
                )}
              </div>
              <div className="text-left">
                <p className="font-medium">{alt.name}</p>
                <p className="text-xs text-muted-foreground">
                  {alt.difficulty === 'easier' ? 'Easier' : 'Harder'} • {alt.reps}
                </p>
              </div>
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};
