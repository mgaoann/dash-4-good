import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { MapPin, Package, Map, CheckCircle } from "lucide-react-native";
import { activeDeliveries } from "../data/dummyDeliveries";

export default function ActiveDeliveries() {
  const completeDelivery = (id) => {
    console.log("Completed:", id);
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
          <MapPin size={16} color="#10B981" style={styles.icon} />
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
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.outlineButton}>
          <Map size={16} color="#374151" style={styles.icon} />
          <Text style={styles.outlineText}>View Route</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.completeButton}
          onPress={() => completeDelivery(item.id)}
        >
          <CheckCircle size={16} color="white" style={styles.icon} />
          <Text style={styles.completeText}>Mark Complete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Active Deliveries</Text>
      <FlatList
        data={activeDeliveries}
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
  outlineText: {
    fontSize: 13,
    color: "#374151",
    marginLeft: 4,
  },
  completeButton: {
    flex: 1,
    backgroundColor: "#10B981",
    padding: 10,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  completeText: {
    fontSize: 13,
    color: "white",
    fontWeight: "500",
    marginLeft: 4,
  },
});
