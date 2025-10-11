import { View, Text, StyleSheet, Modal, TextInput, TouchableOpacity, ScrollView, Alert } from "react-native";
import { X, MapPin, Package, Clock } from "lucide-react-native";
import Button from "./Button";
import { useState, useEffect } from "react";

// TODO (Backend):
//  - Load existing request by id/orgId from Firestore into this editor
//  - Save edits back to Firestore and trigger updates for volunteers

export default function EditRequestModal({ visible, onClose, request, onSave }) {
  const [formData, setFormData] = useState({ title: "", pickup: "", dropoff: "", items: "", description: "", estimatedTime: "" });

  useEffect(() => {
    if (request) {
      setFormData({
        title: request.title || "",
        pickup: request.pickup || "",
        dropoff: request.dropoff || "",
        items: request.items || "",
        description: request.description || "",
        estimatedTime: request.estimatedTime || "",
      });
    }
  }, [request]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!formData.title || !formData.pickup || !formData.dropoff || !formData.items) {
      Alert.alert("Missing Information", "Please fill in all required fields.");
      return;
    }
    const updated = { ...request, ...formData };
    // TODO (Backend): persist update
    if (onSave) onSave(updated);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Edit Request</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <X size={24} color="#6B7280" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Title *</Text>
            <TextInput style={styles.input} placeholder="e.g., Fresh Produce Delivery" placeholderTextColor="#6B7280" value={formData.title} onChangeText={(v) => handleInputChange("title", v)} />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Pickup *</Text>
            <View style={styles.inputWithIcon}>
              <MapPin size={20} color="#6B7280" style={styles.inputIcon} />
              <TextInput style={[styles.input, styles.inputWithIconText]} placeholder="e.g., Farmers Market" placeholderTextColor="#6B7280" value={formData.pickup} onChangeText={(v) => handleInputChange("pickup", v)} />
            </View>
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Dropoff *</Text>
            <View style={styles.inputWithIcon}>
              <MapPin size={20} color="#6B7280" style={styles.inputIcon} />
              <TextInput style={[styles.input, styles.inputWithIconText]} placeholder="e.g., Downtown Food Bank" placeholderTextColor="#6B7280" value={formData.dropoff} onChangeText={(v) => handleInputChange("dropoff", v)} />
            </View>
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Items *</Text>
            <View style={styles.inputWithIcon}>
              <Package size={20} color="#6B7280" style={styles.inputIcon} />
              <TextInput style={[styles.input, styles.inputWithIconText]} placeholder="e.g., 10 bags of fruits" placeholderTextColor="#6B7280" value={formData.items} onChangeText={(v) => handleInputChange("items", v)} />
            </View>
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Details</Text>
            <TextInput style={[styles.input, styles.textArea]} placeholder="Any special instructions..." placeholderTextColor="#6B7280" value={formData.description} onChangeText={(v) => handleInputChange("description", v)} multiline numberOfLines={3} />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Estimated Time</Text>
            <View style={styles.inputWithIcon}>
              <Clock size={20} color="#6B7280" style={styles.inputIcon} />
              <TextInput style={[styles.input, styles.inputWithIconText]} placeholder="e.g., 20 minutes" placeholderTextColor="#6B7280" value={formData.estimatedTime} onChangeText={(v) => handleInputChange("estimatedTime", v)} />
            </View>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
          <Button title="Save Changes" onPress={handleSubmit} style={styles.submitButton} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB"
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB"
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937"
  },
  closeButton: {
    padding: 4
  },
  content: {
    flex: 1,
    padding: 20
  },
  inputGroup: {
    marginBottom: 20
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#374151",
    marginBottom: 8
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: "#1F2937"
  },
  inputWithIcon: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    paddingHorizontal: 12
  },
  inputIcon: {
    marginRight: 8
  },
  inputWithIconText: {
    flex: 1,
    borderWidth: 0,
    padding: 12,
    paddingLeft: 0
  },
  textArea: {
    height: 80,
    textAlignVertical: "top"
  },
  footer: {
    flexDirection: "row",
    padding: 20,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    gap: 12
  },
  cancelButton: {
    flex: 1,
    padding: 12,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    alignItems: "center"
  },
  cancelText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#6B7280"
  },
  submitButton: {
    flex: 1
  },
});


