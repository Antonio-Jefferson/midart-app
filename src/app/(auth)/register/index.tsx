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
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";

export default function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [drawingLevel, setDrawingLevel] = useState("");
  const [birthDate, setBirthDate] = useState<Date>(new Date());
  const [loading, setLoading] = useState(false);
  const [showPicker, setShowPicker] = useState(false);

  const onChange = (event: any, selectedDate: any) => {
    setShowPicker(false);
    if (selectedDate) {
      setBirthDate(selectedDate);
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
      console.log(error);
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
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View style={{ width: "50%" }}>
                <Text style={styles.label}>Nível de Desenho</Text>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={drawingLevel}
                    onValueChange={(itemValue: string) =>
                      setDrawingLevel(itemValue)
                    }
                    style={styles.picker}
                  >
                    <Picker.Item label="INICIANTE" value="INICIANTE" />
                    <Picker.Item label="INTERMEDIÁRIO" value="INTERMEDIARIO" />
                    <Picker.Item label="AVANÇADO" value="AVANCADO" />
                  </Picker>
                </View>
              </View>
              <View>
                <Text style={{ fontSize: 16, marginBottom: 8 }}>
                  Data de Nascimento
                </Text>

                <Button
                  title={birthDate.toLocaleDateString("pt-BR")}
                  onPress={() => setShowPicker(true)}
                />

                {showPicker && (
                  <DateTimePicker
                    value={birthDate}
                    mode="date"
                    display="calendar"
                    onChange={onChange}
                    maximumDate={new Date()}
                  />
                )}
              </View>
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
