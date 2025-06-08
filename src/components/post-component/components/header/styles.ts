import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  containerHeader: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  containerAvatar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  imageAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },

  textName: {
    fontSize: 16,
    fontWeight: "bold",
  },

  textLocation: {
    fontSize: 12,
  },

  buttonFollow: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#275982",
    alignItems: "center",
    justifyContent: "center",
  },

  textFollow: {
    color: "#275982",
    fontSize: 14,
  },
});
