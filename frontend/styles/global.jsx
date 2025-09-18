import { StyleSheet } from "react-native";

export const COLORS = {
  primary: "#4CAF50", // Green
  secondary: "#FFC107", // Yellow
  textPrimary: "#333333", // Dark gray
  textSecondary: "#666666", // Light gray
  background: "#F7F7F7", // Light gray background
  white: "#FFFFFF",
  pending: "#FFF3CD", // Status colors
  claimed: "#D4EDDA",
  completed: "#C3E6CB",
};
export const appGradient = {
  colors: ["#4CAF50", "#FFC107"], // green to yellow
  start: { x: 0, y: 0 },
  end: { x: 1, y: 0 },
};

export const SIZES = {
  padding: 16,
  margin: 16,
  borderRadius: 10,
  buttonHeight: 50,
  iconSize: 24,
};

export const FONTS = {
  regular: "System",
  bold: "System",
  largeTitle: { fontSize: 28, fontWeight: "700" },
  title: { fontSize: 22, fontWeight: "600" },
  subtitle: { fontSize: 16, fontWeight: "400" },
  body: { fontSize: 14, fontWeight: "400" },
};

export const SHADOWS = {
  card: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Android shadow
  },
  button: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
};

export const GLOBAL_STYLES = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: SIZES.padding,
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
});
