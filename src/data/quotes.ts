export const motivationalQuotes = [
  { quote: "The only bad workout is the one that didn't happen.", author: "Unknown" },
  { quote: "Take care of your body. It's the only place you have to live.", author: "Jim Rohn" },
  { quote: "Strength does not come from the body. It comes from the will.", author: "Unknown" },
  { quote: "The pain you feel today will be the strength you feel tomorrow.", author: "Unknown" },
  { quote: "Your body can stand almost anything. It's your mind you have to convince.", author: "Unknown" },
  { quote: "Fitness is not about being better than someone else. It's about being better than you used to be.", author: "Unknown" },
  { quote: "The hard days are the best because that's when champions are made.", author: "Gabby Douglas" },
  { quote: "Don't count the days, make the days count.", author: "Muhammad Ali" },
  { quote: "Success is the sum of small efforts repeated day in and day out.", author: "Robert Collier" },
  { quote: "The difference between try and triumph is a little umph.", author: "Marvin Phillips" },
  { quote: "A year from now you'll wish you had started today.", author: "Karen Lamb" },
  { quote: "The body achieves what the mind believes.", author: "Unknown" },
  { quote: "Motivation is what gets you started. Habit is what keeps you going.", author: "Jim Ryun" },
  { quote: "You don't have to be great to start, but you have to start to be great.", author: "Zig Ziglar" },
  { quote: "The only way to define your limits is by going beyond them.", author: "Arthur C. Clarke" },
  { quote: "Exercise is a celebration of what your body can do.", author: "Unknown" },
  { quote: "Sweat is just fat crying.", author: "Unknown" },
  { quote: "No matter how slow you go, you are still lapping everyone on the couch.", author: "Unknown" },
  { quote: "The best project you'll ever work on is you.", author: "Unknown" },
  { quote: "Push yourself because no one else is going to do it for you.", author: "Unknown" },
  { quote: "Wake up with determination. Go to bed with satisfaction.", author: "Unknown" },
];

export const getDailyQuote = (): { quote: string; author: string } => {
  const today = new Date();
  const dayOfYear = Math.floor(
    (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000
  );
  return motivationalQuotes[dayOfYear % motivationalQuotes.length];
};
