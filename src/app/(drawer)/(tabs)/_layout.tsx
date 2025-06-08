import { SpecialTabButton } from "@/components/ButtomAdd";
import { AuthProvider } from "@/contexts/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  return (
    <AuthProvider>
      <SystemLayout />
    </AuthProvider>
  );
}
function SystemLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#F69143",
          tabBarInactiveTintColor: "#ffffff",
          tabBarStyle: {
            backgroundColor: "#275982",
            borderTopColor: "transparent",
            height: 56,
            alignItems: "center",
            justifyContent: "center",
          },
          tabBarLabelStyle: {
            textAlign: "center",
          },
          tabBarIconStyle: {
            alignItems: "center",
            justifyContent: "center",
          },
        }}
      >
        <Tabs.Screen
          name="Index"
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }: { color: string; size: number }) => (
              <Ionicons name="home" color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="Challenges"
          options={{
            tabBarIcon: ({ color, size }: { color: string; size: number }) => (
              <Ionicons name="rocket" color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="Custom"
          options={{
            tabBarLabel: "Custom",
            tabBarButton: SpecialTabButton,
          }}
          listeners={{
            tabPress: (e) => {
              e.preventDefault();
            },
          }}
        />

        <Tabs.Screen
          name="Search"
          options={{
            tabBarIcon: ({ color, size }: { color: string; size: number }) => (
              <Ionicons name="search" color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="Chats"
          options={{
            tabBarBadge: 3,
            tabBarIcon: ({ color, size }: { color: string; size: number }) => (
              <Ionicons name="chatbubble" color={color} size={size} />
            ),
          }}
        />

        <Tabs.Screen
          name="CheckPreference"
          options={{
            headerShown: false,
            tabBarBadge: 3,
            href: null,
          }}
        />
      </Tabs>
    </GestureHandlerRootView>
  );
}
