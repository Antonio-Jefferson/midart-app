import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  imageBackground: {
    position: "relative",
    width: "100%",
    height: "82%",
  },
  container: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "60%",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: "#275982",
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  backgroundImage: {
    position: "absolute",
    width: "120%",
    height: "120%",
    resizeMode: "cover",
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  title: {
    fontSize: 32,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "left", // já faz o alinhamento à esquerda
  },
  button: {
    width: 364,
    height: 50,
    backgroundColor: "#F69143",
    paddingVertical: 12,
    borderRadius: 100,
    marginTop: 46,
    alignItems: "center",
  },

  buttonSecondary: {
    width: 364,
    height: 50,
    backgroundColor: "#FFF",
    paddingVertical: 12,
    borderRadius: 100,
    marginTop: 30,
    alignItems: "center",
  },
  buttonTextSecondary: {
    color: "#073B4C",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
