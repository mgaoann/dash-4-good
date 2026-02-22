import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import {
  User,
  Building2,
  Mail,
  Phone,
  MapPin,
  LogOut,
  Award,
  TrendingUp,
  Package,
  Clock,
  CheckCircle,
  Edit,
} from "lucide-react-native";
import { useRouter } from "expo-router";
import { useState, useEffect } from "react";
import { COLORS } from "../styles/global";

// Firebase imports
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import { doc, onSnapshot, collection, query, where } from "firebase/firestore";

export default function ProfilePage({ userRole = "volunteer" }) {
  const router = useRouter();

  const [userData, setUserData] = useState(null);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    // 1. Live listener for the user's profile data
    const unsubUser = onSnapshot(
      doc(db, "users", user.uid),
      (docSnap) => {
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        }
      },
      (error) => {
        setErrorMessage("Failed to load profile data.");
      },
    );

    // 2. Live listener for the user's requests to calculate stats
    const fieldToQuery =
      userRole === "organization" ? "organizationId" : "volunteerId";
    const q = query(
      collection(db, "requests"),
      where(fieldToQuery, "==", user.uid),
    );

    const unsubReqs = onSnapshot(q, (snapshot) => {
      const reqs = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      const completed = reqs.filter((r) => r.status === "completed");

      if (userRole === "organization") {
        setStats({
          totalRequests: reqs.length,
          completedCount: completed.length,
          mealsDelivered: completed.length * 25,
        });
      } else {
        setStats({
          deliveriesCompleted: completed.length,
          mealsDelivered: completed.length * 15,
          hoursVolunteered: Math.round(completed.length * 1.5),
        });
      }

      setLoading(false);
    });

    return () => {
      unsubUser();
      unsubReqs();
    };
  }, [userRole]);

  const onLogout = async () => {
    try {
      await signOut(auth);
      router.replace("/"); // Go back to Welcome screen
    } catch (error) {
      setErrorMessage("Error logging out: " + error.message);
    }
  };

  if (loading || !userData) {
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

  const isOrg = userRole === "organization";
  const displayName = isOrg
    ? userData.name
    : `${userData.firstName} ${userData.lastName}`;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 30 }}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          {isOrg ? "Organization Profile" : "Volunteer Profile"}
        </Text>
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
            {isOrg ? (
              <Building2 size={32} color="#fff" />
            ) : (
              <User size={32} color="#fff" />
            )}
          </View>
          <View>
            <Text style={styles.name}>{displayName}</Text>
            <Text style={styles.role}>{userRole}</Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <Mail size={18} color="gray" />
          <Text style={styles.infoText}>{userData.email}</Text>
        </View>
        <View style={styles.infoRow}>
          <Phone size={18} color="gray" />
          <Text style={styles.infoText}>
            {userData.phone || "No phone provided"}
          </Text>
        </View>
        {isOrg && (
          <View style={styles.infoRow}>
            <MapPin size={18} color="gray" />
            <Text style={styles.infoText}>
              {userData.website || "No website provided"}
            </Text>
          </View>
        )}

        {/* Edit Profile button */}
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => {
            if (isOrg) {
              router.push("/organization/EditOrganizationInfo");
            } else {
              router.push("/volunteer/EditVolunteerProfile");
            }
          }}
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
          {isOrg ? (
            <>
              <Stat
                label="Total Requests"
                value={stats.totalRequests || 0}
                icon={<Package size={16} color="#4CAF50" />}
              />
              <Stat
                label="Completed"
                value={stats.completedCount || 0}
                icon={<CheckCircle size={16} color="#4CAF50" />}
              />
              <Stat
                label="Meals Delivered"
                value={stats.mealsDelivered || 0}
                icon={<Package size={16} color="#4CAF50" />}
              />
            </>
          ) : (
            <>
              <Stat
                label="Deliveries"
                value={stats.deliveriesCompleted || 0}
                icon={<Package size={16} color="#4CAF50" />}
              />
              <Stat
                label="Meals Delivered"
                value={stats.mealsDelivered || 0}
                icon={<Package size={16} color="#4CAF50" />}
              />
              <Stat
                label="Hours"
                value={stats.hoursVolunteered || 0}
                icon={<Clock size={16} color="#4CAF50" />}
              />
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
          color={
            (isOrg ? stats.totalRequests : stats.deliveriesCompleted) >= 1
              ? COLORS.primary
              : "#D1D5DB"
          }
          title={isOrg ? "First Request" : "First Delivery"}
          subtitle={
            (isOrg ? stats.totalRequests : stats.deliveriesCompleted) >= 1
              ? isOrg
                ? "Posted your first request!"
                : "Completed your first delivery!"
              : isOrg
                ? "Post a request to unlock"
                : "Complete a delivery to unlock"
          }
        />
        <Achievement
          color={
            (isOrg ? stats.completedCount : stats.deliveriesCompleted) >= 5
              ? "#eab308"
              : "#D1D5DB"
          }
          title={isOrg ? "Community Champion" : "Helping Hand"}
          subtitle={
            (isOrg ? stats.completedCount : stats.deliveriesCompleted) >= 5
              ? isOrg
                ? "Completed 5+ requests"
                : "Completed 5 deliveries"
              : "Complete 5 deliveries to unlock"
          }
        />
        <Achievement
          color={stats.mealsDelivered >= 200 ? "#3b82f6" : "#D1D5DB"}
          title={isOrg ? "Impact Leader" : "Community Hero"}
          subtitle={
            stats.mealsDelivered >= 200
              ? "Helped deliver 200+ meals"
              : "Help deliver 200 meals to unlock"
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
    justifyContent: "space-around",
    marginTop: 8,
  },
  statItem: {
    alignItems: "center",
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
