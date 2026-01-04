import { CalendarPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DayWorkout } from '@/types/workout';
import { toast } from 'sonner';

interface CalendarExportProps {
  day: DayWorkout;
}

export const CalendarExport = ({ day }: CalendarExportProps) => {
  const generateICS = () => {
    const now = new Date();
    const dayIndex = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'].indexOf(day.id);
    const currentDayIndex = now.getDay();
    
    // Calculate the date for this workout day
    let daysUntil = dayIndex - currentDayIndex;
    if (daysUntil < 0) daysUntil += 7;
    
    const workoutDate = new Date(now);
    workoutDate.setDate(now.getDate() + daysUntil);
    workoutDate.setHours(9, 0, 0, 0); // Default to 9 AM
    
    const endDate = new Date(workoutDate);
    endDate.setHours(10, 0, 0, 0); // 1 hour duration
    
    const formatDate = (date: Date) => {
      return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
    };
    
    const exerciseList = day.exercises
      .map(e => `• ${e.name}: ${e.reps}`)
      .join('\\n');
    
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//MOVE Workout//EN
BEGIN:VEVENT
UID:${Date.now()}@move-workout
DTSTAMP:${formatDate(now)}
DTSTART:${formatDate(workoutDate)}
DTEND:${formatDate(endDate)}
SUMMARY:MOVE - ${day.dayName} (${day.focus})
DESCRIPTION:${exerciseList}
RRULE:FREQ=WEEKLY;BYDAY=${day.id.slice(0, 2).toUpperCase()}
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `move-${day.id}-workout.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast.success(`${day.dayName} workout added to calendar!`);
  };

  const addToGoogleCalendar = () => {
    const now = new Date();
    const dayIndex = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'].indexOf(day.id);
    const currentDayIndex = now.getDay();
    
    let daysUntil = dayIndex - currentDayIndex;
    if (daysUntil < 0) daysUntil += 7;
    
    const workoutDate = new Date(now);
    workoutDate.setDate(now.getDate() + daysUntil);
    workoutDate.setHours(9, 0, 0, 0);
    
    const endDate = new Date(workoutDate);
    endDate.setHours(10, 0, 0, 0);
    
    const formatForGoogle = (date: Date) => {
      return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
    };
    
    const exerciseList = day.exercises
      .map(e => `• ${e.name}: ${e.reps}`)
      .join('%0A');
    
    const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(`MOVE - ${day.dayName} (${day.focus})`)}&dates=${formatForGoogle(workoutDate)}/${formatForGoogle(endDate)}&details=${exerciseList}&recur=RRULE:FREQ=WEEKLY`;
    
    window.open(googleUrl, '_blank');
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={generateICS}
      className="gap-2 text-muted-foreground hover:text-foreground"
      title="Add to calendar"
    >
      <CalendarPlus className="w-4 h-4" />
      <span className="hidden sm:inline">Add to Calendar</span>
    </Button>
  );
};
