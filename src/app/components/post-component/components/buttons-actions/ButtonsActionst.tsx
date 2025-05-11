import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
import { styles } from "./styles";

export default function ButtonsActions() {
  return (
    <View style={styles.buttonsAction}>
      <Ionicons name="heart" size={28} color="red" />
      <Ionicons name="chatbubble-outline" size={28} color="#275982" />
      <Ionicons name="bookmark" size={28} color="#275982" />
      <Ionicons name="paper-plane-outline" size={28} color="#275982" />
    </View>
  );
}
