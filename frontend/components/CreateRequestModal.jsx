import {
  View,
  Text,
  StyleSheet,
  Modal,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { useState } from "react";
import { X, MapPin, Package, Clock, DollarSign } from "lucide-react-native";
import { COLORS } from "../styles/global";
import Button from "./Button";

// TODO (Backend): Save new request to Firestore
// TODO (Backend): Validate form data before saving
// TODO (Notifications): Notify nearby volunteers about new request

export default function CreateRequestModal({ visible, onClose, onCreate, orgName }) {
  const [formData, setFormData] = useState({
    title: "",
    pickup: "",
    dropoff: "",
    items: "",
    description: "",
    urgency: "normal",
    estimatedTime: "",
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    // Basic validation
    if (!formData.title || !formData.pickup || !formData.dropoff || !formData.items) {
      Alert.alert("Missing Information", "Please fill in all required fields.");
      return;
    }

    const payload = {
      ...formData,
      organization: orgName,
    };
    console.log("Creating request:", payload);
    // TODO (Backend): Save to Firestore under this organization
    if (onCreate) {
      onCreate(payload);
    }
    Alert.alert("Success", "Request created successfully!");
    onClose();
  };

  const resetForm = () => {
    setFormData({
      title: "",
      pickup: "",
      dropoff: "",
      items: "",
      description: "",
      urgency: "normal",
      estimatedTime: "",
    });
  };

  const handleClose = () => {
    resetForm();
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
            <X size={24} color="#6B7280" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Request Title */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Request Title *</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., Fresh Produce Delivery"
              placeholderTextColor="#6B7280"
              value={formData.title}
              onChangeText={(value) => handleInputChange("title", value)}
            />
          </View>

          {/* Pickup Location */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Pickup Location *</Text>
            <View style={styles.inputWithIcon}>
              <MapPin size={20} color="#6B7280" style={styles.inputIcon} />
              <TextInput
                style={[styles.input, styles.inputWithIconText]}
                placeholder="e.g., Farmers Market"
                placeholderTextColor="#6B7280"
                value={formData.pickup}
                onChangeText={(value) => handleInputChange("pickup", value)}
              />
            </View>
          </View>

          {/* Dropoff Location */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Dropoff Location *</Text>
            <View style={styles.inputWithIcon}>
              <MapPin size={20} color="#6B7280" style={styles.inputIcon} />
              <TextInput
                style={[styles.input, styles.inputWithIconText]}
                placeholder="e.g., Downtown Food Bank"
                placeholderTextColor="#6B7280"
                value={formData.dropoff}
                onChangeText={(value) => handleInputChange("dropoff", value)}
              />
            </View>
          </View>

          {/* Items Description */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Items Description *</Text>
            <View style={styles.inputWithIcon}>
              <Package size={20} color="#6B7280" style={styles.inputIcon} />
              <TextInput
                style={[styles.input, styles.inputWithIconText]}
                placeholder="e.g., 10 bags of fruits and vegetables"
                placeholderTextColor="#6B7280"
                value={formData.items}
                onChangeText={(value) => handleInputChange("items", value)}
              />
            </View>
          </View>

          {/* Additional Description */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Additional Details</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Any special instructions or additional information..."
              placeholderTextColor="#6B7280"
              value={formData.description}
              onChangeText={(value) => handleInputChange("description", value)}
              multiline
              numberOfLines={3}
            />
          </View>

          {/* Urgency Level */}
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
                    formData.urgency === urgency.key && styles.urgencyButtonSelected,
                    { borderColor: urgency.color }
                  ]}
                  onPress={() => handleInputChange("urgency", urgency.key)}
                >
                  <Text style={[
                    styles.urgencyText,
                    formData.urgency === urgency.key && { color: urgency.color }
                  ]}>
                    {urgency.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Estimated Time */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Estimated Delivery Time</Text>
            <View style={styles.inputWithIcon}>
              <Clock size={20} color="#6B7280" style={styles.inputIcon} />
              <TextInput
                style={[styles.input, styles.inputWithIconText]}
                placeholder="e.g., 20 minutes"
                placeholderTextColor="#6B7280"
                value={formData.estimatedTime}
                onChangeText={(value) => handleInputChange("estimatedTime", value)}
              />
            </View>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.cancelButton} onPress={handleClose}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
          <Button
            title="Create Request"
            onPress={handleSubmit}
            style={styles.submitButton}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937",
  },
  closeButton: {
    padding: 4,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#374151",
    marginBottom: 8,
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
  inputWithIcon: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  inputIcon: {
    marginRight: 8,
  },
  inputWithIconText: {
    flex: 1,
    borderWidth: 0,
    padding: 12,
    paddingLeft: 0,
  },
  textArea: {
    height: 80,
    textAlignVertical: "top",
  },
  urgencyContainer: {
    flexDirection: "row",
    gap: 8,
  },
  urgencyButton: {
    flex: 1,
    padding: 12,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: "center",
  },
  urgencyButtonSelected: {
    backgroundColor: "#F3F4F6",
  },
  urgencyText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#6B7280",
  },
  footer: {
    flexDirection: "row",
    padding: 20,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    padding: 12,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    alignItems: "center",
  },
  cancelText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#6B7280",
  },
  submitButton: {
    flex: 1,
  },
});
