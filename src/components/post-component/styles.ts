import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  containerImagePost: {
    position: "relative",
    width: "100%",
    height: "auto",
    maxHeight: 600,
    borderRadius: 5,
    marginTop: 12,
    marginBottom: 8,
  },

  imagePost: {
    width: "100%",
    height: "100%",
    borderRadius: 5,
  },

  containerInformationPost: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textInformation: {
    fontSize: 14,
    fontWeight: "regular",
    color: "#726969",
  },

  textDescription: {
    fontSize: 14,
    fontWeight: "regular",
    color: "#000",
  },
});
