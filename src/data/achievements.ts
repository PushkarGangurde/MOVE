import { Achievement } from '@/types/workout';

export const achievements: Achievement[] = [
  {
    id: 'first_workout',
    name: 'First Steps',
    description: 'Complete your first workout',
    icon: '🎯',
  },
  {
    id: 'first_day',
    name: 'Day One',
    description: 'Complete all exercises in a day',
    icon: '✅',
  },
  {
    id: 'first_week',
    name: 'Week Warrior',
    description: 'Complete a full week of workouts',
    icon: '🏆',
  },
  {
    id: 'three_day_streak',
    name: 'On a Roll',
    description: 'Complete 3 consecutive days',
    icon: '🔥',
  },
  {
    id: 'seven_day_streak',
    name: 'Unstoppable',
    description: 'Maintain a 7-day streak',
    icon: '⚡',
  },
  {
    id: 'early_bird',
    name: 'Early Bird',
    description: 'Complete a workout before 8 AM',
    icon: '🌅',
  },
  {
    id: 'night_owl',
    name: 'Night Owl',
    description: 'Complete a workout after 9 PM',
    icon: '🦉',
  },
  {
    id: 'consistency_king',
    name: 'Consistency King',
    description: 'Complete 4 weeks total',
    icon: '👑',
  },
  {
    id: 'halfway_hero',
    name: 'Halfway Hero',
    description: 'Complete 50% of a week',
    icon: '🌟',
  },
  {
    id: 'perfect_week',
    name: 'Perfect Week',
    description: 'Complete every single exercise in a week',
    icon: '💎',
  },
  {
    id: 'comeback_kid',
    name: 'Comeback Kid',
    description: 'Return after skipping a week',
    icon: '💪',
  },
  {
    id: 'note_taker',
    name: 'Reflective',
    description: 'Add your first workout note',
    icon: '📝',
  },
];

export const getAchievement = (id: string): Achievement | undefined => {
  return achievements.find(a => a.id === id);
};
