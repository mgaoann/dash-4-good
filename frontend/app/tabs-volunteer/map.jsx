import { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MapPin, Truck } from "lucide-react-native";
import { appGradient, COLORS } from "../../styles/global";

export default function MapTab() {
  // Animated pulsing for markers
  const pulse1 = useRef(new Animated.Value(1)).current;
  const pulse2 = useRef(new Animated.Value(1)).current;

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
    animate(pulse1);
    animate(pulse2);
  }, []);

  return (
    <View style={styles.container}>
      {/* Gradient header */}
      <LinearGradient
        colors={appGradient.colors}
        start={appGradient.start}
        end={appGradient.end}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Nearby Deliveries</Text>
        <Truck color="#fff" size={24} />
      </LinearGradient>

      {/* Map background */}
      <View style={styles.mapContainer}>
        <Image
          source={{
            uri: "https://i.ibb.co/7k0rM4v/mock-map-bg.png",
          }}
          style={styles.mapImage}
          resizeMode="cover"
        />

        {/* Marker 1 - Available */}
        <Animated.View
          style={[
            styles.marker,
            styles.markerAvailable,
            {
              top: "45%",
              left: "30%",
              transform: [{ scale: pulse1 }],
            },
          ]}
        >
          <MapPin color="#fff" size={16} />
        </Animated.View>

        {/* Marker 2 - In Progress */}
        <Animated.View
          style={[
            styles.marker,
            styles.markerActive,
            {
              top: "60%",
              left: "65%",
              transform: [{ scale: pulse2 }],
            },
          ]}
        >
          <MapPin color="#fff" size={16} />
        </Animated.View>
      </View>

      {/* Info panel */}
      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>Sunrise Bakery → Hope Shelter</Text>
        <Text style={styles.infoSubtitle}>3 km • 15 min away</Text>
        <Text style={styles.infoStatus}>Status: Available</Text>
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
  markerAvailable: {
    backgroundColor: COLORS.primary || "#4CAF50",
  },
  markerActive: {
    backgroundColor: "#3B82F6",
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
