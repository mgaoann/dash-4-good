import { LinearGradient } from "expo-linear-gradient";
import { TouchableOpacity } from "react-native";
import { StyleSheet, Text } from "react-native";
export default function Button({
  title,
  onPress,

  height = 50,
  style,
  textStyle,
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.buttonContainer, { height }, style]}
      testID="my-Button"
    >
      <LinearGradient
        colors={["#4CAF50", "#FFC107"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[styles.gradient, { height }]}
      >
        <Text style={[styles.text, textStyle]}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 12,
    overflow: "hidden",

    // Shadow (iOS)
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Shadow (Android)
    elevation: 4,
  },
  gradient: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
  },
  text: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
