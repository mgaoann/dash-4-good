import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import Button from "../../components/Button";
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";

// Firebase imports
import { auth, db } from "../../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export default function EditVolunteerProfile() {
  const router = useRouter();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
  });

  // Custom UI states
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  // Load the current volunteer's data when the screen opens
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
            firstName: data.firstName || "",
            lastName: data.lastName || "",
            email: data.email || "",
            phone: data.phone || "",
            location: data.location || "",
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

    const safeFirst = form.firstName.trim();
    const safeLast = form.lastName.trim();
    const safeEmail = form.email.trim();

    // Custom Validation
    if (!safeFirst || !safeLast || !safeEmail) {
      setErrorMessage("First Name, Last Name, and Email are required.");
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
        firstName: safeFirst,
        lastName: safeLast,
        email: safeEmail,
        phone: form.phone.trim(),
        location: form.location.trim(),
      });

      // Navigate back to the Profile page on success
      router.back();
    } catch (error) {
      setErrorMessage(error.message);
      setIsLoading(false);
    }
  };

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
      <Text style={styles.title}>Edit Volunteer Info</Text>

      {/* Custom Error UI Banner */}
      {errorMessage !== "" && (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>{errorMessage}</Text>
          <TouchableOpacity onPress={() => setErrorMessage("")}>
            <Text style={styles.dismissText}>Dismiss</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.field}>
        <Text style={styles.label}>
          First Name <Text style={{ color: "#dc2626" }}>*</Text>
        </Text>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          value={form.firstName}
          onChangeText={(v) => update("firstName", v)}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>
          Last Name <Text style={{ color: "#dc2626" }}>*</Text>
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          value={form.lastName}
          onChangeText={(v) => update("lastName", v)}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>
          Email <Text style={{ color: "#dc2626" }}>*</Text>
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
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
          placeholder="Phone Number"
          value={form.phone}
          onChangeText={(v) => update("phone", v)}
          keyboardType="phone-pad"
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Location</Text>
        <TextInput
          style={styles.input}
          placeholder="Your general location/city"
          value={form.location}
          onChangeText={(v) => update("location", v)}
        />
      </View>

      <Button
        title={isLoading ? "Saving..." : "Save Changes"}
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
    backgroundColor: "#fff",
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
    marginBottom: 20,
    textAlign: "center",
  },
  errorBox: {
    backgroundColor: "#FEE2E2",
    borderWidth: 1,
    borderColor: "#F87171",
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  errorText: {
    color: "#B91C1C",
    fontSize: 13,
    fontWeight: "500",
    flex: 1,
  },
  dismissText: {
    color: "#B91C1C",
    fontWeight: "bold",
    marginLeft: 10,
  },
  field: {
    width: "100%",
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: "#1F2937",
  },
});
