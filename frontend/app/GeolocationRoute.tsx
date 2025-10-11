import React, { useEffect, useRef, useState } from "react";
import MapView, { Marker, PROVIDER_GOOGLE, LatLng } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import * as Location from "expo-location";
import { View, StyleSheet, ActivityIndicator, Text } from "react-native";

const GOOGLE_MAPS_APIKEY = "YOUR_DIRECTIONS_API_KEY";

type Props = {
  dropoff?: LatLng;
};

export default function GeolocationRoute({ dropoff }: Props) {
  const [pickup, setPickup] = useState<LatLng | null>(null);
  const mapRef = useRef<MapView>(null);

  const dest: LatLng = dropoff ?? { latitude: 34.4262, longitude: -119.84 };

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") return;
      const loc = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
      setPickup({ latitude: loc.coords.latitude, longitude: loc.coords.longitude });
    })();
  }, []);

  if (!pickup) {
    return (
      <View style={styles.center}>
        <ActivityIndicator />
        <Text style={{ marginTop: 8 }}>Getting your location…</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: (pickup.latitude + dest.latitude) / 2,
          longitude: (pickup.longitude + dest.longitude) / 2,
          latitudeDelta: Math.max(Math.abs(pickup.latitude - dest.latitude) * 2, 0.05),
          longitudeDelta: Math.max(Math.abs(pickup.longitude - dest.longitude) * 2, 0.05),
        }}
      >
        <Marker coordinate={pickup} title="Pickup" />
        <Marker coordinate={dest} title="Dropoff" />
        <MapViewDirections
          origin={pickup}
          destination={dest}
          apikey={GOOGLE_MAPS_APIKEY}
          mode="DRIVING"
          strokeWidth={5}
          onReady={(res) => {
            mapRef.current?.fitToCoordinates(res.coordinates, {
              edgePadding: { top: 60, right: 60, bottom: 60, left: 60 },
              animated: true,
            });
          }}
          onError={(e) => console.warn("Directions error", e)}
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
});
