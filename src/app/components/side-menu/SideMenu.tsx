import { Text, View } from "react-native";
import { styles } from "./styles";

export default function SideMenu() {
  return (
    <View style={styles.container}>
      <View style={styles.containerSideMenu}>
        <Text>SideMenu</Text>
      </View>
    </View>
  );
}
