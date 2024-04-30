import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  RefreshControl,
} from "react-native";
import { COLORS, FONT, SIZES, icons } from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import WishListBookCard from "../../components/cards/WishListBookCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setUser } from "../../redux/slices/authSlice";
import english from "../../locales/english.json";
import russian from "../../locales/russian.json";
import { I18n } from "i18n-js";

export default function AccountScreen() {
  const isDarkMode = useSelector((state) => state.settings.isDarkMode);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const locale = useSelector((state) => state.settings.locale);
  const navigation = useNavigation();
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
      <View style={styles.header}>
        <View style={styles.logo}>
          <Image
            source={icons.logo}
            style={{ height: 25, width: 25, resizeMode: "contain" }}
          />
          <Text
            style={{
              fontFamily: FONT.bold,
              color: isDarkMode ? COLORS.white : COLORS.black,
              fontSize: 24,
              marginLeft: 15,
            }}
          >
            {i18n.t("ASTitle")}
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          marginTop: 30,
          gap: 20,
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: 56,
            height: 56,
            borderRadius: 1000,
            backgroundColor: COLORS.primary,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontFamily: FONT.bold, fontSize: 20, color: "white" }}>
            {user.email[0].toUpperCase()}
          </Text>
        </View>
        <View style={{ gap: 5 }}>
          <Text
            style={{
              fontFamily: FONT.bold,
              fontSize: 20,
              color: isDarkMode ? COLORS.white : "#404040",
            }}
          >
            {user.firstName + " " + user.lastName}
          </Text>
          <Text
            style={{
              fontFamily: FONT.regular,
              fontSize: 14,
              color: isDarkMode ? COLORS.white : COLORS.black,
            }}
          >
            {user.email}
          </Text>
        </View>
      </View>
      <View
        style={{
          height: 1,
          backgroundColor: isDarkMode ? "#35383f" : "rgba(0,0,0,0.1)",
          marginVertical: 30,
        }}
      />
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("language");
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
            <Image
              source={icons.language}
              style={{ width: 56, height: 56, resizeMode: "contain" }}
            />
            <Text
              style={{
                fontFamily: FONT.bold,
                fontSize: 20,
                color: isDarkMode ? COLORS.white : COLORS.black,
              }}
            >
              {i18n.t("ABSLanguage")}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 25,
            }}
          >
            <Text
              style={{
                fontFamily: FONT.regular,
                fontSize: 18,
                color: isDarkMode ? COLORS.white : COLORS.black,
              }}
            >
              {locale === "en" ? i18n.t("ABSEnglish") : i18n.t("ABSRussian")}
            </Text>
            <Image
              source={isDarkMode ? icons.smallArrowLight : icons.smallArrow}
              style={{ height: 14, width: 8, resizeMode: "contain" }}
            />
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={async () => {
          await AsyncStorage.removeItem("user");
          dispatch(setUser(null));
        }}
        style={{ marginTop: 25 }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
          <Image
            source={icons.logout}
            style={{ width: 56, height: 56, resizeMode: "contain" }}
          />
          <Text
            style={{ fontFamily: FONT.bold, fontSize: 20, color: "#f85555" }}
          >
            {i18n.t("ASLogout")}
          </Text>
        </View>
      </TouchableOpacity>
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
  logo: {
    flexDirection: "row",
    alignItems: "center",
  },
});
