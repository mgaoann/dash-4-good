import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { appGradient, SHADOWS } from "../styles/global";

export default function Card({ icon, title, description }) {
  return (
    <View style={styles.card}>
      <View style={styles.container}>
        {/* Gradient Circle with Icon */}
        <LinearGradient
          colors={appGradient.colors}
          start={appGradient.start}
          end={appGradient.end}
          style={styles.iconCircle}
        >
          {icon}
        </LinearGradient>

        {/* Text Content */}
        <View style={styles.textContainer}>
          <Text style={styles.heading}>{title}</Text>
          <Text style={styles.subtext}>{description}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 24, // p-6
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 0,
    width: "85%",
    alignSelf: "center",
    ...SHADOWS.card,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
    gap: 16,
  },
  iconCircle: {
    width: 48, // w-12
    height: 48, // h-12
    borderRadius: 24, // rounded-full
    justifyContent: "center", // center icon vertically
    alignItems: "center", // center icon horizontally
  },
  textContainer: {
    flexShrink: 1, // allow text to wrap
  },
  heading: {
    fontWeight: "600", // font-semibold
    color: "#1F2937", // text-gray-800
    fontSize: 16,
  },
  subtext: {
    fontSize: 14, // text-sm
    color: "#4B5563", // text-gray-600
    marginTop: 2,
  },
});
