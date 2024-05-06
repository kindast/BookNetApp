import {
  Image,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { COLORS, FONT, api, icons } from "../../constants";
import { useSelector } from "react-redux";
import { useState } from "react";
import {
  Menu,
  MenuTrigger,
  MenuOption,
  MenuOptions,
} from "react-native-popup-menu";
import { useNavigation } from "@react-navigation/native";
import english from "../../locales/english.json";
import russian from "../../locales/russian.json";
import { I18n } from "i18n-js";

export default function WishListBookCard({
  book,
  onPress,
  style,
  onRemoveWishlist,
}) {
  const isDarkMode = useSelector((state) => state.settings.isDarkMode);
  const locale = useSelector((state) => state.settings.locale);
  const i18n = new I18n({
    en: english,
    ru: russian,
  });
  i18n.locale = locale;
  const navigation = useNavigation();
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
          </View>
        </View>
        <Menu
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <MenuTrigger>
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
          </MenuTrigger>
          <MenuOptions
            optionsContainerStyle={{
              borderRadius: 20,
              paddingHorizontal: 20,
              flex: 1,
            }}
          >
            <MenuOption onSelect={onRemoveWishlist}>
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
                  {i18n.t("WLSRemoveBook")}
                </Text>
              </View>
            </MenuOption>
            <View
              style={{
                height: 1,
                backgroundColor: isDarkMode ? "#34363c" : "#efedef",
              }}
            />
            <MenuOption
              onSelect={() => {
                navigation.navigate("bookdetails", { id: book.id });
              }}
            >
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
                  {i18n.t("WLSAboutBook")}
                </Text>
              </View>
            </MenuOption>
          </MenuOptions>
        </Menu>
      </View>
    </TouchableOpacity>
  );
}
