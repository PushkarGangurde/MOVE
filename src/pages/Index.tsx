import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Menu } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useWorkoutProgress } from '@/hooks/useWorkoutProgress';
import { useCelebration } from '@/hooks/useCelebration';
import { DayCard } from '@/components/DayCard';
import { WeeklySummary } from '@/components/WeeklySummary';
import { ThemeToggle } from '@/components/ThemeToggle';
import { ThemeCustomizer } from '@/components/ThemeCustomizer';
import { AchievementsPanel } from '@/components/AchievementsPanel';
import { ShareProgress } from '@/components/ShareProgress';
import { ReminderSettings } from '@/components/ReminderSettings';
import { OnboardingModal } from '@/components/OnboardingModal';
import { OfflineIndicator } from '@/components/OfflineIndicator';
import { PlanSelector } from '@/components/PlanSelector';
import { InstallPrompt } from '@/components/InstallPrompt';
import { UserMenu } from '@/components/UserMenu';
import { planInfo } from '@/data/workoutPlans';

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
    setDayNote,
    getDayNote,
    skipDay,
    isDaySkipped,
    swapExercise,
    getExerciseSwap,
    achievements,
    setReminderTime,
    reminderTime,
    setAccentColor,
    accentColor,
    hasSeenOnboarding,
    markOnboardingComplete,
    unlockAchievement,
    difficulty,
    setDifficulty,
    currentPlan,
  } = useWorkoutProgress();

  const { celebrateWeek } = useCelebration();
  const weekProgress = getWeekProgress();
  const wasWeekComplete = useRef(weekProgress.percentage === 100);

  const todayId = getTodayDayId();
  const currentPlanInfo = planInfo[difficulty];

  // Apply saved accent color on load
  useEffect(() => {
    if (accentColor) {
      document.documentElement.style.setProperty('--primary', accentColor);
      document.documentElement.style.setProperty('--ring', accentColor);
    }
  }, [accentColor]);

  // Celebrate when week is completed
  useEffect(() => {
    if (weekProgress.percentage === 100 && !wasWeekComplete.current) {
      celebrateWeek();
      unlockAchievement('first_week');
      unlockAchievement('perfect_week');
    }
    wasWeekComplete.current = weekProgress.percentage === 100;
  }, [weekProgress.percentage, celebrateWeek, unlockAchievement]);

  // Check for day completion achievements
  useEffect(() => {
    const completedDaysCount = currentPlan.filter(day => isDayCompleted(day.id)).length;
    if (completedDaysCount >= 1) {
      unlockAchievement('first_day');
    }
    if (completedDaysCount >= 3) {
      unlockAchievement('three_day_streak');
    }
    if (completedDaysCount >= 4) {
      unlockAchievement('halfway_hero');
    }
    if (completedDaysCount >= 7) {
      unlockAchievement('seven_day_streak');
    }
  }, [isDayCompleted, unlockAchievement, currentPlan]);

  // Sort days to put today's workout first, then remaining days in order
  const sortedDays = [...currentPlan].sort((a, b) => {
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
      {/* Onboarding Modal */}
      <AnimatePresence>
        {!hasSeenOnboarding && (
          <OnboardingModal onComplete={markOnboardingComplete} />
        )}
      </AnimatePresence>

      {/* Offline Indicator */}
      <OfflineIndicator />

      {/* Install Prompt */}
      <InstallPrompt />

      {/* Header */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="sticky top-0 z-10 bg-background/80 backdrop-blur-lg border-b border-border/50"
      >
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <motion.div 
              className="flex items-center gap-3"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <motion.div 
                className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center"
                whileHover={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.5 }}
              >
                <Activity className="w-5 h-5 text-primary-foreground" strokeWidth={2.5} />
              </motion.div>
              <div>
                <h1 className="text-xl font-bold tracking-tight text-foreground">MOVE</h1>
                <p className="text-xs text-muted-foreground">
                  {currentPlanInfo.icon} {currentPlanInfo.name} • {currentPlanInfo.duration}
                </p>
              </div>
            </motion.div>
            <motion.div 
              className="flex items-center gap-1 sm:gap-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              {/* Always visible: Plan selector */}
              <PlanSelector currentPlan={difficulty} onPlanChange={setDifficulty} />
              
              {/* Desktop: Show all buttons */}
              <div className="hidden sm:flex items-center gap-2">
                <ShareProgress
                  completedDays={weekProgress.completedDays}
                  totalDays={weekProgress.totalDays}
                  streak={streak}
                />
                <AchievementsPanel unlockedAchievements={achievements} />
                <ReminderSettings
                  reminderTime={reminderTime}
                  onSetReminder={setReminderTime}
                />
                <ThemeCustomizer
                  currentColor={accentColor}
                  onColorChange={setAccentColor}
                />
                <ThemeToggle />
                <UserMenu />
              </div>

              {/* Mobile: Dropdown menu */}
              <div className="sm:hidden">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-9 w-9">
                      <Menu className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="p-2 min-w-[180px]">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between px-2 py-1">
                        <span className="text-sm text-muted-foreground">Share</span>
                        <ShareProgress
                          completedDays={weekProgress.completedDays}
                          totalDays={weekProgress.totalDays}
                          streak={streak}
                        />
                      </div>
                      <div className="flex items-center justify-between px-2 py-1">
                        <span className="text-sm text-muted-foreground">Achievements</span>
                        <AchievementsPanel unlockedAchievements={achievements} />
                      </div>
                      <div className="flex items-center justify-between px-2 py-1">
                        <span className="text-sm text-muted-foreground">Reminders</span>
                        <ReminderSettings
                          reminderTime={reminderTime}
                          onSetReminder={setReminderTime}
                        />
                      </div>
                      <div className="flex items-center justify-between px-2 py-1">
                        <span className="text-sm text-muted-foreground">Theme Color</span>
                        <ThemeCustomizer
                          currentColor={accentColor}
                          onColorChange={setAccentColor}
                        />
                      </div>
                      <div className="flex items-center justify-between px-2 py-1">
                        <span className="text-sm text-muted-foreground">Dark Mode</span>
                        <ThemeToggle />
                      </div>
                      <div className="flex items-center justify-between px-2 py-1">
                        <span className="text-sm text-muted-foreground">Account</span>
                        <UserMenu />
                      </div>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Desktop: Side-by-side layout, Mobile: Stacked */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Weekly Summary - Sidebar on desktop */}
          <motion.div 
            className="w-full lg:w-80 lg:shrink-0"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="lg:sticky lg:top-24">
              <WeeklySummary
                completedDays={weekProgress.completedDays}
                totalDays={weekProgress.totalDays}
                percentage={weekProgress.percentage}
                streak={streak}
              />
            </div>
          </motion.div>

          {/* Day Cards - Main content area */}
          <div className="flex-1 min-w-0">
            {/* Grid for larger screens */}
            <motion.div 
              className="grid grid-cols-1 xl:grid-cols-2 gap-4"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.08,
                  },
                },
              }}
              key={difficulty} // Re-animate when difficulty changes
            >
              {sortedDays.map((day) => (
                <motion.div
                  key={day.id}
                  variants={{
                    hidden: { opacity: 0, y: 20, scale: 0.95 },
                    visible: { 
                      opacity: 1, 
                      y: 0, 
                      scale: 1,
                      transition: {
                        type: "spring",
                        stiffness: 100,
                        damping: 15,
                      }
                    },
                  }}
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <DayCard
                    day={day}
                    progress={getDayProgress(day.id)}
                    isCompleted={isDayCompleted(day.id)}
                    isExerciseCompleted={isExerciseCompleted}
                    onToggleExercise={toggleExercise}
                    isToday={day.id === todayId}
                    note={getDayNote(day.id)}
                    onSaveNote={(note) => setDayNote(day.id, note)}
                    dayStatus={isDaySkipped(day.id)}
                    onSkipDay={(reason) => skipDay(day.id, reason)}
                    getExerciseSwap={getExerciseSwap}
                    onSwapExercise={swapExercise}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Footer */}
        <motion.footer 
          className="pt-8 pb-4 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <p className="text-xs text-muted-foreground">
            Progress resets every Monday • Stay consistent 💪
          </p>
        </motion.footer>
      </main>
    </div>
  );
};

export default Index;