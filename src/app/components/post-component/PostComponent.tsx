import React, { useState } from "react";
import { Image, Text, View, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import HeaderInformation from "./components/header/HeaderInformation";
import ButtonsActions from "./components/buttons-actions/ButtonsActionst";

interface PostComponentProps {
  urlImage: string;
}
export default function PostComponent({ urlImage }: PostComponentProps) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded((prev) => !prev);
  };

  return (
    <View style={styles.container}>
      <HeaderInformation />
      <View style={styles.containerImagePost}>
        <Image
          style={styles.imagePost}
          source={{
            uri: urlImage,
          }}
        />
        <ButtonsActions />
      </View>
      <View>
        <View style={styles.containerInformationPost}>
          <Text style={styles.textInformation}>1208k likes</Text>
          <Text style={styles.textInformation}>1h ago</Text>
        </View>

        <Text
          style={styles.textDescription}
          numberOfLines={expanded ? undefined : 2}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </Text>

        <View style={{ alignItems: "flex-end", marginBottom: 10 }}>
          <TouchableOpacity onPress={toggleExpand}>
            <Text style={{ color: "#726969" }}>
              {expanded ? "ver menos" : "ver mais"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
