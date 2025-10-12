// MapTab.jsx
import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MapPin, Truck } from "lucide-react-native";
import { appGradient, COLORS } from "../../styles/global";
import GeolocationRoute from "../GeolocationRoute";
import { Marker } from "react-native-maps";

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
  const pulse1 = useRef(new Animated.Value(1)).current;
  const pulse2 = useRef(new Animated.Value(1)).current;

  const [etaMin, setEtaMin] = useState(null);
  const [distKm, setDistKm] = useState(null);

  useEffect(() => {
    const animate = (p) =>
      Animated.loop(
        Animated.sequence([
          Animated.timing(p, { toValue: 1.3, duration: 1000, useNativeDriver: true }),
          Animated.timing(p, { toValue: 1.0, duration: 1000, useNativeDriver: true }),
        ])
      ).start();
    animate(pulse1);
    animate(pulse2);
  }, [pulse1, pulse2]);

  const DROP_OFF = { latitude: 34.4127, longitude: -119.8610 };
  const AVAILABLE = { latitude: 34.4189, longitude: -119.8526 };
  const IN_PROGRESS = { latitude: 34.4098, longitude: -119.8462 };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={appGradient.colors}
        start={appGradient.start}
        end={appGradient.end}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Nearby Deliveries</Text>
        <Truck color="#fff" size={24} />
      </LinearGradient>

      <View style={styles.mapContainer}>
        <GeolocationRoute
          dropoff={DROP_OFF}
          onRouteReady={({ distanceKm, durationMin }) => {
            setDistKm(distanceKm);
            setEtaMin(durationMin);
          }}
        >
          <Marker coordinate={AVAILABLE} title="Available">
            <Animated.View style={[styles.marker, styles.markerAvailable, { transform: [{ scale: pulse1 }] }]}>
              <MapPin color="#fff" size={16} />
            </Animated.View>
          </Marker>

          <Marker coordinate={IN_PROGRESS} title="In Progress">
            <Animated.View style={[styles.marker, styles.markerActive, { transform: [{ scale: pulse2 }] }]}>
              <MapPin color="#fff" size={16} />
            </Animated.View>
          </Marker>
        </GeolocationRoute>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>Your Location → Dropoff</Text>
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
            <Text style={styles.infoStatus}>Waiting for Directions API</Text>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9FAFB" },
  header: {
    height: 70, flexDirection: "row", alignItems: "center", justifyContent: "space-between",
    paddingHorizontal: 20, borderBottomLeftRadius: 20, borderBottomRightRadius: 20, elevation: 4,
  },
  headerTitle: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  mapContainer: { flex: 1, overflow: "hidden" },
  marker: {
    width: 40, height: 40, borderRadius: 20, justifyContent: "center", alignItems: "center",
    shadowColor: "#000", shadowOpacity: 0.2, shadowRadius: 4,
  },
  markerAvailable: { backgroundColor: COLORS?.primary || "#4CAF50" },
  markerActive: { backgroundColor: "#3B82F6" },
  infoCard: { backgroundColor: "#fff", padding: 16, borderTopWidth: 1, borderTopColor: "#E5E7EB" },
  infoTitle: { fontSize: 15, fontWeight: "600", color: "#1F2937" },
  infoSubtitle: { color: "#6B7280", fontSize: 13, marginTop: 2 },
  infoStatus: { color: COLORS?.primary || "#4CAF50", fontWeight: "600", fontSize: 13, marginTop: 6 },
});
