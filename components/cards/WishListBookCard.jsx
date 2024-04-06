import { Image, Text, TouchableOpacity, View, Platform } from "react-native";
import { COLORS, FONT, icons } from "../../constants";
import { useSelector } from "react-redux";
import { useState } from "react";

export default function WishListBookCard({
  title,
  image,
  rating,
  price,
  onPress,
  style,
}) {
  const isDarkMode = useSelector((state) => state.settings.isDarkMode);
  const [modalVisible, setModalVisible] = useState(false);
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
              uri: image,
            }}
            style={{
              width: 90,
              height: 138,
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
              {title}
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
                {rating}
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
              {price}₽
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={{ justifyContent: "center" }}
          onPress={() => setModalVisible(true)}
        >
          <View style={{ gap: 2, padding: 20, paddingRight: 0 }}>
            <View
              style={{
                width: 4,
                height: 4,
                borderRadius: 100,
                backgroundColor: isDarkMode ? COLORS.white : COLORS.black,
              }}
            />
            <View
              style={{
                width: 4,
                height: 4,
                borderRadius: 100,
                backgroundColor: isDarkMode ? COLORS.white : COLORS.black,
              }}
            />
            <View
              style={{
                width: 4,
                height: 4,
                borderRadius: 100,
                backgroundColor: isDarkMode ? COLORS.white : COLORS.black,
              }}
            />
          </View>
        </TouchableOpacity>
        <View
          style={{
            backgroundColor: isDarkMode
              ? COLORS.darkBackground
              : COLORS.lightBackground,
            elevation: 2,
            borderRadius: 20,
            width: 200,
            position: "absolute",
            right: 5,
            top: 37,
            zIndex: 10,
            paddingHorizontal: 20,
          }}
        >
          <TouchableOpacity>
            <View
              style={{
                flexDirection: "row",
                gap: 15,
                paddingVertical: 15,
              }}
            >
              <Image
                source={isDarkMode ? icons.documentLight : icons.document}
                style={{ width: 18, height: 18, resizeMode: "contain" }}
              />
              <Text
                style={{
                  fontSize: 13,
                  fontFamily: FONT.regular,
                  color: isDarkMode ? COLORS.white : COLORS.black,
                }}
              >
                Remove from Wishlist
              </Text>
            </View>
          </TouchableOpacity>
          <View
            style={{
              height: 1,
              backgroundColor: isDarkMode ? "#34363c" : "#efedef",
            }}
          />
          <TouchableOpacity>
            <View
              style={{
                flexDirection: "row",
                gap: 15,
                paddingVertical: 15,
              }}
            >
              <Image
                source={isDarkMode ? icons.infoLight : icons.info}
                style={{ width: 18, height: 18, resizeMode: "contain" }}
              />
              <Text
                style={{
                  fontSize: 13,
                  fontFamily: FONT.regular,
                  color: isDarkMode ? COLORS.white : COLORS.black,
                }}
              >
                About Ebook
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}