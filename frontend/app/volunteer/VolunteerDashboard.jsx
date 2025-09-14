import { View, Text, StyleSheet, ScrollView } from "react-native";
import Profile from "../../components/Profile";

export default function VolunteerDashboard() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.title}>Volunteer Dashboard</Text>
          <Text style={styles.subTitle}>Find deliveries near you</Text>
        </View>
        <Profile />
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
    marginTop: 45,
    paddingBottom: 70,
    flexGrow: 1,
    marginLeft: 45,
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
});
