import { useState, useEffect } from 'react';
import { Pencil, RotateCcw } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface ExerciseCustomizerProps {
  exerciseId: string;
  exerciseName: string;
  defaultReps: string;
  customReps: string | null;
  onCustomize: (reps: string) => void;
  onReset: () => void;
}

// Parse reps string to determine if it's time-based or rep-based
const parseReps = (reps: string): { type: 'time' | 'reps'; sets: number; value: number; suffix: string } => {
  // Check for time-based (seconds/minutes)
  const timeMatch = reps.match(/(\d+)\s*×?\s*(\d+)\s*(sec(?:ond)?s?|min(?:ute)?s?)/i);
  if (timeMatch) {
    const sets = timeMatch[1] ? parseInt(timeMatch[1]) : 1;
    const value = parseInt(timeMatch[2]);
    const unit = timeMatch[3].toLowerCase();
    return {
      type: 'time',
      sets,
      value: unit.startsWith('min') ? value * 60 : value,
      suffix: 'seconds'
    };
  }

  // Check for simple time (like "1 minute", "30 sec each leg")
  const simpleTimeMatch = reps.match(/(\d+)\s*(sec(?:ond)?s?|min(?:ute)?s?)/i);
  if (simpleTimeMatch) {
    const value = parseInt(simpleTimeMatch[1]);
    const unit = simpleTimeMatch[2].toLowerCase();
    const suffix = reps.replace(simpleTimeMatch[0], '').trim() || 'seconds';
    return {
      type: 'time',
      sets: 1,
      value: unit.startsWith('min') ? value * 60 : value,
      suffix
    };
  }

  // Check for rep-based
  const repMatch = reps.match(/(\d+)\s*×?\s*(\d+)\s*(?:reps?)?/i);
  if (repMatch) {
    const sets = parseInt(repMatch[1]);
    const value = parseInt(repMatch[2]);
    const suffix = reps.includes('each') ? reps.match(/\(.*\)/)?.[ 0] || 'reps' : 'reps';
    return {
      type: 'reps',
      sets,
      value,
      suffix
    };
  }

  // Default fallback
  return { type: 'reps', sets: 3, value: 10, suffix: 'reps' };
};

// Format reps back to string
const formatReps = (type: 'time' | 'reps', sets: number, value: number, suffix: string): string => {
  if (type === 'time') {
    if (sets === 1) {
      if (value >= 60 && value % 60 === 0) {
        return `${value / 60} minute${value / 60 > 1 ? 's' : ''}${suffix !== 'seconds' ? ' ' + suffix : ''}`;
      }
      return `${value} seconds${suffix !== 'seconds' ? ' ' + suffix : ''}`;
    }
    return `${sets} × ${value} seconds`;
  }
  
  if (suffix && suffix !== 'reps') {
    return `${sets} × ${value} reps ${suffix}`;
  }
  return `${sets} × ${value} reps`;
};

export const ExerciseCustomizer = ({
  exerciseId,
  exerciseName,
  defaultReps,
  customReps,
  onCustomize,
  onReset,
}: ExerciseCustomizerProps) => {
  const [open, setOpen] = useState(false);
  const currentReps = customReps || defaultReps;
  const parsed = parseReps(currentReps);
  
  const [sets, setSets] = useState(parsed.sets);
  const [value, setValue] = useState(parsed.value);
  const [type, setType] = useState(parsed.type);

  // Reset values when dialog opens
  useEffect(() => {
    if (open) {
      const current = parseReps(customReps || defaultReps);
      setSets(current.sets);
      setValue(current.value);
      setType(current.type);
    }
  }, [open, customReps, defaultReps]);

  const handleSave = () => {
    const formatted = formatReps(type, sets, value, parsed.suffix);
    onCustomize(formatted);
    setOpen(false);
  };

  const handleReset = () => {
    onReset();
    setOpen(false);
  };

  const isCustomized = customReps !== null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          className={cn(
            'p-1.5 rounded-md transition-all duration-200',
            'text-muted-foreground hover:text-foreground hover:bg-secondary',
            isCustomized && 'text-primary'
          )}
          title="Customize reps/time"
        >
          <Pencil className="w-3.5 h-3.5" />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Customize Exercise</DialogTitle>
          <DialogDescription>
            Adjust {exerciseName} to match your fitness level
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {/* Type Toggle */}
          <div className="space-y-2">
            <Label>Exercise Type</Label>
            <div className="flex gap-2">
              <Button
                type="button"
                variant={type === 'reps' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setType('reps')}
                className="flex-1"
              >
                Rep Count
              </Button>
              <Button
                type="button"
                variant={type === 'time' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setType('time')}
                className="flex-1"
              >
                Timed
              </Button>
            </div>
          </div>

          {/* Sets */}
          <div className="space-y-2">
            <Label htmlFor="sets">Sets</Label>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => setSets(Math.max(1, sets - 1))}
                disabled={sets <= 1}
              >
                -
              </Button>
              <Input
                id="sets"
                type="number"
                min={1}
                max={10}
                value={sets}
                onChange={(e) => setSets(Math.max(1, parseInt(e.target.value) || 1))}
                className="text-center w-20"
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => setSets(Math.min(10, sets + 1))}
                disabled={sets >= 10}
              >
                +
              </Button>
            </div>
          </div>

          {/* Value (Reps or Seconds) */}
          <div className="space-y-2">
            <Label htmlFor="value">{type === 'time' ? 'Seconds' : 'Reps'}</Label>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => setValue(Math.max(1, value - (type === 'time' ? 5 : 1)))}
                disabled={value <= 1}
              >
                -
              </Button>
              <Input
                id="value"
                type="number"
                min={1}
                max={300}
                value={value}
                onChange={(e) => setValue(Math.max(1, parseInt(e.target.value) || 1))}
                className="text-center w-20"
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => setValue(Math.min(300, value + (type === 'time' ? 5 : 1)))}
                disabled={value >= 300}
              >
                +
              </Button>
              <span className="text-sm text-muted-foreground">
                {type === 'time' ? 'sec' : 'reps'}
              </span>
            </div>
          </div>

          {/* Preview */}
          <div className="p-3 bg-secondary rounded-lg">
            <p className="text-sm text-muted-foreground">Preview:</p>
            <p className="font-medium">{formatReps(type, sets, value, parsed.suffix)}</p>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            {isCustomized && (
              <Button
                type="button"
                variant="outline"
                onClick={handleReset}
                className="flex-1 gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Reset to Default
              </Button>
            )}
            <Button
              type="button"
              onClick={handleSave}
              className="flex-1"
            >
              Save
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
