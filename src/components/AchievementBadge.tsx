import { motion } from 'framer-motion';
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
  index?: number;
}

export const AchievementBadge = ({ achievement, unlocked, size = 'md', index = 0 }: AchievementBadgeProps) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-12 h-12 text-xl',
    lg: 'w-16 h-16 text-2xl',
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            delay: index * 0.05, 
            type: "spring", 
            stiffness: 200,
            damping: 15
          }}
          whileHover={unlocked ? { 
            scale: 1.15, 
            rotate: [0, -5, 5, 0],
            transition: { duration: 0.3 }
          } : {}}
          className={cn(
            'rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer',
            sizeClasses[size],
            unlocked
              ? 'bg-primary/10 shadow-md'
              : 'bg-muted grayscale opacity-40'
          )}
        >
          <motion.span 
            className={cn(!unlocked && 'opacity-50')}
            animate={unlocked ? { 
              scale: [1, 1.1, 1],
            } : {}}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          >
            {achievement.icon}
          </motion.span>
        </motion.div>
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