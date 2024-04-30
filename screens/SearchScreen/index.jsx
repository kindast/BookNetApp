import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  ActivityIndicator,
  ScrollView,
  Dimensions,
} from "react-native";
import { COLORS, FONT, SIZES, api, icons } from "../../constants";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import SearchBox from "../../components/controls/SearchBox";
import Button from "../../components/controls/Button";
import AccentButton from "../../components/controls/AccentButton";
import english from "../../locales/english.json";
import russian from "../../locales/russian.json";
import { I18n } from "i18n-js";
import BookCard from "../../components/cards/BookCard";
import HorizontalBookCard from "../../components/cards/HorizontalBookCard";

export default function SearchScreen() {
  const isDarkMode = useSelector((state) => state.settings.isDarkMode);
  const user = useSelector((state) => state.auth.user);
  const navigation = useNavigation();
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [sortSelected, setSortSelected] = useState(0);
  const [ratingSelected, setRatingSelected] = useState(0);
  const [showInGrid, setShowInGrid] = useState(true);
  const inputRef = useRef(null);
  const widthButton =
    (Dimensions.get("window").width - (SIZES.ph * 2 + 16)) / 2;

  const locale = useSelector((state) => state.settings.locale);
  const i18n = new I18n({
    en: english,
    ru: russian,
  });
  i18n.locale = locale;

  useEffect(() => {
    inputRef && inputRef.current?.focus();
  }, []);

  let timeout;
  const debounce = (func, delay) => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(func, delay);
  };

  useEffect(() => {
    debounce(() => {
      if (searchText !== "") fetchBooks();
    }, 200);
  }, [searchText]);

  const fetchBooks = () => {
    setIsLoading(true);
    axios
      .get(api + "/api/books", {
        headers: { Authorization: "Bearer " + user.token },
        params: {
          sort: sortSelected,
          rating: ratingSelected > 0 ? ratingSelected - 1 : -1,
          search: searchText,
        },
      })
      .then((response) => {
        setBooks(response.data);
        setIsLoading(false);
      });
  };

  return !showFilters ? (
    <View
      style={{
        ...styles.container,
        backgroundColor: isDarkMode
          ? COLORS.darkBackground
          : COLORS.lightBackground,
      }}
    >
      <View style={styles.header}>
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
        <SearchBox
          inputRef={inputRef}
          style={{ flex: 1, marginLeft: 15 }}
          value={searchText}
          onChangeText={setSearchText}
          onFilterPress={() => {
            setShowFilters(true);
          }}
        />
      </View>
      <View
        style={{
          marginVertical: 15,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontFamily: FONT.bold,
            fontSize: 20,
            color: isDarkMode ? COLORS.white : COLORS.black,
          }}
        >
          {i18n.t("SSShowIn")}
        </Text>
        <View style={{ flexDirection: "row", gap: 20 }}>
          <TouchableOpacity
            onPress={() => {
              setShowInGrid(true);
            }}
          >
            <Image
              source={showInGrid ? icons.viewFill : icons.view}
              style={{ width: 20, height: 20, resizeMode: "contain" }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setShowInGrid(false);
            }}
          >
            <Image
              source={!showInGrid ? icons.listFill : icons.list}
              style={{ width: 20, height: 20, resizeMode: "contain" }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ marginBottom: 15, flex: 1 }}>
        {searchText === "" ? (
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
              {i18n.t("SSEnterSearchText")}
            </Text>
          </View>
        ) : isLoading ? (
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
              {i18n.t("SSNoResultsFound")}
            </Text>
            <Text
              style={{
                color: isDarkMode ? COLORS.white : COLORS.black,
                fontFamily: FONT.regular,
                fontSize: 16,
              }}
            >
              {i18n.t("SSNoResultsFoundSubtitle")}
            </Text>
          </View>
        ) : showInGrid ? (
          <FlatList
            key={0}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={books}
            numColumns={2}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ gap: 20 }}
            columnWrapperStyle={{ gap: 15 }}
            renderItem={({ item }) => (
              <BookCard
                book={item}
                onPress={() => {
                  navigation.navigate("bookdetails", { id: item.id });
                }}
              />
            )}
          />
        ) : (
          <FlatList
            key={1}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={books}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ gap: 20 }}
            renderItem={({ item }) => (
              <HorizontalBookCard
                book={item}
                onPress={() => {
                  navigation.navigate("bookdetails", { id: item.id });
                }}
              />
            )}
          />
        )}
      </View>
    </View>
  ) : (
    <View
      style={{
        ...styles.container,
        backgroundColor: isDarkMode
          ? COLORS.darkBackground
          : COLORS.lightBackground,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity
          onPress={() => {
            setShowFilters(false);
          }}
        >
          <Image
            source={isDarkMode ? icons.crossLight : icons.cross}
            style={{ width: 22, height: 22 }}
          />
        </TouchableOpacity>
        <Text
          style={{
            fontFamily: FONT.bold,
            color: isDarkMode ? COLORS.white : COLORS.black,
            fontSize: 24,
            marginLeft: 15,
          }}
        >
          {i18n.t("SSFilter")}
        </Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            borderWidth: 2,
            borderRadius: 15,
            borderColor: isDarkMode ? "#35383f" : "#eeeeee",
            backgroundColor: isDarkMode ? "#1f222a" : "#fafafa",
            padding: 20,
            gap: 15,
            marginTop: 15,
          }}
        >
          <Text
            style={{
              fontFamily: FONT.bold,
              color: isDarkMode ? COLORS.white : COLORS.black,
              fontSize: 20,
            }}
          >
            {i18n.t("SSSort")}
          </Text>
          <View
            style={{
              backgroundColor: isDarkMode ? "#35383f" : "#eeeeee",
              height: 2,
            }}
          />
          <TouchableOpacity
            onPress={() => {
              setSortSelected(0);
            }}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 15 }}
            >
              <Image
                source={sortSelected === 0 ? icons.radioFill : icons.radioEmpty}
                style={{ width: 25, height: 25, resizeMode: "contain" }}
              />
              <Text
                style={{
                  fontFamily: FONT.bold,
                  fontSize: 18,
                  color: isDarkMode ? COLORS.white : COLORS.black,
                }}
              >
                {i18n.t("SSNewReleases")}
              </Text>
            </View>
          </TouchableOpacity>
          <View
            style={{
              backgroundColor: isDarkMode ? "#35383f" : "#eeeeee",
              height: 2,
            }}
          />
          <TouchableOpacity
            onPress={() => {
              setSortSelected(1);
            }}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 15 }}
            >
              <Image
                source={sortSelected === 1 ? icons.radioFill : icons.radioEmpty}
                style={{ width: 25, height: 25, resizeMode: "contain" }}
              />
              <Text
                style={{
                  fontFamily: FONT.bold,
                  fontSize: 18,
                  color: isDarkMode ? COLORS.white : COLORS.black,
                }}
              >
                {i18n.t("SSHighestRating")}
              </Text>
            </View>
          </TouchableOpacity>
          <View
            style={{
              backgroundColor: isDarkMode ? "#35383f" : "#eeeeee",
              height: 2,
            }}
          />
          <TouchableOpacity
            onPress={() => {
              setSortSelected(2);
            }}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 15 }}
            >
              <Image
                source={sortSelected === 2 ? icons.radioFill : icons.radioEmpty}
                style={{ width: 25, height: 25, resizeMode: "contain" }}
              />
              <Text
                style={{
                  fontFamily: FONT.bold,
                  fontSize: 18,
                  color: isDarkMode ? COLORS.white : COLORS.black,
                }}
              >
                {i18n.t("SSLowestRating")}
              </Text>
            </View>
          </TouchableOpacity>
          <View
            style={{
              backgroundColor: isDarkMode ? "#35383f" : "#eeeeee",
              height: 2,
            }}
          />
          <TouchableOpacity
            onPress={() => {
              setSortSelected(3);
            }}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 15 }}
            >
              <Image
                source={sortSelected === 3 ? icons.radioFill : icons.radioEmpty}
                style={{ width: 25, height: 25, resizeMode: "contain" }}
              />
              <Text
                style={{
                  fontFamily: FONT.bold,
                  fontSize: 18,
                  color: isDarkMode ? COLORS.white : COLORS.black,
                }}
              >
                {i18n.t("SSHighestPrice")}
              </Text>
            </View>
          </TouchableOpacity>
          <View
            style={{
              backgroundColor: isDarkMode ? "#35383f" : "#eeeeee",
              height: 2,
            }}
          />
          <TouchableOpacity
            onPress={() => {
              setSortSelected(4);
            }}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 15 }}
            >
              <Image
                source={sortSelected === 4 ? icons.radioFill : icons.radioEmpty}
                style={{ width: 25, height: 25, resizeMode: "contain" }}
              />
              <Text
                style={{
                  fontFamily: FONT.bold,
                  fontSize: 18,
                  color: isDarkMode ? COLORS.white : COLORS.black,
                }}
              >
                {i18n.t("SSLowestPrice")}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            borderWidth: 2,
            borderRadius: 15,
            borderColor: isDarkMode ? "#35383f" : "#eeeeee",
            backgroundColor: isDarkMode ? "#1f222a" : "#fafafa",
            padding: 20,
            gap: 15,
            marginTop: 15,
          }}
        >
          <Text
            style={{
              fontFamily: FONT.bold,
              color: isDarkMode ? COLORS.white : COLORS.black,
              fontSize: 20,
            }}
          >
            {i18n.t("SSRating")}
          </Text>
          <View
            style={{
              backgroundColor: isDarkMode ? "#35383f" : "#eeeeee",
              height: 2,
            }}
          />
          <TouchableOpacity
            onPress={() => {
              setRatingSelected(0);
            }}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 15 }}
            >
              <Image
                source={
                  ratingSelected === 0 ? icons.radioFill : icons.radioEmpty
                }
                style={{ width: 25, height: 25, resizeMode: "contain" }}
              />
              <Text
                style={{
                  fontFamily: FONT.bold,
                  fontSize: 18,
                  color: isDarkMode ? COLORS.white : COLORS.black,
                }}
              >
                {i18n.t("SSAll")}
              </Text>
            </View>
          </TouchableOpacity>
          <View
            style={{
              backgroundColor: isDarkMode ? "#35383f" : "#eeeeee",
              height: 2,
            }}
          />
          <TouchableOpacity
            onPress={() => {
              setRatingSelected(1);
            }}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 15 }}
            >
              <Image
                source={
                  ratingSelected === 1 ? icons.radioFill : icons.radioEmpty
                }
                style={{ width: 25, height: 25, resizeMode: "contain" }}
              />
              <Text
                style={{
                  fontFamily: FONT.bold,
                  fontSize: 18,
                  color: isDarkMode ? COLORS.white : COLORS.black,
                }}
              >
                {i18n.t("SS45")}
              </Text>
            </View>
          </TouchableOpacity>
          <View
            style={{
              backgroundColor: isDarkMode ? "#35383f" : "#eeeeee",
              height: 2,
            }}
          />
          <TouchableOpacity
            onPress={() => {
              setRatingSelected(2);
            }}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 15 }}
            >
              <Image
                source={
                  ratingSelected === 2 ? icons.radioFill : icons.radioEmpty
                }
                style={{ width: 25, height: 25, resizeMode: "contain" }}
              />
              <Text
                style={{
                  fontFamily: FONT.bold,
                  fontSize: 18,
                  color: isDarkMode ? COLORS.white : COLORS.black,
                }}
              >
                {i18n.t("SS40")}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View
        style={{
          borderTopColor: isDarkMode ? "#33363d" : "rgba(0,0,0,0.1)",
          borderTopWidth: 1,
          paddingTop: SIZES.ph,
          paddingBottom: SIZES.pb,
        }}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <AccentButton
            title={i18n.t("SSResetButton")}
            style={{ width: widthButton }}
            onPress={() => {
              setSortSelected(0);
              setRatingSelected(0);
            }}
          />
          <Button
            title={i18n.t("SSApplyButton")}
            showShadow={true}
            onPress={() => {
              setShowFilters(false);
              fetchBooks();
            }}
            style={{ width: widthButton }}
          />
        </View>
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
