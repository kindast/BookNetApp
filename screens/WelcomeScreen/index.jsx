import React from "react";
import { Alert, View, Image, Text, StyleSheet, StatusBar } from "react-native";
import { COLORS, FONT, SIZES, icons, images } from "../../constants";
import GoogleButton from "../../components/controls/GoogleButton";
import Button from "../../components/controls/Button";
import AccentButton from "../../components/controls/AccentButton";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import english from "../../locales/english.json";
import russian from "../../locales/russian.json";
import { I18n } from "i18n-js";

export default function WelcomeScreen() {
  const nagigation = useNavigation();
  const isDarkMode = useSelector((state) => state.settings.isDarkMode);
  const locale = useSelector((state) => state.settings.locale);
  const i18n = new I18n({
    en: english,
    ru: russian,
  });
  i18n.locale = locale;

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: isDarkMode
          ? COLORS.darkBackground
          : COLORS.lightBackground,
      }}
    >
      <View style={styles.imageContainer}>
        <Image source={images.shelfbook} style={styles.shelfbook} />
      </View>
      <View>
        <View
          style={{
            flexDirection: locale === "ru" ? "column" : "row",
            columnGap: 10,
            marginTop: 24,
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              color: isDarkMode ? COLORS.white : COLORS.black,
              fontFamily: FONT.bold,
              fontSize: SIZES.h1,
            }}
          >
            {i18n.t("WSWelcome")}
          </Text>
          <Text
            style={{
              color: COLORS.primary,
              fontFamily: FONT.bold,
              fontSize: SIZES.h1,
            }}
          >
            BookNet 👋
          </Text>
        </View>
        <Text
          style={{
            color: isDarkMode ? COLORS.white : COLORS.black,
            fontFamily: FONT.regular,
            textAlign: "center",
            fontSize: SIZES.h2,
            marginTop: 16,
          }}
        >
          {i18n.t("WSBest")}
        </Text>
        <GoogleButton style={{ marginTop: 32 }} onPress={() => {}} />
        <Button
          title={i18n.t("WSGetStarted")}
          style={{ marginTop: 16 }}
          onPress={() => {
            nagigation.navigate("signup");
          }}
        />
        <AccentButton
          title={i18n.t("WSAlreadyHaveAnAccount")}
          style={{ marginTop: 16 }}
          onPress={() => {
            nagigation.navigate("signin");
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: SIZES.ph,
  },
  imageContainer: {
    height: "50%",
  },
  shelfbook: {
    height: "100%",
    resizeMode: "stretch",
  },
});
