import { Alert, Image, Pressable, Text, TextInput, View } from "react-native";
import { router } from "expo-router";
import { styles } from "./styles";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { supabase } from "../../lib/supabase";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const hendleLogin = async () => {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      Alert.alert(error.message);
      setLoading(false);
      return;
    }
    setLoading(false);
    router.replace("/(system)/home");
  };
  return (
    <View style={styles.main}>
      <Pressable>
        <Ionicons
          style={styles.iconBack}
          name="arrow-back"
          size={24}
          color="#f5f5f5"
          onPress={() => router.back()}
        />
      </Pressable>
      <View style={styles.container}>
        <View>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu email"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View>
          <Text style={styles.label}>Senha</Text>
          <TextInput
            secureTextEntry
            style={styles.input}
            placeholder="Digite sua senha"
            value={password}
            onChangeText={setPassword}
          />
        </View>
        <Pressable onPress={hendleLogin}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>
              {loading ? "Aguarde..." : "Entrar"}
            </Text>
          </View>
        </Pressable>
        <Pressable style={styles.googleButton}>
          <View style={styles.googleContent}>
            <Image
              source={{
                uri: "https://img.icons8.com/?size=512&id=17949&format=png",
              }}
              style={styles.googleIcon}
            />
            <Text style={styles.googleText}>Entrar com Google</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}
