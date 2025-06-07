import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { Alert, StyleSheet, TouchableOpacity } from "react-native";

export const SpecialTabButton = () => {
  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Alert.alert("Special Tab Button");
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={styles.button}
      activeOpacity={0.85}
    >
      <Ionicons name="add-circle" size={30} color="#275982" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    top: -10,
    left: "50%",
    transform: [{ translateX: -25 }],
    backgroundColor: "#fff",
    borderRadius: 100,
    width: 55,
    height: 55,
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
  },
});
