import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import { SIZES, FONT, COLORS, icons } from "../../constants";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import english from "../../locales/english.json";
import russian from "../../locales/russian.json";
import { I18n } from "i18n-js";

export default function AboutBookScreen({ route }) {
  const isDarkMode = useSelector((state) => state.settings.isDarkMode);
  const navigation = useNavigation();
  const widthColumn =
    (Dimensions.get("window").width - (SIZES.ph * 2 + 16)) / 2;

  const locale = useSelector((state) => state.settings.locale);
  const i18n = new I18n({
    en: english,
    ru: russian,
  });
  i18n.locale = locale;

  const { book } = route.params;
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
            {i18n.t("ABSTitle")}
          </Text>
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginTop: 30 }}
      >
        <Text
          style={{
            fontSize: 18,
            fontFamily: FONT.regular,
            color: isDarkMode ? COLORS.white : "#424242",
            textAlign: "justify",
          }}
        >
          {book.description}
        </Text>
        <View
          style={{
            height: 1,
            backgroundColor: isDarkMode ? "#34363c" : "rgba(0,0,0,0.1)",
            marginVertical: 20,
          }}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 20,
          }}
        >
          <View style={{ gap: 20, width: widthColumn }}>
            <Param title={i18n.t("ABSLanguage")} value={i18n.t("ABSRussian")} />
            <Param
              title={i18n.t("ABSAuthor")}
              value={book.author.firstName + " " + book.author.lastName}
              selectValue
            />
            <Param title={i18n.t("ABSPublishedOn")} value={book.formatDate} />
            <Param title={i18n.t("ABSPages")} value={book.pages} />
            <Param title={i18n.t("ABSPurchases")} value={"1K"} />
          </View>
          <View style={{ gap: 20, width: widthColumn }}>
            <Param title={i18n.t("ABSAge")} value={"12+"} />
            <Param
              title={i18n.t("ABSPublisher")}
              value={book.publisher.name}
              selectValue
            />
            <Param title={"ISBN"} value={book.isbn} />
            <Param title={i18n.t("ABSSize")} value={book.size} />
            <Param
              title={i18n.t("ABSGenres")}
              value={() => {
                let value = "";
                book.genres.forEach((genre) => {
                  if (book.genres.lastIndexOf(genre) !== book.genres.length - 1)
                    value += `${genre.name}, `;
                  else value += `${genre.name}`;
                });
                return value;
              }}
              selectValue
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const Param = ({ title, value, selectValue = false }) => {
  const isDarkMode = useSelector((state) => state.settings.isDarkMode);
  return (
    <View style={{ gap: 8 }}>
      <Text
        style={{
          fontSize: 18,
          fontFamily: FONT.bold,
          color: isDarkMode ? COLORS.white : COLORS.black,
        }}
      >
        {title}
      </Text>
      <Text
        adjustsFontSizeToFit
        style={{
          fontSize: 16,
          fontFamily: FONT.regular,
          color: selectValue
            ? COLORS.primary
            : isDarkMode
            ? COLORS.white
            : COLORS.black,
        }}
      >
        {typeof value === "function" ? value() : value}
      </Text>
    </View>
  );
};

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
