import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { getDailyQuote } from '@/data/quotes';

export const DailyQuote = () => {
  const { quote, author } = getDailyQuote();

  return (
    <motion.div 
      className="relative p-4 rounded-xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/10 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 0.2, scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Quote className="absolute top-3 left-3 w-6 h-6 text-primary" />
      </motion.div>
      <div className="pl-6">
        <motion.p 
          className="text-sm italic text-foreground/80 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          "{quote}"
        </motion.p>
        <motion.p 
          className="text-xs text-muted-foreground mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          — {author}
        </motion.p>
      </div>
    </motion.div>
  );
};