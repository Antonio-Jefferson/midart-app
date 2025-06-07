import { View } from "react-native";
import { Image } from "react-native";
import { styles } from "./styles";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import SideMenu from "../side-menu/SideMenu";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const isNototifications = true;
  return (
    <View style={styles.container}>
      <View>
        <Image
          style={styles.logo}
          source={require("@assets/images/logo.png")}
        />
      </View>
      <View style={styles.containerIcons}>
        <View style={styles.containerNotification}>
          {isNototifications && <View style={styles.cicle}></View>}
          <Ionicons name="notifications" size={24} color="white" />
        </View>
        <Ionicons
          onPress={() => {
            setMenuOpen(!menuOpen);
          }}
          name="menu"
          size={24}
          color="white"
        />
      </View>
      {menuOpen && <SideMenu />}
    </View>
  );
}
