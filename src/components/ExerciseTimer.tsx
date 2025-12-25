import { useState, useEffect, useCallback, useRef } from 'react';
import { Play, Pause, RotateCcw, X, Volume2, VolumeX } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface ExerciseTimerProps {
  duration: number; // in seconds
  exerciseName: string;
  onClose: () => void;
  onComplete: () => void;
}

// Beep sound using Web Audio API
const playBeepSound = () => {
  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    // Play 3 beeps
    [0, 0.2, 0.4].forEach((delay) => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = 880; // A5 note
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime + delay);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + delay + 0.15);
      
      oscillator.start(audioContext.currentTime + delay);
      oscillator.stop(audioContext.currentTime + delay + 0.15);
    });
  } catch (error) {
    console.log('Audio not supported');
  }
};

// Vibration pattern
const triggerVibration = () => {
  if ('vibrate' in navigator) {
    navigator.vibrate([200, 100, 200, 100, 200]); // vibrate-pause-vibrate-pause-vibrate
  }
};

export const ExerciseTimer = ({ duration, exerciseName, onClose, onComplete }: ExerciseTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const hasNotified = useRef(false);

  const percentage = ((duration - timeLeft) / duration) * 100;

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            setIsFinished(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft]);

  // Trigger sound and vibration when timer completes
  useEffect(() => {
    if (isFinished && !hasNotified.current) {
      hasNotified.current = true;
      if (soundEnabled) {
        playBeepSound();
      }
      triggerVibration();
    }
  }, [isFinished, soundEnabled]);

  const handleReset = useCallback(() => {
    setTimeLeft(duration);
    setIsRunning(false);
    setIsFinished(false);
    hasNotified.current = false;
  }, [duration]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleMarkComplete = () => {
    onComplete();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
      <div className="bg-card rounded-2xl shadow-hover border border-border/50 p-6 w-full max-w-sm animate-scale-in">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-semibold text-foreground text-lg truncate pr-2">{exerciseName}</h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8 rounded-full shrink-0"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Timer Ring */}
        <div className="relative w-48 h-48 mx-auto mb-6">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="hsl(var(--muted))"
              strokeWidth="8"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke={isFinished ? "hsl(var(--success))" : "hsl(var(--primary))"}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 45}`}
              strokeDashoffset={`${2 * Math.PI * 45 * (1 - percentage / 100)}`}
              className="transition-all duration-300"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={cn(
              "text-4xl font-bold",
              isFinished ? "text-success" : "text-foreground"
            )}>
              {formatTime(timeLeft)}
            </span>
            {isFinished && (
              <span className="text-sm text-success font-medium mt-1">Complete!</span>
            )}
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="h-12 w-12 rounded-full"
            title={soundEnabled ? "Mute sound" : "Enable sound"}
          >
            {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={handleReset}
            className="h-12 w-12 rounded-full"
          >
            <RotateCcw className="w-5 h-5" />
          </Button>
          
          {!isFinished ? (
            <Button
              onClick={() => setIsRunning(!isRunning)}
              className="h-14 w-14 rounded-full"
              size="icon"
            >
              {isRunning ? (
                <Pause className="w-6 h-6" />
              ) : (
                <Play className="w-6 h-6 ml-0.5" />
              )}
            </Button>
          ) : (
            <Button
              onClick={handleMarkComplete}
              className="h-14 px-6 rounded-full"
            >
              Mark Done
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
