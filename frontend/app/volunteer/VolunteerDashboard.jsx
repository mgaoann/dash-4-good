import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Profile from "../../components/Profile";
import StatRow from "../../components/StatRow";
import { useState, useEffect } from "react";
import ActiveDeliveries from "../../components/ActiveDeliveries";
import AvailableDeliveries from "../../components/Available Deliveries";

import { useRouter } from "expo-router";

// Firebase imports
import { auth, db } from "../../firebase";
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  updateDoc,
} from "firebase/firestore";

export default function VolunteerDashboard() {
  const [availableItems, setAvailableItems] = useState([]);
  const [activeItems, setActiveItems] = useState([]);
  const [completedItems, setCompletedItems] = useState([]);

  const router = useRouter();

  // Custom UI Message State
  const [statusMessage, setStatusMessage] = useState({ text: "", type: "" }); // type: 'success' | 'error'

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    // 1. Listen for ALL available (pending) requests
    const qAvailable = query(
      collection(db, "requests"),
      where("status", "==", "pending"),
    );
    const unsubAvailable = onSnapshot(qAvailable, (snapshot) => {
      const reqs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setAvailableItems(reqs);
    });

    // 2. Listen for THIS volunteer's claimed and completed requests
    const qVolunteer = query(
      collection(db, "requests"),
      where("volunteerId", "==", user.uid),
    );
    const unsubVolunteer = onSnapshot(qVolunteer, (snapshot) => {
      const reqs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setActiveItems(reqs.filter((r) => r.status === "in_progress"));
      setCompletedItems(reqs.filter((r) => r.status === "completed"));
    });

    return () => {
      unsubAvailable();
      unsubVolunteer();
    };
  }, []);

  const showBanner = (text, type) => {
    setStatusMessage({ text, type });
    // Automatically hide after 4 seconds
    setTimeout(() => setStatusMessage({ text: "", type: "" }), 4000);
  };

  const handleClaim = async (item) => {
    try {
      const user = auth.currentUser;
      if (!user) return;

      const reqRef = doc(db, "requests", item.id);

      // 1. Update the request status
      await updateDoc(reqRef, {
        status: "in_progress",
        volunteerId: user.uid,
      });

      // 2. Fetch the Volunteer's name
      const volDoc = await getDoc(doc(db, "users", user.uid));
      const volName = volDoc.exists()
        ? volDoc.data().name || "Volunteer"
        : "Volunteer";

      // 3. BULLETPROOF ORG FETCHING
      // Find the Org ID
      const orgId =
        item.organizationId ||
        item.userId ||
        item.createdBy ||
        "unknown_org_id";

      let orgName = item.organizationName || item.orgName; // Check if it's already on the request

      // If the name isn't directly on the request, go look it up in the 'users' collection
      if (!orgName && orgId !== "unknown_org_id") {
        const orgDoc = await getDoc(doc(db, "users", orgId));
        if (orgDoc.exists()) {
          // Check common naming fields
          orgName =
            orgDoc.data().name ||
            orgDoc.data().organizationName ||
            orgDoc.data().companyName ||
            "Organization";
        } else {
          orgName = "Organization";
        }
      } else if (!orgName) {
        orgName = "Organization";
      }

      // 4. Create the new conversation document
      await addDoc(collection(db, "conversations"), {
        requestId: item.id,
        volunteerId: user.uid,
        organizationId: orgId,
        volunteerName: volName,
        organizationName: orgName,
        lastMessage: "Delivery claimed! Chat started.",
        lastTime: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        unread: 0,
        messages: [],
      });

      // Updated the banner to prove it grabbed the right name!
      showBanner(
        `Successfully claimed! Chat started with ${orgName}.`,
        "success",
      );
    } catch (error) {
      showBanner("Could not claim: " + error.message, "error");
    }
  };

  const handleComplete = async (item) => {
    try {
      const reqRef = doc(db, "requests", item.id);

      await updateDoc(reqRef, {
        status: "completed",
        completedAt: new Date().toISOString(),
      });
      showBanner("Delivery completed! Great job.", "success");
    } catch (error) {
      showBanner("Error completing delivery: " + error.message, "error");
    }
  };

  return (
    <ScrollView style={{ backgroundColor: "#fff" }}>
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.title}>Volunteer Dashboard</Text>
            <Text style={styles.subTitle}>Find deliveries near you</Text>
          </View>
          <Profile target="volunteer" />
        </View>

        {/* Dynamic Status Banner */}
        {statusMessage.text !== "" && (
          <View
            style={[
              styles.messageBox,
              statusMessage.type === "success"
                ? styles.successBg
                : styles.errorBg,
            ]}
          >
            <Text
              style={[
                styles.messageText,
                statusMessage.type === "success"
                  ? styles.successText
                  : styles.errorText,
              ]}
            >
              {statusMessage.text}
            </Text>
            <TouchableOpacity
              onPress={() => setStatusMessage({ text: "", type: "" })}
            >
              <Text
                style={
                  statusMessage.type === "success"
                    ? styles.successDismiss
                    : styles.errorDismiss
                }
              >
                Dismiss
              </Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.StateRowContainer}>
          <StatRow
            availableCount={availableItems.length}
            inProgressCount={activeItems.length}
            completedCount={completedItems.length}
          />
        </View>
      </View>
      <View style={styles.divider} />

      <View style={styles.DeliverierContainer}>
        {/*Passed the onViewRoute prop to navigate and send data! */}
        <ActiveDeliveries
          items={activeItems}
          onComplete={handleComplete}
          onViewRoute={(item) => {
            router.push({
              pathname: "/tabs-volunteer/map",
              params: {
                id: item.id,
                pickup: item.pickup,
                dropoff: item.dropoff,
              },
            });
          }}
        />
      </View>

      <View style={styles.DeliverierContainer}>
        <AvailableDeliveries items={availableItems} onClaim={handleClaim} />
      </View>
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
  title: { color: "#1F2937", fontSize: 18, fontWeight: "bold" },
  subTitle: { color: "#4b5768ff", fontSize: 13 },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    marginRight: 20,
  },
  // Custom Banner Styles
  messageBox: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
  },
  successBg: { backgroundColor: "#DCFCE7", borderColor: "#4ade80" },
  errorBg: { backgroundColor: "#FEE2E2", borderColor: "#F87171" },
  messageText: { fontSize: 13, fontWeight: "500", flex: 1 },
  successText: { color: "#166534" },
  errorText: { color: "#B91C1C" },
  successDismiss: { color: "#166534", fontWeight: "bold", marginLeft: 10 },
  errorDismiss: { color: "#B91C1C", fontWeight: "bold", marginLeft: 10 },

  StateRowContainer: { alignItems: "center" },
  divider: {
    height: 1,
    backgroundColor: "#c1c2c6ff",
    marginVertical: 20,
    width: "100%",
  },
  DeliverierContainer: { paddingHorizontal: 20 },
});
