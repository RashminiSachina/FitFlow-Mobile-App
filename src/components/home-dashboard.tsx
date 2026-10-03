import { Link } from 'expo-router';
import { Platform, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppIcon, HomeIcons } from '@/components/app-icon';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import {
  mockActivityStats,
  mockDailyFlow,
  mockDailyProgress,
  mockQuickAccess,
  mockUser,
  type ActivityStat,
  type DailyProgressItem,
  type QuickAccessKey,
} from '@/data/home-mock';
import { useTheme } from '@/hooks/use-theme';
import { getTimeOfDayGreeting } from '@/utils/greeting';

const MIN_TOUCH = 44;

export function HomeDashboard() {
  const theme = useTheme();
  const safeAreaInsets = useSafeAreaInsets();
  const greeting = getTimeOfDayGreeting();

  const insets = {
    ...safeAreaInsets,
    bottom: safeAreaInsets.bottom + BottomTabInset + Spacing.three,
  };

  const contentPlatformStyle = Platform.select({
    android: {
      paddingTop: insets.top,
      paddingLeft: insets.left,
      paddingRight: insets.right,
      paddingBottom: insets.bottom,
    },
    ios: {
      paddingBottom: Spacing.three,
    },
    web: {
      paddingTop: Spacing.six,
      paddingBottom: Spacing.four,
    },
  });

  return (
    <ScrollView
      style={[styles.scrollView, { backgroundColor: theme.background }]}
      contentInset={insets}
      contentContainerStyle={[styles.contentContainer, contentPlatformStyle]}>
      <ThemedView style={styles.container}>
        <Header greeting={greeting} />
        <DailyFlowCard />
        <DailyProgressSection />
        <ActivityStatsSection />
        <QuickAccessSection />
      </ThemedView>
    </ScrollView>
  );
}

function Header({ greeting }: { greeting: string }) {
  const theme = useTheme();

  return (
    <View style={styles.header}>
      <View style={styles.headerRow}>
        <View style={styles.brandBlock}>
          <View style={[styles.logoMark, { backgroundColor: theme.primary }]}>
            <ThemedText style={[styles.logoMarkText, { color: theme.onPrimary }]}>FF</ThemedText>
          </View>
          <View>
            <ThemedText type="smallBold" accessibilityRole="header">
              FitFlow
            </ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              Your daily training hub
            </ThemedText>
          </View>
        </View>

        <View
          accessible
          accessibilityRole="image"
          accessibilityLabel={`Profile photo placeholder for ${mockUser.firstName} ${mockUser.lastName}`}
          style={[styles.avatar, { backgroundColor: theme.primaryMuted }]}>
          <ThemedText type="smallBold" themeColor="primary">
            {mockUser.initials}
          </ThemedText>
        </View>
      </View>

      <View style={styles.greetingBlock}>
        <ThemedText type="small" themeColor="textSecondary">
          {greeting}
        </ThemedText>
        <ThemedText style={styles.greetingName} accessibilityRole="header">
          {mockUser.firstName}
        </ThemedText>
      </View>
    </View>
  );
}

function DailyFlowCard() {
  const theme = useTheme();
  const workout = mockDailyFlow;

  return (
    <ThemedView
      type="backgroundElement"
      style={styles.card}
      accessibilityLabel={`Daily Flow recommendation: ${workout.title}`}>
      <View style={styles.cardHeadingRow}>
        <View style={[styles.iconChip, { backgroundColor: theme.primaryMuted }]}>
          <AppIcon name={HomeIcons.sparkles} color={theme.primary} />
        </View>
        <View style={styles.cardHeadingText}>
          <ThemedText type="smallBold" themeColor="primary">
            Daily Flow
          </ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            AI-powered recommendation
          </ThemedText>
        </View>
      </View>

      <ThemedText style={styles.workoutTitle}>{workout.title}</ThemedText>
      <ThemedText type="small" themeColor="textSecondary" style={styles.workoutSummary}>
        {workout.summary}
      </ThemedText>

      <View style={styles.metaRow}>
        <MetaChip icon="clock" label={`${workout.durationMinutes} min`} />
        <MetaChip icon="signal" label={workout.difficulty} />
        <MetaChip icon="workout" label={workout.focus} />
      </View>

      <Link href="/ai-workout" asChild>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Start workout: ${workout.title}`}
          style={({ pressed }) => [
            styles.primaryButton,
            { backgroundColor: theme.primary, opacity: pressed ? 0.85 : 1 },
          ]}>
          <AppIcon name={HomeIcons.play} color={theme.onPrimary} size={18} />
          <ThemedText type="smallBold" style={{ color: theme.onPrimary }}>
            Start Workout
          </ThemedText>
        </Pressable>
      </Link>
    </ThemedView>
  );
}

function MetaChip({
  icon,
  label,
}: {
  icon: 'clock' | 'signal' | 'workout';
  label: string;
}) {
  const theme = useTheme();

  return (
    <View style={[styles.metaChip, { backgroundColor: theme.background }]}>
      <AppIcon name={HomeIcons[icon]} size={14} color={theme.textSecondary} />
      <ThemedText type="small" themeColor="textSecondary">
        {label}
      </ThemedText>
    </View>
  );
}

function DailyProgressSection() {
  return (
    <View style={styles.section}>
      <SectionTitle title="Daily progress" subtitle="Keep a steady training rhythm" />
      <ThemedView type="backgroundElement" style={styles.card}>
        {mockDailyProgress.map((item, index) => (
          <ProgressRow key={item.id} item={item} isLast={index === mockDailyProgress.length - 1} />
        ))}
      </ThemedView>
    </View>
  );
}

function ProgressRow({ item, isLast }: { item: DailyProgressItem; isLast: boolean }) {
  const theme = useTheme();
  const percent = Math.min(100, Math.round((item.current / item.goal) * 100));

  return (
    <View
      style={[styles.progressRow, !isLast && styles.progressRowDivider]}
      accessibilityLabel={`${item.label}: ${item.current} of ${item.goal} ${item.unit}, ${percent} percent`}>
      <View style={styles.progressCopy}>
        <ThemedText type="smallBold">{item.label}</ThemedText>
        <ThemedText type="small" themeColor="textSecondary">
          {item.current}/{item.goal} {item.unit}
        </ThemedText>
      </View>
      <View style={[styles.progressTrack, { backgroundColor: theme.primaryMuted }]}>
        <View
          style={[
            styles.progressFill,
            { width: `${percent}%`, backgroundColor: theme.primary },
          ]}
        />
      </View>
    </View>
  );
}

function ActivityStatsSection() {
  return (
    <View style={styles.section}>
      <SectionTitle title="Activity snapshot" subtitle="This week at a glance" />
      <View style={styles.statsGrid}>
        {mockActivityStats.map((stat) => (
          <StatCard key={stat.id} stat={stat} />
        ))}
      </View>
    </View>
  );
}

function StatCard({ stat }: { stat: ActivityStat }) {
  const theme = useTheme();
  const icon =
    stat.id === 'calories' ? HomeIcons.flame : stat.id === 'steps' ? HomeIcons.steps : HomeIcons.streak;

  return (
    <ThemedView
      type="backgroundElement"
      style={styles.statCard}
      accessibilityLabel={`${stat.label} ${stat.value}, ${stat.hint}`}>
      <View style={[styles.iconChip, { backgroundColor: theme.primaryMuted }]}>
        <AppIcon name={icon} color={theme.primary} />
      </View>
      <ThemedText type="small" themeColor="textSecondary">
        {stat.label}
      </ThemedText>
      <ThemedText style={styles.statValue}>{stat.value}</ThemedText>
      <ThemedText type="small" themeColor="textSecondary">
        {stat.hint}
      </ThemedText>
    </ThemedView>
  );
}

function QuickAccessSection() {
  return (
    <View style={styles.section}>
      <SectionTitle title="Quick access" subtitle="Main FitFlow features" />
      <View style={styles.quickGrid}>
        {mockQuickAccess.map((item) => (
          <QuickAccessCard key={item.key} featureKey={item.key} title={item.title} subtitle={item.subtitle} />
        ))}
      </View>
    </View>
  );
}

function QuickAccessCard({
  featureKey,
  title,
  subtitle,
}: {
  featureKey: QuickAccessKey;
  title: string;
  subtitle: string;
}) {
  const theme = useTheme();
  const icon = {
    workout: HomeIcons.workout,
    nutrition: HomeIcons.nutrition,
    social: HomeIcons.social,
    progress: HomeIcons.progress,
  }[featureKey];

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${title}. ${subtitle}. Coming soon.`}
      style={({ pressed }) => [{ flex: 1, minWidth: '47%', opacity: pressed ? 0.85 : 1 }]}>
      <ThemedView type="backgroundElement" style={styles.quickCard}>
        <View style={[styles.iconChip, { backgroundColor: theme.primaryMuted }]}>
          <AppIcon name={icon} color={theme.primary} />
        </View>
        <ThemedText type="smallBold">{title}</ThemedText>
        <ThemedText type="small" themeColor="textSecondary">
          {subtitle}
        </ThemedText>
      </ThemedView>
    </Pressable>
  );
}

function SectionTitle({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <View style={styles.sectionTitle}>
      <ThemedText type="smallBold" accessibilityRole="header">
        {title}
      </ThemedText>
      <ThemedText type="small" themeColor="textSecondary">
        {subtitle}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  container: {
    maxWidth: MaxContentWidth,
    flexGrow: 1,
    paddingHorizontal: Spacing.four,
    gap: Spacing.four,
  },
  header: {
    gap: Spacing.three,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: MIN_TOUCH,
  },
  brandBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  logoMark: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoMarkText: {
    fontSize: 13,
    fontWeight: 700,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  greetingBlock: {
    gap: Spacing.half,
  },
  greetingName: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: 700,
  },
  card: {
    borderRadius: 20,
    padding: Spacing.three,
    gap: Spacing.three,
  },
  cardHeadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  cardHeadingText: {
    flex: 1,
    gap: 2,
  },
  iconChip: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  workoutTitle: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: 700,
  },
  workoutSummary: {
    marginTop: -Spacing.one,
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
  metaChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.one,
    borderRadius: 999,
    minHeight: 32,
  },
  primaryButton: {
    minHeight: MIN_TOUCH,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.two,
  },
  section: {
    gap: Spacing.two,
  },
  sectionTitle: {
    gap: 2,
  },
  progressRow: {
    gap: Spacing.two,
  },
  progressRowDivider: {
    marginBottom: Spacing.three,
    paddingBottom: Spacing.three,
  },
  progressCopy: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: Spacing.two,
  },
  progressTrack: {
    height: 8,
    borderRadius: 999,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 999,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
  statCard: {
    flexGrow: 1,
    flexBasis: 96,
    minHeight: 120,
    borderRadius: 16,
    padding: Spacing.three,
    gap: Spacing.one,
  },
  statValue: {
    fontSize: 20,
    lineHeight: 26,
    fontWeight: 700,
  },
  quickGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
  quickCard: {
    minHeight: 108,
    borderRadius: 16,
    padding: Spacing.three,
    gap: Spacing.one,
  },
});
