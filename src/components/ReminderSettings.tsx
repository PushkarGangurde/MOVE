import { Bell, BellOff, Clock } from 'lucide-react';
import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';

interface ReminderSettingsProps {
  reminderTime?: string;
  onSetReminder: (time: string | undefined) => void;
}

export const ReminderSettings = ({ reminderTime, onSetReminder }: ReminderSettingsProps) => {
  const [enabled, setEnabled] = useState(!!reminderTime);
  const [time, setTime] = useState(reminderTime || '09:00');
  const [permissionGranted, setPermissionGranted] = useState(false);

  useEffect(() => {
    if ('Notification' in window) {
      setPermissionGranted(Notification.permission === 'granted');
    }
  }, []);

  const requestPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      setPermissionGranted(permission === 'granted');
      if (permission === 'granted') {
        toast.success('Notifications enabled!');
      } else {
        toast.error('Notification permission denied');
      }
    }
  };

  const handleToggle = async (checked: boolean) => {
    if (checked && !permissionGranted) {
      await requestPermission();
      if (Notification.permission !== 'granted') return;
    }
    
    setEnabled(checked);
    if (checked) {
      onSetReminder(time);
      toast.success(`Daily reminder set for ${time}`);
      
      // Schedule a test notification
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('MOVE Reminder Set! 💪', {
          body: `You'll be reminded to workout daily at ${time}`,
          icon: '/pwa-192x192.png',
        });
      }
    } else {
      onSetReminder(undefined);
      toast.info('Reminders disabled');
    }
  };

  const handleTimeChange = (newTime: string) => {
    setTime(newTime);
    if (enabled) {
      onSetReminder(newTime);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          {enabled ? <Bell className="w-4 h-4" /> : <BellOff className="w-4 h-4" />}
          <span className="hidden sm:inline">Reminders</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Workout Reminders</DialogTitle>
          <DialogDescription>
            Get daily notifications to remind you to complete your workout
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Daily Reminders</Label>
              <p className="text-sm text-muted-foreground">
                Receive push notifications
              </p>
            </div>
            <Switch checked={enabled} onCheckedChange={handleToggle} />
          </div>
          
          {enabled && (
            <div className="space-y-2">
              <Label htmlFor="reminder-time" className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Reminder Time
              </Label>
              <Input
                id="reminder-time"
                type="time"
                value={time}
                onChange={(e) => handleTimeChange(e.target.value)}
                className="w-full"
              />
            </div>
          )}

          {!permissionGranted && (
            <div className="p-3 rounded-lg bg-muted">
              <p className="text-sm text-muted-foreground">
                Enable browser notifications to receive workout reminders
              </p>
              <Button size="sm" className="mt-2" onClick={requestPermission}>
                Enable Notifications
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
