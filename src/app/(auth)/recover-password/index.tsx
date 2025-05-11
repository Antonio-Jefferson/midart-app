import { router } from "expo-router";
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import styles from "./styles";
import { supabase } from "@/app/lib/supabase";
import Toast from "react-native-toast-message";

const PasswordRecoveryScreen = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendEmail = async () => {
    setLoading(true);
    try {
      await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: "myapp://reset-password",
      });
      Toast.show({
        type: "success",
        text1: "Email enviado com sucesso",
      });
      setEmail("");
      setLoading(false);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Erro ao enviar email",
      });
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.logo}>MIDART</Text>
        <Text style={styles.title}>Recuperar Senha</Text>
        <Text style={styles.subtitle}>
          Por favor, insira seu email para recuperar sua senha
        </Text>

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TouchableOpacity style={styles.button} onPress={handleSendEmail}>
          <Text style={styles.buttonText}>
            {loading ? "Enviando..." : "Voltar"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.link}>Volta para Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PasswordRecoveryScreen;
