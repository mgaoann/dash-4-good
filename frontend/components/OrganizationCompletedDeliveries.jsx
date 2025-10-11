import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { MapPin, Package, User, Clock, Phone } from "lucide-react-native";
import { COLORS } from "../styles/global";

// TODO (Backend): Fetch organization's completed deliveries for the logged-in orgId
//  - Include volunteer contact and completedAt timestamp
//  - Implement pagination if needed
//  - Secure data access by orgId

export default function OrganizationCompletedDeliveries({ items = [] }) {
  const contactVolunteer = (phone) => {
    console.log("Contact (past volunteer):", phone);
    // TODO (Native): Deep link to phone/SMS (Linking API)
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>{item.title}</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Completed</Text>
        </View>
      </View>
      <View style={styles.details}>
        <View style={styles.detailRow}>
          <MapPin size={16} color={COLORS.primary} style={styles.icon} />
          <Text style={styles.detail}>From: {item.pickup}</Text>
        </View>
        <View style={styles.detailRow}>
          <MapPin size={16} color="#F59E0B" style={styles.icon} />
          <Text style={styles.detail}>To: {item.dropoff}</Text>
        </View>
        <View style={styles.detailRow}>
          <Package size={16} color="#6B7280" style={styles.icon} />
          <Text style={styles.detail}>{item.items}</Text>
        </View>
        <View style={styles.detailRow}>
          <User size={16} color="#3B82F6" style={styles.icon} />
          <Text style={styles.detail}>Volunteer: {item.volunteer}</Text>
        </View>
        <View style={styles.detailRow}>
          <Clock size={16} color="#6B7280" style={styles.icon} />
          <Text style={styles.detail}>Completed: {item.completedAt}</Text>
        </View>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.outlineButton} onPress={() => contactVolunteer(item.volunteerPhone)}>
          <Phone size={16} color="#374151" style={styles.icon} />
          <Text style={styles.outlineText}>Contact Volunteer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Completed Deliveries</Text>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(i) => i.id}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  section: { marginTop: 9 },
  sectionTitle: { fontSize: 16, fontWeight: "bold", color: "#1F2937", marginBottom: 10 },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    marginBottom: 15,
    borderLeftWidth: 4,
  borderLeftColor: COLORS.primary,
  },
  headerRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 8 },
  title: { fontWeight: "600", fontSize: 15, color: "#1F2937" },
  badge: { backgroundColor: "#D1FAE5", paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  badgeText: { fontSize: 12, color: COLORS.primary },
  details: { marginBottom: 12 },
  detailRow: { flexDirection: "row", alignItems: "center", marginBottom: 6 },
  icon: { marginRight: 6 },
  detail: { fontSize: 13, color: "#4B5563" },
  actions: { flexDirection: "row" },
  outlineButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    padding: 10,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  outlineText: { fontSize: 13, color: "#374151", marginLeft: 4 },
});


