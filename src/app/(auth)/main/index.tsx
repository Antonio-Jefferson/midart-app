import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { Link } from "expo-router";

export default function MainScreen() {
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.title}>Seja a inspiração!!</Text>
        <Text style={styles.subtitle}>
          Junte-se à nossa plataforma criativa
        </Text>

        <Link href="/login" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/register" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Registrar-se</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}
