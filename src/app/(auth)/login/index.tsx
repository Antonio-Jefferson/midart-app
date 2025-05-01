import {
  Image,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { router } from "expo-router";
import { styles } from "./styles";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { loginSchema, LoginSchema } from "@/schemas/loginSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Toast from "react-native-toast-message";

export default function LoginScreen() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const [loading, setLoading] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [keepConnected, setKeepConnected] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    register("email");
    register("password");
  }, [register]);

  const email = watch("email");
  const password = watch("password");
  const isFormValid = email?.length > 0 && password?.length > 0;
  const onSubmit = async (data: LoginSchema) => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error) {
      Toast.show({
        type: "error",
        text1: "Erro no login",
        text2: error.message,
      });
      setLoading(false);
      return;
    }

    setLoading(false);
    router.replace("/(system)/home");
  };

  useEffect(() => {
    GoogleSignin.configure({
      scopes: ["https://www.googleapis.com/auth/drive.readonly"],
      webClientId:
        "178644201416-2fujpu87oe98p4etf5mobohofgm27m6f.apps.googleusercontent.com",
    });
  });

  const handleGoogleLogin = async () => {
    await GoogleSignin.hasPlayServices();
    const response = await GoogleSignin.signIn();
    if (response.data?.idToken) {
      const { data, error } = await supabase.auth.signInWithIdToken({
        provider: "google",
        token: response.data.idToken,
      });

      if (error) {
        Toast.show({
          type: "error",
          text1: "Erro no login com o Google",
          text2: error.message,
        });
        return;
      }
      router.replace("/(system)/home");
    } else {
      Toast.show({
        type: "error",
        text1: "Erro no login",
      });
    }
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
            onChangeText={(text) =>
              setValue("email", text, { shouldValidate: true })
            }
            onFocus={() => setIsEmailFocused(true)}
            onBlur={() => setIsEmailFocused(false)}
          />

          {errors.email && (
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
              <Ionicons name="warning-outline" size={15} color="red" />
              <Text style={{ color: "red" }}>{errors.email.message}</Text>
            </View>
          )}
        </View>

        <View>
          <Text style={styles.label}>Senha</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              secureTextEntry={!showPassword}
              style={[
                styles.input,
                { borderColor: isPasswordFocused ? "#F4791A" : "#CBC2C2" },
              ]}
              placeholder="Insira sua senha"
              onChangeText={(text) =>
                setValue("password", text, { shouldValidate: true })
              }
              onFocus={() => setIsPasswordFocused(true)}
              onBlur={() => setIsPasswordFocused(false)}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Feather
                name={showPassword ? "eye" : "eye-off"}
                size={20}
                color="#A9A9A9"
              />
            </TouchableOpacity>
          </View>

          {errors.password && (
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
              <Ionicons name="warning-outline" size={15} color="red" />
              <Text style={{ color: "red" }}>{errors.password.message}</Text>
            </View>
          )}
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
          <Text
            style={styles.forgotPassword}
            onPress={() => router.push("/(auth)/main")}
          >
            Esqueceu a senha?
          </Text>
        </View>
        <Pressable
          onPress={handleSubmit(onSubmit)}
          disabled={!isFormValid || loading}
        >
          <View
            style={[
              styles.button,
              (!isFormValid || loading) && { opacity: 0.5 },
            ]}
          >
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
