import { Quote } from 'lucide-react';
import { getDailyQuote } from '@/data/quotes';

export const DailyQuote = () => {
  const { quote, author } = getDailyQuote();

  return (
    <div className="relative p-4 rounded-xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/10">
      <Quote className="absolute top-3 left-3 w-6 h-6 text-primary/20" />
      <div className="pl-6">
        <p className="text-sm italic text-foreground/80 leading-relaxed">
          "{quote}"
        </p>
        <p className="text-xs text-muted-foreground mt-2">— {author}</p>
      </div>
    </div>
  );
};
