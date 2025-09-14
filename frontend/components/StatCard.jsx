import { View, Text, StyleSheet } from "react-native";
export default function StatCard({ title, description }) {
  return (
    <View style={styles.card}>
      <View style={styles.container}>
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

    // Shadow (iOS)
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,

    // Shadow (Android)
    elevation: 4, // shadow-md
  },
  container: {
    alignItems: "center",
    marginVertical: 8,
    gap: 16,
  },
  textContainer: {
    flexShrink: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontWeight: "600", // font-semibold
    color: "#78d133ff", // text-gray-800
    fontSize: 16,
  },
  subtext: {
    fontSize: 14, // text-sm
    color: "#4B5563", // text-gray-600
    marginTop: 2,
  },
});
