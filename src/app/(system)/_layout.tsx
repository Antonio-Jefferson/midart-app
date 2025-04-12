import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <AuthProvider>
      <SystemLayout />
    </AuthProvider>
  );
}
function SystemLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="home" options={{ headerShown: false }} />
    </Stack>
  );
}
