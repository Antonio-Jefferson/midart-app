import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import { Link } from "expo-router";
import { Share } from "react-native";

export default function ButtonsActions() {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: "Olha esse post incrível no MidArt! 🎨✨",
        url: "https://midart.com/post/123",
        title: "MidArt - Compartilhamento de Post",
      });

      if (result.action === Share.sharedAction) {
        console.log("Compartilhado com sucesso");
      } else if (result.action === Share.dismissedAction) {
        console.log("Compartilhamento cancelado");
      }
    } catch (error) {
      console.error("Erro ao compartilhar:", error);
    }
  };

  return (
    <View style={styles.buttonsAction}>
      <TouchableOpacity
        onPress={() => {
          setLiked(!liked);
          console.log("Curtir:", !liked);
        }}
      >
        <Ionicons
          name={liked ? "heart" : "heart-outline"}
          size={28}
          color={liked ? "red" : "#275982"}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          console.log("Abrir comentários");
        }}
      >
        <Link href="/modal">
          <Ionicons name="chatbubble-outline" size={28} color="#275982" />
        </Link>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          setSaved(!saved);
          console.log("Salvar:", !saved);
        }}
      >
        <Ionicons
          name={saved ? "bookmark" : "bookmark-outline"}
          size={28}
          color="#275982"
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={handleShare}>
        <Ionicons name="paper-plane-outline" size={28} color="#275982" />
      </TouchableOpacity>
    </View>
  );
}
