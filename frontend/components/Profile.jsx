import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { User, Building2 } from "lucide-react-native";
import { useRouter } from "expo-router";

// target: "volunteer" | "organization"
export default function Profile({ target = "volunteer", name = "User", imageUri = null }) {
  const router = useRouter();
  const openProfile = () => {
    if (target === "organization") {
      router.push("/organization/OrganizationProfile");
      return;
    }
    router.push("/profilePage");
  };

  // helper: derive initials from name
  const initials = (name || "").split(" ").map((p) => p[0]).join("").slice(0, 2).toUpperCase();

  return (
    <TouchableOpacity
      onPress={openProfile}
      style={styles.avatarWrap}
      accessibilityRole="button"
      accessibilityLabel="Open profile"
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
    >
      {imageUri ? (
        <Image source={{ uri: imageUri }} style={styles.avatarImage} />
      ) : target === "organization" ? (
        <View style={[styles.avatar, styles.orgAvatar]}>
          <Building2 size={20} color="#fff" />
        </View>
      ) : (
        <View style={[styles.avatar, styles.volAvatar]}>
          <User size={18} color="#fff" />
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  avatarWrap: {
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E6F9EE",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#56eb92ff",
  },
  volAvatar: {
    backgroundColor: "#22c55e",
  },
  orgAvatar: {
    backgroundColor: "#4CAF50",
  },
  avatarText: {
    color: "#065f46",
    fontWeight: "700",
  },
  avatarImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});
