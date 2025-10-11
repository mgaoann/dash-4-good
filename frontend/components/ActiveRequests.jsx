import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { MapPin, Package, User, Clock, MessageCircle } from "lucide-react-native";
import { COLORS } from "../styles/global";

// TODO (Backend):
//  - Fetch organization-specific active deliveries from Firestore (filter by orgId)
//  - Update when volunteer completes delivery
//  - Notify organization on completion

export default function ActiveRequests({ items = [] }) {
  const contactVolunteer = (volunteerPhone) => {
    console.log("Contacting volunteer:", volunteerPhone);
    // TODO: Implement phone call or messaging functionality
  };

  const renderCard = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>{item.title}</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>In Progress</Text>
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
          <Text style={styles.detail}>ETA: {item.estimatedTime}</Text>
        </View>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity 
          style={styles.contactButton}
          onPress={() => contactVolunteer(item.volunteerPhone)}
        >
          <MessageCircle size={16} color="#3B82F6" style={styles.icon} />
          <Text style={styles.contactText}>Contact Volunteer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Active Deliveries</Text>
      <FlatList
        data={items}
        renderItem={renderCard}
        scrollEnabled={false}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginTop: 9,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 10,
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: "#3B82F6",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  title: {
    fontWeight: "600",
    fontSize: 15,
    color: "#1F2937",
  },
  badge: {
    backgroundColor: "#DBEAFE",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 12,
    color: "#1E40AF",
  },
  details: {
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  icon: {
    marginRight: 6,
  },
  detail: {
    fontSize: 13,
    color: "#4B5563",
  },
  actions: {
    flexDirection: "row",
    gap: 8,
  },
  contactButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#3B82F6",
    padding: 10,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  contactText: {
    fontSize: 13,
    color: "#3B82F6",
    marginLeft: 4,
    fontWeight: "500",
  },
});
