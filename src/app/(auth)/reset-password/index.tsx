import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { styles } from "./_styles";
import { router } from "expo-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  resetPasswordSchema,
  ResetPasswordSchema,
} from "@/schemas/resetPasswordSchema";
import { supabase } from "@/lib/supabase";
import Toast from "react-native-toast-message";

const ResetPasswordScreen = () => {
  const {
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onChange",
  });

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  const onSubmit = async (data: ResetPasswordSchema) => {
    try {
      const { error } = await supabase.auth.updateUser({
        password: data.password,
      });

      if (error) throw error;

      Toast.show({
        type: "success",
        text1: "Senha redefinida com sucesso!",
      });

      router.push("/(auth)/login");
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Erro ao redefinir a senha",
        text2: (error as Error).message,
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.logo}>MIDART</Text>
        <Text style={styles.title}>Redefinir Senha</Text>
        <Text style={styles.subtitle}>
          Digite sua nova senha e confirme para redefinir.
        </Text>

        {/* Campo de Nova Senha */}
        <Text style={styles.label}>Nova Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Nova Senha"
          value={password}
          onChangeText={(text) =>
            setValue("password", text, { shouldValidate: true })
          }
          secureTextEntry
          autoCapitalize="none"
        />
        {errors.password && (
          <Text style={styles.error}>{errors.password.message}</Text>
        )}

        {/* Campo de Confirmação de Senha */}
        <Text style={styles.label}>Confirmar Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Confirmar Senha"
          value={confirmPassword}
          onChangeText={(text) =>
            setValue("confirmPassword", text, { shouldValidate: true })
          }
          secureTextEntry
          autoCapitalize="none"
        />
        {errors.confirmPassword && (
          <Text style={styles.error}>{errors.confirmPassword.message}</Text>
        )}

        {/* Botão de Confirmação */}
        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={styles.buttonText}>Redefinir Senha</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
          <Text style={styles.link}>Voltar ao Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ResetPasswordScreen;
