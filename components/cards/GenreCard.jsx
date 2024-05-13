import { View, ImageBackground, Text, TouchableOpacity } from "react-native";
import { COLORS, FONT, api } from "../../constants";

export default function GenreCard({ genre, style, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <ImageBackground
        source={{
          uri: api + genre.image,
        }}
        style={{
          resizeMode: "center",
          ...style,
        }}
        imageStyle={{ borderRadius: 11 }}
      >
        <View
          style={{
            justifyContent: "flex-end",
            flex: 1,
          }}
        >
          <Text
            adjustsFontSizeToFit
            style={{
              fontFamily: FONT.bold,
              fontSize: 16,
              color: COLORS.white,
              marginBottom: 8,
              marginLeft: 12,
              marginRight: 12,
            }}
          >
            {genre.name}
          </Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}
