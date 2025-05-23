import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },

  header: {
    marginTop: 32,
  },

  title: {
    fontSize: 32,
    color: "#275982",
    fontWeight: "bold",
  },

  subtitle: {
    fontSize: 14,
    color: "#000",
    marginBottom: 16,
  },

  container: {
    height: "70%",
  },

  label: {
    fontSize: 14,
    color: "#275982",
    marginBottom: 8,
    fontWeight: "bold",
  },

  input: {
    height: 48,
    borderColor: "#CBC2C2",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 100,
  },

  containerFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 14,
    marginBottom: 32,
  },

  meConnectText: {
    fontSize: 14,
    color: "#275982",
  },

  forgotPassword: {
    fontSize: 14,
    color: "#275982",
  },

  button: {
    width: "100%",
    height: 48,
    color: "#fff",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F69143",
    padding: 10,
    borderRadius: 100,
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  separator: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 16,
  },

  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#D9D9D9",
  },

  separatorText: {
    marginHorizontal: 8,
    color: "#275982",
  },

  socialButtons: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    gap: 14,
  },

  googleButton: {
    width: 25,
    height: 25,
    marginRight: 10,
  },

  googleContent: {
    flexDirection: "row",
    alignItems: "center",
  },

  googleIcon: {
    width: 25,
    height: 25,
    marginRight: 10,
  },

  facebookButton: {
    width: 25,
    height: 25,
    marginRight: 10,
  },

  facebookContent: {
    flexDirection: "row",
    alignItems: "center",
  },

  facebookIcon: {
    width: 25,
    height: 25,
    marginRight: 10,
  },

  footer: {
    width: "70%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginHorizontal: "auto",
    marginTop: 32,
  },

  dontHaveAccount: {
    fontSize: 14,
    flexDirection: "row",
    alignItems: "center",
    color: "#275982",
  },

  registerText: {
    color: "#F69143",
    fontSize: 16,
    fontWeight: "medium",
  },

  passwordContainer: {
    position: "relative",
    justifyContent: "center",
  },
  inputPassword: {
    height: 48,
    borderColor: "#CBC2C2",
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 100,
    paddingRight: 40,
    marginBottom: 10,
  },
  eyeIcon: {
    position: "absolute",
    right: 15,
    top: 14,
  },
});
