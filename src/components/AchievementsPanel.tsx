import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';
import { achievements } from '@/data/achievements';
import { AchievementBadge } from './AchievementBadge';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

interface AchievementsPanelProps {
  unlockedAchievements: string[];
}

export const AchievementsPanel = ({ unlockedAchievements }: AchievementsPanelProps) => {
  const unlockedCount = unlockedAchievements.length;
  const totalCount = achievements.length;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button variant="outline" size="sm" className="gap-2">
            <Trophy className="w-4 h-4" />
            <span className="hidden sm:inline">Achievements</span>
            <motion.span 
              className="text-xs bg-primary/10 text-primary px-1.5 py-0.5 rounded-full"
              key={unlockedCount}
              initial={{ scale: 1.3 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {unlockedCount}/{totalCount}
            </motion.span>
          </Button>
        </motion.div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <motion.div
              animate={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Trophy className="w-5 h-5 text-primary" />
            </motion.div>
            Achievements
          </SheetTitle>
          <SheetDescription>
            {unlockedCount} of {totalCount} achievements unlocked
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-120px)] mt-6">
          <motion.div 
            className="grid grid-cols-3 gap-4 pr-4"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.05 }
              }
            }}
          >
            {achievements.map((achievement, index) => (
              <motion.div 
                key={achievement.id} 
                className="flex flex-col items-center gap-2"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
              >
                <AchievementBadge
                  achievement={achievement}
                  unlocked={unlockedAchievements.includes(achievement.id)}
                  size="lg"
                  index={index}
                />
                <p className="text-xs text-center text-muted-foreground line-clamp-2">
                  {achievement.name}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};