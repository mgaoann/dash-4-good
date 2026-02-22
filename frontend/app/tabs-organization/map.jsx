import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MapPin, Building2 } from "lucide-react-native";
import { appGradient, COLORS } from "../../styles/global";
import GeolocationRoute from "../GeolocationRoute";
import { Marker } from "react-native-maps";
import * as Location from "expo-location";

// Firebase imports
import { auth, db } from "../../firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";

export default function OrganizationMap() {
  const pulseActive = useRef(new Animated.Value(1)).current;
  const [activeDeliveries, setActiveDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pulse animation for markers
  useEffect(() => {
    const animate = (pulse) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulse, {
            toValue: 1.3,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(pulse, {
            toValue: 1.0,
            duration: 1000,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    };
    animate(pulseActive);
  }, [pulseActive]);

  // Fetch org's active deliveries and geocode them
  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const q = query(
      collection(db, "requests"),
      where("organizationId", "==", user.uid),
      where("status", "==", "in_progress"),
    );

    const unsubscribe = onSnapshot(q, async (snapshot) => {
      const reqs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      // Geocode all dropoff locations concurrently
      const coordsPromises = reqs.map(async (req) => {
        try {
          const res = await Location.geocodeAsync(req.dropoff);
          if (res.length > 0) {
            return {
              id: req.id,
              title: req.title,
              latitude: res[0].latitude,
              longitude: res[0].longitude,
            };
          }
        } catch (e) {
          console.warn("Geocode error for", req.dropoff);
        }
        return null;
      });

      const resolvedCoords = await Promise.all(coordsPromises);
    
      setActiveDeliveries(resolvedCoords.filter((c) => c !== null));
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // We need a baseline dropoff for GeolocationRoute to render properly
  const defaultDropoff =
    activeDeliveries.length > 0
      ? {
          latitude: activeDeliveries[0].latitude,
          longitude: activeDeliveries[0].longitude,
        }
      : { latitude: 34.4127, longitude: -119.861 };

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={appGradient.colors}
        start={appGradient.start}
        end={appGradient.end}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Delivery Map Overview</Text>
        <Building2 color="#fff" size={24} />
      </LinearGradient>

      {/* Map */}
      <View style={styles.mapContainer}>
        {loading ? (
          <View style={styles.center}>
            <ActivityIndicator size="large" color={COLORS.primary} />
          </View>
        ) : (
          <GeolocationRoute dropoff={defaultDropoff} showDirections={false}>
            {activeDeliveries.map((delivery) => (
              <Marker
                key={delivery.id}
                coordinate={delivery}
                title={delivery.title}
              >
                <Animated.View
                  style={[
                    styles.marker,
                    styles.markerActive,
                    { transform: [{ scale: pulseActive }] },
                  ]}
                >
                  <MapPin color="#fff" size={16} />
                </Animated.View>
              </Marker>
            ))}
          </GeolocationRoute>
        )}
      </View>

      {/* Info Panel */}
      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>
          Active Deliveries on Route: {activeDeliveries.length}
        </Text>
        <Text style={styles.infoStatus}>Tracking real-time progress</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9FAFB" },
  header: {
    height: 70,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 4,
  },
  headerTitle: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  mapContainer: { flex: 1, overflow: "hidden" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  marker: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  markerActive: { backgroundColor: COLORS?.primary || "#4CAF50" },
  infoCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  infoTitle: { fontSize: 15, fontWeight: "600", color: "#1F2937" },
  infoStatus: {
    color: COLORS?.primary || "#4CAF50",
    fontWeight: "600",
    fontSize: 13,
    marginTop: 6,
  },
});
