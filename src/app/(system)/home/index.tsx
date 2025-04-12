import { supabase } from "@/app/lib/supabase";
import { View, Text, Alert, Pressable } from "react-native";

export default function HomeScreen() {
  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      Alert.alert(error.message);
      return;
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text>Bem-vindo à Home!</Text>
      <Pressable onPress={handleSignOut}>
        <Text>Sair</Text>
      </Pressable>
    </View>
  );
}
