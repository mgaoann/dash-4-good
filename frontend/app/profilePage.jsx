import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import {
  User,
  Mail,
  Phone,
  MapPin,
  LogOut,
  Award,
  TrendingUp,
} from "lucide-react-native";
import { useRouter } from "expo-router";

export default function ProfilePage({ userRole = "volunteer" }) {
  const router = useRouter();
  // TODO: Auth -> Replace this with Firebase Auth signOut()
  // After logout, redirect user back to Welcome/Login screen
  const onLogout = () => {
    router.push("/");
  };
  // TODO (Backend):
  //  - Replace dummy stats with Firestore queries
  //  - Organization: fetch total requests, completed deliveries, meals delivered
  //  - Volunteer: fetch deliveries completed, meals delivered, hours volunteered
  //  - Use real user profile data (name, email, phone, location)

  // TODO (Notifications):
  //  - Trigger achievement unlocks & show toast/push when milestones hit
  //  - Example: “Helping Hand” after 5 deliveries

  {
    /* Dummy data */
  }
  const organizationStats = {
    //replace with Firestore query
    totalRequests: 15,
    completedDeliveries: 12,
    mealsDelivered: 480,
  };
  {
    /* Dummy data */
  }
  const volunteerStats = {
    //replace with Firestore query
    deliveriesCompleted: 8,
    mealsDelivered: 320,
    hoursVolunteered: 24,
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerText}>
        <Text>Manage your account settings</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <User size={32} color="#fff" />
          </View>
          <View>
            <Text style={styles.name}>
              {userRole === "organization"
                ? "Green Valley Grocers"
                : "Sarah Johnson"}
            </Text>
            <Text style={styles.role}>{userRole}</Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <Mail size={18} color="gray" />
          <Text style={styles.infoText}>
            {userRole === "organization"
              ? "contact@greenvalley.com"
              : "sarah.j@email.com"}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Phone size={18} color="gray" />
          <Text style={styles.infoText}>(555) 123-4567</Text>
        </View>
        <View style={styles.infoRow}>
          <MapPin size={18} color="gray" />
          <Text style={styles.infoText}>Downtown District, City</Text>
        </View>
      </View>

      {/* Stats */}
      <View style={styles.card}>
        <View style={styles.sectionHeader}>
          <TrendingUp size={18} color="black" />
          <Text style={styles.sectionTitle}>Your Impact</Text>
        </View>

        <View style={styles.statsGrid}>
          {userRole === "organization" ? (
            <>
              <Stat
                label="Total Requests"
                value={organizationStats.totalRequests}
              />
              <Stat
                label="Completed"
                value={organizationStats.completedDeliveries}
              />
              <Stat
                label="Meals Delivered"
                value={organizationStats.mealsDelivered}
              />
            </>
          ) : (
            <>
              <Stat
                label="Deliveries"
                value={volunteerStats.deliveriesCompleted}
              />
              <Stat
                label="Meals Delivered"
                value={volunteerStats.mealsDelivered}
              />
              <Stat label="Hours" value={volunteerStats.hoursVolunteered} />
            </>
          )}
        </View>
      </View>

      {/* Achievements */}
      <View style={styles.card}>
        <View style={styles.sectionHeader}>
          <Award size={18} color="black" />
          <Text style={styles.sectionTitle}>Achievements</Text>
        </View>

        <Achievement
          color="#22c55e"
          title="First Delivery"
          subtitle="Completed your first delivery"
        />
        {userRole === "volunteer" && (
          <Achievement
            color="#eab308"
            title="Helping Hand"
            subtitle="Completed 5 deliveries"
          />
        )}
        <Achievement
          color="#3b82f6"
          title="Community Hero"
          subtitle={
            userRole === "organization"
              ? "Created 10+ requests"
              : "Delivered 200+ meals"
          }
        />
      </View>

      {/* Logout */}
      <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
        <LogOut size={18} color="#fff" />
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
{
  /* Components */
}

function Stat({ label, value }) {
  return (
    <View style={styles.statItem}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function Achievement({ color, title, subtitle }) {
  return (
    <View style={[styles.achievement, { backgroundColor: color + "20" }]}>
      <View style={[styles.achievementIcon, { backgroundColor: color }]}>
        <Award size={18} color="#fff" />
      </View>
      <View>
        <Text style={styles.achievementTitle}>{title}</Text>
        <Text style={styles.achievementSubtitle}>{subtitle}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 20,
  },
  headerText: {
    marginVertical: 10,
  },
  card: {
    backgroundColor: "#fff",

    marginVertical: 8,
    padding: 16,
    borderRadius: 12,
    elevation: 2,
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#22c55e",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  name: { fontSize: 18, fontWeight: "600" },
  role: { color: "gray", textTransform: "capitalize" },
  infoRow: { flexDirection: "row", alignItems: "center", marginVertical: 4 },
  infoText: { marginLeft: 8, color: "gray" },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  sectionTitle: { fontSize: 16, fontWeight: "600", marginLeft: 6 },
  statsGrid: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 8,
  },
  statItem: { alignItems: "center" },
  statValue: { fontSize: 20, fontWeight: "bold", color: "#22c55e" },
  statLabel: { fontSize: 12, color: "gray" },
  achievement: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 10,
    marginVertical: 4,
  },
  achievementIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  achievementTitle: { fontWeight: "600" },
  achievementSubtitle: { fontSize: 12, color: "gray" },
  settingButton: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginVertical: 4,
  },

  logoutButton: {
    flexDirection: "row",
    backgroundColor: "#dc2626",
    margin: 16,
    padding: 14,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  logoutText: { color: "#fff", fontWeight: "bold", marginLeft: 6 },
});
