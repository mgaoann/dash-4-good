import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import HeartCircle from "../components/HeartCircle";
import CardList from "../components/CardList";
import Button from "../components/Button";
import { useRouter } from "expo-router";
import { COLORS } from "../styles/global";

const { height } = Dimensions.get("window");

export default function Index() {
  const router = useRouter();

  return (
    <View style={styles.mainContainer}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.heroSection}>
          <HeartCircle />
          <Text style={styles.heading}>Dash 4 Good</Text>
          <Text style={styles.subtitle}>
            Connecting communities to reduce food waste through volunteer
            deliveries.
          </Text>
        </View>

        <View style={styles.cardSection}>
          <CardList />
        </View>

        <View style={styles.actionSection}>
          <Button
            title="Sign Up as Volunteer"
            onPress={() => router.push("/auth/SignupVolunteer")}
            textStyle={styles.buttonText}
            style={styles.primaryButton}
          />
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => router.push("/auth/SignupOrganization")}
          >
            <Text style={styles.secondaryButtonText}>
              Sign Up as Organization
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.loginRow}>
          <Text style={styles.loginPrompt}>Already have an account?</Text>
          <TouchableOpacity onPress={() => router.push("auth/Login")}>
            <Text style={styles.loginLink}> Log in</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF", // Pure white
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: height * 0.08,
    paddingBottom: 60,
  },
  heroSection: {
    alignItems: "center",
    marginBottom: 30,
  },
  heading: {
    fontSize: 34,
    fontWeight: "800",
    color: "#111827", // Near black
    marginTop: 16,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
    color: "#4B5563", // Dark gray
    marginTop: 12,
    maxWidth: 280,
  },
  cardSection: {
    marginBottom: 20,
  },
  actionSection: {
    width: "100%",
    gap: 12,
  },
  primaryButton: {
    height: 56,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    elevation: 0,
    shadowOpacity: 0,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  secondaryButton: {
    height: 56,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#E5E7EB", // Light gray border
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F9FAFB", // Very light gray fill
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#374151",
  },
  loginRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 32,
  },
  loginPrompt: {
    color: "#6B7280",
    fontSize: 15,
  },
  loginLink: {
    color: COLORS.primary,
    fontSize: 15,
    fontWeight: "700",
    marginLeft: 4,
  },
});
