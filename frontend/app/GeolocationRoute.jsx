// GeolocationRoute.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE, Polyline } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import * as Location from "expo-location";
import Constants from "expo-constants";

export default function GeolocationRoute({ dropoff, children, onRouteReady }) {
  const [pickup, setPickup] = useState(null);
  const [denied, setDenied] = useState(false);
  const [routeCoords, setRouteCoords] = useState([]);
  const mapRef = useRef(null);

  const API_KEY =
    Constants.expoConfig?.extra?.GOOGLE_MAPS_API_KEY ??
    Constants.manifest?.extra?.GOOGLE_MAPS_API_KEY ?? "";

  const dest = useMemo(
    () => dropoff || { latitude: 34.4262, longitude: -119.84 },
    [dropoff]
  );
  const origin = useMemo(() => (pickup ? { ...pickup } : null), [pickup]);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") return setDenied(true);
      const { coords } = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      setPickup({ latitude: coords.latitude, longitude: coords.longitude });
    })();
  }, []);

  if (denied) return <View style={s.center}><Text>Location permission denied.</Text></View>;
  if (!origin) return <View style={s.center}><ActivityIndicator /><Text>Getting your location…</Text></View>;

  return (
    <MapView
      ref={mapRef}
      style={StyleSheet.absoluteFill}
      provider={PROVIDER_GOOGLE}
      initialRegion={{
        latitude: origin.latitude,
        longitude: origin.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }}
    >
      <Marker coordinate={origin} pinColor="green" title="Pickup" />
      <Marker coordinate={dest} pinColor="red" title="Dropoff" />

      {!!API_KEY && (
        <MapViewDirections
          origin={origin}
          destination={dest}
          apikey={API_KEY}
          mode="DRIVING"
          strokeWidth={8}
          strokeColor="magenta"
          onReady={(res) => {
            setRouteCoords(res.coordinates);
            onRouteReady?.({
              distanceKm: res.distance,        // number (km)
              durationMin: res.duration,       // number (minutes)
              start: origin,
              end: dest,
            });
            setTimeout(() => {
              mapRef.current?.fitToCoordinates(res.coordinates, {
                edgePadding: { top: 80, right: 80, bottom: 80, left: 80 },
                animated: true,
              });
            }, 200);
          }}
          onError={(m) => console.warn("Directions error:", m)}
        />
      )}

      {routeCoords.length > 0 && (
        <Polyline
          coordinates={routeCoords}
          strokeWidth={8}
          strokeColor="magenta"
          lineJoin="round"
          lineCap="round"
        />
      )}

      {children}
    </MapView>
  );
}

const s = StyleSheet.create({
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
});
