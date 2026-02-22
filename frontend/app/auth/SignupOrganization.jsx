import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView, 
  Platform,
} from "react-native";
import Button from "../../components/Button";
import { useRouter } from "expo-router";
import { useState } from "react";

// Firebase imports
import { auth, db } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

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

  // Custom UI states for error handling and loading
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const update = (k, v) => {
    setForm({ ...form, [k]: v });
    // Clear error message when the user starts typing again
    if (errorMessage) setErrorMessage("");
  };

  const onSignup = async () => {
    setErrorMessage(""); // Reset error state

    // 1. Clean up inputs
    const safeOrgName = form.orgName.trim();
    const safeEmail = form.email.trim();
    const safePassword = form.password;

    // 2. Custom Validation: Empty Fields
    if (!safeOrgName || !safeEmail || !safePassword) {
      setErrorMessage("Organization Name, Email, and Password are required.");
      return;
    }

    // 3. Custom Validation: Email Format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(safeEmail)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    // 4. Custom Validation: Password Length
    if (safePassword.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      return;
    }

    setIsLoading(true);

    try {
      // Create the user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        safeEmail,
        safePassword,
      );
      const uid = userCredential.user.uid;

      // Save the organization profile to Firestore
      await setDoc(doc(db, "users", uid), {
        role: "organization",
        name: safeOrgName,
        email: safeEmail,
        phone: form.phone.trim(),
        website: form.website.trim(),
        description: form.description.trim(),
        createdAt: new Date().toISOString(),
      });

      // Navigate to Dashboard on success
      router.replace("/tabs-organization/home");
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
   
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#F9FAFB" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled" 
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>
          Register an Account for an Organization
        </Text>

        {/* Custom Error UI */}
        {errorMessage !== "" && (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>{errorMessage}</Text>
          </View>
        )}

        {/* Organization Name */}
        <View style={styles.field}>
          <Text style={styles.label}>
            Organization Name <Text style={{ color: "#dc2626" }}>*</Text>
          </Text>
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
          <Text style={styles.label}>
            Email <Text style={{ color: "#dc2626" }}>*</Text>
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Your Email"
            placeholderTextColor="#6B7280"
            value={form.email}
            onChangeText={(v) => update("email", v)}
            autoCapitalize="none"
            keyboardType="email-address"
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
            keyboardType="phone-pad"
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
          <Text style={styles.label}>
            Password <Text style={{ color: "#dc2626" }}>*</Text>
          </Text>
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
          <Button
            title={isLoading ? "Creating Account..." : "Sign Up"}
            onPress={isLoading ? null : onSignup}
          />
        </View>

        <View style={styles.altRow}>
          <Text style={styles.altText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => router.push("/auth/Login")}>
            <Text style={styles.altLink}> Log in</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 100, // Fix 3: Increased bottom padding for the long form
    flexGrow: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 25,
    fontWeight: "700",
    color: "#1F2937",
    marginTop: 40,
    marginBottom: 20,
    textAlign: "center",
  },
  errorBox: {
    width: "100%",
    backgroundColor: "#FEE2E2",
    borderWidth: 1,
    borderColor: "#F87171",
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  errorText: {
    color: "#B91C1C",
    fontSize: 14,
    textAlign: "center",
    fontWeight: "500",
  },
  field: { width: "100%", marginBottom: 12 },
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
  textArea: { height: 100, textAlignVertical: "top" },
  buttonWrapper: { width: "100%", marginTop: 12 },
  altRow: { flexDirection: "row", justifyContent: "center", marginTop: 16 },
  altText: { color: "#6B7280", fontSize: 14 },
  altLink: { color: "#4CAF50", fontSize: 14, fontWeight: "600" },
});
