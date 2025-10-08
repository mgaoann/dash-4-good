import { View, Text, StyleSheet, TextInput, Alert, TouchableOpacity, ScrollView } from "react-native";
import Button from "../../components/Button";
import { useRouter } from "expo-router";
import { useState } from "react";

// TODO (Backend Auth):
//  - Create user in Auth and Firestore with role = "volunteer"
//  - Validate email/password, confirm password, phone format
//  - On success, route to VolunteerDashboard

export default function SignupVolunteer() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const update = (k, v) => setForm({ ...form, [k]: v });

  const onSignup = () => {
    if (!form.name || !form.email || !form.password) {
      Alert.alert("Missing info", "Please fill all required fields.");
      return;
    }
    // Need to properly implement account creation
    router.replace("/volunteer/VolunteerDashboard");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Create a Volunteer Account</Text>
      <TextInput style={styles.input} placeholder="Full name" placeholderTextColor="#6B7280" value={form.name} onChangeText={(v) => update("name", v)} />
      <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#6B7280" value={form.email} onChangeText={(v) => update("email", v)} autoCapitalize="none" />
      <TextInput style={styles.input} placeholder="Phone (optional)" placeholderTextColor="#6B7280" value={form.phone} onChangeText={(v) => update("phone", v)} />
      <TextInput style={styles.input} placeholder="Password" placeholderTextColor="#6B7280" value={form.password} onChangeText={(v) => update("password", v)} secureTextEntry />
      <Button title="Sign Up" onPress={onSignup} style={{ marginTop: 12 }} />
      <View style={styles.altRow}>
        <Text style={styles.altText}>Already have an account?</Text>
        <TouchableOpacity onPress={() => router.push("/auth/Login") }>
          <Text style={styles.altLink}> Log in</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 20, fontWeight: "700", color: "#1F2937", marginBottom: 16, textAlign: "center" },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: "#1F2937",
    marginBottom: 12,
  },
  altRow: { flexDirection: "row", justifyContent: "center", marginTop: 16 },
  altText: { color: "#6B7280", fontSize: 14 },
  altLink: { color: "#4CAF50", fontSize: 14, fontWeight: "600" },
});


