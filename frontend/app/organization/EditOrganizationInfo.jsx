import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import Button from "../../components/Button";
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";

// Firebase imports
import { auth, db } from "../../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export default function EditOrganizationInfo() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    website: "",
    description: "",
  });

  // Custom UI states
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  // Load the current organization's data when the screen opens
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (!user) return;

        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setForm({
            name: data.name || "",
            email: data.email || "",
            phone: data.phone || "",
            website: data.website || "",
            description: data.description || "",
          });
        }
      } catch (error) {
        setErrorMessage("Failed to load profile data.");
      } finally {
        setIsFetching(false);
      }
    };

    fetchUserData();
  }, []);

  const update = (k, v) => {
    setForm({ ...form, [k]: v });
    if (errorMessage) setErrorMessage("");
  };

  const validateEmail = (emailStr) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(emailStr);
  };

  const onSave = async () => {
    setErrorMessage(""); // Reset error state

    const safeName = form.name.trim();
    const safeEmail = form.email.trim();

    // Custom Validation
    if (!safeName || !safeEmail) {
      setErrorMessage("Organization name and email are required.");
      return;
    }

    if (!validateEmail(safeEmail)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);

    try {
      const user = auth.currentUser;
      if (!user) throw new Error("No user is logged in.");

      // Update the specific fields in Firestore
      const docRef = doc(db, "users", user.uid);
      await updateDoc(docRef, {
        name: safeName,
        email: safeEmail,
        phone: form.phone.trim(),
        website: form.website.trim(),
        description: form.description.trim(),
      });

      // Navigate back to the Profile tab on success
      router.back();
    } catch (error) {
      setErrorMessage(error.message);
      setIsLoading(false);
    }
  };

  // Show a loading spinner while fetching the data initially
  if (isFetching) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text style={styles.loadingText}>Loading profile...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Edit Organization Info</Text>

      {/* Custom Error UI */}
      {errorMessage !== "" && (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>{errorMessage}</Text>
        </View>
      )}

      <View style={styles.field}>
        <Text style={styles.label}>
          Organization Name <Text style={{ color: "#dc2626" }}>*</Text>
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Organization Name"
          placeholderTextColor="#6B7280"
          value={form.name}
          onChangeText={(v) => update("name", v)}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>
          Email <Text style={{ color: "#dc2626" }}>*</Text>
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#6B7280"
          value={form.email}
          onChangeText={(v) => update("email", v)}
          autoCapitalize="none"
          keyboardType="email-address"
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Phone</Text>
        <TextInput
          style={styles.input}
          placeholder="Phone"
          placeholderTextColor="#6B7280"
          value={form.phone}
          onChangeText={(v) => update("phone", v)}
          keyboardType="phone-pad"
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Website</Text>
        <TextInput
          style={styles.input}
          placeholder="Website"
          placeholderTextColor="#6B7280"
          value={form.website}
          onChangeText={(v) => update("website", v)}
          autoCapitalize="none"
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Short description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="A short description about your organization"
          placeholderTextColor="#6B7280"
          value={form.description}
          onChangeText={(v) => update("description", v)}
          multiline
          numberOfLines={3}
        />
      </View>

      <Button
        title={isLoading ? "Saving Changes..." : "Save"}
        onPress={isLoading ? null : onSave}
        style={{ marginTop: 12 }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexGrow: 1,
    backgroundColor: "#F9FAFB",
  },
  centerContent: {
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    color: "#6B7280",
    fontSize: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 16,
    textAlign: "center",
  },
  errorBox: {
    width: "100%",
    backgroundColor: "#FEE2E2",
    borderWidth: 1,
    borderColor: "#F87171",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  errorText: {
    color: "#B91C1C",
    fontSize: 14,
    textAlign: "center",
    fontWeight: "500",
  },
  field: {
    width: "100%",
    marginBottom: 12,
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
    textAlignVertical: "top",
  },
});
