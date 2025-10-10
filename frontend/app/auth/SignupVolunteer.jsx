import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import Button from "../../components/Button";
import { useRouter } from "expo-router";
import { useState } from "react";

export default function SignupVolunteer() {
  const router = useRouter();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  });

  const update = (key, value) => setForm({ ...form, [key]: value });

  const onSignup = () => {
    if (!form.firstName || !form.lastName || !form.email || !form.password) {
      Alert.alert("Missing info", "Please fill all required fields.");
      return;
    }
    // TODO: implement actual account creation
    router.replace("/tabs-volunteer/home");
  };

  // Detect small vs large screen
  const screenWidth = Dimensions.get("window").width;
  const isSmallScreen = screenWidth < 380; // tweak breakpoint if needed

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Create a Volunteer Account</Text>

      {/* First Name & Last Name */}
      <View style={[styles.row, isSmallScreen && styles.column]}>
        <View style={styles.field}>
          <Text style={styles.label}>First Name *</Text>
          <TextInput
            style={styles.input}
            placeholder="Your First Name"
            placeholderTextColor="#6B7280"
            value={form.firstName}
            onChangeText={(v) => update("firstName", v)}
          />
        </View>

        <View style={[styles.field, !isSmallScreen && { marginLeft: 12 }]}>
          <Text style={styles.label}>Last Name *</Text>
          <TextInput
            style={styles.input}
            placeholder="Your Last Name"
            placeholderTextColor="#6B7280"
            value={form.lastName}
            onChangeText={(v) => update("lastName", v)}
          />
        </View>
      </View>

      {/* Email */}
      <View style={styles.field}>
        <Text style={styles.label}>Email *</Text>
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

      {/* Password */}
      <View style={styles.field}>
        <Text style={styles.label}>Password *</Text>
        <TextInput
          style={styles.input}
          placeholder="Your Password"
          placeholderTextColor="#6B7280"
          value={form.password}
          onChangeText={(v) => update("password", v)}
          secureTextEntry
        />
      </View>

      <Button title="Sign Up" onPress={onSignup} style={{ marginTop: 12 }} />

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
  container: { padding: 20 },
  title: {
    fontSize: 25,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 40,
    marginTop: 40,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    width: "100%",
  },
  column: {
    flexDirection: "column",
  },
  field: { flex: 1, marginBottom: 12 },
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
  altRow: { flexDirection: "row", justifyContent: "center", marginTop: 16 },
  altText: { color: "#6B7280", fontSize: 14 },
  altLink: { color: "#4CAF50", fontSize: 14, fontWeight: "600" },
});
