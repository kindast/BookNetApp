import { Image, Text, TouchableOpacity, View } from "react-native";
import { COLORS, FONT, icons } from "../../constants";
import { useSelector } from "react-redux";

export default function BookCard({
  title,
  image,
  rating,
  price,
  onPress,
  style,
}) {
  const isDarkMode = useSelector((state) => state.settings.isDarkMode);
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={{ width: 180, ...style }}>
        <Image
          source={{
            uri: image,
          }}
          style={{
            width: 180,
            height: 280,
            resizeMode: "stretch",
            borderRadius: 11,
            backgroundColor: isDarkMode ? "#e0e0e2" : "#767575",
          }}
        />
        <Text
          numberOfLines={2}
          style={{
            fontSize: 18,
            fontFamily: FONT.bold,
            color: isDarkMode ? COLORS.white : COLORS.black,
            marginTop: 8,
          }}
        >
          {title}
        </Text>
        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }}
        >
          <Image
            source={isDarkMode ? icons.starLight : icons.star}
            style={{ width: 14, height: 14 }}
          />
          <Text
            style={{
              color: isDarkMode ? "#e0e0e2" : "#767575",
              fontSize: 14,
              fontFamily: FONT.bold,
              marginLeft: 8,
            }}
          >
            {rating}
          </Text>
          <Text
            style={{
              color: isDarkMode ? "#e0e0e2" : "#767575",
              fontSize: 14,
              fontFamily: FONT.bold,
              marginLeft: 14,
            }}
          >
            {price}₽
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
