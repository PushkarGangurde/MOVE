import { motion, AnimatePresence } from 'framer-motion';
import { Check, Lock, Dumbbell, ChevronDown } from 'lucide-react';
import { DifficultyLevel } from '@/types/workout';
import { planInfo, PlanInfo } from '@/data/workoutPlans';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

interface PlanSelectorProps {
  currentPlan: DifficultyLevel;
  onPlanChange: (plan: DifficultyLevel) => void;
}

export const PlanSelector = ({ currentPlan, onPlanChange }: PlanSelectorProps) => {
  const current = planInfo[currentPlan];
  const plans = Object.values(planInfo);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button variant="outline" className="gap-2 h-auto py-2">
            <span className="text-lg">{current.icon}</span>
            <div className="text-left hidden sm:block">
              <p className="text-sm font-medium">{current.name}</p>
              <p className="text-[10px] text-muted-foreground">{current.duration}</p>
            </div>
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </Button>
        </motion.div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-72">
        <div className="p-2 border-b border-border mb-2">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <Dumbbell className="w-4 h-4" />
            Select Difficulty
          </div>
        </div>
        {plans.map((plan, index) => (
          <DropdownMenuItem
            key={plan.id}
            onClick={() => plan.available && onPlanChange(plan.id)}
            disabled={!plan.available}
            className={cn(
              'flex items-start gap-3 p-3 cursor-pointer',
              !plan.available && 'opacity-50 cursor-not-allowed',
              currentPlan === plan.id && 'bg-primary/5'
            )}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="text-2xl"
            >
              {plan.icon}
            </motion.div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="font-medium">{plan.name}</p>
                {!plan.available && (
                  <span className="text-[10px] bg-muted px-1.5 py-0.5 rounded-full flex items-center gap-1">
                    <Lock className="w-3 h-3" />
                    Soon
                  </span>
                )}
              </div>
              <p className="text-xs text-muted-foreground line-clamp-1">{plan.description}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] bg-secondary px-1.5 py-0.5 rounded">{plan.duration}</span>
                <span className="text-[10px] bg-secondary px-1.5 py-0.5 rounded">{plan.level}</span>
              </div>
            </div>
            <AnimatePresence>
              {currentPlan === plan.id && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="w-5 h-5 rounded-full bg-primary flex items-center justify-center shrink-0"
                >
                  <Check className="w-3 h-3 text-primary-foreground" />
                </motion.div>
              )}
            </AnimatePresence>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};