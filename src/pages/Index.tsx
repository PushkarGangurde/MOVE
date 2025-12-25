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
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Dumbbell className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">Home Workout</h1>
              <p className="text-xs text-muted-foreground">7-Day Beginner Plan</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Desktop: Side-by-side layout, Mobile: Stacked */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Weekly Summary - Sidebar on desktop */}
          <div className="w-full lg:w-80 lg:shrink-0">
            <div className="lg:sticky lg:top-24">
              <WeeklySummary
                completedDays={weekProgress.completedDays}
                totalDays={weekProgress.totalDays}
                percentage={weekProgress.percentage}
                streak={streak}
              />
            </div>
          </div>

          {/* Day Cards - Main content area */}
          <div className="flex-1 min-w-0">
            {/* Grid for larger screens */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
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
          </div>
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
