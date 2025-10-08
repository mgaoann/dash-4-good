import { StyleSheet, Text, View } from "react-native";
import { COLORS, SHADOWS } from "../styles/global";
import { LinearGradient } from "expo-linear-gradient";
import { appGradient } from "../styles/global";

export default function StatRow({
  availableCount,
  inProgressCount,
  completedCount,
  labels = ["Available", "In Progress", "Completed"],
}) {
  return (
    <View style={styles.container}>
      <LinearGradient
        style={styles.card}
        colors={appGradient.colors}
        start={appGradient.start}
        end={appGradient.end}
      >
        <Text style={styles.countText}>{availableCount}</Text>
        <Text style={styles.labelText}>{labels[0]}</Text>
      </LinearGradient>
      <View style={[styles.card, { backgroundColor: "#2a5cf4ff" }]}>
        <Text style={styles.countText}>{inProgressCount}</Text>
        <Text style={styles.labelText}>{labels[1]}</Text>
      </View>
      <View style={[styles.card, { backgroundColor: "#777a82ff" }]}>
        <Text style={styles.countText}>{completedCount}</Text>
        <Text style={styles.labelText}>{labels[2]}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    gap: 16,
  },
  card: {
    flexGrow: 1,
    flex: 1,
    borderRadius: 12,
    borderWidth: 0,
    ...SHADOWS.card,

    height: 70,
    justifyContent: "center",
    paddingHorizontal: 3,
  },
  countText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
    textAlign: "center",
  },
  labelText: {
    color: COLORS.white,
    fontSize: 12,
    textAlign: "center",
  },
});
