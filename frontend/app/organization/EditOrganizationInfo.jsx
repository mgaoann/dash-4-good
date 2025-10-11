import { View, Text, StyleSheet, TextInput, ScrollView, Alert } from "react-native";
import Button from "../../components/Button";
import { useState } from "react";
import { useRouter } from "expo-router";
import { orgInfo } from "../../data/dummyOrganization";

// TODO (Backend):
//  - Load the logged-in organization's profile from Firestore
//  - Validate and persist updates
//  - Consider avatar/logo upload and address fields

export default function EditOrganizationInfo() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: orgInfo.name,
    email: orgInfo.email,
    phone: orgInfo.phone,
    website: orgInfo.website,
    description: orgInfo.description,
  });

  const update = (k, v) => setForm({ ...form, [k]: v });

  const onSave = () => {
    if (!form.name || !form.email) {
      Alert.alert("Missing info", "Organization name and email are required.");
      return;
    }
    // TODO (Backend): Persist to Firestore, then navigate back
    router.back();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Edit Organization Info</Text>

      <View style={styles.field}>
        <Text style={styles.label}>Organization Name <Text style={{ color: '#dc2626' }}>*</Text></Text>
        <TextInput style={styles.input} placeholder="Organization Name" placeholderTextColor="#6B7280" value={form.name} onChangeText={(v) => update("name", v)} />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Email <Text style={{ color: '#dc2626' }}>*</Text></Text>
        <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#6B7280" value={form.email} onChangeText={(v) => update("email", v)} autoCapitalize="none" />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Phone</Text>
        <TextInput style={styles.input} placeholder="Phone" placeholderTextColor="#6B7280" value={form.phone} onChangeText={(v) => update("phone", v)} />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Website</Text>
        <TextInput style={styles.input} placeholder="Website" placeholderTextColor="#6B7280" value={form.website} onChangeText={(v) => update("website", v)} autoCapitalize="none" />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Short description</Text>
        <TextInput style={[styles.input, styles.textArea]} placeholder="A short description about your organization" placeholderTextColor="#6B7280" value={form.description} onChangeText={(v) => update("description", v)} multiline numberOfLines={3} />
      </View>

      <Button title="Save" onPress={onSave} style={{ marginTop: 12 }} />
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
});


