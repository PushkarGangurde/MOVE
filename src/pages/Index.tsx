import { Dumbbell } from 'lucide-react';
import { workoutPlan } from '@/data/workoutPlan';
import { useWorkoutProgress } from '@/hooks/useWorkoutProgress';
import { DayCard } from '@/components/DayCard';
import { WeeklySummary } from '@/components/WeeklySummary';

const getTodayDayId = (): string => {
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  return days[new Date().getDay()];
};

const Index = () => {
  const {
    isLoaded,
    toggleExercise,
    getDayProgress,
    getWeekProgress,
    isExerciseCompleted,
    isDayCompleted,
    streak,
  } = useWorkoutProgress();

  const todayId = getTodayDayId();
  const weekProgress = getWeekProgress();

  // Sort days to put today's workout first, then remaining days in order
  const sortedDays = [...workoutPlan].sort((a, b) => {
    if (a.id === todayId) return -1;
    if (b.id === todayId) return 1;
    const dayOrder = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    return dayOrder.indexOf(a.id) - dayOrder.indexOf(b.id);
  });

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-lg border-b border-border/50">
        <div className="container max-w-lg mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Dumbbell className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">Home Workout</h1>
              <p className="text-xs text-muted-foreground">7-Day Intermediate Plan</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container max-w-lg mx-auto px-4 py-6 space-y-4">
        {/* Weekly Summary */}
        <WeeklySummary
          completedDays={weekProgress.completedDays}
          totalDays={weekProgress.totalDays}
          percentage={weekProgress.percentage}
          streak={streak}
        />

        {/* Day Cards */}
        <div className="space-y-3">
          {sortedDays.map((day, index) => (
            <div
              key={day.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <DayCard
                day={day}
                progress={getDayProgress(day.id)}
                isCompleted={isDayCompleted(day.id)}
                isExerciseCompleted={isExerciseCompleted}
                onToggleExercise={toggleExercise}
                isToday={day.id === todayId}
              />
            </div>
          ))}
        </div>

        {/* Footer */}
        <footer className="pt-8 pb-4 text-center">
          <p className="text-xs text-muted-foreground">
            Progress resets every Monday • Stay consistent 💪
          </p>
        </footer>
      </main>
    </div>
  );
};

export default Index;
