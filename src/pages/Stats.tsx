import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, ArrowLeft, TrendingUp, Calendar, Flame, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useWorkoutProgress } from '@/hooks/useWorkoutProgress';
import { ThemeToggle } from '@/components/ThemeToggle';
import { ProgressRing } from '@/components/ProgressRing';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { cn } from '@/lib/utils';

type TimeRange = 'week' | 'month' | 'year';

const Stats = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>('week');
  
  const {
    isLoaded,
    streak,
    longestStreak,
    totalWorkoutsCompleted,
    workoutHistory,
    getWeekProgress,
  } = useWorkoutProgress();

  const weekProgress = getWeekProgress();

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Prepare chart data based on time range
  const allChartData = workoutHistory.map((entry) => ({
    week: entry.weekStartDate.slice(5), // MM-DD format
    fullDate: entry.weekStartDate,
    days: entry.completedDays,
    exercises: entry.completedExercises,
    percentage: Math.round((entry.completedExercises / entry.totalExercises) * 100),
  }));

  // Add current week
  allChartData.push({
    week: 'This Week',
    fullDate: new Date().toISOString().split('T')[0],
    days: weekProgress.completedDays,
    exercises: 0,
    percentage: weekProgress.percentage,
  });

  // Filter data based on time range
  const getFilteredData = () => {
    const now = new Date();
    switch (timeRange) {
      case 'week':
        return allChartData.slice(-1); // Just current week
      case 'month':
        return allChartData.slice(-4); // Last 4 weeks
      case 'year':
        return allChartData.slice(-52); // Last 52 weeks (1 year)
      default:
        return allChartData;
    }
  };

  const chartData = getFilteredData();

  // Calculate stats based on time range
  const getTimeRangeStats = () => {
    const data = chartData.filter(d => d.week !== 'This Week');
    if (data.length === 0) {
      return {
        avgDays: weekProgress.completedDays,
        totalDays: weekProgress.completedDays,
        avgPercentage: weekProgress.percentage,
        weeksTracked: 1,
      };
    }
    
    const totalDays = data.reduce((sum, d) => sum + d.days, 0) + weekProgress.completedDays;
    const avgDays = Math.round(totalDays / (data.length + 1));
    const avgPercentage = Math.round(
      (data.reduce((sum, d) => sum + d.percentage, 0) + weekProgress.percentage) / (data.length + 1)
    );
    
    return {
      avgDays,
      totalDays,
      avgPercentage,
      weeksTracked: data.length + 1,
    };
  };

  const rangeStats = getTimeRangeStats();

  const timeRangeLabels: Record<TimeRange, string> = {
    week: 'This Week',
    month: 'Last 4 Weeks',
    year: 'This Year',
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-10 bg-background/80 backdrop-blur-lg border-b border-border/50"
      >
        <div className="container max-w-4xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link to="/">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <div className="flex items-center gap-3">
                <motion.div 
                  className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                >
                  <Activity className="w-5 h-5 text-primary-foreground" strokeWidth={2.5} />
                </motion.div>
                <div>
                  <h1 className="text-xl font-bold tracking-tight text-foreground">Stats</h1>
                  <p className="text-xs text-muted-foreground">Your progress over time</p>
                </div>
              </div>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </motion.header>

      <main className="container max-w-4xl mx-auto px-4 sm:px-6 py-6">
        {/* Time Range Selector */}
        <motion.div 
          className="flex justify-center mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="inline-flex bg-muted p-1 rounded-lg">
            {(['week', 'month', 'year'] as TimeRange[]).map((range) => (
              <motion.button
                key={range}
                onClick={() => setTimeRange(range)}
                className={cn(
                  'px-4 py-2 text-sm font-medium rounded-md transition-all duration-200',
                  timeRange === range
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                )}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {range.charAt(0).toUpperCase() + range.slice(1)}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Time Range Label */}
        <motion.p 
          className="text-center text-sm text-muted-foreground mb-6"
          key={timeRange}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Showing: {timeRangeLabels[timeRange]}
        </motion.p>

        {/* Stats Overview */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardContent className="pt-6">
              <motion.div 
                className="flex flex-col items-center"
                whileHover={{ scale: 1.02 }}
              >
                <Target className="w-8 h-8 text-primary mb-2" />
                <motion.p 
                  className="text-2xl font-bold"
                  key={`total-${timeRange}`}
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                >
                  {totalWorkoutsCompleted}
                </motion.p>
                <p className="text-xs text-muted-foreground">Total Exercises</p>
              </motion.div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <motion.div 
                className="flex flex-col items-center"
                whileHover={{ scale: 1.02 }}
              >
                <Flame className="w-8 h-8 text-orange-500 mb-2" />
                <motion.p 
                  className="text-2xl font-bold"
                  key={`streak-${streak}`}
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                >
                  {streak}
                </motion.p>
                <p className="text-xs text-muted-foreground">Current Streak</p>
              </motion.div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <motion.div 
                className="flex flex-col items-center"
                whileHover={{ scale: 1.02 }}
              >
                <TrendingUp className="w-8 h-8 text-success mb-2" />
                <motion.p 
                  className="text-2xl font-bold"
                  key={`longest-${longestStreak}`}
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                >
                  {longestStreak}
                </motion.p>
                <p className="text-xs text-muted-foreground">Longest Streak</p>
              </motion.div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <motion.div 
                className="flex flex-col items-center"
                whileHover={{ scale: 1.02 }}
              >
                <Calendar className="w-8 h-8 text-blue-500 mb-2" />
                <motion.p 
                  className="text-2xl font-bold"
                  key={`weeks-${rangeStats.weeksTracked}`}
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                >
                  {rangeStats.weeksTracked}
                </motion.p>
                <p className="text-xs text-muted-foreground">Weeks Tracked</p>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Current Progress */}
        <AnimatePresence mode="wait">
          <motion.div
            key={timeRange}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-lg">
                  {timeRange === 'week' ? 'This Week' : `Average (${timeRangeLabels[timeRange]})`}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-6">
                  <ProgressRing 
                    percentage={timeRange === 'week' ? weekProgress.percentage : rangeStats.avgPercentage} 
                    size={80} 
                    strokeWidth={8} 
                  />
                  <div>
                    <p className="text-3xl font-bold">
                      {timeRange === 'week' 
                        ? `${weekProgress.completedDays}/7` 
                        : `${rangeStats.avgDays}/7`}
                    </p>
                    <p className="text-muted-foreground">
                      {timeRange === 'week' ? 'days completed' : 'avg days/week'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Weekly Progress Chart - Only show for month/year */}
            {timeRange !== 'week' && chartData.length > 1 && (
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="text-lg">Weekly Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={chartData}>
                        <defs>
                          <linearGradient id="colorDays" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <XAxis 
                          dataKey="week" 
                          stroke="hsl(var(--muted-foreground))"
                          fontSize={12}
                        />
                        <YAxis 
                          stroke="hsl(var(--muted-foreground))"
                          fontSize={12}
                          domain={[0, 7]}
                        />
                        <Tooltip 
                          contentStyle={{
                            backgroundColor: 'hsl(var(--card))',
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '8px',
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="days"
                          stroke="hsl(var(--primary))"
                          strokeWidth={2}
                          fillOpacity={1}
                          fill="url(#colorDays)"
                          name="Days Completed"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Completion Rate Bar Chart - Only show for month/year */}
            {timeRange !== 'week' && chartData.length > 1 && (
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="text-lg">Completion Rate (%)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData}>
                        <XAxis 
                          dataKey="week" 
                          stroke="hsl(var(--muted-foreground))"
                          fontSize={12}
                        />
                        <YAxis 
                          stroke="hsl(var(--muted-foreground))"
                          fontSize={12}
                          domain={[0, 100]}
                        />
                        <Tooltip 
                          contentStyle={{
                            backgroundColor: 'hsl(var(--card))',
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '8px',
                          }}
                        />
                        <Bar
                          dataKey="percentage"
                          fill="hsl(var(--primary))"
                          radius={[4, 4, 0, 0]}
                          name="Completion %"
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Daily breakdown for week view */}
            {timeRange === 'week' && (
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="text-lg">Daily Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-7 gap-2">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                      <motion.div
                        key={day}
                        className="flex flex-col items-center"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <p className="text-xs text-muted-foreground mb-2">{day}</p>
                        <div className={cn(
                          'w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium',
                          index < weekProgress.completedDays
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-muted-foreground'
                        )}>
                          {index < weekProgress.completedDays ? '✓' : ''}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* No data message */}
            {timeRange !== 'week' && chartData.length <= 1 && (
              <Card>
                <CardContent className="py-12 text-center">
                  <TrendingUp className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Complete more weeks to see your {timeRange}ly progress charts!
                  </p>
                </CardContent>
              </Card>
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Stats;