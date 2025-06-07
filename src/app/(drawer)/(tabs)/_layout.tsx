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
          tabBarActiveTintColor: "#F69143",
          tabBarInactiveTintColor: "#ffffff",
          tabBarStyle: {
            backgroundColor: "#275982",
            borderTopColor: "transparent",
          },
        }}
      >
        <Tabs.Screen
          name="Index"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, size }: { color: string; size: number }) => (
              <Ionicons name="home" color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="Challenges"
          options={{
            title: "Desafios",
            tabBarIcon: ({ color, size }: { color: string; size: number }) => (
              <Ionicons name="rocket" color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="Custom"
          options={{
            title: "Custom",
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
            title: "Procurar",
            tabBarIcon: ({ color, size }: { color: string; size: number }) => (
              <Ionicons name="search" color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="Chats"
          options={{
            title: "Chats",
            tabBarBadge: 3,
            tabBarIcon: ({ color, size }: { color: string; size: number }) => (
              <Ionicons name="chatbubble" color={color} size={size} />
            ),
          }}
        />
      </Tabs>
    </GestureHandlerRootView>
  );
}
