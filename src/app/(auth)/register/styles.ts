import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff", // adicionando fundo branco igual o login
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

  pickerContainer: {
    borderWidth: 1,
    borderColor: "#CBC2C2",
    borderRadius: 100,
    paddingHorizontal: 10,
    justifyContent: "center",
    height: 48, // Altura igual ao input
  },

  picker: {
    height: 48, // Controla pra ficar na mesma altura dos inputs
    width: "100%", // Deixa o picker 100% dentro do container
  },

  button: {
    width: "100%",
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F69143",
    padding: 10,
    borderRadius: 100,
    marginTop: 20,
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  dateButton: {
    height: 48,
    backgroundColor: "#F69143",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    marginBottom: 10,
  },

  dateButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  birthDateContainer: {
    width: "45%",
  },

  drawingLevelContainer: {
    width: "45%",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
  separatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 32,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#CBC2C2",
  },
  separatorText: {
    marginHorizontal: 10,
    color: "#A9A9A9",
    fontSize: 14,
  },
  socialText: {
    textAlign: "center",
    fontSize: 14,
    color: "#275982",
    fontWeight: "bold",
    marginBottom: 10,
  },

  socialIconsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
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
});
