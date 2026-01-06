import { Cloud, CloudOff, Check, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export type SyncStatus = 'idle' | 'syncing' | 'synced' | 'error' | 'offline';

interface SyncIndicatorProps {
  status: SyncStatus;
  className?: string;
}

export const SyncIndicator = ({ status, className }: SyncIndicatorProps) => {
  const getIcon = () => {
    switch (status) {
      case 'syncing':
        return <Loader2 className="w-3.5 h-3.5 animate-spin" />;
      case 'synced':
        return <Check className="w-3.5 h-3.5" />;
      case 'error':
      case 'offline':
        return <CloudOff className="w-3.5 h-3.5" />;
      default:
        return <Cloud className="w-3.5 h-3.5" />;
    }
  };

  const getText = () => {
    switch (status) {
      case 'syncing':
        return 'Saving...';
      case 'synced':
        return 'Saved';
      case 'error':
        return 'Sync failed';
      case 'offline':
        return 'Offline';
      default:
        return '';
    }
  };

  const getColorClass = () => {
    switch (status) {
      case 'syncing':
        return 'text-muted-foreground';
      case 'synced':
        return 'text-success';
      case 'error':
        return 'text-destructive';
      case 'offline':
        return 'text-muted-foreground';
      default:
        return 'text-muted-foreground';
    }
  };

  // Don't show anything when idle
  if (status === 'idle') return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className={cn(
          'flex items-center gap-1.5 text-xs',
          getColorClass(),
          className
        )}
      >
        {getIcon()}
        <span className="hidden sm:inline">{getText()}</span>
      </motion.div>
    </AnimatePresence>
  );
};
