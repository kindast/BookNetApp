import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS, FONT, SIZES, api, icons } from "../../constants";
import { useSelector } from "react-redux";
import BookCard from "../../components/cards/BookCard";
import GenreCard from "../../components/cards/GenreCard";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import DetailsButton from "../../components/controls/DetailsButton";
import axios from "axios";
import english from "../../locales/english.json";
import russian from "../../locales/russian.json";
import { I18n } from "i18n-js";

export default function HomeScreen() {
  const isDarkMode = useSelector((state) => state.settings.isDarkMode);
  const user = useSelector((state) => state.auth.user);
  const navigation = useNavigation();
  const [books, setBooks] = useState([]);
  const [genres, setGenres] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const locale = useSelector((state) => state.settings.locale);
  const i18n = new I18n({
    en: english,
    ru: russian,
  });
  i18n.locale = locale;
  const fetchBooks = () => {
    setIsLoading(true);
    axios
      .get(api + "/api/books", {
        headers: { Authorization: "Bearer " + user.token },
      })
      .then((response) => {
        setBooks(response.data);
        setIsLoading(false);
      });
  };

  const fetchGenres = () => {
    axios
      .get(api + "/api/genres", {
        headers: { Authorization: "Bearer " + user.token },
      })
      .then((response) => {
        setGenres(response.data);
      });
  };

  useEffect(() => {
    fetchBooks();
    fetchGenres();
  }, []);

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
            BookNet
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("search");
          }}
        >
          <Image
            source={isDarkMode ? icons.searchLight : icons.search}
            style={{ width: 25, height: 25 }}
          />
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 35, flexDirection: "row" }}>
        {isLoading ? (
          <View
            style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
          >
            <ActivityIndicator color={COLORS.primary} size="large" />
          </View>
        ) : (
          <FlatList
            refreshControl={
              <RefreshControl
                onRefresh={() => {
                  fetchBooks();
                }}
              />
            }
            horizontal
            showsHorizontalScrollIndicator={false}
            data={books}
            renderItem={({ item }) => (
              <BookCard
                book={item}
                onPress={() => {
                  navigation.navigate("bookdetails", { id: item.id });
                }}
                style={{ marginLeft: 12 }}
              />
            )}
          />
        )}
      </View>
      <View style={{ marginTop: 25 }}>
        <DetailsButton
          title={i18n.t("HSGenre")}
          onPress={() => {
            navigation.navigate("genres");
          }}
        />

        <FlatList
          style={{ marginTop: 15 }}
          horizontal
          data={genres}
          renderItem={({ item }) => (
            <GenreCard
              genre={item}
              key={item.id}
              style={{ marginRight: 12, width: 160, height: 80 }}
              onPress={() => {
                navigation.navigate("search", { genre: item });
              }}
            />
          )}
        />
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
