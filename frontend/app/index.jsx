import { View, Text, StyleSheet, ScrollView } from "react-native";
import HeartCircle from "../components/HeartCircle";
import StatList from "../components/StatList";
import CardList from "../components/CardList";
import Button from "../components/Button";

export default function Index() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View
        style={{
          alignItems: "center",
        }}
      >
        <HeartCircle />
        <Text style={styles.heading}>Dash-4-Good</Text>
        <Text style={styles.subtitle}>
          Connecting communities to reduce food waste through volunteer
          deliveries
        </Text>
      </View>
      <CardList />
      <View style={styles.buttonStyle}>
        <Button
          title={"Get Started Today"}
          textStyle={{
            color: "#fff",
            fontWeight: "600",
            fontSize: 18,
          }}
        />
      </View>
      <View style={styles.stateContainer}>
        <StatList />
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    marginTop: 45,
    paddingBottom: 70,
    flexGrow: 1,
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
  buttonStyle: {
    marginTop: 20,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
});
