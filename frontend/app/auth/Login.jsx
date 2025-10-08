import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native";
import Button from "../../components/Button";
import { useRouter } from "expo-router";
import { useState } from "react";

// TODO (Backend Auth):
//  - Replace mock login with Firebase Auth (email/password)
//  - On success, fetch user role (volunteer|organization) from Firestore
//  - Route to respective dashboard based on role
//  - Handle error states and validation

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = () => {
    if (!email || !password) {
      Alert.alert("Missing info", "Enter email and password.");
      return;
    }
    // MOCK: Send everyone to volunteer by default; if email contains "org", send to organization
    if (email.toLowerCase().includes("org")) {
      router.replace("/organization/OrganizationDashboard");
    } else {
      router.replace("/volunteer/VolunteerDashboard");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email or Username"
        placeholderTextColor="#6B7280"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#6B7280"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Sign In" onPress={onLogin} style={{ marginTop: 12 }} />

      <View style={styles.altRow}>
        <Text style={styles.altText}>New here?</Text>
        <TouchableOpacity onPress={() => router.push("/") }>
          <Text style={styles.altLink}> Create an account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  title: { fontSize: 22, fontWeight: "700", color: "#1F2937", marginBottom: 16, textAlign: "center" },
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


