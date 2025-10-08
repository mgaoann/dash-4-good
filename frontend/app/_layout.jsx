import { Stack } from "expo-router";
import { COLORS } from "../styles/global";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.background },
        contentStyle: { backgroundColor: COLORS.background },
        headerBackTitle: "Back",
        headerBackTitleVisible: true,
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      
      {/* Volunteer Routes */}
      <Stack.Screen
        name="volunteer/VolunteerDashboard"
        options={{
          headerShown: true,
          headerTitle: "",
        }}
      />
      
      {/* Organization Routes */}
      <Stack.Screen
        name="organization/OrganizationDashboard"
        options={{
          headerShown: true,
          headerTitle: "",
        }}
      />
      <Stack.Screen
        name="organization/OrganizationProfile"
        options={{
          headerShown: true,
          headerTitle: "",
        }}
      />
      
      {/* Shared Routes */}
      <Stack.Screen name="profilePage" options={{ title: "Profile" }} />
    </Stack>
  );
}
