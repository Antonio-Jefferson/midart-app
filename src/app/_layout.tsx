import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { router, Stack } from "expo-router";
import { useEffect } from "react";
import { supabase } from "../lib/supabase";
import Toast from "react-native-toast-message";
import * as Linking from "expo-linking";

export default function RootLayout() {
  return (
    <AuthProvider>
      <AuthStack />
      <Toast />
    </AuthProvider>
  );
}

function AuthStack() {
  const { setAuth } = useAuth();
  useEffect(() => {
    const handleDeepLink = ({ url }: { url: string }) => {
      const parsed = Linking.parse(url);
      if (parsed.path?.startsWith("reset-password")) {
        router.push("/(auth)/reset-password");
      }
    };

    const subscription = Linking.addEventListener("url", handleDeepLink);
    return () => subscription.remove();
  }, []);

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session) {
          setAuth(session.user);
          router.replace("/(drawer)/(tabs)/Index");
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
      <Stack.Screen name="(auth)/main" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)/login" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)/register" options={{ headerShown: false }} />
      <Stack.Screen
        name="(auth)/reset-password"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="(auth)/recover-password"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="(drawer)/(tabs)/Index"
        options={{ headerShown: false }}
      />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="modal"
        options={{
          title: "Comentários",
          presentation: "modal",
          animation: "slide_from_bottom",
          gestureDirection: "vertical",
          headerShown: false,
        }}
      />
    </Stack>
  );
}
