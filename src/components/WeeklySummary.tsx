import { Flame, Target, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ProgressRing } from './ProgressRing';

interface WeeklySummaryProps {
  completedDays: number;
  totalDays: number;
  percentage: number;
  streak: number;
}

export const WeeklySummary = ({
  completedDays,
  totalDays,
  percentage,
  streak,
}: WeeklySummaryProps) => {
  return (
    <div className="bg-card rounded-xl shadow-card border border-border/50 p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">This Week</h2>
        <div className="flex items-center gap-1.5">
          <Flame className={cn(
            'w-4 h-4',
            streak > 0 ? 'text-primary animate-pulse-soft' : 'text-muted-foreground'
          )} />
          <span className={cn(
            'text-sm font-medium',
            streak > 0 ? 'text-primary' : 'text-muted-foreground'
          )}>
            {streak} week{streak !== 1 ? 's' : ''} streak
          </span>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative">
          <ProgressRing percentage={percentage} size={80} strokeWidth={6} />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-lg font-bold text-foreground">{percentage}%</span>
          </div>
        </div>

        <div className="flex-1 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Target className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{completedDays}/{totalDays}</p>
              <p className="text-xs text-muted-foreground">Workouts completed</p>
            </div>
          </div>

          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      </div>

      {percentage === 100 && (
        <div className="mt-4 flex items-center justify-center gap-2 py-3 bg-success-light rounded-lg">
          <TrendingUp className="w-5 h-5 text-success" />
          <span className="text-sm font-medium text-accent-foreground">
            Perfect week! You crushed it 💪
          </span>
        </div>
      )}
    </div>
  );
};
