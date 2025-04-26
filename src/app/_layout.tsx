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
  console.log("AuthStack", setAuth);
  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session) {
          setAuth(session.user);
          router.replace("/(system)/home");
        } else {
          setAuth(null);
          router.replace("/(auth)/main");
        }
      }
    );

    return () => listener?.subscription.unsubscribe();
  }, []);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)/main" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)/login" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)/register" options={{ headerShown: false }} />
      <Stack.Screen name="(system)/home" options={{ headerShown: false }} />
    </Stack>
  );
}
