import { Drawer } from "expo-router/drawer";
import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { supabase } from "@/lib/supabase";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import Toast from "react-native-toast-message";

export default function DrawerLayout() {
  const router = useRouter();
  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    await GoogleSignin.signOut();

    if (error) {
      Toast.show({
        type: "error",
        text1: "Erro ao sair",
        text2: error.message,
      });
      return;
    }
  };
  return (
    <Drawer
      screenOptions={{
        drawerPosition: "right",
        headerShown: false,
      }}
    >
      <Drawer.Screen
        name="Profile"
        options={{
          drawerLabel: "Meu Perfil",
          title: "Meu Perfil",
        }}
      />
      <View>
        <Pressable onPress={handleSignOut}>
          <Text>Sair</Text>
        </Pressable>
      </View>
    </Drawer>
  );
}
