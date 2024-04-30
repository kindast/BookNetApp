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

  useEffect(() => {
    fetchBooks();
  }, []);

  const genres = [
    {
      title: "Romance",
      image:
        "https://images.unsplash.com/reserve/Af0sF2OS5S5gatqrKzVP_Silhoutte.jpg?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Thriller",
      image:
        "https://images.unsplash.com/photo-1609133506262-e6c083fb26b5?q=80&w=1949&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Inspiration",
      image:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Fantasy",
      image:
        "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1968&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Sci-Fi",
      image:
        "https://plus.unsplash.com/premium_photo-1682124860947-4c0ff8e0742f?q=80&w=1998&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Horror",
      image:
        "https://images.unsplash.com/photo-1601513445506-2ab0d4fb4229?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Mystery",
      image:
        "https://images.unsplash.com/photo-1482424917728-d82d29662023?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Psychlogy",
      image:
        "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Comedy",
      image:
        "https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Action",
      image:
        "https://images.unsplash.com/photo-1506411393232-79727bc447af?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Adventure",
      image:
        "https://images.unsplash.com/photo-1551740994-7af69385a217?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Comics",
      image:
        "https://images.unsplash.com/photo-1601645191163-3fc0d5d64e35?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];
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
          <View style={{ alignItems: "center", justifyContent: "center" }}>
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
              title={item.title}
              image={item.image}
              style={{ marginRight: 12, width: 160, height: 80 }}
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
