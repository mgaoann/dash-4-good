import { View, Text, StyleSheet, ScrollView } from "react-native";
import Profile from "../../components/Profile";
import StatRow from "../../components/StatRow";

import { useState } from "react";
import { activeDeliveries, availableDeliveries } from "../../data/dummyDeliveries";
import { orgCompletedDeliveries } from "../../data/dummyOrganization";
import ActiveDeliveries from "../../components/ActiveDeliveries";
import AvailableDeliveries from "../../components/Available Deliveries";
// TODO (Backend): Replace dummy state with live data from Firestore
//  - Fetch volunteer stats (available, inProgress, completed) from DB
//  - Update in real-time when deliveries are claimed or completed

// TODO (Notifications):
//  - Ensure push notifications update these counts when status changes
//  - Example: notify volunteer when a new delivery request nearby is posted

export default function VolunteerDashboard() {
  // Dummy data for now (derived from data files)
  const [available, setAvailable] = useState(availableDeliveries.length);
  const [inProgress, setInProgress] = useState(activeDeliveries.length);
  // completed deliveries for this volunteer set to number of org completed items as an example
  const [completed, setCompleted] = useState(orgCompletedDeliveries.length);
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
