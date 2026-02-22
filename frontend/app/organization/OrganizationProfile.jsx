import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import {
  Building2,
  Mail,
  Phone,
  MapPin,
  LogOut,
  Award,
  TrendingUp,
  Users,
  Package,
  CheckCircle,
  Edit,
} from "lucide-react-native";
import { useRouter } from "expo-router";
import { useState, useEffect } from "react";
import { COLORS } from "../../styles/global";

// Firebase imports
import { auth, db } from "../../firebase";
import { signOut } from "firebase/auth";
import { doc, onSnapshot, collection, query, where } from "firebase/firestore";

export default function OrganizationProfile() {
  const router = useRouter();

  const [org, setOrg] = useState(null);
  const [completedDeliveries, setCompletedDeliveries] = useState([]);
  const [stats, setStats] = useState({
    totalRequests: 0,
    completedCount: 0,
    mealsDelivered: 0,
    volunteersHelped: 0,
  });

  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  // Listen to Firestore for Profile Data and Request Stats
  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    // 1. Live listener for the Organization's profile data
    const unsubUser = onSnapshot(
      doc(db, "users", user.uid),
      (docSnap) => {
        if (docSnap.exists()) {
          setOrg(docSnap.data());
        }
      },
      (error) => {
        setErrorMessage("Failed to load profile.");
      },
    );

    // 2. Live listener for the Organization's requests to calculate stats
    const q = query(
      collection(db, "requests"),
      where("organizationId", "==", user.uid),
    );
    const unsubReqs = onSnapshot(q, (snapshot) => {
      const reqs = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));

      const completed = reqs.filter((r) => r.status === "completed");

      // Calculate unique volunteers helped
      const uniqueVolunteers = new Set(
        completed.map((r) => r.volunteerId).filter(Boolean),
      ).size;

      setStats({
        totalRequests: reqs.length,
        completedCount: completed.length,
        mealsDelivered: completed.length * 25, // Assuming average of 25 meals per delivery for gamification
        volunteersHelped: uniqueVolunteers,
      });

      // Sort completed deliveries by most recent
      const sortedCompleted = completed.sort(
        (a, b) => new Date(b.completedAt || 0) - new Date(a.completedAt || 0),
      );
      setCompletedDeliveries(sortedCompleted);

      setLoading(false);
    });

    return () => {
      unsubUser();
      unsubReqs();
    };
  }, []);

  const onLogout = async () => {
    try {
      await signOut(auth);
      router.replace("/"); // Go back to Welcome screen
    } catch (error) {
      setErrorMessage("Error logging out: " + error.message);
    }
  };

  if (loading || !org) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={{ marginTop: 10, color: "gray" }}>Loading Profile...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 30 }}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Organization Profile</Text>
        <Text style={styles.headerSubtitle}>Manage your account</Text>
      </View>

      {/* Error Banner */}
      {errorMessage !== "" && (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>{errorMessage}</Text>
        </View>
      )}

      {/* Profile Info Card */}
      <View style={styles.card}>
        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <Building2 size={32} color="#fff" />
          </View>
          <View>
            <Text style={styles.name}>{org.name}</Text>
            <Text style={styles.role}>Organization</Text>
          </View>
        </View>

        {/* About */}
        <View
          style={[
            styles.infoRow,
            { alignItems: "flex-start", marginBottom: 8 },
          ]}
        >
          <Text
            style={[
              styles.infoText,
              { marginLeft: 0, color: "#374151", fontWeight: "600" },
            ]}
          >
            About
          </Text>
        </View>
        <Text
          style={[
            styles.infoText,
            { color: "#374151", marginBottom: 16, marginLeft: 0 },
          ]}
        >
          {org.description || "No description provided."}
        </Text>

        {/* Contact details */}
        <View style={styles.infoRow}>
          <Mail size={18} color="gray" />
          <Text style={styles.infoText}>{org.email}</Text>
        </View>
        <View style={styles.infoRow}>
          <Phone size={18} color="gray" />
          <Text style={styles.infoText}>
            {org.phone || "No phone provided"}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <MapPin size={18} color="gray" />
          <Text style={styles.infoText}>
            {org.website || "No website provided"}
          </Text>
        </View>

        {/* Primary Edit Profile button */}
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => router.push("/organization/EditOrganizationInfo")}
        >
          <Edit size={16} color="#fff" />
          <Text style={[styles.editButtonText, { marginLeft: 8 }]}>
            Edit Profile
          </Text>
        </TouchableOpacity>
      </View>

      {/* Stats */}
      <View style={styles.card}>
        <View style={styles.sectionHeader}>
          <TrendingUp size={18} color="black" />
          <Text style={styles.sectionTitle}>Your Impact</Text>
        </View>

        <View style={styles.statsGrid}>
          <Stat
            label="Total Requests"
            value={stats.totalRequests}
            icon={<Package size={16} color="#4CAF50" />}
          />
          <Stat
            label="Completed"
            value={stats.completedCount}
            icon={<CheckCircle size={16} color="#4CAF50" />}
          />
          <Stat
            label="Est. Meals"
            value={stats.mealsDelivered}
            icon={<Package size={16} color="#4CAF50" />}
          />
          <Stat
            label="Volunteers"
            value={stats.volunteersHelped}
            icon={<Users size={16} color="#4CAF50" />}
          />
        </View>
      </View>

      {/* Achievements */}
      <View style={styles.card}>
        <View style={styles.sectionHeader}>
          <Award size={18} color="black" />
          <Text style={styles.sectionTitle}>Achievements</Text>
        </View>

        <Achievement
          color={stats.totalRequests > 0 ? COLORS.primary : "#D1D5DB"}
          title="First Request"
          subtitle={
            stats.totalRequests > 0
              ? "Posted your first delivery request"
              : "Post a request to unlock"
          }
        />
        <Achievement
          color={stats.completedCount >= 10 ? "#eab308" : "#D1D5DB"}
          title="Community Champion"
          subtitle={
            stats.completedCount >= 10
              ? "Completed 10+ requests"
              : "Complete 10 requests to unlock"
          }
        />
      </View>

      {/* Completed Deliveries Log */}
      <View style={styles.card}>
        <View style={styles.sectionHeader}>
          <CheckCircle size={18} color="black" />
          <Text style={styles.sectionTitle}>Completed Deliveries</Text>
        </View>

        {completedDeliveries.length === 0 ? (
          <Text style={{ color: "gray", marginTop: 8 }}>
            No completed deliveries yet.
          </Text>
        ) : (
          completedDeliveries.map((d) => (
            <View
              key={d.id}
              style={[
                styles.achievement,
                { backgroundColor: "#F3F4F6", alignItems: "flex-start" },
              ]}
            >
              <View
                style={[
                  styles.achievementIcon,
                  { backgroundColor: COLORS.primary },
                ]}
              >
                <CheckCircle size={18} color="#fff" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.achievementTitle}>{d.title}</Text>
                <Text style={styles.achievementSubtitle}>
                  {d.pickup} → {d.dropoff}
                </Text>
                {d.completedAt && (
                  <Text
                    style={[
                      styles.achievementSubtitle,
                      { marginTop: 4, fontStyle: "italic" },
                    ]}
                  >
                    Completed: {new Date(d.completedAt).toLocaleDateString()}
                  </Text>
                )}
              </View>
            </View>
          ))
        )}
      </View>

      {/* Logout */}
      <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
        <LogOut size={18} color="#fff" />
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

// Components
function Stat({ label, value, icon }) {
  return (
    <View style={styles.statItem}>
      <View style={styles.statHeader}>
        {icon}
        <Text style={styles.statValue}>{value}</Text>
      </View>
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
      <View style={{ flex: 1 }}>
        <Text style={styles.achievementTitle}>{title}</Text>
        <Text style={styles.achievementSubtitle}>{subtitle}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1F2937",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 4,
  },
  errorBox: {
    backgroundColor: "#FEE2E2",
    borderWidth: 1,
    borderColor: "#F87171",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  errorText: {
    color: "#B91C1C",
    fontSize: 14,
    textAlign: "center",
    fontWeight: "500",
  },
  card: {
    backgroundColor: "#fff",
    marginVertical: 8,
    padding: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
  },
  role: {
    color: "gray",
    textTransform: "capitalize",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 6,
  },
  infoText: {
    marginLeft: 10,
    color: "gray",
    fontSize: 14,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 6,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 8,
  },
  statItem: {
    width: "48%",
    alignItems: "center",
    marginBottom: 16,
  },
  statHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.primary,
    marginLeft: 6,
  },
  statLabel: {
    fontSize: 12,
    color: "gray",
    textAlign: "center",
  },
  achievement: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 10,
    marginVertical: 6,
  },
  achievementIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  achievementTitle: {
    fontWeight: "600",
    color: "#1F2937",
  },
  achievementSubtitle: {
    fontSize: 12,
    color: "gray",
    marginTop: 2,
  },
  logoutButton: {
    flexDirection: "row",
    backgroundColor: "#dc2626",
    marginVertical: 20,
    padding: 14,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  logoutText: {
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 8,
    fontSize: 16,
  },
  editButton: {
    flexDirection: "row",
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
  },
  editButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
