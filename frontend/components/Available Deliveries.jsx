import { View, Text, StyleSheet, FlatList } from "react-native";
import { MapPin, Package, Car, Clock } from "lucide-react-native";
import { COLORS } from "../styles/global";
import { availableDeliveries } from "../data/dummyDeliveries";
import Button from "./Button";
// TODO (Backend): Replace dummy data (../data/dummyDeliveries) with Firestore "deliveries" collection
// TODO (Backend): Ensure Claim Delivery button updates Firestore (assigns delivery to logged-in volunteer)
// TODO (Backend): Fetch real-time status updates (available -> claimed -> completed)
// TODO (Backend): Populate distance, estimatedTime, organization fields dynamically from backend
// TODO (Map/Geo): Use Google Maps API to calculate and show pickup -> dropoff route + distance/time

export default function AvailableDeliveries({ setSelectedRequest }) {
  const renderCard = ({ item }) => {
    return (
      <View style={styles.card}>
        {/* Header */}
        <View style={styles.headerRow}>
          <Text style={styles.title}>{item.title}</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Available</Text>
          </View>
        </View>

        {/* Details */}
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
        </View>

        <View style={styles.extraInfo}>
          <View style={styles.infoGroup}>
            <View style={styles.infoItem}>
              <Car size={16} color="#6B7280" style={styles.icon} />
              <Text style={styles.infoText}>{item.distance}</Text>
            </View>
            <View style={styles.infoItem}>
              <Clock size={16} color="#6B7280" style={styles.icon} />
              <Text style={styles.infoText}>{item.estimatedTime}</Text>
            </View>
          </View>
          <Text style={styles.organization}>{item.organization}</Text>
        </View>

        {/* Actions */}
        <Button
          title="Claim Delivery"
          onPress={() => setSelectedRequest && setSelectedRequest(item)}
          style={{ marginTop: 10 }}
        />
      </View>
    );
  };

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Available Deliveries</Text>
      <FlatList
        data={availableDeliveries}
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
    marginTop: 9,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 12,
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    marginBottom: 15,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  title: {
    fontWeight: "600",
    fontSize: 16,
    color: "#1F2937",
  },
  badge: {
  backgroundColor: "#DCFCE7",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 12,
  color: COLORS.primary,
    fontWeight: "500",
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
  extraInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  infoGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoText: {
    fontSize: 12,
    color: "#4B5563",
    marginLeft: 4,
  },
  organization: {
    fontSize: 12,
    color: "#6B7280",
  },
});
