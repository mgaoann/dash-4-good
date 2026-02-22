import {
  View,
  Text,
  StyleSheet,
  Modal,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useState } from "react";
import { X, MapPin, Package, Clock } from "lucide-react-native";
import { COLORS } from "../styles/global";
import Button from "./Button";

export default function CreateRequestModal({
  visible,
  onClose,
  onCreate,
  orgName,
}) {
  const [formData, setFormData] = useState({
    title: "",
    pickup: "",
    dropoff: "",
    items: "",
    description: "",
    urgency: "normal",
    estimatedTime: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errorMessage) setErrorMessage(""); // Clear error when user types
  };

  const handleSubmit = async () => {
    // 1. Validation
    if (
      !formData.title.trim() ||
      !formData.pickup.trim() ||
      !formData.dropoff.trim() ||
      !formData.items.trim()
    ) {
      setErrorMessage("Please fill in all required fields marked with *");
      return;
    }

    setIsSaving(true);
    setErrorMessage("");

    try {
      const payload = {
        ...formData,
        organizationName: orgName,
        createdAt: new Date().toISOString(),
      };

      if (onCreate) {
        await onCreate(payload);
      }

      handleClose(); // Reset and close on success
    } catch (error) {
      setErrorMessage("Failed to create request. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleClose = () => {
    setFormData({
      title: "",
      pickup: "",
      dropoff: "",
      items: "",
      description: "",
      urgency: "normal",
      estimatedTime: "",
    });
    setErrorMessage("");
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Create New Request</Text>
          <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
            <X size={24} color="#111827" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Error Banner */}
          {errorMessage !== "" && (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>{errorMessage}</Text>
            </View>
          )}

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Request Title *</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., Weekly Grocery Pickup"
              value={formData.title}
              onChangeText={(v) => handleInputChange("title", v)}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Pickup Address *</Text>
            <View style={styles.inputWithIcon}>
              <MapPin
                size={18}
                color={COLORS.primary}
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.inputNoBorder}
                placeholder="Street address, City"
                value={formData.pickup}
                onChangeText={(v) => handleInputChange("pickup", v)}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Dropoff Address *</Text>
            <View style={styles.inputWithIcon}>
              <MapPin size={18} color="#F59E0B" style={styles.inputIcon} />
              <TextInput
                style={styles.inputNoBorder}
                placeholder="Destination address"
                value={formData.dropoff}
                onChangeText={(v) => handleInputChange("dropoff", v)}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Items to Deliver *</Text>
            <View style={styles.inputWithIcon}>
              <Package size={18} color="#6B7280" style={styles.inputIcon} />
              <TextInput
                style={styles.inputNoBorder}
                placeholder="e.g., 5 Boxes of Bread"
                value={formData.items}
                onChangeText={(v) => handleInputChange("items", v)}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Urgency Level</Text>
            <View style={styles.urgencyContainer}>
              {[
                { key: "low", label: "Low", color: COLORS.primary },
                { key: "normal", label: "Normal", color: "#F59E0B" },
                { key: "high", label: "High", color: "#EF4444" },
              ].map((urgency) => (
                <TouchableOpacity
                  key={urgency.key}
                  style={[
                    styles.urgencyButton,
                    formData.urgency === urgency.key && {
                      backgroundColor: urgency.color,
                      borderColor: urgency.color,
                    },
                  ]}
                  onPress={() => handleInputChange("urgency", urgency.key)}
                >
                  <Text
                    style={[
                      styles.urgencyText,
                      formData.urgency === urgency.key && { color: "#fff" },
                    ]}
                  >
                    {urgency.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Notes / Instructions</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Door code, specific person to ask for, etc."
              value={formData.description}
              onChangeText={(v) => handleInputChange("description", v)}
              multiline
            />
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <Button
            title={isSaving ? "Creating..." : "Post Request"}
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
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  title: { fontSize: 18, fontWeight: "700", color: "#111827" },
  content: { flex: 1, padding: 20 },
  errorBox: {
    backgroundColor: "#FEE2E2",
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#F87171",
  },
  errorText: {
    color: "#B91C1C",
    fontWeight: "600",
    textAlign: "center",
    fontSize: 14,
  },
  inputGroup: { marginBottom: 20 },
  label: { fontSize: 14, fontWeight: "600", color: "#374151", marginBottom: 8 },
  input: {
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
  },
  inputWithIcon: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    paddingHorizontal: 12,
  },
  inputIcon: { marginRight: 10 },
  inputNoBorder: { flex: 1, paddingVertical: 14, fontSize: 16 },
  textArea: { height: 100, textAlignVertical: "top" },
  urgencyContainer: { flexDirection: "row", gap: 10 },
  urgencyButton: {
    flex: 1,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    alignItems: "center",
  },
  urgencyText: { fontWeight: "600", color: "#6B7280" },
  footer: { padding: 20, borderTopWidth: 1, borderTopColor: "#F3F4F6" },
  submitButton: { width: "100%", height: 56, borderRadius: 12 },
});
