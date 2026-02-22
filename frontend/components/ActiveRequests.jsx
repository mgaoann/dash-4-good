import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import {
  MapPin,
  Package,
  User,
  Clock,
  MessageCircle,
} from "lucide-react-native";
import { COLORS } from "../styles/global";
import { useRouter } from "expo-router";

export default function ActiveRequests({ items = [] }) {
  const router = useRouter();

  const contactVolunteer = (volunteerId) => {
    router.push("/tabs-organization/messages");
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
            Volunteer: {item.volunteerName || "Assigned"}
          </Text>
        </View>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.contactButton}
          onPress={() => contactVolunteer(item.volunteerId)}
        >
          <MessageCircle size={16} color={COLORS.primary} style={styles.icon} />
          <Text style={styles.contactText}>Message Volunteer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (items.length === 0) return null;

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
    marginTop: 10,
    marginBottom: 20,
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
    borderLeftColor: "#3B82F6", // Blue indicator for "In Progress"
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
    backgroundColor: "#EFF6FF", // Soft blue
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#2563EB",
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
  contactButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  contactText: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: "600",
  },
});
