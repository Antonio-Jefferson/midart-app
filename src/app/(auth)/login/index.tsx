import { Alert, Image, Pressable, Text, TextInput, View } from "react-native";
import { router } from "expo-router";
import { styles } from "./styles";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    GoogleSignin.configure({
      scopes: ["https://www.googleapis.com/auth/drive.readonly"],
      webClientId:
        "178644201416-2fujpu87oe98p4etf5mobohofgm27m6f.apps.googleusercontent.com",
    });
  });

  const handleGoogleLogin = async () => {
    console.log("Google Login");
    await GoogleSignin.hasPlayServices();
    const response = await GoogleSignin.signIn();
    if (response.data?.idToken) {
      const { data, error } = await supabase.auth.signInWithIdToken({
        provider: "google",
        token: response.data.idToken,
      });

      if (error) {
        Alert.alert(error.message);
        return;
      }
      router.replace("/(system)/home");
    } else {
      Alert.alert("Não foi possível fazer o login com o Google");
    }
  };

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
        <Pressable onPress={handleGoogleLogin} style={styles.googleButton}>
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
