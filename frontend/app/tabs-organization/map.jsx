import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MapPin, Building2 } from "lucide-react-native";
import { appGradient, COLORS } from "../../styles/global";
import GeolocationRoute from "../GeolocationRoute"; 
import { Marker } from "react-native-maps";

export default function OrganizationMap() {
  const pulseActive1 = useRef(new Animated.Value(1)).current;
  const pulseActive2 = useRef(new Animated.Value(1)).current;

  const ACTIVE_DELIVERIES = [
    { latitude: 34.4189, longitude: -119.8526 },
    { latitude: 34.4098, longitude: -119.8462 },
  ];
  const COMPLETED_DELIVERIES = [{ latitude: 34.4145, longitude: -119.8501 }];

  const DROP_OFF = { latitude: 34.4127, longitude: -119.8610 };

  useEffect(() => {
    const animate = (pulse) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulse, { toValue: 1.3, duration: 1000, useNativeDriver: true }),
          Animated.timing(pulse, { toValue: 1.0, duration: 1000, useNativeDriver: true }),
        ])
      ).start();
    };
    animate(pulseActive1);
    animate(pulseActive2);
  }, [pulseActive1, pulseActive2]);

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

      {/* ✅ REAL MAP (no static Image) */}
      <View style={styles.mapContainer}>
        <GeolocationRoute dropoff={DROP_OFF} showDirections>
          {/* Inject your markers into the MapView */}
          {ACTIVE_DELIVERIES.map((coord, idx) => (
            <Marker key={`active-${idx}`} coordinate={coord} title="Active Delivery">
              <Animated.View
                style={[
                  styles.marker,
                  styles.markerActive,
                  { transform: [{ scale: idx === 0 ? pulseActive1 : pulseActive2 }] },
                ]}
              >
                <MapPin color="#fff" size={16} />
              </Animated.View>
            </Marker>
          ))}

          {COMPLETED_DELIVERIES.map((coord, idx) => (
            <Marker key={`completed-${idx}`} coordinate={coord} title="Completed Delivery">
              <View style={[styles.marker, styles.markerCompleted]}>
                <MapPin color="#fff" size={16} />
              </View>
            </Marker>
          ))}
        </GeolocationRoute>
      </View>

      {/* Info Panel */}
      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>Active Deliveries: {ACTIVE_DELIVERIES.length}</Text>
        <Text style={styles.infoSubtitle}>Completed: {COMPLETED_DELIVERIES.length}</Text>
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
  markerCompleted: { backgroundColor: "#6B7280" },
  infoCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  infoTitle: { fontSize: 15, fontWeight: "600", color: "#1F2937" },
  infoSubtitle: { color: "#6B7280", fontSize: 13, marginTop: 2 },
  infoStatus: {
    color: COLORS?.primary || "#4CAF50",
    fontWeight: "600",
    fontSize: 13,
    marginTop: 6,
  },
});
