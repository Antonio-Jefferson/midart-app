import {
  Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import { router } from "expo-router";
import { styles } from "./styles";
import { Ionicons, Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { Picker } from "@react-native-picker/picker";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { registerSchema, RegisterSchema } from "@/schemas/registerShema";
import Toast from "react-native-toast-message";

export default function RegisterScreen() {
  const [drawingLevel, setDrawingLevel] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  });

  const email = watch("email");
  const password = watch("password");
  const confirmPassword = watch("confirmPassword");
  const name = watch("name");
  const birthDate = watch("birthDate");
  const drawingLevelExist = watch("drawingLevel");
  const isFormValid =
    email?.length > 0 &&
    password?.length > 0 &&
    confirmPassword?.length > 0 &&
    name?.length > 0 &&
    birthDate?.length > 0 &&
    drawingLevelExist?.length > 0;

  useEffect(() => {
    register("email");
    register("password");
    register("confirmPassword");
    register("name");
    register("drawingLevel");
    register("birthDate");
  }, [register]);
  const onSubmit = async (dataRegister: RegisterSchema) => {
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email: dataRegister.email,
      password: dataRegister.password,
      options: {
        data: {
          name: dataRegister.name,
          drawing_level: dataRegister.drawingLevel,
          birth_date: dataRegister.birthDate,
        },
      },
    });

    if (error) {
      Toast.show({
        type: "error",
        text1: "Erro no cadastro",
        text2: error.message,
      });
      setLoading(false);
      return;
    }

    setLoading(false);
    router.replace("/(auth)/login");
  };

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
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        <View style={styles.main}>
          <Pressable onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#275982" />
          </Pressable>

          <View style={styles.header}>
            <Text style={styles.title}>Olá, Artista!</Text>
            <Text style={styles.subtitle}>
              Registre-se e faça parte da nossa comunidade.
            </Text>
          </View>

          <View style={styles.container}>
            <View>
              <Text style={styles.label}>Nome</Text>
              <TextInput
                style={styles.input}
                placeholder="Insira seu nome"
                value={watch("name")}
                onChangeText={(text) => setValue("name", text)}
              />
              {errors.name && (
                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
                >
                  <Ionicons name="warning-outline" size={15} color="red" />
                  <Text style={{ color: "red" }}>{errors.name.message}</Text>
                </View>
              )}
            </View>

            <View>
              <Text style={styles.label}>E-mail</Text>
              <TextInput
                style={styles.input}
                placeholder="Insira seu e-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                value={watch("email")}
                onChangeText={(text) => setValue("email", text)}
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

            <View style={styles.row}>
              <View style={styles.birthDateContainer}>
                <Text style={styles.label}>Data de nascimento</Text>
                <TextInput
                  style={styles.input}
                  placeholder="00/00/00"
                  maxLength={8}
                  value={watch("birthDate")}
                  onChangeText={(text) => setValue("birthDate", text)}
                />
                {errors.birthDate && (
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 5,
                    }}
                  >
                    <Ionicons name="warning-outline" size={15} color="red" />
                    <Text style={{ color: "red" }}>
                      {errors.birthDate.message}
                    </Text>
                  </View>
                )}
              </View>
              <View style={styles.drawingLevelContainer}>
                <Text style={styles.label}>Nível de desenho</Text>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={drawingLevel}
                    onValueChange={(itemValue: string) => {
                      setDrawingLevel(itemValue);
                      setValue("drawingLevel", itemValue);
                    }}
                    mode="dropdown"
                    style={styles.picker}
                  >
                    <Picker.Item label="Selecione" value="" />
                    <Picker.Item label="Iniciante" value="Iniciante" />
                    <Picker.Item label="Intermediário" value="Intermediário" />
                    <Picker.Item label="Avançado" value="Avançado" />
                  </Picker>
                  {errors.drawingLevel && (
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 5,
                      }}
                    >
                      <Ionicons name="warning-outline" size={15} color="red" />
                      <Text style={{ color: "red" }}>
                        {errors.drawingLevel.message}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            </View>

            <View>
              <Text style={styles.label}>Senha</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  secureTextEntry={!showPassword}
                  style={styles.inputPassword}
                  placeholder="Insira sua senha"
                  value={watch("password")}
                  onChangeText={(text) => setValue("password", text)}
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
                {errors.password && (
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 5,
                    }}
                  >
                    <Ionicons name="warning-outline" size={15} color="red" />
                    <Text style={{ color: "red" }}>
                      {errors.password.message}
                    </Text>
                  </View>
                )}
              </View>
            </View>

            <View>
              <Text style={styles.label}>Confirmar Senha</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  secureTextEntry={!showConfirmPassword}
                  style={styles.inputPassword}
                  placeholder="Repita a senha anterior"
                  value={watch("confirmPassword")}
                  onChangeText={(text) => setValue("confirmPassword", text)}
                />
                <TouchableOpacity
                  style={styles.eyeIcon}
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <Feather
                    name={showConfirmPassword ? "eye" : "eye-off"}
                    size={20}
                    color="#A9A9A9"
                  />
                </TouchableOpacity>
                {errors.confirmPassword && (
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 5,
                    }}
                  >
                    <Ionicons name="warning-outline" size={15} color="red" />
                    <Text style={{ color: "red" }}>
                      {errors.confirmPassword.message}
                    </Text>
                  </View>
                )}
              </View>
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
                  {loading ? "Carregando..." : "Entrar"}
                </Text>
              </View>
            </Pressable>

            <View style={styles.separatorContainer}>
              <View style={styles.line} />
              <Text style={styles.separatorText}>Ou</Text>
              <View style={styles.line} />
            </View>

            <Text style={styles.socialText}>Criar conta com</Text>

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
      </ScrollView>
    </SafeAreaView>
  );
}
