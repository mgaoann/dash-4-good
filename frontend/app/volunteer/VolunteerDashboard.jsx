import { View, Text, StyleSheet, ScrollView } from "react-native";
import Profile from "../../components/Profile";
import StatRow from "../../components/StatRow";
import ActiveDeliveries from "../../components/ActiveDeliveries";
import AvailableDeliveries from "../../components/Available Deliveries";

export default function VolunteerDashboard() {
  // Dummy data for now
  const available = 2;
  const inProgress = 1;
  const completed = 0;
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.title}>Volunteer Dashboard</Text>
            <Text style={styles.subTitle}>Find deliveries near you</Text>
          </View>
          <Profile />
        </View>
        <View style={styles.StateRowContainer}>
          <StatRow
            availableCount={available}
            inProgressCount={inProgress}
            completedCount={completed}
          />
        </View>
      </View>
      <View style={styles.divider} />
      <View style={styles.DeliverierContainer}>
        <ActiveDeliveries />
      </View>
      <View>
        <AvailableDeliveries />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    color: "#1F2937",
    fontSize: 18,
    fontWeight: "bold",
  },
  container: {
    marginTop: 20,
    paddingBottom: 10,
    flexGrow: 1,
    marginHorizontal: 20,
  },
  subTitle: {
    color: "#4b5768ff",
    fontSize: 13,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    marginRight: 20,
  },
  StateRowContainer: {
    alignItems: "center",
  },
  divider: {
    height: 1,
    backgroundColor: "#c1c2c6ff",
    marginVertical: 20,
    width: "100%",
  },
  DeliverierContainer: {
    paddingHorizontal: 20,
  },
});
