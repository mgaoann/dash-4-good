import { View, Text, TextInput, ScrollView, Alert, StyleSheet } from "react-native";
import Button from "../../components/Button";
import { useRouter } from "expo-router";
import { useState } from "react";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

// Signup form for volunteers
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

  const onSignup = async () => {
    if (!form.firstName || !form.lastName || !form.email || !form.password) {
      Alert.alert("Missing info", "Please fill all required fields.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );
      const uid = userCredential.user.uid;

      await setDoc(doc(db, "users", uid), {
        role: "volunteer",
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        phone: form.phone || "",
        createdAt: serverTimestamp(),
      });

      router.replace("/tabs-volunteer/home");
    } catch (error) {
      Alert.alert("Signup Error", error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Your TextInputs, labels, and Button go here */}
      {/* First Name */}
      <View style={styles.field}>
        <Text style={styles.label}>First Name</Text>
        <TextInput
          style={styles.input}
          value={form.firstName}
          onChangeText={(v) => update("firstName", v)}
        />
      </View>

      {/* Last Name */}
      <View style={styles.field}>
        <Text style={styles.label}>Last Name</Text>
        <TextInput
          style={styles.input}
          value={form.lastName}
          onChangeText={(v) => update("lastName", v)}
        />
      </View>

      {/* Email */}
      <View style={styles.field}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={form.email}
          onChangeText={(v) => update("email", v)}
        />
      </View>

      {/* Phone */}
      <View style={styles.field}>
        <Text style={styles.label}>Phone</Text>
        <TextInput
          style={styles.input}
          value={form.phone}
          onChangeText={(v) => update("phone", v)}
        />
      </View>

      {/* Password */}
      <View style={styles.field}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          value={form.password}
          onChangeText={(v) => update("password", v)}
          secureTextEntry
        />
      </View>

      <Button title="Sign Up" onPress={onSignup} />

    </ScrollView>
  );
}

const styles = StyleSheet.create({
 container: {
    padding: 20
  },
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
