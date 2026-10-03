import { useState, type ReactNode } from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppIcon, HomeIcons } from '@/components/app-icon';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import {
  equipmentOptions,
  generateMockWorkout,
  workoutDifficulties,
  workoutDurations,
  workoutGoals,
  type Equipment,
  type GeneratedWorkout,
  type WorkoutDuration,
  type WorkoutGoal,
} from '@/data/ai-workout-mock';
import type { Difficulty } from '@/data/home-mock';
import { useTheme } from '@/hooks/use-theme';

const MIN_TOUCH = 44;

export function AiWorkoutScreen() {
  const theme = useTheme();
  const safeAreaInsets = useSafeAreaInsets();

  const [goal, setGoal] = useState<WorkoutGoal>('Strength');
  const [duration, setDuration] = useState<WorkoutDuration>(30);
  const [difficulty, setDifficulty] = useState<Difficulty>('Intermediate');
  const [equipment, setEquipment] = useState<Equipment>('Dumbbells');
  const [plan, setPlan] = useState<GeneratedWorkout | null>(null);
  const [sessionStarted, setSessionStarted] = useState(false);

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

  function handleGenerate() {
    setSessionStarted(false);
    setPlan(
      generateMockWorkout({
        goal,
        durationMinutes: duration,
        difficulty,
        equipment,
      }),
    );
  }

  function goBack() {
    if (router.canGoBack()) {
      router.back();
      return;
    }

    router.replace('/');
  }

  return (
    <ScrollView
      style={[styles.scrollView, { backgroundColor: theme.background }]}
      contentInset={insets}
      contentContainerStyle={[styles.contentContainer, contentPlatformStyle]}>
      <ThemedView style={styles.container}>
        <View style={styles.header}>
          <Pressable
            onPress={goBack}
            accessibilityRole="button"
            accessibilityLabel="Back to Home"
            style={({ pressed }) => [
              styles.backButton,
              { backgroundColor: theme.backgroundElement, opacity: pressed ? 0.85 : 1 },
            ]}>
            <AppIcon name={HomeIcons.back} color={theme.text} size={18} />
          </Pressable>
          <View style={styles.headerCopy}>
            <ThemedText style={styles.pageTitle} accessibilityRole="header">
              Your AI Workout
            </ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              Choose a goal, time, and equipment. FitFlow builds a mock personalized plan for this
              lab — live AI comes later.
            </ThemedText>
          </View>
        </View>

        <OptionSection title="Goal" subtitle="What should this session emphasize?">
          {workoutGoals.map((option) => (
            <ChoiceChip
              key={option}
              label={option}
              selected={goal === option}
              onPress={() => setGoal(option)}
            />
          ))}
        </OptionSection>

        <OptionSection title="Duration" subtitle="How long do you have today?">
          {workoutDurations.map((option) => (
            <ChoiceChip
              key={option}
              label={`${option} min`}
              selected={duration === option}
              onPress={() => setDuration(option)}
            />
          ))}
        </OptionSection>

        <OptionSection title="Difficulty" subtitle="Match the session to how you feel">
          {workoutDifficulties.map((option) => (
            <ChoiceChip
              key={option}
              label={option}
              selected={difficulty === option}
              onPress={() => setDifficulty(option)}
            />
          ))}
        </OptionSection>

        <OptionSection title="Equipment" subtitle="Use what you have nearby">
          {equipmentOptions.map((option) => (
            <ChoiceChip
              key={option}
              label={option}
              selected={equipment === option}
              onPress={() => setEquipment(option)}
            />
          ))}
        </OptionSection>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Generate workout"
          onPress={handleGenerate}
          style={({ pressed }) => [
            styles.primaryButton,
            { backgroundColor: theme.primary, opacity: pressed ? 0.85 : 1 },
          ]}>
          <AppIcon name={HomeIcons.sparkles} color={theme.onPrimary} size={18} />
          <ThemedText type="smallBold" style={{ color: theme.onPrimary }}>
            Generate Workout
          </ThemedText>
        </Pressable>

        {plan ? (
          <GeneratedPlanCard
            plan={plan}
            sessionStarted={sessionStarted}
            onStart={() => setSessionStarted(true)}
          />
        ) : (
          <ThemedView type="backgroundElement" style={styles.emptyCard}>
            <View style={[styles.iconChip, { backgroundColor: theme.primaryMuted }]}>
              <AppIcon name={HomeIcons.sparkles} color={theme.primary} />
            </View>
            <ThemedText type="smallBold">No plan yet</ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              Select your preferences, then tap Generate Workout to see a sample session.
            </ThemedText>
          </ThemedView>
        )}
      </ThemedView>
    </ScrollView>
  );
}

function OptionSection({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <View style={styles.section}>
      <View style={styles.sectionTitle}>
        <ThemedText type="smallBold" accessibilityRole="header">
          {title}
        </ThemedText>
        <ThemedText type="small" themeColor="textSecondary">
          {subtitle}
        </ThemedText>
      </View>
      <View style={styles.chipRow}>{children}</View>
    </View>
  );
}

function ChoiceChip({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
}) {
  const theme = useTheme();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      accessibilityLabel={label}
      onPress={onPress}
      style={({ pressed }) => [
        styles.chip,
        {
          backgroundColor: selected ? theme.primary : theme.backgroundElement,
          minHeight: MIN_TOUCH,
          opacity: pressed ? 0.85 : 1,
        },
      ]}>
      <ThemedText type="smallBold" style={{ color: selected ? theme.onPrimary : theme.text }}>
        {label}
      </ThemedText>
    </Pressable>
  );
}

function GeneratedPlanCard({
  plan,
  sessionStarted,
  onStart,
}: {
  plan: GeneratedWorkout;
  sessionStarted: boolean;
  onStart: () => void;
}) {
  const theme = useTheme();

  return (
    <ThemedView
      type="backgroundElement"
      style={styles.card}
      accessibilityLabel={`Generated workout: ${plan.name}`}>
      <View style={styles.cardHeadingRow}>
        <View style={[styles.iconChip, { backgroundColor: theme.primaryMuted }]}>
          <AppIcon name={HomeIcons.workout} color={theme.primary} />
        </View>
        <View style={styles.cardHeadingText}>
          <ThemedText type="smallBold" themeColor="primary">
            Personalized plan
          </ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            {plan.goal} · {plan.equipment}
          </ThemedText>
        </View>
      </View>

      <ThemedText style={styles.workoutTitle}>{plan.name}</ThemedText>
      <ThemedText type="small" themeColor="textSecondary">
        {plan.summary}
      </ThemedText>

      <View style={styles.metaRow}>
        <MetaChip icon="clock" label={`${plan.durationMinutes} min`} />
        <MetaChip icon="signal" label={plan.difficulty} />
        <MetaChip icon="dumbbell" label={plan.equipment} />
      </View>

      {plan.exercises.map((exercise, index) => (
        <View
          key={exercise.id}
          style={[
            styles.exerciseRow,
            index < plan.exercises.length - 1 && styles.exerciseDivider,
          ]}>
          <View style={[styles.exerciseIndex, { backgroundColor: theme.primaryMuted }]}>
            <ThemedText type="smallBold" themeColor="primary">
              {index + 1}
            </ThemedText>
          </View>
          <View style={styles.exerciseCopy}>
            <View style={styles.exerciseHeading}>
              <ThemedText type="smallBold" style={styles.exerciseName}>
                {exercise.name}
              </ThemedText>
              <ThemedText type="small" themeColor="primary">
                {exercise.prescription}
              </ThemedText>
            </View>
            <ThemedText type="small" themeColor="textSecondary">
              {exercise.description}
            </ThemedText>
          </View>
        </View>
      ))}

      {sessionStarted ? (
        <ThemedView type="primaryMuted" style={styles.startedBanner}>
          <ThemedText type="smallBold">Session started (demo)</ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            A live timer and logging will be added in a later FitFlow lab.
          </ThemedText>
        </ThemedView>
      ) : (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Start workout: ${plan.name}`}
          onPress={onStart}
          style={({ pressed }) => [
            styles.primaryButton,
            { backgroundColor: theme.primary, opacity: pressed ? 0.85 : 1 },
          ]}>
          <AppIcon name={HomeIcons.play} color={theme.onPrimary} size={18} />
          <ThemedText type="smallBold" style={{ color: theme.onPrimary }}>
            Start Workout
          </ThemedText>
        </Pressable>
      )}
    </ThemedView>
  );
}

function MetaChip({
  icon,
  label,
}: {
  icon: 'clock' | 'signal' | 'dumbbell';
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
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.two,
  },
  backButton: {
    width: MIN_TOUCH,
    height: MIN_TOUCH,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerCopy: {
    flex: 1,
    gap: Spacing.one,
  },
  pageTitle: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: 700,
  },
  section: {
    gap: Spacing.two,
  },
  sectionTitle: {
    gap: 2,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
  chip: {
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    borderRadius: 999,
    justifyContent: 'center',
  },
  primaryButton: {
    minHeight: MIN_TOUCH,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.two,
  },
  emptyCard: {
    borderRadius: 20,
    padding: Spacing.three,
    gap: Spacing.two,
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
  exerciseRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.two,
  },
  exerciseDivider: {
    paddingBottom: Spacing.three,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(92, 107, 104, 0.25)',
  },
  exerciseIndex: {
    width: 28,
    height: 28,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  exerciseCopy: {
    flex: 1,
    gap: 2,
  },
  exerciseHeading: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: Spacing.two,
  },
  exerciseName: {
    flexShrink: 1,
  },
  startedBanner: {
    borderRadius: 14,
    padding: Spacing.three,
    gap: Spacing.one,
  },
});
