import { cn } from '@/lib/utils';
import { Achievement } from '@/types/workout';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface AchievementBadgeProps {
  achievement: Achievement;
  unlocked: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const AchievementBadge = ({ achievement, unlocked, size = 'md' }: AchievementBadgeProps) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-12 h-12 text-xl',
    lg: 'w-16 h-16 text-2xl',
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          className={cn(
            'rounded-full flex items-center justify-center transition-all duration-300',
            sizeClasses[size],
            unlocked
              ? 'bg-primary/10 shadow-md'
              : 'bg-muted grayscale opacity-40'
          )}
        >
          <span className={cn(!unlocked && 'opacity-50')}>
            {achievement.icon}
          </span>
        </div>
      </TooltipTrigger>
      <TooltipContent side="bottom" className="max-w-[200px]">
        <p className="font-semibold">{achievement.name}</p>
        <p className="text-xs text-muted-foreground">{achievement.description}</p>
        {!unlocked && (
          <p className="text-xs text-muted-foreground mt-1 italic">Not yet unlocked</p>
        )}
      </TooltipContent>
    </Tooltip>
  );
};
