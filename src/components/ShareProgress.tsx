import { Share2, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface ShareProgressProps {
  completedDays: number;
  totalDays: number;
  streak: number;
}

export const ShareProgress = ({ completedDays, totalDays, streak }: ShareProgressProps) => {
  const [copied, setCopied] = useState(false);

  const shareText = `🏋️ MOVE Workout Progress
📊 This Week: ${completedDays}/${totalDays} days completed
🔥 Current Streak: ${streak} weeks

Start your fitness journey at ${window.location.origin}`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shareText);
    setCopied(true);
    toast.success('Copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'MOVE - Workout Progress',
          text: shareText,
          url: window.location.origin,
        });
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          handleCopy();
        }
      }
    } else {
      handleCopy();
    }
  };

  const handleTwitterShare = () => {
    const tweetText = encodeURIComponent(
      `🏋️ Completed ${completedDays}/${totalDays} workouts this week with MOVE!\n🔥 ${streak} week streak\n\nStart your fitness journey: ${window.location.origin}`
    );
    window.open(`https://twitter.com/intent/tweet?text=${tweetText}`, '_blank');
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Share2 className="w-4 h-4" />
          <span className="hidden sm:inline">Share</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72">
        <div className="space-y-3">
          <p className="text-sm font-medium">Share your progress</p>
          <div className="space-y-2">
            <Button
              variant="outline"
              className="w-full justify-start gap-2"
              onClick={handleShare}
            >
              <Share2 className="w-4 h-4" />
              Share
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start gap-2"
              onClick={handleCopy}
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied!' : 'Copy to clipboard'}
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start gap-2"
              onClick={handleTwitterShare}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              Post on X
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
