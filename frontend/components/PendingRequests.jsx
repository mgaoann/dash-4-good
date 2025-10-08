import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { MapPin, Package, Clock, Edit, Trash2 } from "lucide-react-native";

// TODO (Backend):
//  - Fetch organization-specific pending requests from Firestore (filter by orgId)
//  - Update when volunteer claims a request
//  - Implement edit and delete functionality

export default function PendingRequests({ items = [], onEdit, onDelete }) {
  const editRequest = (id) => {
    console.log("Edit request:", id);
    // TODO (Backend): Navigate to edit flow or prefill modal from DB
    if (onEdit) onEdit(id);
  };

  const deleteRequest = (id) => {
    console.log("Delete request:", id);
    // TODO (Backend): Delete in Firestore; optimistic update here
    if (onDelete) onDelete(id);
  };

  const renderCard = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>{item.title}</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Pending</Text>
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

      <View style={styles.extraInfo}>
        <View style={styles.infoGroup}>
          <View style={styles.infoItem}>
            <Clock size={16} color="#6B7280" style={styles.icon} />
            <Text style={styles.infoText}>{item.estimatedTime}</Text>
          </View>
          <Text style={styles.distance}>{item.distance}</Text>
        </View>
        <Text style={styles.createdAt}>Posted {item.createdAt}</Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity 
          style={styles.editButton}
          onPress={() => editRequest(item.id)}
        >
          <Edit size={16} color="#6B7280" style={styles.icon} />
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.deleteButton}
          onPress={() => deleteRequest(item.id)}
        >
          <Trash2 size={16} color="#DC2626" style={styles.icon} />
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

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
    marginTop: 9,
    // paddingHorizontal removed so width matches siblings; parent provides padding
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
    borderRadius: 12, // align with other cards
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    marginBottom: 15,
    borderLeftWidth: 4, // consistent accent
    borderLeftColor: "#F59E0B",
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
    backgroundColor: "#FEF3C7",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 12,
    color: "#D97706",
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
  distance: {
    fontSize: 12,
    color: "#6B7280",
  },
  createdAt: {
    fontSize: 12,
    color: "#6B7280",
  },
  actions: {
    flexDirection: "row",
    gap: 8,
  },
  editButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    padding: 10,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  editText: {
    fontSize: 13,
    color: "#6B7280",
    marginLeft: 4,
  },
  deleteButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#DC2626",
    padding: 10,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  deleteText: {
    fontSize: 13,
    color: "#DC2626",
    marginLeft: 4,
    fontWeight: "500",
  },
});
