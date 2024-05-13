import { Image, Text, TouchableOpacity, View } from "react-native";
import { COLORS, FONT, api, icons } from "../../constants";
import { useSelector } from "react-redux";

export default function HorizontalBookCard({ book, onPress, style }) {
  const isDarkMode = useSelector((state) => state.settings.isDarkMode);
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          ...style,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row", gap: 15 }}>
          <Image
            source={{
              uri: api + book.coverUrl,
            }}
            style={{
              width: 120,
              height: 180,
              resizeMode: "stretch",
              borderRadius: 11,
              backgroundColor: isDarkMode ? "#e0e0e2" : "#767575",
            }}
          />
          <View>
            <Text
              adjustsFontSizeToFit
              style={{
                fontSize: 18,
                fontFamily: FONT.bold,
                color: isDarkMode ? COLORS.white : COLORS.black,
                marginTop: 8,
                maxWidth: 240,
                maxHeight: 80,
              }}
            >
              {book.title}
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 5,
              }}
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
                {book.rating}
              </Text>
            </View>
            <Text
              style={{
                color: isDarkMode ? "#e0e0e2" : "#767575",
                fontSize: 14,
                fontFamily: FONT.bold,
                marginTop: 5,
              }}
            >
              {book.price}₽
            </Text>
            <View
              style={{
                marginTop: 15,
                flexDirection: "row",
                flexWrap: "wrap",
                gap: 8,
                maxWidth: 240,
              }}
            >
              {book?.genres?.map((genre, index) => (
                <View
                  key={index}
                  style={{
                    backgroundColor: isDarkMode ? "#35383f" : "#eeeeee",
                    paddingVertical: 6,
                    paddingHorizontal: 12,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 6,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: FONT.regular,
                      fontSize: 10,
                      color: isDarkMode ? "#e0e0e0" : "#737373",
                    }}
                  >
                    {genre.name}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
