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
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [keepConnected, setKeepConnected] = useState(false);

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
          name="arrow-back"
          size={24}
          color="#275982"
          onPress={() => router.back()}
        />
      </Pressable>
      <View style={styles.header}>
        <Text style={styles.title}>Bem vindo!</Text>
        <Text style={styles.subtitle}>
          Faça login para continuar sua jornada criativa.
        </Text>
      </View>
      <View style={styles.container}>
        <View>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={[
              styles.input,
              { borderColor: isEmailFocused ? "#F4791A" : "#CBC2C2" },
            ]}
            placeholderTextColor="#CBC2C2"
            placeholder="Digite seu email"
            value={email}
            onChangeText={setEmail}
            onFocus={() => setIsEmailFocused(true)}
            onBlur={() => setIsEmailFocused(false)}
          />
        </View>

        <View>
          <Text style={styles.label}>Senha</Text>
          <TextInput
            secureTextEntry
            style={[
              styles.input,
              { borderColor: isPasswordFocused ? "#F4791A" : "#CBC2C2" },
            ]}
            placeholderTextColor="#CBC2C2"
            placeholder="Digite sua senha"
            value={password}
            onChangeText={setPassword}
            onFocus={() => setIsPasswordFocused(true)}
            onBlur={() => setIsPasswordFocused(false)}
          />
        </View>
        <View style={styles.containerFooter}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Pressable
              onPress={() => setKeepConnected(!keepConnected)}
              style={{ marginRight: 8 }}
            >
              <Ionicons
                name={keepConnected ? "checkbox" : "square-outline"}
                size={16}
                color={keepConnected ? "#F4791A" : "#CBC2C2"}
              />
            </Pressable>
            <Text style={styles.meConnectText}>Mantenha-me conectado</Text>
          </View>
          <Text style={styles.forgotPassword}>Esqueceu a senha?</Text>
        </View>
        <Pressable onPress={hendleLogin}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>
              {loading ? "Aguarde..." : "Entrar"}
            </Text>
          </View>
        </Pressable>
        <View style={styles.separator}>
          <View style={styles.separatorLine}></View>
          <Text style={styles.separatorText}>ou</Text>
          <View style={styles.separatorLine}></View>
        </View>
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

        <View style={styles.footer}>
          <Text style={styles.dontHaveAccount}>
            Ainda não possui uma conta?
          </Text>
          <Text style={styles.registerText}>Registrar-se</Text>
        </View>
      </View>
    </View>
  );
}
