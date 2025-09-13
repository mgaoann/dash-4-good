import { LinearGradient } from "expo-linear-gradient";
import { Heart } from "lucide-react-native";

export default function HeartCircle() {
  return (
    <LinearGradient
      colors={["#4CAF50", "#FFC107"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={{
        width: 96,
        height: 96,
        borderRadius: 48,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 24,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
      }}
    >
      <Heart size={48} color="#FFFFFF" />
    </LinearGradient>
  );
}
