import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Image,
  ScrollView,
} from "react-native";
import { SIZES, FONT, COLORS, icons } from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import english from "../../locales/english.json";
import russian from "../../locales/russian.json";
import { I18n } from "i18n-js";
import { useEffect, useState } from "react";
import { setLocale } from "../../redux/slices/settingsSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LanguageScreen() {
  const isDarkMode = useSelector((state) => state.settings.isDarkMode);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const locale = useSelector((state) => state.settings.locale);
  const i18n = new I18n({
    en: english,
    ru: russian,
  });
  i18n.locale = locale;

  useEffect(() => {
    locale === "en" ? setSelectedLanguage(0) : setSelectedLanguage(1);
  }, []);

  const updateLocale = async (index) => {
    const lang = index === 0 ? "en" : "ru";
    AsyncStorage.setItem("locale", lang).then(() => dispatch(setLocale(lang)));
  };

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: isDarkMode
          ? COLORS.darkBackground
          : COLORS.lightBackground,
      }}
    >
      <View style={styles.header}>
        <View style={styles.title}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Image
              source={isDarkMode ? icons.backLight : icons.back}
              style={{ width: 25, height: 25 }}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontFamily: FONT.bold,
              color: isDarkMode ? COLORS.white : COLORS.black,
              fontSize: 24,
              marginLeft: 20,
            }}
          >
            {i18n.t("ABSLanguage")}
          </Text>
        </View>
      </View>
      <View style={{ marginTop: 30, gap: 30 }}>
        <TouchableOpacity
          onPress={() => {
            setSelectedLanguage(0);
            updateLocale(0);
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                fontFamily: FONT.regular,
                fontSize: 20,
                color: isDarkMode ? COLORS.white : COLORS.black,
              }}
            >
              {i18n.t("ABSEnglish")}
            </Text>
            <Image
              source={
                selectedLanguage === 0 ? icons.radioFill : icons.radioEmpty
              }
              style={{ width: 25, height: 25, resizeMode: "contain" }}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setSelectedLanguage(1);
            updateLocale(1);
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                fontFamily: FONT.regular,
                fontSize: 20,
                color: isDarkMode ? COLORS.white : COLORS.black,
              }}
            >
              {i18n.t("ABSRussian")}
            </Text>
            <Image
              source={
                selectedLanguage === 1 ? icons.radioFill : icons.radioEmpty
              }
              style={{ width: 25, height: 25, resizeMode: "contain" }}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: SIZES.pt,
    paddingHorizontal: SIZES.ph,
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    flexDirection: "row",
    alignItems: "center",
  },
});
