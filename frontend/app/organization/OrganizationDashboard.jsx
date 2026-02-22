import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";
import { Plus, TrendingUp } from "lucide-react-native";
import Profile from "../../components/Profile";
import StatRow from "../../components/StatRow";
import ActiveRequests from "../../components/ActiveRequests";
import PendingRequests from "../../components/PendingRequests";
import CreateRequestModal from "../../components/CreateRequestModal";
import OrganizationCompletedDeliveries from "../../components/OrganizationCompletedDeliveries";
import EditRequestModal from "../../components/EditRequestModal";

import { useRouter } from "expo-router";

// Firebase imports
import { auth, db } from "../../firebase";
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
} from "firebase/firestore";

export default function OrganizationDashboard() {
  // Local state
  const [org, setOrg] = useState({ name: "Loading..." });
  const [pendingItems, setPendingItems] = useState([]);
  const [activeItems, setActiveItems] = useState([]);
  const [completedItems, setCompletedItems] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingRequest, setEditingRequest] = useState(null);

  const router = useRouter();

  // Custom UI Error State
  const [errorMessage, setErrorMessage] = useState("");

  // Derived stats
  const pending = pendingItems.length;
  const active = activeItems.length;
  const completed = completedItems.length;

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    // 1. Fetch Organization Details from 'users' collection
    const fetchOrg = async () => {
      const orgDoc = await getDoc(doc(db, "users", user.uid));
      if (orgDoc.exists()) {
        setOrg({ id: user.uid, ...orgDoc.data() });
      }
    };
    fetchOrg();

    // 2. Real-time listener for this specific organization's requests
    const q = query(
      collection(db, "requests"),
      where("organizationId", "==", user.uid),
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      // Map the Firestore documents into an array
      const reqs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      // Filter the data into our three categories based on status
      setPendingItems(reqs.filter((r) => r.status === "pending"));
      setActiveItems(reqs.filter((r) => r.status === "in_progress"));
      setCompletedItems(reqs.filter((r) => r.status === "completed"));
    });

    return () => unsubscribe();
  }, []);

  const handleCreateRequest = async (request) => {
    setErrorMessage("");
    try {
      const user = auth.currentUser;

      // Use the fetched organization name if available, otherwise fallback
      const organizationName =
        org.name !== "Loading..." ? org.name : "Organization";

      await addDoc(collection(db, "requests"), {
        ...request,
        organizationId: user.uid,
        organizationName: organizationName,
        status: "pending",
        createdAt: new Date().toISOString(),
      });
      setShowCreateModal(false);
    } catch (error) {
      setErrorMessage("Could not create request: " + error.message);
    }
  };

  const handleEditRequest = async (updated) => {
    setErrorMessage("");
    try {
      const reqRef = doc(db, "requests", updated.id);
      await updateDoc(reqRef, updated);
      setEditingRequest(null);
    } catch (error) {
      setErrorMessage("Could not update request: " + error.message);
    }
  };

  const handleDeleteRequest = async (id) => {
    setErrorMessage("");
    try {
      await deleteDoc(doc(db, "requests", id));
    } catch (error) {
      setErrorMessage("Could not delete request: " + error.message);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.title}>Organization Dashboard</Text>
            <Text style={styles.subTitle}>Manage your delivery requests</Text>
          </View>
          <Profile target="organization" />
        </View>

        {errorMessage !== "" && (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>{errorMessage}</Text>
            <TouchableOpacity onPress={() => setErrorMessage("")}>
              <Text style={styles.dismissText}>Dismiss</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.statsContainer}>
          <StatRow
            availableCount={pending}
            inProgressCount={active}
            completedCount={completed}
            labels={["Pending", "Active", "Completed"]}
          />
        </View>

        <View style={styles.quickActions}>
          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => setShowCreateModal(true)}
          >
            <View style={styles.actionIcon}>
              <Plus size={24} color="#4CAF50" />
            </View>
            <View style={styles.actionContent}>
              <Text style={styles.actionTitle}>Create Request</Text>
              <Text style={styles.actionSubtitle}>
                Post a new delivery request
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard}>
            <View style={styles.actionIcon}>
              <TrendingUp size={24} color="#FFC107" />
            </View>
            <View style={styles.actionContent}>
              <Text style={styles.actionTitle}>View Analytics</Text>
              <Text style={styles.actionSubtitle}>Track your impact</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.requestsContainer}>
        <ActiveRequests
          items={activeItems}
          onViewRoute={(item) => {
            router.push({
              pathname: "/tabs-organization/map",
              params: {
                id: item.id,
                pickup: item.pickup,
                dropoff: item.dropoff,
              },
            });
          }}
        />
      </View>

      <View style={styles.requestsContainer}>
        <PendingRequests
          items={pendingItems}
          onEdit={(id) =>
            setEditingRequest(pendingItems.find((r) => r.id === id))
          }
          onDelete={(id) => handleDeleteRequest(id)}
        />
      </View>

      <View style={styles.requestsContainer}>
        <OrganizationCompletedDeliveries items={completedItems} />
      </View>

      <CreateRequestModal
        visible={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        orgName={org.name}
        onCreate={handleCreateRequest}
      />

      <EditRequestModal
        visible={!!editingRequest}
        onClose={() => setEditingRequest(null)}
        request={editingRequest}
        onSave={handleEditRequest}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingBottom: 10,
    flexGrow: 1,
    marginHorizontal: 20,
  },
  title: {
    color: "#1F2937",
    fontSize: 18,
    fontWeight: "bold",
  },
  subTitle: {
    color: "#4b5768ff",
    fontSize: 13,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    marginRight: 20,
  },
  errorBox: {
    backgroundColor: "#FEE2E2",
    borderWidth: 1,
    borderColor: "#F87171",
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  errorText: {
    color: "#B91C1C",
    fontSize: 14,
    fontWeight: "500",
    flex: 1,
  },
  dismissText: {
    color: "#B91C1C",
    fontWeight: "bold",
    marginLeft: 10,
  },
  statsContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  quickActions: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 20,
  },
  actionCard: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  actionContent: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 2,
  },
  actionSubtitle: {
    fontSize: 12,
    color: "#6B7280",
  },
  divider: {
    height: 1,
    backgroundColor: "#c1c2c6ff",
    marginVertical: 20,
    width: "100%",
  },
  requestsContainer: {
    paddingHorizontal: 20,
  },
});
