import { Drawer } from "expo-router/drawer";

export default function DrawerLayout() {
  return (
    <Drawer screenOptions={{ drawerPosition: "right", headerShown: false }} />
  );
}
