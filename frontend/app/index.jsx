import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import HeartCircle from "../components/HeartCircle";
import CardList from "../components/CardList";
import Button from "../components/Button";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();

  const handleGetStarted = () => {
    // Directly navigate to the role selection page
    router.push("roleSelection");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={{ alignItems: "center" }}>
        <HeartCircle />
        <Text style={styles.heading}>Dash 4 Good</Text>
        <Text style={styles.subtitle}>
          Connecting communities to reduce food waste through volunteer deliveries
        </Text>
      </View>

      <CardList />

      <View style={styles.buttonStyle}>
        <Button
          title={"Get Started"}
          onPress={handleGetStarted}
          textStyle={{
            color: "#fff",
            fontWeight: "600",
            fontSize: 15,
          }}
        />
      </View>

      {/* Auth link for existing users */}
      <View style={styles.loginRow}>
        <Text style={styles.loginPrompt}>Already have an account?</Text>
        <TouchableOpacity onPress={() => router.push("auth/Login")}>
          <Text style={styles.loginLink}> Log in</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 45,
    paddingBottom: 70,
    flexGrow: 1,
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 35,
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
    fontSize: 20,
  },
  buttonStyle: {
    marginTop: 20,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  loginRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 28,
  },
  loginPrompt: {
    color: "#6B7280",
    fontSize: 14,
  },
  loginLink: {
    color: "#4CAF50",
    fontSize: 14,
    fontWeight: "600",
  },
});
