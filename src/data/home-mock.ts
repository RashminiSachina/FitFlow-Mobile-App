export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export type QuickAccessKey = 'workout' | 'nutrition' | 'social' | 'progress';

export type DailyFlowRecommendation = {
  title: string;
  summary: string;
  durationMinutes: number;
  difficulty: Difficulty;
  focus: string;
};

export type DailyProgressItem = {
  id: string;
  label: string;
  current: number;
  goal: number;
  unit: string;
};

export type ActivityStat = {
  id: string;
  label: string;
  value: string;
  hint: string;
};

export type QuickAccessItem = {
  key: QuickAccessKey;
  title: string;
  subtitle: string;
};

export const mockUser = {
  firstName: 'Alex',
  lastName: 'Rivera',
  initials: 'AR',
};

export const mockDailyFlow: DailyFlowRecommendation = {
  title: 'Upper Body Strength Flow',
  summary: 'AI picked this session from your recovery score and last three workouts.',
  durationMinutes: 32,
  difficulty: 'Intermediate',
  focus: 'Push strength + mobility',
};

export const mockDailyProgress: DailyProgressItem[] = [
  { id: 'workouts', label: 'Workouts this week', current: 3, goal: 5, unit: 'sessions' },
  { id: 'minutes', label: 'Active minutes today', current: 42, goal: 60, unit: 'min' },
];

export const mockActivityStats: ActivityStat[] = [
  { id: 'calories', label: 'Calories', value: '2,450', hint: 'est. burned this week' },
  { id: 'steps', label: 'Steps', value: '8,320', hint: 'today' },
  { id: 'streak', label: 'Streak', value: '12 days', hint: 'current' },
];

export const mockQuickAccess: QuickAccessItem[] = [
  { key: 'workout', title: 'Workout', subtitle: 'Plans & builder' },
  { key: 'nutrition', title: 'Nutrition', subtitle: 'Meals & macros' },
  { key: 'social', title: 'Social', subtitle: 'Feed & challenges' },
  { key: 'progress', title: 'Progress', subtitle: 'Trends & goals' },
];
