import { Link } from 'react-router-dom';
import { Activity, ArrowLeft, TrendingUp, Calendar, Flame, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useWorkoutProgress } from '@/hooks/useWorkoutProgress';
import { ThemeToggle } from '@/components/ThemeToggle';
import { ProgressRing } from '@/components/ProgressRing';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const Stats = () => {
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

  // Prepare chart data
  const chartData = workoutHistory.map((entry) => ({
    week: entry.weekStartDate.slice(5), // MM-DD format
    days: entry.completedDays,
    exercises: entry.completedExercises,
    percentage: Math.round((entry.completedExercises / entry.totalExercises) * 100),
  }));

  // Add current week
  chartData.push({
    week: 'This Week',
    days: weekProgress.completedDays,
    exercises: Object.keys({}).length, // Would need to track this
    percentage: weekProgress.percentage,
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-lg border-b border-border/50">
        <div className="container max-w-4xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link to="/">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                  <Activity className="w-5 h-5 text-primary-foreground" strokeWidth={2.5} />
                </div>
                <div>
                  <h1 className="text-xl font-bold tracking-tight text-foreground">Stats</h1>
                  <p className="text-xs text-muted-foreground">Your progress over time</p>
                </div>
              </div>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="container max-w-4xl mx-auto px-4 sm:px-6 py-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center">
                <Target className="w-8 h-8 text-primary mb-2" />
                <p className="text-2xl font-bold">{totalWorkoutsCompleted}</p>
                <p className="text-xs text-muted-foreground">Total Exercises</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center">
                <Flame className="w-8 h-8 text-orange-500 mb-2" />
                <p className="text-2xl font-bold">{streak}</p>
                <p className="text-xs text-muted-foreground">Current Streak</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center">
                <TrendingUp className="w-8 h-8 text-success mb-2" />
                <p className="text-2xl font-bold">{longestStreak}</p>
                <p className="text-xs text-muted-foreground">Longest Streak</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center">
                <Calendar className="w-8 h-8 text-blue-500 mb-2" />
                <p className="text-2xl font-bold">{workoutHistory.length}</p>
                <p className="text-xs text-muted-foreground">Weeks Tracked</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* This Week Progress */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-lg">This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-6">
              <ProgressRing percentage={weekProgress.percentage} size={80} strokeWidth={8} />
              <div>
                <p className="text-3xl font-bold">{weekProgress.completedDays}/7</p>
                <p className="text-muted-foreground">days completed</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Weekly Progress Chart */}
        {chartData.length > 1 && (
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

        {/* Completion Rate Bar Chart */}
        {chartData.length > 1 && (
          <Card>
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

        {chartData.length <= 1 && (
          <Card>
            <CardContent className="py-12 text-center">
              <TrendingUp className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                Complete more weeks to see your progress charts!
              </p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default Stats;
