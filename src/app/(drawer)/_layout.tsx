import { Drawer } from "expo-router/drawer";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { Ionicons, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { supabase } from "@/lib/supabase";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import Toast from "react-native-toast-message";

export default function DrawerLayout(props: any) {
  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    await GoogleSignin.signOut();

    if (error) {
      Toast.show({
        type: "error",
        text1: "Erro ao sair",
        text2: error.message,
      });
      return;
    }

    props.navigation.reset({
      index: 0,
      routes: [{ name: "login" }],
    });
  };

  return (
    <Drawer
      screenOptions={{
        drawerPosition: "right",
        headerShown: false,
      }}
      drawerContent={(drawerProps) => (
        <DrawerContentScrollView
          {...drawerProps}
          contentContainerStyle={styles.container}
        >
          <View style={styles.profileSection}>
            <Image
              source={{
                uri: "https://i.pravatar.cc/150?img=3",
              }}
              style={styles.avatar}
            />
            <Text style={styles.name}>Sophia Bennett</Text>
            <Text style={styles.username}>@sophia.bennett</Text>
            <Pressable style={styles.editProfileButton}>
              <Text style={styles.editProfileText}>Editar Perfil</Text>
            </Pressable>
          </View>

          <View style={styles.menuItems}>
            <DrawerItem
              icon={<Feather name="user" size={20} />}
              label="Meu Perfil"
            />
            <DrawerItem
              icon={<Feather name="calendar" size={20} />}
              label="Eventos"
            />
            <DrawerItem
              icon={<MaterialCommunityIcons name="ticket-outline" size={20} />}
              label="Planos"
            />
            <DrawerItem
              icon={<Feather name="settings" size={20} />}
              label="Configurações"
            />
            <DrawerItem
              icon={<Feather name="help-circle" size={20} />}
              label="Ajuda"
            />
          </View>

          <View style={styles.footer}>
            <Pressable style={styles.logoutButton} onPress={handleSignOut}>
              <Ionicons name="log-out-outline" size={20} />
              <Text style={styles.logoutText}>Sair</Text>
            </Pressable>
            <Text style={styles.versionText}>Version 1.0.0</Text>
          </View>
        </DrawerContentScrollView>
      )}
    >
      <Drawer.Screen
        name="(tabs)"
        options={{
          drawerItemStyle: { display: "none" },
        }}
      />
      <Drawer.Screen
        name="Profile"
        options={{
          drawerLabel: "Meu Perfil",
        }}
      />
    </Drawer>
  );
}

const DrawerItem = ({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) => (
  <Pressable style={styles.drawerItem}>
    <View style={styles.iconBox}>{icon}</View>
    <Text style={styles.drawerItemText}>{label}</Text>
  </Pressable>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileSection: {
    alignItems: "center",
    paddingVertical: 30,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  name: {
    fontWeight: "bold",
    fontSize: 18,
  },
  username: {
    color: "#888",
    marginBottom: 10,
  },
  editProfileButton: {
    backgroundColor: "#F69143",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  editProfileText: {
    fontWeight: "600",
  },
  menuItems: {
    paddingHorizontal: 20,
    gap: 15,
  },
  drawerItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconBox: {
    width: 32,
    height: 32,
    backgroundColor: "#F69143",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  drawerItemText: {
    fontSize: 16,
  },
  footer: {
    marginTop: "auto",
    padding: 20,
    borderTopWidth: 1,
    borderColor: "#eee",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },
  logoutText: {
    fontSize: 16,
  },
  versionText: {
    fontSize: 12,
    color: "#aaa",
  },
});
