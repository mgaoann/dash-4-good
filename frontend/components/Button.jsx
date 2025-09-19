import { LinearGradient } from "expo-linear-gradient";
import { TouchableOpacity } from "react-native";
import { StyleSheet, Text } from "react-native";
import { appGradient, SHADOWS } from "../styles/global";
export default function Button({
  title,
  onPress,

  height = 40,
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
        colors={appGradient.colors}
        start={appGradient.start}
        end={appGradient.end}
        style={[styles.gradient, { height }]}
      >
        <Text style={[styles.text, { lineHeight: height }, textStyle]}>
          {title}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 12,
    overflow: "hidden",
    ...SHADOWS.button,
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
    textAlign: "center",
  },
});
