import { useState } from 'react';
import { MessageSquare, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

interface DayNotesProps {
  dayId: string;
  note: string;
  onSave: (note: string) => void;
}

export const DayNotes = ({ dayId, note, onSave }: DayNotesProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedNote, setEditedNote] = useState(note);

  const handleSave = () => {
    onSave(editedNote);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedNote(note);
    setIsEditing(false);
  };

  if (!isEditing && !note) {
    return (
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsEditing(true)}
        className="gap-2 text-muted-foreground hover:text-foreground"
      >
        <MessageSquare className="w-4 h-4" />
        Add note
      </Button>
    );
  }

  if (isEditing) {
    return (
      <div className="space-y-2">
        <Textarea
          value={editedNote}
          onChange={(e) => setEditedNote(e.target.value)}
          placeholder="How did the workout feel? Any thoughts..."
          className="min-h-[80px] text-sm"
        />
        <div className="flex gap-2">
          <Button size="sm" onClick={handleSave} className="gap-1">
            <Save className="w-3 h-3" />
            Save
          </Button>
          <Button size="sm" variant="ghost" onClick={handleCancel}>
            <X className="w-3 h-3" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={() => setIsEditing(true)}
      className={cn(
        'p-3 rounded-lg bg-secondary/50 text-sm text-muted-foreground cursor-pointer',
        'hover:bg-secondary transition-colors'
      )}
    >
      <div className="flex items-start gap-2">
        <MessageSquare className="w-4 h-4 mt-0.5 shrink-0" />
        <p className="line-clamp-3">{note}</p>
      </div>
    </div>
  );
};
