import { Flame, Target, TrendingUp, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ProgressRing } from './ProgressRing';
import { DailyQuote } from './DailyQuote';
import { Button } from './ui/button';

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
    <div className="space-y-4">
      <div className="bg-card rounded-xl shadow-card border border-border/50 p-4 sm:p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base sm:text-lg font-semibold text-foreground">This Week</h2>
          <div className="flex items-center gap-1.5">
            <Flame className={cn(
              'w-4 h-4',
              streak > 0 ? 'text-orange-500 animate-pulse' : 'text-muted-foreground'
            )} />
            <span className={cn(
              'text-xs sm:text-sm font-medium',
              streak > 0 ? 'text-orange-500' : 'text-muted-foreground'
            )}>
              {streak} week{streak !== 1 ? 's' : ''}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 sm:gap-6">
          <div className="relative shrink-0">
            <ProgressRing percentage={percentage} size={64} strokeWidth={5} className="sm:hidden" />
            <ProgressRing percentage={percentage} size={80} strokeWidth={6} className="hidden sm:block" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-base sm:text-lg font-bold text-foreground">{percentage}%</span>
            </div>
          </div>

          <div className="flex-1 min-w-0 space-y-2 sm:space-y-3">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Target className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-foreground">{completedDays}/{totalDays}</p>
                <p className="text-[10px] sm:text-xs text-muted-foreground">Workouts completed</p>
              </div>
            </div>

            <div className="h-1.5 sm:h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        </div>

        {percentage === 100 && (
          <div className="mt-4 flex items-center justify-center gap-2 py-2.5 sm:py-3 bg-success-light rounded-lg animate-fade-in">
            <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-success" />
            <span className="text-xs sm:text-sm font-medium text-accent-foreground">
              Perfect week! You crushed it 💪
            </span>
          </div>
        )}

        {/* Stats link */}
        <Link to="/stats" className="block mt-4">
          <Button variant="outline" className="w-full gap-2">
            <BarChart3 className="w-4 h-4" />
            View Full Stats
          </Button>
        </Link>
      </div>

      {/* Daily Quote */}
      <DailyQuote />
    </div>
  );
};
