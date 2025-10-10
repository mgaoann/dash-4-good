import { Tabs } from "expo-router";
import { Home, Map, MessageCircle, User } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function VolunteerTabsLayout() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F7F7F7" }}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#4CAF50",
          tabBarInactiveTintColor: "#9CA3AF",
          tabBarStyle: {
            backgroundColor: "#F7F7F7",
            borderTopWidth: 0,
            elevation: 8,
            height: 60,
            paddingBottom: 6,
          },
          tabBarLabelStyle: { fontSize: 12 },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ color }) => <Home color={color} size={22} />,
          }}
        />
        <Tabs.Screen
          name="map"
          options={{
            tabBarLabel: "Map",
            tabBarIcon: ({ color }) => <Map color={color} size={22} />,
          }}
        />
        <Tabs.Screen
          name="messages"
          options={{
            tabBarLabel: "Messages",
            tabBarIcon: ({ color }) => (
              <MessageCircle color={color} size={22} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            tabBarLabel: "Profile",
            tabBarIcon: ({ color }) => <User color={color} size={22} />,
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}
