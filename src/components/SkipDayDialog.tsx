import { Coffee, AlertCircle } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

interface SkipDayDialogProps {
  dayName: string;
  onSkip: (reason: 'rest' | 'missed') => void;
}

export const SkipDayDialog = ({ dayName, onSkip }: SkipDayDialogProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Coffee className="w-4 h-4" />
          Skip Day
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Skip {dayName}?</AlertDialogTitle>
          <AlertDialogDescription>
            Choose how you want to mark this day. This helps track your progress accurately.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="grid gap-3 py-4">
          <Button
            variant="outline"
            className="justify-start gap-3 h-auto py-4"
            onClick={() => onSkip('rest')}
          >
            <Coffee className="w-5 h-5 text-primary" />
            <div className="text-left">
              <p className="font-medium">Rest Day</p>
              <p className="text-sm text-muted-foreground">
                Planned rest - won't affect your streak
              </p>
            </div>
          </Button>
          <Button
            variant="outline"
            className="justify-start gap-3 h-auto py-4"
            onClick={() => onSkip('missed')}
          >
            <AlertCircle className="w-5 h-5 text-destructive" />
            <div className="text-left">
              <p className="font-medium">Missed Workout</p>
              <p className="text-sm text-muted-foreground">
                Couldn't workout today - may affect streak
              </p>
            </div>
          </Button>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
