import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import Button from "../../components/Button";
import { useRouter } from "expo-router";
import { useState } from "react";

// Firebase setup
import { auth, db } from "../../firebase";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Custom UI states for error handling, success messages, and loading
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Clear any messages when the user starts typing
  const clearMessages = () => {
    if (errorMessage) setErrorMessage("");
    if (successMessage) setSuccessMessage("");
  };

  const validateEmail = (emailStr) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(emailStr);
  };

  const onLogin = async () => {
    clearMessages();

    const safeEmail = email.trim();

    if (!safeEmail || !password) {
      setErrorMessage("Please enter both email and password.");
      return;
    }

    if (!validateEmail(safeEmail)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        safeEmail,
        password,
      );
      const uid = userCredential.user.uid;

      const userDoc = await getDoc(doc(db, "users", uid));
      if (!userDoc.exists()) {
        setErrorMessage("User data not found. Please contact support.");
        setIsLoading(false);
        return;
      }

      const userData = userDoc.data();

      if (userData.role === "organization") {
        router.replace("/tabs-organization/home");
      } else {
        router.replace("/tabs-volunteer/home");
      }
    } catch (error) {
      if (
        error.code === "auth/invalid-credential" ||
        error.code === "auth/user-not-found" ||
        error.code === "auth/wrong-password"
      ) {
        setErrorMessage("Invalid email or password.");
      } else {
        setErrorMessage(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const onResetPassword = async () => {
    clearMessages();
    const safeEmail = email.trim();

    if (!safeEmail) {
      setErrorMessage(
        "Please enter your email address first to reset your password.",
      );
      return;
    }

    if (!validateEmail(safeEmail)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);

    try {
      await sendPasswordResetEmail(auth, safeEmail);
      setSuccessMessage("Password reset email sent! Please check your inbox.");
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0} // Fix 1: Added offset for the header
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }} // Fix 2: Added padding bottom so you can scroll to the very end
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <Text style={styles.title}>Login</Text>
          <Text style={styles.subtitle}>
            Access your account to manage deliveries or requests
          </Text>

          {errorMessage !== "" && (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>{errorMessage}</Text>
            </View>
          )}

          {successMessage !== "" && (
            <View style={styles.successBox}>
              <Text style={styles.successText}>{successMessage}</Text>
            </View>
          )}

          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#6B7280"
              value={email}
              onChangeText={(val) => {
                setEmail(val);
                clearMessages();
              }}
              autoCapitalize="none"
              keyboardType="email-address"
            />

            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#6B7280"
              value={password}
              onChangeText={(val) => {
                setPassword(val);
                clearMessages();
              }}
              secureTextEntry
            />

            <TouchableOpacity onPress={onResetPassword} disabled={isLoading}>
              <Text style={styles.forgotLink}>Forgot password?</Text>
            </TouchableOpacity>

            <View style={styles.buttonWrapper}>
              <Button
                title={isLoading ? "Please wait..." : "Sign In"}
                onPress={isLoading ? null : onLogin}
              />
            </View>
          </View>

          <View style={styles.altRow}>
            <Text style={styles.altText}>New here?</Text>
            <TouchableOpacity onPress={() => router.push("/")}>
              <Text style={styles.altLink}> Create an account</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 100,
    paddingBottom: 40,
    backgroundColor: "#F9FAFB",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1F2937",
    textAlign: "center",
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 15,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 20,
  },
  errorBox: {
    width: "100%",
    backgroundColor: "#FEE2E2",
    borderWidth: 1,
    borderColor: "#F87171",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  errorText: {
    color: "#B91C1C",
    fontSize: 14,
    textAlign: "center",
    fontWeight: "500",
  },
  successBox: {
    width: "100%",
    backgroundColor: "#DCFCE7",
    borderWidth: 1,
    borderColor: "#4ade80",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  successText: {
    color: "#166534",
    fontSize: 14,
    textAlign: "center",
    fontWeight: "500",
  },
  form: {
    marginTop: 10,
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    color: "#1F2937",
    marginBottom: 12,
  },
  forgotLink: {
    alignSelf: "flex-end",
    color: "#4CAF50",
    fontWeight: "600",
    marginBottom: 16,
  },
  buttonWrapper: {
    width: "100%",
  },
  altRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  altText: {
    color: "#6B7280",
    fontSize: 14,
  },
  altLink: {
    color: "#4CAF50",
    fontSize: 14,
    fontWeight: "600",
  },
});
