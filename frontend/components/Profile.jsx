import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function Profile() {
  return (
    <TouchableOpacity style={styles.profile}>
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
