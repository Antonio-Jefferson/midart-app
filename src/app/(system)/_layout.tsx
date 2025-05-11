import { AuthProvider } from "@/contexts/AuthContext";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Tabs } from "expo-router";
import { StyleSheet } from "react-native";

export default function RootLayout() {
  return (
    <AuthProvider>
      <SystemLayout />
    </AuthProvider>
  );
}
function SystemLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#fff",
        tabBarStyle: styles.tabBar,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ focused, tintColor }) => {
            return (
              <Ionicons
                name={`home${focused ? "" : "-outline"}`}
                size={24}
                color={tintColor}
              />
            );
          },
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#275982",
    paddingVertical: 10,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 0,
  },
});
