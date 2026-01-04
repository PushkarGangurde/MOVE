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
        <Button variant="outline" size="sm" className="gap-2">
          <Trophy className="w-4 h-4" />
          <span className="hidden sm:inline">Achievements</span>
          <span className="text-xs bg-primary/10 text-primary px-1.5 py-0.5 rounded-full">
            {unlockedCount}/{totalCount}
          </span>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-primary" />
            Achievements
          </SheetTitle>
          <SheetDescription>
            {unlockedCount} of {totalCount} achievements unlocked
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-120px)] mt-6">
          <div className="grid grid-cols-3 gap-4 pr-4">
            {achievements.map((achievement) => (
              <div key={achievement.id} className="flex flex-col items-center gap-2">
                <AchievementBadge
                  achievement={achievement}
                  unlocked={unlockedAchievements.includes(achievement.id)}
                  size="lg"
                />
                <p className="text-xs text-center text-muted-foreground line-clamp-2">
                  {achievement.name}
                </p>
              </div>
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};
