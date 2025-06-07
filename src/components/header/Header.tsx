import { View, Image, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { DrawerActions } from "@react-navigation/native";

export default function Header() {
  const navigation = useNavigation();

  const handleMenuPress = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <View style={styles.container}>
      <View>
        <Image
          style={styles.logo}
          source={require("@assets/images/logo.png")}
        />
      </View>
      <View style={styles.containerIcons}>
        <TouchableOpacity onPress={handleMenuPress}>
          <Ionicons name="menu" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
