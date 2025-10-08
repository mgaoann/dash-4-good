import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useState } from "react";
import { Plus, TrendingUp, Package, Users, CheckCircle } from "lucide-react-native";
import Profile from "../../components/Profile";
import StatRow from "../../components/StatRow";
import Button from "../../components/Button";
import ActiveRequests from "../../components/ActiveRequests";
import PendingRequests from "../../components/PendingRequests";
import CreateRequestModal from "../../components/CreateRequestModal";
import OrganizationCompletedDeliveries from "../../components/OrganizationCompletedDeliveries";
import { orgInfo, orgPendingRequests, orgActiveRequests, orgCompletedDeliveries } from "../../data/dummyOrganization";

// TODO (Backend): Replace dummy state with live data from Firestore
//  - Fetch organization stats (pending, active, completed) from DB
//  - Update in real-time when requests are created, claimed, or completed
//  - Use real organization profile data

// TODO (Notifications):
//  - Notify organization when volunteers claim their requests
//  - Notify organization when deliveries are completed

export default function OrganizationDashboard() {
  // TODO (Auth): replace orgInfo with logged-in org from Auth/DB
  const [org] = useState(orgInfo);
  // Local UI state derived from dummy data (replace with Firestore in prod)
  const [pendingItems, setPendingItems] = useState(orgPendingRequests.filter(r => r.organizationId === org.id));
  const [activeItems, setActiveItems] = useState(orgActiveRequests.filter(r => r.organizationId === org.id));
  const [completedItems, setCompletedItems] = useState(orgCompletedDeliveries.filter(r => r.organizationId === org.id));
  const [showCreateModal, setShowCreateModal] = useState(false);

  const pending = pendingItems.length;
  const active = activeItems.length;
  const completed = completedItems.length;

  // When org creates a request, add to Active per product requirement
  const handleCreateRequest = (request) => {
    const withOrg = {
      ...request,
      id: String(Date.now()),
      organizationId: org.id,
      organization: org.name,
      status: "in_progress",
      createdAt: new Date().toISOString(),
    };
    setActiveItems([withOrg, ...activeItems]);
    setShowCreateModal(false);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.title}>Organization Dashboard</Text>
            <Text style={styles.subTitle}>Manage your delivery requests</Text>
          </View>
          {/* Opens organization profile when on org dashboard */}
          <Profile target="organization" />
        </View>

        {/* Stats Row */}
        <View style={styles.statsContainer}>
          <StatRow
            availableCount={pending}
            inProgressCount={active}
            completedCount={completed}
            labels={["Pending", "Active", "Completed"]}
          />
        </View>

        {/* Quick Actions */}
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
              <Text style={styles.actionSubtitle}>Post a new delivery request</Text>
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

      {/* Active Deliveries (for this organization only) */}
      <View style={styles.requestsContainer}>
        <ActiveRequests items={activeItems} />
      </View>

      {/* Pending Requests (visible to volunteers as available) */}
      <View style={styles.requestsContainer}>
        <PendingRequests items={pendingItems} />
      </View>

      {/* Completed Deliveries (history/logs) */}
      <View style={styles.requestsContainer}>
        <OrganizationCompletedDeliveries items={completedItems} />
      </View>

      {/* Create Request Modal */}
      <CreateRequestModal 
        visible={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        orgName={org.name}
        onCreate={handleCreateRequest}
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