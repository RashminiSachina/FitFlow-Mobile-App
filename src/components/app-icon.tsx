import { SymbolView, type SFSymbol, type AndroidSymbol } from 'expo-symbols';

type AppIconName = {
  ios: SFSymbol;
  android: AndroidSymbol;
  web: AndroidSymbol;
};

type AppIconProps = {
  name: AppIconName;
  size?: number;
  color: string;
};

export function AppIcon({ name, size = 20, color }: AppIconProps) {
  return <SymbolView name={name} size={size} tintColor={color} />;
}

export const HomeIcons = {
  sparkles: { ios: 'sparkles', android: 'auto_awesome', web: 'auto_awesome' },
  workout: { ios: 'figure.strengthtraining.traditional', android: 'fitness_center', web: 'fitness_center' },
  clock: { ios: 'clock', android: 'schedule', web: 'schedule' },
  signal: { ios: 'chart.bar.fill', android: 'equalizer', web: 'equalizer' },
  play: { ios: 'play.fill', android: 'play_arrow', web: 'play_arrow' },
  flame: { ios: 'flame.fill', android: 'local_fire_department', web: 'local_fire_department' },
  steps: { ios: 'figure.walk', android: 'directions_walk', web: 'directions_walk' },
  streak: { ios: 'bolt.fill', android: 'bolt', web: 'bolt' },
  nutrition: { ios: 'fork.knife', android: 'restaurant', web: 'restaurant' },
  social: { ios: 'person.2.fill', android: 'groups', web: 'groups' },
  progress: { ios: 'chart.line.uptrend.xyaxis', android: 'monitoring', web: 'monitoring' },
  back: { ios: 'chevron.left', android: 'arrow_back', web: 'arrow_back' },
  dumbbell: { ios: 'dumbbell', android: 'fitness_center', web: 'fitness_center' },
} as const satisfies Record<string, AppIconName>;
