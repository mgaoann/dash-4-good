import { View, Text, StyleSheet } from "react-native";
import HeartCircle from "../components/HeartCircle";

import CardList from "../components/CardList";

export default function Index() {
  return (
    <View style={styles.container}>
      <HeartCircle />
      <Text style={styles.heading}>Dash-4-Good</Text>
      <Text style={styles.subtitle}>
        Connecting communities to reduce food waste through volunteer deliveries
      </Text>
      <CardList />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: "center",
    marginTop: 45,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
  },
  subtitle: {
    paddingHorizontal: 30,
    marginTop: 10,
    textAlign: "center",
    color: "#475569",
    marginBottom: 32,
    maxWidth: 384,
    alignSelf: "center",
  },
});
