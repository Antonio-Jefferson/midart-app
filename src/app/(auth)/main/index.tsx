import { Text, TouchableOpacity, View, ImageBackground } from "react-native";
import { styles } from "./styles";
import { Link } from "expo-router";

export default function MainScreen() {
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require("../../../../assets/images/bg-fundo.png")}
        style={styles.imageBackground}
      ></ImageBackground>

      <ImageBackground
        source={require("../../../../assets/images/bg-main.png")}
        style={styles.container}
        imageStyle={{ borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
      >
        <View style={{ width: "100%", alignItems: "flex-start" }}>
          <Text style={styles.title}>
            Seja a inspiração! Junte-se à nossa Plataforma criativa.
          </Text>
        </View>

        <Link href="/(auth)/login" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/(auth)/register" asChild>
          <TouchableOpacity style={styles.buttonSecondary}>
            <Text style={styles.buttonTextSecondary}>Registrar-se</Text>
          </TouchableOpacity>
        </Link>
      </ImageBackground>
    </View>
  );
}
