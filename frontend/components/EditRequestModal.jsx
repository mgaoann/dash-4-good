import { 
  View, 
  Text, 
  StyleSheet, 
  Modal, 
  TextInput, 
  TouchableOpacity, 
  ScrollView 
} from "react-native";
import { X, MapPin, Package, Clock } from "lucide-react-native";
import Button from "./Button";
import { useState, useEffect } from "react";
import { COLORS } from "../styles/global";

export default function EditRequestModal({ visible, onClose, request, onSave }) {
  const [formData, setFormData] = useState({ 
    title: "", 
    pickup: "", 
    dropoff: "", 
    items: "", 
    description: "", 
    estimatedTime: "" 
  });
  
  const [errorMessage, setErrorMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);

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
      setErrorMessage(""); // Reset error when a new request is loaded
    }
  }, [request]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errorMessage) setErrorMessage("");
  };

  const handleSubmit = async () => {
    // Validation
    if (!formData.title.trim() || !formData.pickup.trim() || !formData.dropoff.trim() || !formData.items.trim()) {
      setErrorMessage("Please fill in all required fields marked with *");
      return;
    }

    setIsSaving(true);
    try {
      const updated = { ...request, ...formData };
      
      if (onSave) {
        await onSave(updated);
      }
      onClose();
    } catch (error) {
      setErrorMessage("Failed to save changes. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Edit Request</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <X size={24} color="#111827" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Internal Error Banner */}
          {errorMessage !== "" && (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>{errorMessage}</Text>
            </View>
          )}

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Title *</Text>
            <TextInput 
              style={styles.input} 
              placeholder="e.g., Fresh Produce Delivery" 
              placeholderTextColor="#6B7280" 
              value={formData.title} 
              onChangeText={(v) => handleInputChange("title", v)} 
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Pickup Location *</Text>
            <View style={styles.inputWithIcon}>
              <MapPin size={18} color={COLORS.primary} style={styles.inputIcon} />
              <TextInput 
                style={styles.inputNoBorder} 
                placeholder="Pickup address" 
                placeholderTextColor="#6B7280" 
                value={formData.pickup} 
                onChangeText={(v) => handleInputChange("pickup", v)} 
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Dropoff Location *</Text>
            <View style={styles.inputWithIcon}>
              <MapPin size={18} color="#F59E0B" style={styles.inputIcon} />
              <TextInput 
                style={styles.inputNoBorder} 
                placeholder="Dropoff address" 
                placeholderTextColor="#6B7280" 
                value={formData.dropoff} 
                onChangeText={(v) => handleInputChange("dropoff", v)} 
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Items *</Text>
            <View style={styles.inputWithIcon}>
              <Package size={18} color="#6B7280" style={styles.inputIcon} />
              <TextInput 
                style={styles.inputNoBorder} 
                placeholder="What are we delivering?" 
                placeholderTextColor="#6B7280" 
                value={formData.items} 
                onChangeText={(v) => handleInputChange("items", v)} 
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Additional Details</Text>
            <TextInput 
              style={[styles.input, styles.textArea]} 
              placeholder="Any special instructions..." 
              placeholderTextColor="#6B7280" 
              value={formData.description} 
              onChangeText={(v) => handleInputChange("description", v)} 
              multiline 
              numberOfLines={3} 
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Estimated Time</Text>
            <View style={styles.inputWithIcon}>
              <Clock size={18} color="#6B7280" style={styles.inputIcon} />
              <TextInput 
                style={styles.inputNoBorder} 
                placeholder="e.g., 20 minutes" 
                placeholderTextColor="#6B7280" 
                value={formData.estimatedTime} 
                onChangeText={(v) => handleInputChange("estimatedTime", v)} 
              />
            </View>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
          <Button 
            title={isSaving ? "Saving..." : "Save Changes"} 
            onPress={handleSubmit} 
            style={styles.submitButton} 
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6"
  },
  title: { fontSize: 18, fontWeight: "700", color: "#111827" },
  closeButton: { padding: 4 },
  content: { flex: 1, padding: 20 },
  errorBox: {
    backgroundColor: "#FEE2E2",
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#F87171",
  },
  errorText: { color: "#B91C1C", fontWeight: "600", textAlign: "center", fontSize: 14 },
  inputGroup: { marginBottom: 20 },
  label: { fontSize: 14, fontWeight: "600", color: "#374151", marginBottom: 8 },
  input: {
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    color: "#1F2937"
  },
  inputWithIcon: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    paddingHorizontal: 12
  },
  inputIcon: { marginRight: 10 },
  inputNoBorder: { flex: 1, paddingVertical: 14, fontSize: 16, color: "#111827" },
  textArea: { height: 100, textAlignVertical: "top" },
  footer: {
    flexDirection: "row",
    padding: 20,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
    gap: 12
  },
  cancelButton: {
    flex: 1,
    padding: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F9FAFB"
  },
  cancelText: { fontSize: 16, fontWeight: "600", color: "#6B7280" },
  submitButton: { flex: 2, height: 50, borderRadius: 12 },
});