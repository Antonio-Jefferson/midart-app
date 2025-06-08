import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

export default function HeaderInformation() {
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  return (
    <View style={styles.containerHeader}>
      <View style={styles.containerAvatar}>
        <Image
          style={styles.imageAvatar}
          source={{
            uri: "https://img.icons8.com/?size=512&id=17949&format=png",
          }}
        />
        <View>
          <Text style={styles.textName}>A.ntony</Text>
          <Text style={styles.textLocation}>Brasil | SP</Text>
        </View>
      </View>

      <TouchableOpacity
        onPress={handleFollow}
        style={[
          styles.buttonFollow,
          isFollowing && {
            backgroundColor: "#275982",
            borderColor: "#275982",
          },
        ]}
      >
        <Text
          style={[
            styles.textFollow,
            isFollowing && {
              color: "#FFFFFF",
              fontWeight: "bold",
            },
          ]}
        >
          {isFollowing ? "Seguindo" : "Seguir"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
