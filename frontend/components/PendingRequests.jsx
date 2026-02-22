import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { MapPin, Package, Clock, Edit, Trash2 } from "lucide-react-native";
import { COLORS } from "../styles/global";

export default function PendingRequests({ items = [], onEdit, onDelete }) {
  const renderCard = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.title} numberOfLines={1}>
          {item.title}
        </Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Pending</Text>
        </View>
      </View>

      <View style={styles.details}>
        <View style={styles.detailRow}>
          <MapPin size={16} color={COLORS.primary} style={styles.icon} />
          <Text style={styles.detail} numberOfLines={1}>
            Pickup: {item.pickup}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <MapPin size={16} color="#F59E0B" style={styles.icon} />
          <Text style={styles.detail} numberOfLines={1}>
            Dropoff: {item.dropoff}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Package size={16} color="#6B7280" style={styles.icon} />
          <Text style={styles.detail}>{item.items}</Text>
        </View>
      </View>

      <View style={styles.extraInfo}>
        <View style={styles.infoItem}>
          <Clock size={14} color="#6B7280" />
          <Text style={styles.infoText}>
            {item.estimatedTime || "Standard"}
          </Text>
        </View>
        <Text style={styles.createdAt}>
          {item.createdAt
            ? new Date(item.createdAt).toLocaleDateString()
            : "Just now"}
        </Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.editButton}
          onPress={() => onEdit && onEdit(item.id)}
        >
          <Edit size={16} color="#4B5563" style={styles.icon} />
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.deleteButton}
          onPress={() => onDelete && onDelete(item.id)}
        >
          <Trash2 size={16} color="#DC2626" style={styles.icon} />
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (items.length === 0) return null;

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Pending Requests</Text>
      <FlatList
        data={items}
        renderItem={renderCard}
        scrollEnabled={false}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
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
    borderLeftColor: "#F59E0B", // Amber for Pending
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
    marginRight: 8,
  },
  badge: {
    backgroundColor: "#FEF3C7", // Soft Amber
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#D97706",
    textTransform: "uppercase",
  },
  details: {
    marginBottom: 12,
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
  extraInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    paddingTop: 8,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoText: {
    fontSize: 12,
    color: "#6B7280",
    marginLeft: 4,
  },
  createdAt: {
    fontSize: 12,
    color: "#9CA3AF",
  },
  actions: {
    flexDirection: "row",
    gap: 10,
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
    paddingTop: 12,
  },
  editButton: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  editText: {
    fontSize: 14,
    color: "#4B5563",
    fontWeight: "600",
  },
  deleteButton: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF1F2", // Very soft red
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#FECACA",
  },
  deleteText: {
    fontSize: 14,
    color: "#DC2626",
    fontWeight: "600",
  },
});
