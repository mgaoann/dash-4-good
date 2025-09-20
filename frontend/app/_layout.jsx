import { Stack } from "expo-router";
import { COLORS } from "../styles/global";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.background },
        contentStyle: { backgroundColor: COLORS.background },
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="volunteer/VolunteerDashboard"
        options={{
          headerShown: true,
          headerTitle: "",
        }}
      />
      <Stack.Screen name="profilePage" options={{ title: "Profile" }} />
    </Stack>
  );
}
