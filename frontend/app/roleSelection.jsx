import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { useRouter } from "expo-router";
import { Users, Building2 } from "lucide-react-native";
import Button from "../components/Button";

export default function RoleSelection() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState(null);

  const handleContinue = () => {
    if (!selectedRole) {
      alert("Please select your role first!");
      return;
    }

    if (selectedRole === "volunteer") {
      router.push("auth/SignupVolunteer");
    } else if (selectedRole === "organization") {
      router.push("auth/SignupOrganization");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <ScrollView contentContainerStyle={styles.container}>
        
        <Text style={styles.heading}>Choose Your Role</Text>
        <Text style={styles.subtitle}>
            Get started by selecting whether you're a volunteer or an organization
        </Text>

        <View style={styles.roleOptions}>
            <TouchableOpacity
            style={[
                styles.roleOption,
                selectedRole === "organization" && styles.roleOptionSelected,
            ]}
            onPress={() => setSelectedRole("organization")}
            >
            <Building2
                size={24}
                color={selectedRole === "organization" ? "#fff" : "#4CAF50"}
            />
            <Text
                style={[
                styles.roleText,
                selectedRole === "organization" && styles.roleTextSelected,
                ]}
            >
                For Organizations
            </Text>
            <Text
                style={[
                styles.roleSubtext,
                selectedRole === "organization" && styles.roleSubtextSelected,
                ]}
            >
                Post requests and manage deliveries
            </Text>
            </TouchableOpacity>

            <TouchableOpacity
            style={[
                styles.roleOption,
                selectedRole === "volunteer" && styles.roleOptionSelected,
            ]}
            onPress={() => setSelectedRole("volunteer")}
            >
            <Users
                size={24}
                color={selectedRole === "volunteer" ? "#fff" : "#4CAF50"}
            />
            <Text
                style={[
                styles.roleText,
                selectedRole === "volunteer" && styles.roleTextSelected,
                ]}
            >
                For Volunteers
            </Text>
            <Text
                style={[
                styles.roleSubtext,
                selectedRole === "volunteer" && styles.roleSubtextSelected,
                ]}
            >
                Help deliver supplies to those in need
            </Text>
            </TouchableOpacity>
        </View>

        <View style={styles.buttonStyle}>
            <Button
            title={"Continue"}
            onPress={handleContinue}
            textStyle={{
                color: "#fff",
                fontWeight: "600",
                fontSize: 15,
            }}
            />
        </View>

        <TouchableOpacity
            onPress={() => router.back()}
            style={{ alignSelf: "center", marginTop: 10 }}
        >
            <Text style={{ color: "#4CAF50", fontWeight: "600" }}>← Back</Text>
        </TouchableOpacity>
        </ScrollView>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    paddingBottom: 70,
    flexGrow: 1,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#475569",
    textAlign: "center",
    marginBottom: 30,
    maxWidth: 360,
  },
  roleOptions: {
    width: "100%",
    gap: 16,
  },
  roleOption: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#E5E7EB",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  roleOptionSelected: {
    backgroundColor: "#4CAF50",
    borderColor: "#4CAF50",
  },
  roleText: {
    fontSize: 17,
    fontWeight: "600",
    color: "#1F2937",
    marginTop: 8,
    marginBottom: 4,
  },
  roleTextSelected: {
    color: "#fff",
  },
  roleSubtext: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
  },
  roleSubtextSelected: {
    color: "#fff",
    opacity: 0.9,
  },
  safeArea: {
    flex: 1,
    paddingTop: 20, // add a bit of breathing room
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  buttonStyle: {
    marginTop: 30,
    marginBottom: 20,
    width: "100%",
  },
});
