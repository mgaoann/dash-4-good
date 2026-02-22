import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
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

export default function SignupVolunteer() {
  const router = useRouter();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  });

  // Custom UI states for error handling and loading
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const update = (key, value) => {
    setForm({ ...form, [key]: value });
    // Clear error message when the user starts typing again
    if (errorMessage) setErrorMessage("");
  };

  const onSignup = async () => {
    setErrorMessage(""); // Reset error state

    // 1. Clean up inputs
    const safeFirstName = form.firstName.trim();
    const safeLastName = form.lastName.trim();
    const safeEmail = form.email.trim();
    const safePassword = form.password;

    // 2. Custom Validation: Empty Fields
    if (!safeFirstName || !safeLastName || !safeEmail || !safePassword) {
      setErrorMessage(
        "First Name, Last Name, Email, and Password are required.",
      );
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

      // Save the volunteer profile to Firestore
      await setDoc(doc(db, "users", uid), {
        role: "volunteer",
        firstName: safeFirstName,
        lastName: safeLastName,
        email: safeEmail,
        phone: form.phone.trim(),
        createdAt: new Date().toISOString(),
      });

      // Navigate to Dashboard on success
      router.replace("/tabs-volunteer/home");
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Detect small vs large screen
  const screenWidth = Dimensions.get("window").width;
  const isSmallScreen = screenWidth < 380;

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
        <Text style={styles.title}>Create a Volunteer Account</Text>

        {/* Custom Error UI */}
        {errorMessage !== "" && (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>{errorMessage}</Text>
          </View>
        )}

        {/* First Name & Last Name */}
        <View style={[styles.row, isSmallScreen && styles.column]}>
          <View style={styles.field}>
            <Text style={styles.label}>
              First Name <Text style={{ color: "#dc2626" }}>*</Text>
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Your First Name"
              placeholderTextColor="#6B7280"
              value={form.firstName}
              onChangeText={(v) => update("firstName", v)}
            />
          </View>

          <View style={[styles.field, !isSmallScreen && { marginLeft: 12 }]}>
            <Text style={styles.label}>
              Last Name <Text style={{ color: "#dc2626" }}>*</Text>
            </Text>
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

        <Button
          title={isLoading ? "Creating Account..." : "Sign Up"}
          onPress={isLoading ? null : onSignup}
          style={{ marginTop: 12 }}
        />

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
    flexGrow: 1,
    paddingBottom: 100, // Fix 3: Added deeper padding for the bottom layout
  },
  title: {
    fontSize: 25,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 20,
    marginTop: 40,
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
