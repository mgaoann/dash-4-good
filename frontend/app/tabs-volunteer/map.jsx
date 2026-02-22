import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MapPin, Truck } from "lucide-react-native";
import { appGradient, COLORS } from "../../styles/global";
import GeolocationRoute from "../../app/GeolocationRoute";
import { Marker } from "react-native-maps";
import * as Location from "expo-location";

// Firebase imports
import { auth, db } from "../../firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";

// Helper functions for formatting time and distance
function fmtMins(min) {
  if (min == null) return "";
  const m = Math.floor(min);
  const s = Math.round((min - m) * 60);
  return s > 0 ? `${m} min ${s} s` : `${m} min`;
}
function fmtKm(km) {
  if (km == null) return "";
  return km < 1 ? `${Math.round(km * 1000)} m` : `${km.toFixed(1)} km`;
}

export default function MapTab() {
  const pulse = useRef(new Animated.Value(1)).current;
  const [etaMin, setEtaMin] = useState(null);
  const [distKm, setDistKm] = useState(null);
  const [activeDelivery, setActiveDelivery] = useState(null);
  const [dropoffCoords, setDropoffCoords] = useState(null);
  const [loading, setLoading] = useState(true);

  // Pulse animation for the marker
  useEffect(() => {
    const animate = (p) =>
      Animated.loop(
        Animated.sequence([
          Animated.timing(p, {
            toValue: 1.3,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(p, {
            toValue: 1.0,
            duration: 1000,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    animate(pulse);
  }, [pulse]);

  // Fetch active delivery from Firestore and geocode the address
  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      setLoading(false);
      return;
    }

    // Query for the volunteer's currently active delivery
    const q = query(
      collection(db, "requests"),
      where("volunteerId", "==", user.uid),
      where("status", "==", "in_progress"),
    );

    const unsubscribe = onSnapshot(q, async (snapshot) => {
      if (!snapshot.empty) {
        const delivery = {
          id: snapshot.docs[0].id,
          ...snapshot.docs[0].data(),
        };
        setActiveDelivery(delivery);

        // Convert the text address to map coordinates
        try {
          const geocoded = await Location.geocodeAsync(delivery.dropoff);
          if (geocoded.length > 0) {
            setDropoffCoords({
              latitude: geocoded[0].latitude,
              longitude: geocoded[0].longitude,
            });
          } else {
            setDropoffCoords({ latitude: 34.4127, longitude: -119.861 });
          }
        } catch (e) {
          // Fail silently and use fallback coordinates so the app doesn't crash
          setDropoffCoords({ latitude: 34.4127, longitude: -119.861 });
        }
      } else {
        // If they finish the delivery, clear the map
        setActiveDelivery(null);
        setDropoffCoords(null);
        setEtaMin(null);
        setDistKm(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={appGradient.colors}
        start={appGradient.start}
        end={appGradient.end}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Live Route</Text>
        <Truck color="#fff" size={24} />
      </LinearGradient>

      <View style={styles.mapContainer}>
        {loading ? (
          <View style={styles.center}>
            <ActivityIndicator size="large" color={COLORS.primary} />
          </View>
        ) : dropoffCoords ? (
          <GeolocationRoute
            dropoff={dropoffCoords}
            onRouteReady={({ distanceKm, durationMin }) => {
              setDistKm(distanceKm);
              setEtaMin(durationMin);
            }}
          >
            <Marker coordinate={dropoffCoords} title="Dropoff Location">
              <Animated.View
                style={[
                  styles.marker,
                  styles.markerActive,
                  { transform: [{ scale: pulse }] },
                ]}
              >
                <MapPin color="#fff" size={16} />
              </Animated.View>
            </Marker>
          </GeolocationRoute>
        ) : (
          <View style={styles.center}>
            <Text style={{ color: "#6B7280", fontSize: 16 }}>
              No active deliveries to route.
            </Text>
            <Text style={{ color: "#9CA3AF", fontSize: 14, marginTop: 4 }}>
              Claim a delivery on the Home tab first!
            </Text>
          </View>
        )}
      </View>

      <View style={styles.infoCard}>
        {activeDelivery ? (
          <>
            <Text style={styles.infoTitle}>{activeDelivery.title}</Text>
            <Text style={styles.infoSubtitle}>
              Routing to: {activeDelivery.dropoff}
            </Text>
            {etaMin != null && distKm != null ? (
              <>
                <Text style={styles.infoSubtitle}>
                  ETA {fmtMins(etaMin)} • {fmtKm(distKm)}
                </Text>
                <Text style={styles.infoStatus}>Live route active</Text>
              </>
            ) : (
              <>
                <Text style={styles.infoSubtitle}>Calculating route…</Text>
                <Text style={styles.infoStatus}>
                  Waiting for Directions API
                </Text>
              </>
            )}
          </>
        ) : (
          <Text style={styles.infoTitle}>Standby</Text>
        )}
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
  markerActive: { backgroundColor: "#3B82F6" },
  infoCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  infoTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 4,
  },
  infoSubtitle: { color: "#6B7280", fontSize: 13, marginTop: 2 },
  infoStatus: {
    color: COLORS?.primary || "#4CAF50",
    fontWeight: "600",
    fontSize: 13,
    marginTop: 6,
  },
});
