import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
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
import { useState } from "react";
import { orgInfo, orgCompletedDeliveries } from "../../data/dummyOrganization";
import { COLORS } from "../../styles/global";

export default function OrganizationProfile() {
  const router = useRouter();
  // TODO (Auth): hydrate org data from backend for logged-in org
  const [org, setOrg] = useState(orgInfo);
  const [editing, setEditing] = useState(false);

  // TODO: Auth -> Replace this with Firebase Auth signOut()
  // After logout, redirect user back to Welcome/Login screen
  const onLogout = () => {
    router.push("/");
  };

  // TODO (Backend):
  //  - Replace dummy stats with Firestore queries
  //  - Fetch total requests, completed deliveries, meals delivered
  //  - Use real organization profile data (name, email, phone, location)

  // TODO (Notifications):
  //  - Trigger achievement unlocks & show toast/push when milestones hit
  //  - Example: "Community Champion" after 50 completed requests

  const organizationStats = {
    // TODO (Backend): derive from Firestore aggregates for this orgId
    totalRequests: orgCompletedDeliveries.length + 2,
    completedDeliveries: orgCompletedDeliveries.length,
    mealsDelivered: 1200,
    volunteersHelped: 25,
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 30 }}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Organization Profile</Text>
        <Text style={styles.headerSubtitle}>Manage your account</Text>
      </View>

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
        <View style={[styles.infoRow, { alignItems: "flex-start" }]}>
          <Text
            style={[
              styles.infoText,
              { marginLeft: 0, color: "#374151", fontWeight: "600" },
            ]}
          >
            About
          </Text>
        </View>
        {editing ? (
          <TextInput
            style={[styles.infoText, styles.textArea]}
            multiline
            numberOfLines={3}
            value={org.description}
            onChangeText={(v) => setOrg({ ...org, description: v })}
          />
        ) : (
          <Text style={[styles.infoText, { color: "#374151" }]}>
            {org.description}
          </Text>
        )}

        {/* Add spacing between About and contact section */}
        <View style={{ height: 14 }} />

        {/* Contact details - editable */}
        <View style={styles.infoRow}>
          <Mail size={18} color="gray" />
          {editing ? (
            <TextInput
              style={[styles.infoText, styles.input]}
              value={org.email}
              onChangeText={(v) => setOrg({ ...org, email: v })}
            />
          ) : (
            <Text style={styles.infoText}>{org.email}</Text>
          )}
        </View>
        <View style={styles.infoRow}>
          <Phone size={18} color="gray" />
          {editing ? (
            <TextInput
              style={[styles.infoText, styles.input]}
              value={org.phone}
              onChangeText={(v) => setOrg({ ...org, phone: v })}
            />
          ) : (
            <Text style={styles.infoText}>{org.phone}</Text>
          )}
        </View>
        <View style={styles.infoRow}>
          <MapPin size={18} color="gray" />
          {editing ? (
            <TextInput
              style={[styles.infoText, styles.input]}
              value={org.website}
              onChangeText={(v) => setOrg({ ...org, website: v })}
            />
          ) : (
            <Text style={styles.infoText}>{org.website}</Text>
          )}
        </View>
        {/* Primary Edit Profile button placed under contact details */}
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
            value={organizationStats.totalRequests}
            icon={<Package size={16} color="#4CAF50" />}
          />
          <Stat
            label="Completed"
            value={organizationStats.completedDeliveries}
            icon={<CheckCircle size={16} color="#4CAF50" />}
          />
          <Stat
            label="Meals Delivered"
            value={organizationStats.mealsDelivered}
            icon={<Package size={16} color="#4CAF50" />}
          />
          <Stat
            label="Volunteers Helped"
            value={organizationStats.volunteersHelped}
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
          color={COLORS.primary}
          title="First Request"
          subtitle="Posted your first delivery request"
        />
        <Achievement
          color="#eab308"
          title="Community Champion"
          subtitle="Completed 10+ requests"
        />
        <Achievement
          color="#3b82f6"
          title="Impact Leader"
          subtitle="Helped 500+ people with deliveries"
        />
        <Achievement
          color="#8b5cf6"
          title="Volunteer Magnet"
          subtitle="Worked with 20+ volunteers"
        />
      </View>

      {/* Organization Settings */}
      <View style={styles.card}>
        <View style={styles.sectionHeader}>
          <Building2 size={18} color="black" />
          <Text style={styles.sectionTitle}>Organization Settings</Text>
        </View>

        {/* Removed duplicate Edit Organization Info setting; primary edit action is above. */}
        <TouchableOpacity style={styles.settingButton}>
          <Text style={styles.settingText}>Notification Preferences</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingButton}>
          <Text style={styles.settingText}>Delivery Preferences</Text>
        </TouchableOpacity>
      </View>

      {/* Completed Deliveries Log */}
      <View style={styles.card}>
        <View style={styles.sectionHeader}>
          <CheckCircle size={18} color="black" />
          <Text style={styles.sectionTitle}>Completed Deliveries (Log)</Text>
        </View>
        {orgCompletedDeliveries.map((d) => (
          <View
            key={d.id}
            style={[styles.achievement, { backgroundColor: "#F3F4F6" }]}
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
              <Text style={styles.achievementSubtitle}>
                Volunteer: {d.volunteer} • {d.completedAt}
              </Text>
            </View>
            <TouchableOpacity
              style={[styles.settingButton, { borderColor: "#D1D5DB" }]}
            >
              <Text style={[styles.settingText, { color: "#374151" }]}>
                Contact
              </Text>
            </TouchableOpacity>
          </View>
        ))}
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
    backgroundColor: "#4CAF50",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: "600"
  },
  role: {
    color: "gray",
    textTransform: "capitalize"
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4
  },
  infoText: {
    marginLeft: 8,
    color: "gray"
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 6
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
    marginBottom: 12,
  },
  statHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4CAF50",
    marginLeft: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "gray",
    textAlign: "center"
  },
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
  achievementTitle: {
    fontWeight: "600"
  },
  achievementSubtitle: {
    fontSize: 12,
    color: "gray"
  },
  settingButton: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginVertical: 4,
  },
  settingText: {
    fontSize: 14,
    color: "#374151",
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
  logoutText: {
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 6
  },
  editButton: {
    flexDirection: "row",
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  editButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
