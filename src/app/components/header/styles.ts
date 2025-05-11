import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    position: "relative",
    flexDirection: "row",
    height: 56,
    alignItems: "center",
    backgroundColor: "#275982",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  logo: {
    width: 80,
    height: 30,
  },
  containerIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginLeft: "auto",
  },
  containerNotification: {
    position: "relative",
  },
  cicle: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "red",
    position: "absolute",
    zIndex: 1,
    top: -1,
    right: 2,
  },
});
