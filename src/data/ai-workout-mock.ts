import type { Difficulty } from '@/data/home-mock';

export type WorkoutGoal = 'Strength' | 'Weight Loss' | 'Endurance' | 'General Fitness';
export type WorkoutDuration = 15 | 30 | 45;
export type Equipment = 'No Equipment' | 'Dumbbells' | 'Full Gym';

export type WorkoutExercise = {
  id: string;
  name: string;
  prescription: string;
  description: string;
};

export type GeneratedWorkout = {
  name: string;
  summary: string;
  durationMinutes: WorkoutDuration;
  difficulty: Difficulty;
  goal: WorkoutGoal;
  equipment: Equipment;
  exercises: WorkoutExercise[];
};

export const workoutGoals: WorkoutGoal[] = [
  'Strength',
  'Weight Loss',
  'Endurance',
  'General Fitness',
];

export const workoutDurations: WorkoutDuration[] = [15, 30, 45];

export const workoutDifficulties: Difficulty[] = ['Beginner', 'Intermediate', 'Advanced'];

export const equipmentOptions: Equipment[] = ['No Equipment', 'Dumbbells', 'Full Gym'];

type ExerciseTemplate = {
  name: string;
  description: string;
  kind: 'reps' | 'time';
};

const library: Record<WorkoutGoal, Record<Equipment, ExerciseTemplate[]>> = {
  Strength: {
    'No Equipment': [
      { name: 'Push-Up Ladder', description: 'Keep elbows at 45 degrees and pause at the bottom.', kind: 'reps' },
      { name: 'Bodyweight Squats', description: 'Sit back, keep heels planted, and stand tall.', kind: 'reps' },
      { name: 'Reverse Lunges', description: 'Step back and drop the rear knee under control.', kind: 'reps' },
      { name: 'Pike Push-Ups', description: 'Hips high to load the shoulders without equipment.', kind: 'reps' },
      { name: 'Glute Bridges', description: 'Squeeze at the top for one second each rep.', kind: 'reps' },
      { name: 'Superman Holds', description: 'Lift chest and thighs, then lower slowly.', kind: 'time' },
      { name: 'Hollow-Body Hold', description: 'Press lower back into the floor throughout.', kind: 'time' },
      { name: 'Slow Tempo Push-Ups', description: 'Three seconds down, one second up.', kind: 'reps' },
    ],
    Dumbbells: [
      { name: 'Goblet Squats', description: 'Hold one dumbbell at the chest and sit between the heels.', kind: 'reps' },
      { name: 'Dumbbell Bench Press', description: 'Floor or bench press with a controlled lowering phase.', kind: 'reps' },
      { name: 'Single-Arm Rows', description: 'Brace the bench or knee and pull the elbow to the hip.', kind: 'reps' },
      { name: 'Romanian Deadlifts', description: 'Hinge at the hips with a slight knee bend.', kind: 'reps' },
      { name: 'Overhead Press', description: 'Ribs down, press dumbbells in a straight line.', kind: 'reps' },
      { name: 'Split Squats', description: 'Keep most of the weight on the front heel.', kind: 'reps' },
      { name: 'Farmer Carry', description: 'Walk tall with heavy dumbbells at your sides.', kind: 'time' },
      { name: 'Weighted Hip Thrusts', description: 'Place a dumbbell on the hips and drive through the heels.', kind: 'reps' },
    ],
    'Full Gym': [
      { name: 'Barbell Back Squat', description: 'Brace the core and keep the bar over mid-foot.', kind: 'reps' },
      { name: 'Lat Pulldown', description: 'Pull the bar to the upper chest without leaning back.', kind: 'reps' },
      { name: 'Seated Cable Row', description: 'Squeeze the shoulder blades, then return slowly.', kind: 'reps' },
      { name: 'Incline Dumbbell Press', description: 'Set the bench at 30 degrees for upper-chest focus.', kind: 'reps' },
      { name: 'Romanian Deadlift', description: 'Feel a hamstring stretch before standing tall.', kind: 'reps' },
      { name: 'Walking Lunges', description: 'Use light plates or dumbbells and stay upright.', kind: 'reps' },
      { name: 'Cable Face Pulls', description: 'Externally rotate at the end of each pull.', kind: 'reps' },
      { name: 'Plank Shoulder Taps', description: 'Keep hips quiet while tapping opposite shoulders.', kind: 'reps' },
    ],
  },
  'Weight Loss': {
    'No Equipment': [
      { name: 'Jumping Jacks', description: 'Stay light on the feet and keep a steady rhythm.', kind: 'time' },
      { name: 'Squat to Reach', description: 'Stand from a squat and reach overhead to raise heart rate.', kind: 'reps' },
      { name: 'Mountain Climbers', description: 'Keep shoulders over wrists and drive knees quickly.', kind: 'time' },
      { name: 'High Knees', description: 'Pump the arms and land softly.', kind: 'time' },
      { name: 'Push-Up to Down Dog', description: 'Flow from a push-up into a hip stretch.', kind: 'reps' },
      { name: 'Lateral Lunges', description: 'Shift side to side to load the inner thighs.', kind: 'reps' },
      { name: 'Burpees', description: 'Step back if needed; stand fully between reps.', kind: 'reps' },
      { name: 'Fast Feet Shuffle', description: 'Stay athletic and keep the chest up.', kind: 'time' },
    ],
    Dumbbells: [
      { name: 'Dumbbell Thrusters', description: 'Squat, then press the bells overhead in one motion.', kind: 'reps' },
      { name: 'Renegade Rows', description: 'Row one bell while the other hand supports a plank.', kind: 'reps' },
      { name: 'DB Reverse Lunges', description: 'Hold dumbbells at your sides and keep the torso tall.', kind: 'reps' },
      { name: 'Swing to Goblet Squat', description: 'Hinge, then catch the bell and squat.', kind: 'reps' },
      { name: 'Push Press', description: 'Use a small dip to drive the bells overhead.', kind: 'reps' },
      { name: 'Dumbbell March', description: 'Hold bells in a rack position and march in place.', kind: 'time' },
      { name: 'Floor Sit-Ups', description: 'Hold a light bell at the chest if comfortable.', kind: 'reps' },
      { name: 'Skater Bounds', description: 'Use light dumbbells or bodyweight for lateral power.', kind: 'reps' },
    ],
    'Full Gym': [
      { name: 'Rowing Intervals', description: 'Drive with the legs, then finish with the arms.', kind: 'time' },
      { name: 'Kettlebell Swings', description: 'Hinge hard and snap the hips forward.', kind: 'reps' },
      { name: 'Assault Bike', description: 'Keep a strong posture and even breathing.', kind: 'time' },
      { name: 'Box Step-Ups', description: 'Drive through the whole foot on the box.', kind: 'reps' },
      { name: 'Cable Woodchop', description: 'Rotate through the trunk, not just the arms.', kind: 'reps' },
      { name: 'Medicine Ball Slams', description: 'Reach tall, then slam with intent.', kind: 'reps' },
      { name: 'Sled Push', description: 'Short, powerful steps with the core braced.', kind: 'time' },
      { name: 'Battle Ropes', description: 'Create steady waves without collapsing the shoulders.', kind: 'time' },
    ],
  },
  Endurance: {
    'No Equipment': [
      { name: 'Easy Jog in Place', description: 'Warm the legs and find a sustainable cadence.', kind: 'time' },
      { name: 'Walking Lunges', description: 'Long, quiet steps to build lasting lower-body stamina.', kind: 'reps' },
      { name: 'Shadow Boxing', description: 'Light punches with continuous footwork.', kind: 'time' },
      { name: 'Step-Ups on a Stair', description: 'Alternate legs and keep the tempo even.', kind: 'reps' },
      { name: 'Plank Walkouts', description: 'Walk the hands out, pause, then return.', kind: 'reps' },
      { name: 'Glute Bridge March', description: 'Hold a bridge while marching the knees.', kind: 'time' },
      { name: 'Side Plank', description: 'Stack the hips and breathe steadily.', kind: 'time' },
      { name: 'Cooldown Stretch Flow', description: 'Move slowly through hip and chest openers.', kind: 'time' },
    ],
    Dumbbells: [
      { name: 'Light DB March', description: 'Hold bells at the sides and keep a brisk walk cadence.', kind: 'time' },
      { name: 'Dumbbell Step-Backs', description: 'Use light load and a consistent tempo.', kind: 'reps' },
      { name: 'Overhead Carry', description: 'Lock one or two bells overhead and walk.', kind: 'time' },
      { name: 'Reverse Flyes', description: 'Light bells, squeeze the upper back.', kind: 'reps' },
      { name: 'DB Deadlift to Row', description: 'Hinge, row, then stand with control.', kind: 'reps' },
      { name: 'Front Rack Hold', description: 'Breathe into the ribs while holding the bells.', kind: 'time' },
      { name: 'Calf Raise Walk', description: 'Short steps on the balls of the feet.', kind: 'time' },
      { name: 'Suitcase Carry', description: 'One bell at a side; do not lean into it.', kind: 'time' },
    ],
    'Full Gym': [
      { name: 'Treadmill Incline Walk', description: 'Use a moderate incline and nasal breathing.', kind: 'time' },
      { name: 'Steady Bike', description: 'Keep RPM smooth rather than sprinting.', kind: 'time' },
      { name: 'Cable Pulldown Strip Set', description: 'Light load, higher time under tension.', kind: 'reps' },
      { name: 'Leg Press Pulses', description: 'Small range at the bottom for stamina.', kind: 'reps' },
      { name: 'Rowing Steady State', description: 'Hold a conversational pace.', kind: 'time' },
      { name: 'Farmer Carry Laps', description: 'Walk the length of the gym and turn cleanly.', kind: 'time' },
      { name: 'Banded Face Pulls', description: 'High reps to keep shoulders healthy.', kind: 'reps' },
      { name: 'Easy Cool-Down Cycle', description: 'Spin lightly to bring the heart rate down.', kind: 'time' },
    ],
  },
  'General Fitness': {
    'No Equipment': [
      { name: 'World’s Greatest Stretch', description: 'Open the hips and thoracic spine slowly.', kind: 'reps' },
      { name: 'Push-Ups', description: 'Choose a regular or knee variation that stays crisp.', kind: 'reps' },
      { name: 'Squats', description: 'Sit to a comfortable depth and stand with control.', kind: 'reps' },
      { name: 'Glute Bridge', description: 'Pause at the top to feel the glutes work.', kind: 'reps' },
      { name: 'Dead Bug', description: 'Move opposite arm and leg without arching.', kind: 'reps' },
      { name: 'Side Plank', description: 'Keep a long line from head to heels.', kind: 'time' },
      { name: 'Calf Raises', description: 'Full range, slow lowering.', kind: 'reps' },
      { name: 'Breathing Reset', description: 'Inhale through the nose, long exhale.', kind: 'time' },
    ],
    Dumbbells: [
      { name: 'Dumbbell Clean to Press', description: 'A simple total-body pattern with light bells.', kind: 'reps' },
      { name: 'Goblet Squat', description: 'Use a load you can control for every rep.', kind: 'reps' },
      { name: 'Supported Row', description: 'Hinge and row both bells toward the hips.', kind: 'reps' },
      { name: 'Half-Kneeling Press', description: 'Squeeze the glute of the kneeling leg.', kind: 'reps' },
      { name: 'Romanian Deadlift', description: 'Soft knees, long spine.', kind: 'reps' },
      { name: 'Lateral Raise', description: 'Stop at shoulder height, no swinging.', kind: 'reps' },
      { name: 'Weighted Carry', description: 'Walk with even steps and relaxed shoulders.', kind: 'time' },
      { name: 'Dead Bug with Reach', description: 'Optional light bell in the moving hand.', kind: 'reps' },
    ],
    'Full Gym': [
      { name: 'Machine Chest Press', description: 'Set the handles at mid-chest height.', kind: 'reps' },
      { name: 'Leg Press', description: 'Do not lock the knees at the top.', kind: 'reps' },
      { name: 'Seated Row', description: 'Start each rep from a long-arm position.', kind: 'reps' },
      { name: 'Lat Pulldown', description: 'Think elbows to back pockets.', kind: 'reps' },
      { name: 'Cable Pallof Press', description: 'Anti-rotation core work, hold briefly.', kind: 'reps' },
      { name: 'Hip Abduction Machine', description: 'Controlled tempo, no bouncing.', kind: 'reps' },
      { name: 'Treadmill Walk', description: 'Finish with an easy aerobic closer.', kind: 'time' },
      { name: 'Foam Roll Reset', description: 'Slow passes on quads and upper back.', kind: 'time' },
    ],
  },
};

function prescriptionFor(kind: ExerciseTemplate['kind'], difficulty: Difficulty): string {
  if (kind === 'time') {
    if (difficulty === 'Beginner') return '30 sec';
    if (difficulty === 'Intermediate') return '45 sec';
    return '60 sec';
  }

  if (difficulty === 'Beginner') return '2 sets × 8 reps';
  if (difficulty === 'Intermediate') return '3 sets × 10 reps';
  return '4 sets × 8 reps';
}

function exerciseCount(duration: WorkoutDuration): number {
  if (duration === 15) return 4;
  if (duration === 30) return 6;
  return 8;
}

export function generateMockWorkout(options: {
  goal: WorkoutGoal;
  durationMinutes: WorkoutDuration;
  difficulty: Difficulty;
  equipment: Equipment;
}): GeneratedWorkout {
  const { goal, durationMinutes, difficulty, equipment } = options;
  const count = exerciseCount(durationMinutes);
  const templates = library[goal][equipment].slice(0, count);

  const equipmentLabel = equipment === 'No Equipment' ? 'Bodyweight' : equipment;

  return {
    name: `${durationMinutes}-Min ${goal} Flow`,
    summary: `Mock plan for ${difficulty.toLowerCase()} ${goal.toLowerCase()} using ${equipmentLabel.toLowerCase()}. FitFlow will swap this for live AI later.`,
    durationMinutes,
    difficulty,
    goal,
    equipment,
    exercises: templates.map((template, index) => ({
      id: `${goal}-${equipment}-${index}`,
      name: template.name,
      description: template.description,
      prescription: prescriptionFor(template.kind, difficulty),
    })),
  };
}
