import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { COLORS, FONT, SIZES, api, icons } from "../../constants";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import useFetch from "../../hooks/useFetch";
import WishListBookCard from "../../components/cards/WishListBookCard";
import { useEffect, useState } from "react";
import axios from "axios";

export default function LibraryScreen() {
  const isDarkMode = useSelector((state) => state.settings.isDarkMode);
  const user = useSelector((state) => state.auth.user);
  const navigation = useNavigation();
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMyBooks = () => {
    setIsLoading(true);
    axios
      .get(api + "/api/my-books", { params: { token: user.token } })
      .then((response) => {
        setBooks(response.data);
      });
    setIsLoading(false);
  };

  useEffect(() => {
    fetchMyBooks();
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
            My library
          </Text>
        </View>
        <TouchableOpacity>
          <Image
            source={isDarkMode ? icons.searchLight : icons.search}
            style={{ width: 25, height: 25 }}
          />
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1 }}>
        {isLoading ? (
          <View
            style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
          >
            <ActivityIndicator size="large" color={COLORS.primary} />
          </View>
        ) : (
          <FlatList
            style={{ marginTop: 15 }}
            refreshControl={
              <RefreshControl
                onRefresh={() => {
                  fetchMyBooks();
                }}
              />
            }
            showsVerticalScrollIndicator={false}
            data={books}
            renderItem={({ item }) => (
              <WishListBookCard
                title={item.title}
                rating={item.rating}
                image={api + item.image}
                price={item.price}
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
