// YouTube video IDs for exercise demonstrations
// Using verified, embeddable videos from popular fitness channels
export const exerciseVideos: Record<string, string> = {
  // Warmup exercises
  'jumping jacks': 'c4DAnQ6DtF8', // Fitness Blender
  'jumping jacks (slow)': 'c4DAnQ6DtF8',
  'jumping jacks (slow/moderate)': 'c4DAnQ6DtF8',
  'arm circles': '44efCMNbr_A', // MadFit - Arm Circles
  'standing high knees (slow)': 'oDdkytliOqE', // LIVESTRONG - High Knees
  'high knees (slow)': 'oDdkytliOqE', // LIVESTRONG - High Knees
  'hip rotations': 'S1cXgjvdNzQ', // GMB Fitness - Hip Circles
  'hip circles': 'S1cXgjvdNzQ', // GMB Fitness - Hip Circles
  'shoulder rolls': 'WR6SO-LCT_8', // Howcast - Shoulder Rolls
  'standing toe touches': 'Xvr5N_Xf6QM', // Fitness Blender
  'march in place': 'dhCM0C6GnrY', // SparkPeople - Marching in Place
  'standing march in place': 'dhCM0C6GnrY',
  'standing march': 'dhCM0C6GnrY',
  'arm swings': 'vCEr0PNifAE', // Rehab My Patient - Arm Swings
  'leg swings': 'BVGwJaHLpKA', // GMB Fitness - Leg Swings
  'half squats': 'P-yaD24bUE8', // Runna
  'torso twists': 'TM_4dWs-q9E', // Howcast - Torso Twist
  'standing side bends': '6VxLXpZQ4K8', // Howcast - Side Bends
  'side bends': '6VxLXpZQ4K8',
  'wrist rotations': 'k_8yQ5rGa3k', // GMB Fitness - Wrist Circles
  'neck rotations': '2M80Mn0VBPw', // Cervical Neck Rolls
  'neck rolls': '2M80Mn0VBPw',
  'ankle rotations': 'gvFRqzGYhHw', // Rehab My Patient - Ankle Circles
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
  'static lunges': 'QOVaHwm-Q6U', // Bowflex - Static Lunge
  'wall sit': 'y-wV4Lz6p3o', // Howcast - Wall Sit
  'calf raises': 'gwLzBJYoWlI', // Bowflex - Calf Raises
  'lying leg raises': 'JB2oyawG9KI', // ScottHermanFitness - Leg Raises
  'lying leg raises (bend knees if hard)': 'JB2oyawG9KI',
  'russian twists (slow)': 'wkD8rjkodUI', // Bowflex - Russian Twist
  'flutter kicks': 'ANVdMDXdvfQ', // LIVESTRONG - Flutter Kicks
  'superman hold': 'z6PJMT2y8GQ', // Howcast - Superman
  'shoulder taps (from knees)': 'VKDR9yvT7C4', // LIVESTRONG - Shoulder Taps
  'tricep dips (chair/bed)': 'HCf97NPYeGY', // Bowflex - Tricep Dips
  'pike hold (hips up, static)': 'sposDXWEB0A', // GMB Fitness - Pike Hold
  'standing knee raises': 'D4s1L_dCr4M', // Howcast - Knee Raises
  'bird-dog': 'wiFNA3sqjCA', // Bowflex - Bird Dog
  'side plank (knees down)': 'rAOiIoYMAl4', // Bowflex - Side Plank

  // Cooldown/stretch exercises
  'standing quad stretch': 'EniGBCHAEVQ', // SarahBethYoga
  'hamstring stretch': '1K9x8_eXtqw', // AskDoctorJo - Hamstring Stretch
  'seated hamstring stretch': 'FDwpEdxZ4H4', // AskDoctorJo - Seated Hamstring
  'chest stretch': 'bN_kMR7lEic', // Howcast - Chest Stretch
  "child's pose": 'qRZYV6K15Uo', // Yoga With Adriene - Child's Pose
  'deep breathing': 'tEmt1Znux58', // Box breathing
  'calf stretch (wall support)': 'BYOMT53JV5I', // AskDoctorJo - Calf Stretch
  'hip stretch': 'Y5zECXXBjEs', // AskDoctorJo - Hip Flexor Stretch
  'cobra stretch': '7AWLfjXYjTE', // Runna
  'cobra pose': '7AWLfjXYjTE',
  'cat-cow stretch': 'kqnua4rHVVA', // Yoga With Adriene - Cat Cow
  'lying spinal twist': 'GhxPgP3x2i8', // Yoga With Adriene - Spinal Twist
  'triceps stretch': 'dLLPO1LeXI8', // AskDoctorJo - Tricep Stretch
  'shoulder stretch': 'rH9xHaFfFfU', // AskDoctorJo - Shoulder Stretch
  'standing forward fold': 'g7Uhp5tphAs', // Yoga With Adriene - Forward Fold
  'butterfly stretch': 'v9P2T9WNYaU', // AskDoctorJo - Butterfly Stretch
  'seated forward fold': 'zr6tAfrfxNw', // Yoga With Adriene - Seated Forward Fold
  'standing toe touch': 'Xvr5N_Xf6QM',
  'deep breathing / meditation': 'tEmt1Znux58',
  'deep breathing / relaxation': 'tEmt1Znux58',
};

export const getExerciseVideoId = (exerciseName: string): string | null => {
  const normalizedName = exerciseName.toLowerCase().trim();
  return exerciseVideos[normalizedName] || null;
};
