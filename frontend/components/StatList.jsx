import { View, StyleSheet } from "react-native";
import StatCard from "./StatCard";

export default function statList() {
  return (
    <View style={styles.container}>
      <StatCard title="5,000+" description="Meals Delivered" />
      <StatCard title="200+" description="Active Volunteers" />
      <StatCard title="50+" description="Partner Organizations" />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingVertical: 16,

    gap: 16,
  },
});
