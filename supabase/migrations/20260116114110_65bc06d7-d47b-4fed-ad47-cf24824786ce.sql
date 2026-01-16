-- Add exercise_customizations column to workout_progress table
ALTER TABLE public.workout_progress 
ADD COLUMN IF NOT EXISTS exercise_customizations jsonb NOT NULL DEFAULT '{}'::jsonb;