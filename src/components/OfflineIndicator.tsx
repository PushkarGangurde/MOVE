import { motion, AnimatePresence } from 'framer-motion';
import { WifiOff, Wifi } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

export const OfflineIndicator = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      // Show "back online" briefly
      setShowBanner(true);
      setTimeout(() => setShowBanner(false), 3000);
    };
    
    const handleOffline = () => {
      setIsOnline(false);
      setShowBanner(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <AnimatePresence>
      {(showBanner || !isOnline) && (
        <motion.div
          initial={{ y: 100, opacity: 0, scale: 0.8 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 100, opacity: 0, scale: 0.8 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className={cn(
            'fixed bottom-4 left-1/2 -translate-x-1/2 z-50',
            'px-4 py-2 rounded-full shadow-lg',
            'flex items-center gap-2 text-sm font-medium',
            isOnline
              ? 'bg-success text-success-foreground'
              : 'bg-destructive text-destructive-foreground'
          )}
        >
          <motion.div
            animate={!isOnline ? { rotate: [0, -10, 10, 0] } : {}}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            {isOnline ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />}
          </motion.div>
          {isOnline ? 'Back online' : 'You\'re offline'}
        </motion.div>
      )}
    </AnimatePresence>
  );
};