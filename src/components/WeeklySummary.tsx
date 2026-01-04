import { Flame, Target, TrendingUp, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
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
      <motion.div 
        className="bg-card rounded-xl shadow-card border border-border/50 p-4 sm:p-5 overflow-hidden"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base sm:text-lg font-semibold text-foreground">This Week</h2>
          <motion.div 
            className="flex items-center gap-1.5"
            animate={streak > 0 ? { scale: [1, 1.1, 1] } : {}}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <Flame className={cn(
              'w-4 h-4 transition-colors duration-300',
              streak > 0 ? 'text-orange-500' : 'text-muted-foreground'
            )} />
            <span className={cn(
              'text-xs sm:text-sm font-medium transition-colors duration-300',
              streak > 0 ? 'text-orange-500' : 'text-muted-foreground'
            )}>
              {streak} week{streak !== 1 ? 's' : ''}
            </span>
          </motion.div>
        </div>

        <div className="flex items-center gap-4 sm:gap-6">
          <motion.div 
            className="relative shrink-0"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <ProgressRing percentage={percentage} size={64} strokeWidth={5} className="sm:hidden" />
            <ProgressRing percentage={percentage} size={80} strokeWidth={6} className="hidden sm:block" />
            <motion.div 
              className="absolute inset-0 flex items-center justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
            >
              <span className="text-base sm:text-lg font-bold text-foreground">{percentage}%</span>
            </motion.div>
          </motion.div>

          <div className="flex-1 min-w-0 space-y-2 sm:space-y-3">
            <motion.div 
              className="flex items-center gap-2 sm:gap-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <motion.div 
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <Target className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
              </motion.div>
              <div>
                <motion.p 
                  className="text-xl sm:text-2xl font-bold text-foreground"
                  key={completedDays}
                  initial={{ scale: 1.2, color: "hsl(var(--primary))" }}
                  animate={{ scale: 1, color: "hsl(var(--foreground))" }}
                  transition={{ duration: 0.3 }}
                >
                  {completedDays}/{totalDays}
                </motion.p>
                <p className="text-[10px] sm:text-xs text-muted-foreground">Workouts completed</p>
              </div>
            </motion.div>

            <div className="h-1.5 sm:h-2 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-primary rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              />
            </div>
          </div>
        </div>

        <AnimatePresence>
          {percentage === 100 && (
            <motion.div 
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: "auto", marginTop: 16 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{ duration: 0.4 }}
              className="flex items-center justify-center gap-2 py-2.5 sm:py-3 bg-success-light rounded-lg overflow-hidden"
            >
              <motion.div
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              >
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-success" />
              </motion.div>
              <span className="text-xs sm:text-sm font-medium text-accent-foreground">
                Perfect week! You crushed it 💪
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stats link */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-4"
        >
          <Link to="/stats">
            <Button variant="outline" className="w-full gap-2 group">
              <BarChart3 className="w-4 h-4 transition-transform group-hover:scale-110" />
              View Full Stats
            </Button>
          </Link>
        </motion.div>
      </motion.div>

      {/* Daily Quote */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <DailyQuote />
      </motion.div>
    </div>
  );
};