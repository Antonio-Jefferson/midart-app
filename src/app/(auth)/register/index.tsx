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
import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { Picker } from "@react-native-picker/picker";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

export default function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [drawingLevel, setDrawingLevel] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleGoogleLogin = async () => {
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
  const hendleSignUp = async () => {
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          name: name,
          drawing_level: drawingLevel,
          birth_date: birthDate,
        },
      },
    });

    if (error) {
      Alert.alert(error.message);
      setLoading(false);
      return;
    }

    setLoading(false);
    router.replace("/(auth)/login");
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
                value={name}
                onChangeText={setName}
              />
            </View>

            <View>
              <Text style={styles.label}>E-mail</Text>
              <TextInput
                style={styles.input}
                placeholder="Insira seu e-mail"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.row}>
              <View style={styles.birthDateContainer}>
                <Text style={styles.label}>Data de nascimento</Text>
                <TextInput
                  style={styles.input}
                  placeholder="00/00/00"
                  value={birthDate}
                  onChangeText={setBirthDate}
                  keyboardType="numeric"
                  maxLength={8}
                />
              </View>

              <View style={styles.drawingLevelContainer}>
                <Text style={styles.label}>Nível de desenho</Text>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={drawingLevel}
                    onValueChange={(itemValue: string) =>
                      setDrawingLevel(itemValue)
                    }
                    mode="dropdown"
                    style={styles.picker}
                  >
                    <Picker.Item label="Selecione" />
                    <Picker.Item label="Iniciante" />
                    <Picker.Item label="Intermediário" />
                    <Picker.Item label="Avançado" />
                  </Picker>
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
                  value={password}
                  onChangeText={setPassword}
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
            </View>

            <View>
              <Text style={styles.label}>Confirmar Senha</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  secureTextEntry={!showConfirmPassword}
                  style={styles.inputPassword}
                  placeholder="Repita a senha anterior"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
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
              </View>
            </View>

            <Pressable onPress={hendleSignUp}>
              <View style={styles.button}>
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
