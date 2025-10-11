import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import Button from "../../components/Button";
import { useState } from "react";
import { useRouter } from "expo-router";

// TODO (Backend): Load logged-in volunteer data from Firestore
export default function EditVolunteerProfile() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    phone: "(555) 123-4567",
    location: "Downtown District, City",
  });

  const update = (k, v) => setForm({ ...form, [k]: v });

  const onSave = () => {
    if (!form.name || !form.email) {
      Alert.alert("Missing info", "Name and email are required.");
      return;
    }
    // TODO: Persist to Firestore, then navigate back
    router.back();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Edit Volunteer Info</Text>
      <TextInput
        style={styles.input}
        placeholder="Full name"
        value={form.name}
        onChangeText={(v) => update("name", v)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={form.email}
        onChangeText={(v) => update("email", v)}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Phone"
        value={form.phone}
        onChangeText={(v) => update("phone", v)}
      />
      <TextInput
        style={styles.input}
        placeholder="Location"
        value={form.location}
        onChangeText={(v) => update("location", v)}
      />
      <Button title="Save" onPress={onSave} style={{ marginTop: 12 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 16,
    textAlign: "center",
  },
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
});
