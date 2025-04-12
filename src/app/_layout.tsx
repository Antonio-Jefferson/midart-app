import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { router, Stack } from "expo-router";
import { useEffect } from "react";
import { supabase } from "./lib/supabase";

export default function RootLayout() {
  return (
    <AuthProvider>
      <AuthStack />
    </AuthProvider>
  );
}

function AuthStack() {
  const { setAuth } = useAuth();
  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setAuth(session.user);
        router.replace("/(system)/home");
        return;
      }

      setAuth(null);
      router.replace("/(auth)/main");
    });
  }, []);
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="main" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="register" options={{ headerShown: false }} />
    </Stack>
  );
}
