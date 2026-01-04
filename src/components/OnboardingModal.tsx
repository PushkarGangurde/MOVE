import { useState } from 'react';
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

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
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

  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Progress dots */}
        <div className="flex justify-center gap-2 mb-8">
          {steps.map((_, index) => (
            <div
              key={index}
              className={cn(
                'w-2 h-2 rounded-full transition-all duration-300',
                index === currentStep
                  ? 'w-6 bg-primary'
                  : index < currentStep
                  ? 'bg-primary/50'
                  : 'bg-muted'
              )}
            />
          ))}
        </div>

        {/* Content */}
        <div className="text-center space-y-6">
          <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
            <Icon className="w-10 h-10 text-primary" />
          </div>
          
          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-foreground">{step.title}</h2>
            <p className="text-muted-foreground leading-relaxed">{step.description}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-10 space-y-3">
          <Button
            onClick={handleNext}
            className="w-full gap-2"
            size="lg"
          >
            {currentStep < steps.length - 1 ? (
              <>
                Next
                <ChevronRight className="w-4 h-4" />
              </>
            ) : (
              'Get Started'
            )}
          </Button>
          
          {currentStep < steps.length - 1 && (
            <Button
              variant="ghost"
              onClick={handleSkip}
              className="w-full text-muted-foreground"
            >
              Skip tutorial
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
