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

  googleButton: {
    marginTop: 16,
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  googleContent: {
    flexDirection: "row",
    alignItems: "center",
  },

  googleIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },

  googleText: {
    color: "#000",
    fontWeight: "500",
    fontSize: 16,
  },
});
