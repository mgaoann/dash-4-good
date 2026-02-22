import React, { useEffect, useMemo, useRef, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import * as Location from "expo-location";

export default function GeolocationRoute({ dropoff, children, onRouteReady }) {
  const [pickup, setPickup] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [routeCoords, setRouteCoords] = useState([]);
  const mapRef = useRef(null);

  const ORS_KEY = process.env.EXPO_PUBLIC_ORS_API_KEY;

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      try {
        let location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });

        setPickup({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
      } catch (e) {
        setErrorMsg("Could not fetch your current location.");
      }
    })();
  }, []);

  const dest = useMemo(
    () => dropoff || { latitude: 34.4262, longitude: -119.84 },
    [dropoff],
  );

  const origin = pickup;

  useEffect(() => {
    if (!origin || !ORS_KEY) return;

    const fetchRoute = async () => {
      try {
        const url =
          `https://api.openrouteservice.org/v2/directions/driving-car?` +
          `api_key=${ORS_KEY}&start=${origin.longitude},${origin.latitude}` +
          `&end=${dest.longitude},${dest.latitude}`;

        const response = await fetch(url);
        const data = await response.json();

        const coords = data.features[0].geometry.coordinates.map(
          ([lng, lat]) => ({
            latitude: lat,
            longitude: lng,
          }),
        );

        setRouteCoords(coords);

        const summary = data.features[0].properties.summary;

        onRouteReady?.({
          distanceKm: summary.distance / 1000,
          durationMin: summary.duration / 60,
        });

        mapRef.current?.fitToCoordinates(coords, {
          edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
          animated: true,
        });
      } catch (err) {
        console.warn("ORS route error:", err);
      }
    };

    fetchRoute();
  }, [origin, dest]);

  if (errorMsg) {
    return (
      <View style={s.center}>
        <Text style={s.errorText}>{errorMsg}</Text>
      </View>
    );
  }

  if (!origin) {
    return (
      <View style={s.center}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text style={s.loadingText}>Locating you...</Text>
      </View>
    );
  }

  return (
    <View style={StyleSheet.absoluteFill}>
      <MapView
        ref={mapRef}
        style={StyleSheet.absoluteFill}
        showsUserLocation={true}
        initialRegion={{
          latitude: origin.latitude,
          longitude: origin.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {/* Origin */}
        <Marker coordinate={origin} title="My Location">
          <View style={s.originDot} />
        </Marker>

        {/* Destination */}
        <Marker coordinate={dest} pinColor="red" title="Dropoff" />

        {/* Route */}
        {routeCoords.length > 0 && (
          <Polyline
            coordinates={routeCoords}
            strokeWidth={6}
            strokeColor="#4CAF50"
          />
        )}

        {children}
      </MapView>

      {!ORS_KEY && (
        <View style={s.apiWarning}>
          <Text style={s.apiWarningText}>ORS API Key Missing</Text>
        </View>
      )}
    </View>
  );
}

const s = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  errorText: { color: "#dc2626", fontWeight: "600" },
  loadingText: { marginTop: 10, color: "#6B7280" },
  apiWarning: {
    position: "absolute",
    top: 50,
    alignSelf: "center",
    backgroundColor: "rgba(220,38,38,0.9)",
    padding: 10,
    borderRadius: 8,
  },
  apiWarningText: { color: "#fff", fontWeight: "bold", fontSize: 12 },
  originDot: {
    width: 15,
    height: 15,
    borderRadius: 8,
    backgroundColor: "#3B82F6",
    borderWidth: 3,
    borderColor: "#fff",
  },
});
