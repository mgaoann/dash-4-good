import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useState } from "react";
import HeartCircle from "../components/HeartCircle";
import StatList from "../components/StatList";
import CardList from "../components/CardList";
import Button from "../components/Button";
import { useRouter } from "expo-router";
import { Users, Building2 } from "lucide-react-native";

export default function Index() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState(null);

  // TODO: (Frontend B) When Auth is ready:
  // 1. Replace this direct navigation with routing to Login / Signup page.
  // 2. After login, check user role (volunteer / organization).
  // 3. Redirect based on role:
  //    - Volunteer -> VolunteerDashboard
  //    - Organization -> OrganizationDashboard

  const handleGetStarted = () => {
    if (!selectedRole) {
      alert("Please select your role first!");
      return;
    }
    
    if (selectedRole === "volunteer") {
      router.push("volunteer/VolunteerDashboard");
    } else if (selectedRole === "organization") {
      router.push("organization/OrganizationDashboard");
    }
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View
        style={{
          alignItems: "center",
        }}
      >
        <HeartCircle />
        <Text style={styles.heading}>Dash-4-Good</Text>
        <Text style={styles.subtitle}>
          Connecting communities to reduce food waste through volunteer
          deliveries
        </Text>
      </View>
      <CardList />
      
      {/* Role Selection */}
      <View style={styles.roleSelection}>
        <Text style={styles.roleTitle}>Choose Your Role</Text>
        <View style={styles.roleOptions}>
          <TouchableOpacity
            style={[
              styles.roleOption,
              selectedRole === "volunteer" && styles.roleOptionSelected,
            ]}
            onPress={() => setSelectedRole("volunteer")}
          >
            <Users size={24} color={selectedRole === "volunteer" ? "#fff" : "#4CAF50"} />
            <Text style={[
              styles.roleText,
              selectedRole === "volunteer" && styles.roleTextSelected,
            ]}>
              For Volunteers
            </Text>
            <Text style={[
              styles.roleSubtext,
              selectedRole === "volunteer" && styles.roleSubtextSelected,
            ]}>
              Help deliver supplies to those in need
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.roleOption,
              selectedRole === "organization" && styles.roleOptionSelected,
            ]}
            onPress={() => setSelectedRole("organization")}
          >
            <Building2 size={24} color={selectedRole === "organization" ? "#fff" : "#4CAF50"} />
            <Text style={[
              styles.roleText,
              selectedRole === "organization" && styles.roleTextSelected,
            ]}>
              For Organizations
            </Text>
            <Text style={[
              styles.roleSubtext,
              selectedRole === "organization" && styles.roleSubtextSelected,
            ]}>
              Post requests and manage deliveries
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.buttonStyle}>
        <Button
          title={"Get Started Today"}
          onPress={handleGetStarted}
          textStyle={{
            color: "#fff",
            fontWeight: "600",
            fontSize: 15,
          }}
        />
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    marginTop: 45,
    paddingBottom: 70,
    flexGrow: 1,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
  },
  subtitle: {
    paddingHorizontal: 30,
    marginTop: 10,
    textAlign: "center",
    color: "#475569",
    marginBottom: 32,
    maxWidth: 384,
    alignSelf: "center",
  },
  roleSelection: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  roleTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937",
    textAlign: "center",
    marginBottom: 16,
  },
  roleOptions: {
    gap: 12,
  },
  roleOption: {
    backgroundColor: "#fff",
    padding: 16,
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
    fontSize: 16,
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
  buttonStyle: {
    marginTop: 20,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
});
