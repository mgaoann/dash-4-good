import { View, Text, StyleSheet, TextInput, Alert, TouchableOpacity, ScrollView } from "react-native";
import Button from "../../components/Button";
import { useRouter } from "expo-router";
import { useState } from "react";

// TODO (Backend Auth):
//  - Create organization user with role = "organization"
//  - Store org profile (name, email, phone, website, description)
//  - On success, route to OrganizationDashboard

export default function SignupOrganization() {
  const router = useRouter();
  const [form, setForm] = useState({
    orgName: "",
    email: "",
    phone: "",
    website: "",
    description: "",
    password: "",
  });

  const update = (k, v) => setForm({ ...form, [k]: v });

  const onSignup = () => {
    if (!form.orgName || !form.email || !form.password) {
      Alert.alert("Missing info", "Organization name, email and password are required.");
      return;
    }
    // Need to properly implement creation
    router.replace("/organization/OrganizationDashboard");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Register an Account for an Organization</Text>
      <TextInput style={styles.input} placeholder="Organization name" placeholderTextColor="#6B7280" value={form.orgName} onChangeText={(v) => update("orgName", v)} />
      <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#6B7280" value={form.email} onChangeText={(v) => update("email", v)} autoCapitalize="none" />
      <TextInput style={styles.input} placeholder="Phone (optional)" placeholderTextColor="#6B7280" value={form.phone} onChangeText={(v) => update("phone", v)} />
      <TextInput style={styles.input} placeholder="Website (optional)" placeholderTextColor="#6B7280" value={form.website} onChangeText={(v) => update("website", v)} autoCapitalize="none" />
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Short description (optional)"
        placeholderTextColor="#6B7280"
        value={form.description}
        onChangeText={(v) => update("description", v)}
        multiline
        numberOfLines={3}
      />
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
  textArea: { height: 100, textAlignVertical: "top" },
  altRow: { flexDirection: "row", justifyContent: "center", marginTop: 16 },
  altText: { color: "#6B7280", fontSize: 14 },
  altLink: { color: "#4CAF50", fontSize: 14, fontWeight: "600" },
});


