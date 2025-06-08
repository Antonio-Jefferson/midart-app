import { Text, View, StyleSheet, Pressable } from "react-native";

export default function CheckPreference() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Midart 🎨</Text>
      <Text style={styles.subtitle}>
        Escolha suas paixões para um feed feito só para você!
      </Text>
      <Text style={styles.label}>O que você gosta?</Text>

      <View style={styles.grid}>
        <PreferenceItem label="Anime" />
        <PreferenceItem label="Realismo" />
        <PreferenceItem label="HQ/Quadrinhos" />
        <PreferenceItem label="Cartoon" />
        <PreferenceItem label="Pixel Art" />
        <PreferenceItem label="Surrealismo" />
        <PreferenceItem label="Ilustrações" />
        <PreferenceItem label="Esboços" />
        <PreferenceItem label="Animações" />
        <PreferenceItem label="Arte 3D" />
      </View>

      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>Salvar e Explorar 🚀</Text>
      </Pressable>
    </View>
  );
}

function PreferenceItem({ label }: { label: string }) {
  return (
    <View style={styles.item}>
      <Text style={styles.itemText}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: "#f8f6ff",
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    marginTop: 8,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 10,
  },
  item: {
    width: "48%",
    padding: 12,
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderColor: "#dcdcdc",
    borderWidth: 1,
    alignItems: "center",
  },
  itemText: {
    fontWeight: "500",
  },
  button: {
    backgroundColor: "#5C3BFF",
    padding: 16,
    borderRadius: 10,
    marginTop: 30,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
