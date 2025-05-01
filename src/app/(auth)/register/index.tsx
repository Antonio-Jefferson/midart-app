import {
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
import { TextInputMask } from "react-native-masked-text";
import facebookIcon from "../../../../assets/images/facebook.png";

export default function RegisterScreen() {
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] =
    useState(false);
  const [isNameFocused, setIsNameFocused] = useState(false);
  const [isBirthDateFocused, setIsBirthDateFocused] = useState(false);
  const [isDrawingLevelFocused, setIsDrawingLevelFocused] = useState(false);
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
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
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
                style={[
                  styles.input,
                  { borderColor: isNameFocused ? "#F4791A" : "#CBC2C2" },
                ]}
                placeholder="Insira seu nome"
                value={watch("name")}
                onChangeText={(text) => setValue("name", text)}
                onFocus={() => setIsNameFocused(true)}
                onBlur={() => setIsNameFocused(false)}
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
                style={[
                  styles.input,
                  { borderColor: isEmailFocused ? "#F4791A" : "#CBC2C2" },
                ]}
                placeholder="Insira seu e-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                value={watch("email")}
                onChangeText={(text) => setValue("email", text)}
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

            <View style={styles.row}>
              <View style={styles.birthDateContainer}>
                <Text style={styles.label}>Data de nascimento</Text>
                <TextInputMask
                  type={"datetime"}
                  style={[
                    styles.input,
                    { borderColor: isBirthDateFocused ? "#F4791A" : "#CBC2C2" },
                  ]}
                  options={{
                    format: "DD/MM/YYYY",
                  }}
                  placeholder="DD/MM/AAAA"
                  value={watch("birthDate")}
                  onChangeText={(text) => setValue("birthDate", text)}
                  onFocus={() => setIsBirthDateFocused(true)}
                  onBlur={() => setIsBirthDateFocused(false)}
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
                    style={[
                      styles.picker,
                      {
                        borderColor: isDrawingLevelFocused
                          ? "#F4791A"
                          : "#CBC2C2",
                      },
                    ]}
                    onFocus={() => setIsDrawingLevelFocused(true)}
                    onBlur={() => setIsDrawingLevelFocused(false)}
                  >
                    <Picker.Item label="Selecione" value="" />
                    <Picker.Item label="Iniciante" value="Iniciante" />
                    <Picker.Item label="Intermediário" value="Intermediário" />
                    <Picker.Item label="Avançado" value="Avançado" />
                  </Picker>
                </View>
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

            <View>
              <Text style={styles.label}>Senha</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  secureTextEntry={!showPassword}
                  style={[
                    styles.inputPassword,
                    { borderColor: isPasswordFocused ? "#F4791A" : "#CBC2C2" },
                  ]}
                  placeholder="Insira sua senha"
                  value={watch("password")}
                  onChangeText={(text) => setValue("password", text)}
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
                  style={[
                    styles.inputPassword,
                    {
                      borderColor: isConfirmPasswordFocused
                        ? "#F4791A"
                        : "#CBC2C2",
                    },
                  ]}
                  placeholder="Repita a senha anterior"
                  value={watch("confirmPassword")}
                  onChangeText={(text) => setValue("confirmPassword", text)}
                  onFocus={() => setIsConfirmPasswordFocused(true)}
                  onBlur={() => setIsConfirmPasswordFocused(false)}
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

            <Pressable onPress={handleSubmit(onSubmit)} disabled={loading}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>
                  {loading ? "Cadastrando..." : "Criar conta"}
                </Text>
              </View>
            </Pressable>

            <View style={styles.separatorContainer}>
              <View style={styles.line} />
              <Text style={styles.separatorText}>Ou</Text>
              <View style={styles.line} />
            </View>

            <Text style={styles.socialText}>Criar conta com</Text>

            <View style={styles.socialButtons}>
              <Pressable>
                <View style={styles.facebookButton}>
                  <View style={styles.facebookContent}>
                    <Image source={facebookIcon} style={styles.facebookIcon} />
                  </View>
                </View>
              </Pressable>
              <Pressable
                onPress={handleGoogleLogin}
                style={styles.googleButton}
              >
                <View style={styles.googleContent}>
                  <Image
                    source={{
                      uri: "https://img.icons8.com/?size=512&id=17949&format=png",
                    }}
                    style={styles.googleIcon}
                  />
                </View>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
