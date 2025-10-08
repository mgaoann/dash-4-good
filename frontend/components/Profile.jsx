import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

// target: "volunteer" | "organization"
export default function Profile({ target = "volunteer" }) {
  const router = useRouter();
  const openProfile = () => {
    if (target === "organization") {
      router.push("/organization/OrganizationProfile");
      return;
    }
    router.push("/profilePage");
  };
  return (
    <TouchableOpacity onPress={openProfile} style={styles.profile}>
      <Text style={styles.profileText}>Profile</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  profile: {
    borderColor: "#56eb92ff",
    borderWidth: 1,
    width: 70,
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  profileText: {
    fontSize: 11,
  },
});
