import {
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { COLORS, FONT, SIZES, api, icons } from "../../constants";
import { useSelector } from "react-redux";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import WishListBookCard from "../../components/cards/WishListBookCard";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import LibraryBookCard from "../../components/cards/LibraryBookCard";
import english from "../../locales/english.json";
import russian from "../../locales/russian.json";
import { I18n } from "i18n-js";

export default function LibraryScreen() {
  const isDarkMode = useSelector((state) => state.settings.isDarkMode);
  const user = useSelector((state) => state.auth.user);
  const navigation = useNavigation();
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const locale = useSelector((state) => state.settings.locale);
  const i18n = new I18n({
    en: english,
    ru: russian,
  });
  i18n.locale = locale;
  const fetchMyBooks = () => {
    setIsLoading(true);
    axios
      .get(api + "/api/my-books", {
        headers: { Authorization: "Bearer " + user.token },
      })
      .then((response) => {
        setBooks(response.data);
        setIsLoading(false);
      });
  };

  useFocusEffect(
    useCallback(() => {
      fetchMyBooks();
    }, [])
  );

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
            {i18n.t("LSTitle")}
          </Text>
        </View>
        <TouchableOpacity>
          <Image
            source={isDarkMode ? icons.searchLight : icons.search}
            style={{ width: 25, height: 25 }}
          />
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 15, flex: 1 }}>
        {isLoading ? (
          <View
            style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
          >
            <ActivityIndicator color={COLORS.primary} size="large" />
          </View>
        ) : books.length === 0 ? (
          <View
            style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
          >
            <Text
              style={{
                color: isDarkMode ? COLORS.white : COLORS.black,
                fontFamily: FONT.regular,
                fontSize: 16,
              }}
            >
              {i18n.t("LSNoBooks")}
            </Text>
          </View>
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={books}
            renderItem={({ item }) => (
              <LibraryBookCard
                book={item}
                onPress={() => {
                  navigation.navigate("bookdetails", { id: item.id });
                }}
                style={{ marginBottom: 15 }}
              />
            )}
          />
        )}
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
  logo: {
    flexDirection: "row",
    alignItems: "center",
  },
});
