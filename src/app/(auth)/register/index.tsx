import {
  Alert,
  Button,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { router } from "expo-router";
import { styles } from "./styles";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { supabase } from "../../lib/supabase";

export default function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const hendleSignUp = async () => {
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
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
      <ScrollView style={{ flex: 1 }}>
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
              <Text style={styles.label}>Nome</Text>
              <TextInput
                style={styles.input}
                placeholder="Digite seu nome"
                value={name}
                onChangeText={setName}
              />
            </View>
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
            <Pressable onPress={hendleSignUp}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>
                  {loading ? "Carregando..." : "Registrar-se"}
                </Text>
              </View>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
