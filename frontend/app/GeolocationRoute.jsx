import React, { useEffect, useRef, useState } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import * as Location from "expo-location";
import Constants from "expo-constants";
import { View, StyleSheet, ActivityIndicator, Text } from "react-native";
const API_KEY = Constants.expoConfig?.extra?.GOOGLE_MAPS_API_KEY;


export default function GeolocationRoute({ dropoff, showDirections = true, children }) {
  const [pickup, setPickup] = useState(null);
  const [denied, setDenied] = useState(false);
  const [loading, setLoading] = useState(true);
  const mapRef = useRef(null);

  const dest = dropoff ?? { latitude: 34.4262, longitude: -119.84 };
  const API_KEY = Constants.expoConfig?.extra?.GOOGLE_MAPS_API_KEY;

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setDenied(true);
          setLoading(false);
          return;
        }

        const { coords } = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });
        setPickup({ latitude: coords.latitude, longitude: coords.longitude });
      } catch (e) {
        setDenied(true);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator />
        <Text style={{ marginTop: 8 }}>Getting your location…</Text>
      </View>
    );
  }

  if (denied) {
    return (
      <View style={styles.center}>
        <Text>Location permission denied. Enable it in settings to see the route.</Text>
      </View>
    );
  }

  return (
    <MapView
      ref={mapRef}
      provider={PROVIDER_GOOGLE}
      style={styles.map}
      initialRegion={{
        latitude: pickup?.latitude ?? dest.latitude,
        longitude: pickup?.longitude ?? dest.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }}
    >
      {pickup && <Marker coordinate={pickup} title="Pickup" />}
      {dest && <Marker coordinate={dest} title="Dropoff" />}
      {showDirections && pickup && dest && API_KEY && (
        <MapViewDirections
          origin={pickup}
          destination={dest}
          apikey={API_KEY}
          strokeWidth={5}
        />
      )}
      {/* allow injected markers */}
      {children}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: { flex: 1 },
  center: { flex: 1, alignItems: "center", justifyContent: "center", padding: 16 },
});
