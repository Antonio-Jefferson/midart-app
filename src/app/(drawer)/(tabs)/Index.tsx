import { View, SafeAreaView, ScrollView } from "react-native";
import Header from "@/components/header/Header";
import PostComponent from "@/components/post-component/PostComponent";

export default function FeedScreen() {
  return (
    <View style={{ flex: 1 }}>
      <Header />
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff", padding: 20 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <PostComponent urlImage="https://www.pintarecolorir.com.br/imagem/desenho-gato-estilizado/desenho-estilizado-de-gato-para-desenhar.png" />
          <PostComponent urlImage="https://wallpapers.com/images/featured/desenho-a-lapis-imagens-aqaj0bqwnhui2f5b.jpg" />
          <PostComponent urlImage="https://blog.useartools.com.br/wp-content/uploads/2022/05/desenho-realista-rosto-feminino-1024x1024.webp" />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
