import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MapPin, Building2 } from "lucide-react-native";
import { appGradient, COLORS } from "../../styles/global";
import GeolocationRoute from "../GeolocationRoute";
import { Marker } from "react-native-maps";


export default function OrganizationMap() {
  // Animated pulsing for active deliveries
  const ACTIVE_DELIVERIES = [
    { latitude: 34.4189, longitude: -119.8526 },
    { latitude: 34.4098, longitude: -119.8462 },
  ];
  const COMPLETED_DELIVERIES = [
    { latitude: 34.4145, longitude: -119.8501 },
  ];

  const DROP_OFF = { latitude: 34.4127, longitude: -119.8610 };

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
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };
    animate(pulseActive1);
    animate(pulseActive2);
  }, []);

  return (
    <View style={styles.container}>
      {/* Gradient Header */}
      <LinearGradient
        colors={appGradient.colors}
        start={appGradient.start}
        end={appGradient.end}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Delivery Map Overview</Text>
        <Building2 color="#fff" size={24} />
      </LinearGradient>

      {/* Map Background */}
      <View style={styles.mapContainer}>
        <Image
          source={{
            uri: "https://i.ibb.co/7k0rM4v/mock-map-bg.png",
          }}
          style={styles.mapImage}
          resizeMode="cover"
        />

        {/* Active Deliveries (Animated) */}
        <Animated.View
          style={[
            styles.marker,
            styles.markerActive,
            {
              top: "40%",
              left: "35%",
              transform: [{ scale: pulseActive1 }],
            },
          ]}
        >
          <MapPin color="#fff" size={16} />
        </Animated.View>

        <Animated.View
          style={[
            styles.marker,
            styles.markerActive,
            {
              top: "60%",
              left: "70%",
              transform: [{ scale: pulseActive2 }],
            },
          ]}
        >
          <MapPin color="#fff" size={16} />
        </Animated.View>

        {/* Completed Deliveries (Static gray) */}
        <View
          style={[
            styles.marker,
            styles.markerCompleted,
            { top: "55%", left: "45%" },
          ]}
        >
          <MapPin color="#fff" size={16} />
        </View>
      </View>

      {/* Info Panel */}
      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>Active Deliveries: 2</Text>
        <Text style={styles.infoSubtitle}>Completed: 1</Text>
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
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  mapContainer: {
    flex: 1,
    overflow: "hidden",
  },
  mapImage: {
    width: "100%",
    height: "100%",
  },
  marker: {
    position: "absolute",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  markerActive: {
    backgroundColor: COLORS.primary || "#4CAF50",
  },
  markerCompleted: {
    backgroundColor: "#6B7280",
  },
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
  },
  infoSubtitle: {
    color: "#6B7280",
    fontSize: 13,
    marginTop: 2,
  },
  infoStatus: {
    color: COLORS.primary || "#4CAF50",
    fontWeight: "600",
    fontSize: 13,
    marginTop: 6,
  },
});
