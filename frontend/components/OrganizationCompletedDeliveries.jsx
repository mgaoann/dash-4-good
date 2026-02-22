import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Linking,
} from "react-native";
import { MapPin, Package, User, Clock, Phone } from "lucide-react-native";
import { COLORS } from "../styles/global";

export default function OrganizationCompletedDeliveries({ items = [] }) {
  const contactVolunteer = (phone) => {
    if (!phone) return;
    // Native deep link to dial the number
    Linking.openURL(`tel:${phone}`);
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
          <Text style={styles.detail} numberOfLines={1}>
            From: {item.pickup}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <MapPin size={16} color="#F59E0B" style={styles.icon} />
          <Text style={styles.detail} numberOfLines={1}>
            To: {item.dropoff}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Package size={16} color="#6B7280" style={styles.icon} />
          <Text style={styles.detail}>{item.items}</Text>
        </View>
        <View style={styles.detailRow}>
          <User size={16} color="#3B82F6" style={styles.icon} />
          <Text style={styles.detail}>
            Volunteer: {item.volunteerName || "Completed"}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Clock size={16} color="#6B7280" style={styles.icon} />
          <Text style={styles.detail}>
            Finished:{" "}
            {item.completedAt
              ? new Date(item.completedAt).toLocaleDateString()
              : "Recently"}
          </Text>
        </View>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.outlineButton}
          onPress={() => contactVolunteer(item.volunteerPhone)}
        >
          <Phone size={16} color="#374151" style={styles.icon} />
          <Text style={styles.outlineText}>Call Volunteer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (items.length === 0) return null;

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
  section: {
    marginTop: 10,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 12,
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary, // Green indicator for success
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  title: {
    fontWeight: "700",
    fontSize: 16,
    color: "#111827",
    flex: 1,
  },
  badge: {
    backgroundColor: "#DCFCE7", // Soft green
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: "700",
    color: COLORS.primary,
    textTransform: "uppercase",
  },
  details: {
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  icon: {
    marginRight: 8,
  },
  detail: {
    fontSize: 14,
    color: "#4B5563",
    flex: 1,
  },
  actions: {
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
    paddingTop: 12,
  },
  outlineButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  outlineText: {
    fontSize: 14,
    color: "#374151",
    fontWeight: "600",
  },
});
