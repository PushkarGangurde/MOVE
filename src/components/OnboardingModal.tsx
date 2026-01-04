import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, ChevronRight, CheckCircle2, Timer, Trophy, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface OnboardingModalProps {
  onComplete: () => void;
}

const steps = [
  {
    icon: Activity,
    title: 'Welcome to MOVE',
    description: 'Your personal 7-day workout plan designed for beginners. Build strength, improve stamina, and form healthy habits.',
  },
  {
    icon: CheckCircle2,
    title: 'Track Your Progress',
    description: 'Check off exercises as you complete them. Each day\'s workout is organized into warm-up, main workout, and cooldown sections.',
  },
  {
    icon: Timer,
    title: 'Guided Workouts',
    description: 'Use the "Start Guided Workout" button for a hands-free experience with automatic timers and rest periods between exercises.',
  },
  {
    icon: Trophy,
    title: 'Earn Achievements',
    description: 'Unlock badges by completing workouts, maintaining streaks, and hitting milestones. Check your achievements anytime!',
  },
  {
    icon: Bell,
    title: 'Stay Consistent',
    description: 'Set daily reminders to never miss a workout. Your progress resets every Monday, so aim for a perfect week!',
  },
];

export const OnboardingModal = ({ onComplete }: OnboardingModalProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(1);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setDirection(1);
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  const step = steps[currentStep];
  const Icon = step.icon;

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -100 : 100,
      opacity: 0,
    }),
  };

  return (
    <motion.div 
      className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="w-full max-w-md"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        {/* Progress dots */}
        <div className="flex justify-center gap-2 mb-8">
          {steps.map((_, index) => (
            <motion.div
              key={index}
              className={cn(
                'h-2 rounded-full transition-colors duration-300',
                index === currentStep
                  ? 'bg-primary'
                  : index < currentStep
                  ? 'bg-primary/50'
                  : 'bg-muted'
              )}
              initial={false}
              animate={{ 
                width: index === currentStep ? 24 : 8,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            />
          ))}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div 
            key={currentStep}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="text-center space-y-6"
          >
            <motion.div 
              className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
            >
              <Icon className="w-10 h-10 text-primary" />
            </motion.div>
            
            <div className="space-y-3">
              <motion.h2 
                className="text-2xl font-bold text-foreground"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                {step.title}
              </motion.h2>
              <motion.p 
                className="text-muted-foreground leading-relaxed"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {step.description}
              </motion.p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Actions */}
        <motion.div 
          className="mt-10 space-y-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              onClick={handleNext}
              className="w-full gap-2"
              size="lg"
            >
              {currentStep < steps.length - 1 ? (
                <>
                  Next
                  <motion.div
                    animate={{ x: [0, 4, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </motion.div>
                </>
              ) : (
                'Get Started'
              )}
            </Button>
          </motion.div>
          
          <AnimatePresence>
            {currentStep < steps.length - 1 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
              >
                <Button
                  variant="ghost"
                  onClick={handleSkip}
                  className="w-full text-muted-foreground"
                >
                  Skip tutorial
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};