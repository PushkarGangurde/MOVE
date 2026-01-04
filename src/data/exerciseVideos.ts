// YouTube video IDs for exercise demonstrations
// Using verified, embeddable videos from popular fitness channels
export const exerciseVideos: Record<string, string> = {
  // Warmup exercises
  'jumping jacks': 'c4DAnQ6DtF8', // Fitness Blender
  'arm circles': 'mwDgFY86zck', // Hybrid Athlete
  'standing high knees (slow)': 'ZZZoCNMU48U', // Fitness Blender
  'high knees (slow)': 'ZZZoCNMU48U', // Fitness Blender
  'hip rotations': 'JYqLwajOGjI', // Runna
  'hip circles': 'JYqLwajOGjI', // Runna
  'shoulder rolls': 'mwDgFY86zck', // Hybrid Athlete
  'standing toe touches': 'Xvr5N_Xf6QM', // Fitness Blender
  'march in place': 'ZZZoCNMU48U', // Fitness Blender
  'standing march in place': 'ZZZoCNMU48U',
  'standing march': 'ZZZoCNMU48U',
  'arm swings': 'mwDgFY86zck',
  'leg swings': 'JYqLwajOGjI',
  'half squats': 'P-yaD24bUE8', // Runna
  'torso twists': 'JYqLwajOGjI',
  'standing side bends': 'Xvr5N_Xf6QM',
  'side bends': 'Xvr5N_Xf6QM',
  'wrist rotations': 'mwDgFY86zck',
  'neck rotations': '2M80Mn0VBPw', // Cervical Neck Rolls
  'neck rolls': '2M80Mn0VBPw',
  'ankle rotations': 'JYqLwajOGjI',
  'jumping jacks (slow)': 'c4DAnQ6DtF8',
  'jumping jacks (slow/moderate)': 'c4DAnQ6DtF8',
  'light stretch': 'Xvr5N_Xf6QM',

  // Main exercises
  'bodyweight squats': 'cB0cOX7gePg', // Nerd Fitness
  'incline push-ups (hands on bed/table)': 'cfns5VDVVvk', // Adby
  'incline push-ups': 'cfns5VDVVvk',
  'knee push-ups / incline push-ups': 'cfns5VDVVvk',
  'glute bridges': 'u30lAKHl43Y', // Proper Form & Technique
  'plank (knees down if needed)': 'ASdvN_XEl_c', // Bowflex (12M+ views)
  'plank (knees down allowed)': 'ASdvN_XEl_c',
  'plank': 'ASdvN_XEl_c',
  'plank hold': 'ASdvN_XEl_c',
  'static lunges': 'cB0cOX7gePg', // Using squats as alternative
  'wall sit': 'cB0cOX7gePg',
  'calf raises': 'cB0cOX7gePg',
  'lying leg raises (bend knees if hard)': 'ASdvN_XEl_c',
  'lying leg raises': 'ASdvN_XEl_c',
  'russian twists (slow)': 'ASdvN_XEl_c',
  'flutter kicks': 'ASdvN_XEl_c',
  'superman hold': 'ASdvN_XEl_c',
  'shoulder taps (from knees)': 'ASdvN_XEl_c',
  'tricep dips (chair/bed)': 'cfns5VDVVvk',
  'pike hold (hips up, static)': 'ASdvN_XEl_c',
  'standing knee raises': 'ZZZoCNMU48U',
  'bird-dog': 'ASdvN_XEl_c',
  'side plank (knees down)': 'ASdvN_XEl_c',

  // Cooldown/stretch exercises
  'standing quad stretch': 'EniGBCHAEVQ', // SarahBethYoga
  'hamstring stretch': 'Xvr5N_Xf6QM',
  'seated hamstring stretch': 'Xvr5N_Xf6QM',
  'chest stretch': 'EniGBCHAEVQ',
  "child's pose": 'EniGBCHAEVQ', // SarahBethYoga - How to do Child's Pose
  'deep breathing': 'tEmt1Znux58', // Box breathing
  'calf stretch (wall support)': 'Xvr5N_Xf6QM',
  'hip stretch': 'JYqLwajOGjI',
  'cobra stretch': '7AWLfjXYjTE', // Runna
  'cobra pose': '7AWLfjXYjTE',
  'cat-cow stretch': '7AWLfjXYjTE',
  'lying spinal twist': 'EniGBCHAEVQ',
  'triceps stretch': 'mwDgFY86zck',
  'shoulder stretch': 'mwDgFY86zck',
  'standing forward fold': 'Xvr5N_Xf6QM',
  'butterfly stretch': 'EniGBCHAEVQ',
  'seated forward fold': 'Xvr5N_Xf6QM',
  'standing toe touch': 'Xvr5N_Xf6QM',
  'deep breathing / meditation': 'tEmt1Znux58',
  'deep breathing / relaxation': 'tEmt1Znux58',
};

export const getExerciseVideoId = (exerciseName: string): string | null => {
  const normalizedName = exerciseName.toLowerCase().trim();
  return exerciseVideos[normalizedName] || null;
};
