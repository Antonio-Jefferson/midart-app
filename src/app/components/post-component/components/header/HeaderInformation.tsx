import { Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { Ionicons } from "@expo/vector-icons";

export default function HeaderInformation() {
  return (
    <View style={styles.containerHeader}>
      <View style={styles.containerAvatar}>
        <View>
          <Image
            style={styles.imageAvatar}
            source={{
              uri: "https://img.icons8.com/?size=512&id=17949&format=png",
            }}
          />
        </View>
        <View>
          <Text style={styles.textName}>A.ntony</Text>
          <View>
            <Text style={styles.textLocation}>Brasil | SP</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.buttonFollow}>
        <Text style={styles.textFollow}>Seguir</Text>
        <Ionicons name="add" size={14} color="#275982" />
      </TouchableOpacity>
    </View>
  );
}
