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
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#275982",
  },
  textFollow: {
    fontSize: 14,
    fontWeight: "regular",
    color: "#275982",
  },
});
