import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: 20,
  },
  container: {
    height: "70%",
  },
  label: {
    borderColor: "gray",
    marginBottom: 5,
  },

  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },

  iconBack: {
    backgroundColor: "rgba(163, 161, 161, 0.2)",
    alignSelf: "flex-start",
    padding: 8,
    borderRadius: 8,
    marginBottom: 10,
  },

  button: {
    width: "100%",
    color: "#fff",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
  },
});
