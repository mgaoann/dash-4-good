import { LinearGradient } from "expo-linear-gradient";
import { Heart } from "lucide-react-native";
import { appGradient } from "../styles/global";

export default function HeartCircle() {
  return (
    <LinearGradient
      colors={appGradient.colors}
      start={appGradient.start}
      end={appGradient.end}
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
