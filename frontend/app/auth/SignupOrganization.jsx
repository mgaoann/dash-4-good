import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  TouchableOpacity,
  ScrollView,
} from "react-native";
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
      Alert.alert(
        "Missing info",
        "Organization Name, email and password are required."
      );
      return;
    }
    // Need to properly implement creation
    router.replace("/tabs-organization/home");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Register an Account for an Organization</Text>

      {/* Organization Name */}
      <View style={styles.field}>
        <Text style={styles.label}>Organization Name <Text style={{ color: '#dc2626' }}>*</Text></Text>
        <TextInput
          style={styles.input}
          placeholder="Organization name"
          placeholderTextColor="#6B7280"
          value={form.orgName}
          onChangeText={(v) => update("orgName", v)}
        />
      </View>

      {/* Email */}
      <View style={styles.field}>
        <Text style={styles.label}>Email <Text style={{ color: '#dc2626' }}>*</Text></Text>
        <TextInput
          style={styles.input}
          placeholder="Your Email"
          placeholderTextColor="#6B7280"
          value={form.email}
          onChangeText={(v) => update("email", v)}
          autoCapitalize="none"
        />
      </View>

      {/* Phone */}
      <View style={styles.field}>
        <Text style={styles.label}>Phone (optional)</Text>
        <TextInput
          style={styles.input}
          placeholder="Your Phone Number"
          placeholderTextColor="#6B7280"
          value={form.phone}
          onChangeText={(v) => update("phone", v)}
        />
      </View>

      {/* Website */}
      <View style={styles.field}>
        <Text style={styles.label}>Website (optional)</Text>
        <TextInput
          style={styles.input}
          placeholder="Website URL"
          placeholderTextColor="#6B7280"
          value={form.website}
          onChangeText={(v) => update("website", v)}
          autoCapitalize="none"
        />
      </View>

      {/* Description */}
      <View style={styles.field}>
        <Text style={styles.label}>Short Description (optional)</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Tell us about your organization"
          placeholderTextColor="#6B7280"
          value={form.description}
          onChangeText={(v) => update("description", v)}
          multiline
          numberOfLines={3}
        />
      </View>

      {/* Password */}
      <View style={styles.field}>
        <Text style={styles.label}>Password <Text style={{ color: '#dc2626' }}>*</Text></Text>
        <TextInput
          style={styles.input}
          placeholder="Your Password"
          placeholderTextColor="#6B7280"
          value={form.password}
          onChangeText={(v) => update("password", v)}
          secureTextEntry
        />
      </View>

      {/* Full-width Sign Up button */}
      <View style={styles.buttonWrapper}>
        <Button title="Sign Up" onPress={onSignup} />
      </View>

      <View style={styles.altRow}>
        <Text style={styles.altText}>Already have an account?</Text>
        <TouchableOpacity onPress={() => router.push("/auth/Login")}>
          <Text style={styles.altLink}> Log in</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 70,
    flexGrow: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 25,
    fontWeight: "700",
    color: "#1F2937",
    marginTop: 40,
    marginBottom: 30,
    textAlign: "center",
  },
  field: {
    width: "100%",
    marginBottom: 12
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 4,
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: "#1F2937",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top"
  },
  buttonWrapper: {
    width: "100%",
    marginTop: 12
  },
  altRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 16
  },
  altText: {
    color: "#6B7280",
    fontSize: 14
  },
  altLink: {
    color: "#4CAF50",
    fontSize: 14,
    fontWeight: "600"
  },
});
