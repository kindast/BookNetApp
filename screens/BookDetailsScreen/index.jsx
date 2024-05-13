import { useFocusEffect, useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
} from "react-native";
import { useSelector } from "react-redux";
import { COLORS, FONT, SIZES, api, icons } from "../../constants";
import { useCallback, useState } from "react";
import Button from "../../components/controls/Button";
import DetailsButton from "../../components/controls/DetailsButton";
import axios from "axios";
import Toast from "react-native-toast-message";
import english from "../../locales/english.json";
import russian from "../../locales/russian.json";
import { I18n } from "i18n-js";
import RatingView from "../../components/RatingView";
import RatingInput from "../../components/RatingInput";
import TransparentButton from "../../components/controls/TransparentButton";
import Review from "../../components/controls/Review";
import VerticalSeparator from "../../components/controls/VerticalSeparator";
import HorizontalSeparator from "../../components/controls/HorizontalSeparator";

export default function BookDetailsScreen({ route }) {
  const isDarkMode = useSelector((state) => state.settings.isDarkMode);
  const user = useSelector((state) => state.auth.user);
  const navigation = useNavigation();
  const [rateStars, setRateStars] = useState(0);
  const { id } = route.params;
  const [book, setBook] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const locale = useSelector((state) => state.settings.locale);
  const i18n = new I18n({
    en: english,
    ru: russian,
  });
  i18n.locale = locale;
  const updateWishlist = (isInWishlist) => {
    setBook((prevState) => ({
      ...prevState,
      isInWishlist: isInWishlist,
    }));
  };

  const fetchBook = () => {
    setIsLoading(true);
    axios
      .get(api + "/api/book", {
        params: { id },
        headers: { Authorization: "Bearer " + user.token },
      })
      .then((response) => {
        setBook(response.data);
        setIsLoading(false);
      });
  };

  useFocusEffect(
    useCallback(() => {
      fetchBook();
    }, [])
  );

  return isLoading ? (
    <View
      style={{
        ...styles.container,
        backgroundColor: isDarkMode
          ? COLORS.darkBackground
          : COLORS.lightBackground,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator size="large" color={COLORS.primary} />
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
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            onRefresh={() => {
              fetchBook();
            }}
          />
        }
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
          {!book.isPurchased && (
            <TouchableOpacity
              onPress={() => {
                axios
                  .get(api + "/api/wishlist-book", {
                    params: { id: book.id },
                    headers: { Authorization: "Bearer " + user.token },
                  })
                  .then((response) => {
                    updateWishlist(!book.isInWishlist);
                    if (!book.isInWishlist) {
                      Toast.show({
                        text1: i18n.t("BDSSuccess"),
                        text2: i18n.t("BDSAddWishlist"),
                        position: "bottom",
                        type: "success",
                        hideAfter: 100,
                      });
                    } else {
                      Toast.show({
                        text1: i18n.t("BDSSuccess"),
                        text2: i18n.t("BDSRemoveWishlist"),
                        position: "bottom",
                        type: "success",
                        hideAfter: 100,
                      });
                    }
                  });
              }}
            >
              {book.isInWishlist ? (
                <Image
                  source={icons.wishlistFill}
                  style={{ width: 30, height: 30, resizeMode: "contain" }}
                />
              ) : (
                <Image
                  source={isDarkMode ? icons.addLight : icons.add}
                  style={{ width: 30, height: 30, resizeMode: "contain" }}
                />
              )}
            </TouchableOpacity>
          )}
        </View>
        <View style={{ marginTop: 35, flexDirection: "row" }}>
          <Image
            source={{
              uri: api + book?.coverUrl,
            }}
            style={{
              height: 230,
              width: 150,
              resizeMode: "stretch",
              borderRadius: 7,
            }}
          />
          <View style={{ marginLeft: 16, flex: 1 }}>
            <Text
              adjustsFontSizeToFit
              style={{
                fontFamily: FONT.bold,
                fontSize: 30,
                color: isDarkMode ? COLORS.white : COLORS.black,
                maxHeight: 100,
              }}
            >
              {book?.title}
            </Text>
            <Text
              adjustsFontSizeToFit
              style={{
                fontFamily: FONT.regular,
                color: COLORS.primary,
                fontSize: 14,
                maxHeight: 20,
                marginTop: 15,
              }}
            >
              {book?.author?.firstName + " " + book?.author?.lastName}
            </Text>
            <Text
              adjustsFontSizeToFit
              style={{
                fontFamily: FONT.regular,
                color: isDarkMode ? "#e0e0e0" : "#6f6f6f",
                fontSize: 14,
                maxHeight: 20,
                marginTop: 15,
              }}
            >
              {i18n.t("BDSReleased")} {book?.formatDate}
            </Text>
            <View
              style={{
                marginTop: 15,
                flexDirection: "row",
                flexWrap: "wrap",
                gap: 8,
              }}
            >
              {book?.genres?.map((genre, index) => (
                <View
                  key={index}
                  style={{
                    backgroundColor: isDarkMode ? "#35383f" : "#eeeeee",
                    paddingVertical: 6,
                    paddingHorizontal: 12,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 6,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: FONT.regular,
                      fontSize: 10,
                      color: isDarkMode ? "#e0e0e0" : "#737373",
                    }}
                  >
                    {genre.name}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>
        <View
          style={{
            marginTop: 24,
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <InfoItem
            mainText={book?.rating}
            subText={book?.reviews?.length + " " + i18n.t("BDSReviews")}
            icon={isDarkMode ? icons.starLight : icons.star}
            isDarkMode={isDarkMode}
          />
          <VerticalSeparator isDarkMode={isDarkMode} />
          <InfoItem
            mainText={book?.size}
            subText={i18n.t("BDSSize")}
            isDarkMode={isDarkMode}
          />
          <VerticalSeparator isDarkMode={isDarkMode} />
          <InfoItem
            mainText={book?.pages}
            subText={i18n.t("BDSPages")}
            isDarkMode={isDarkMode}
          />
          <VerticalSeparator isDarkMode={isDarkMode} />
          <InfoItem
            mainText={"10K"}
            subText={i18n.t("BDSPurchases")}
            isDarkMode={isDarkMode}
          />
        </View>
        {!book.isPurchased ? (
          <Button
            title={i18n.t("BDSBuy") + " " + book?.price + "₽"}
            style={{ marginTop: 25 }}
            onPress={() => {
              axios
                .get(api + "/api/buy-book", {
                  params: { id: book.id },
                  headers: { Authorization: "Bearer " + user.token },
                })
                .then((response) => {
                  setBook((prevState) => ({
                    ...prevState,
                    isPurchased: true,
                  }));
                  Toast.show({
                    type: "success",
                    text1: i18n.t("BDSSuccess"),
                    text2: i18n.t("BDSAddBookToAccount"),
                    position: "bottom",
                    hideAfter: 100,
                  });
                })
                .catch((error) => {});
            }}
          />
        ) : (
          <Button
            title={i18n.t("BDSRead")}
            style={{ marginTop: 25 }}
            onPress={() => {
              navigation.navigate("bookreader", { book: book });
            }}
          />
        )}
        <DetailsButton
          title={i18n.t("BDSAboutThisBook")}
          onPress={() => {
            navigation.navigate("aboutbook", { book: book });
          }}
          style={{ marginTop: 25 }}
        />
        <Text
          numberOfLines={4}
          style={{
            fontFamily: FONT.regular,
            fontSize: 18,
            color: isDarkMode ? "#e0e0e0" : "#6f6f6f",
            textAlign: "justify",
            marginTop: 25,
          }}
        >
          {book?.description}
        </Text>
        <DetailsButton
          title={i18n.t("BDSRatingsAndReviews")}
          onPress={() => {
            navigation.navigate("reviews", { book: book });
          }}
          style={{ marginTop: 30 }}
        />
        <RatingView book={book} isDarkMode={isDarkMode} i18n={i18n} />
        <View
          style={{
            height: 1,
            backgroundColor: isDarkMode ? "#35383f" : "rgba(0,0,0,0.1)",
            marginVertical: 15,
          }}
        />
        {book.reviews.filter((r) => r.author.email === user.email).length >
        0 ? (
          <View style={{ marginBottom: 15 }}>
            <Review
              review={
                book.reviews.filter((r) => r.author.email === user.email)[0]
              }
            />
            <TransparentButton
              style={{ marginTop: 15, marginBottom: 15 }}
              onPress={() => {
                navigation.navigate("writereview", {
                  book,
                  review: book.reviews.filter(
                    (r) => r.author.email === user.email
                  )[0],
                });
              }}
              title={i18n.t("BDSUpdateReview")}
            />
          </View>
        ) : (
          <View style={{ alignItems: "center" }}>
            <Text
              style={{
                fontSize: 20,
                fontFamily: FONT.bold,
                color: isDarkMode ? COLORS.white : "#424242",
              }}
            >
              {i18n.t("BDSRateThisBook")}
            </Text>
            <RatingInput
              rateStars={rateStars}
              setRateStars={setRateStars}
              isDarkMode={isDarkMode}
            />
            <TransparentButton
              style={{ marginTop: 15, marginBottom: 15 }}
              onPress={() => {
                if (!book.isPurchased) {
                  Toast.show({
                    text1: i18n.t("WRSWarning"),
                    text2: i18n.t("BDSErrorPurchaseBook"),
                    position: "bottom",
                    type: "info",
                    hideAfter: 100,
                  });
                  return;
                }
                navigation.navigate("writereview", { book, stars: rateStars });
              }}
              title={i18n.t("BDSWriteReview")}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const InfoItem = ({ mainText, subText, isDarkMode, icon }) => {
  return (
    <View style={styles.containerItem}>
      <View style={styles.subContainerItem}>
        <Text
          style={[
            styles.mainText,
            { color: isDarkMode ? "#e0e0e0" : "#6f6f6f" },
          ]}
        >
          {mainText}
        </Text>
        {icon && <Image source={icon} style={styles.icon} />}
      </View>
      <Text
        style={[styles.subText, { color: isDarkMode ? "#e0e0e0" : "#6f6f6f" }]}
      >
        {subText}
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
  containerItem: {
    alignItems: "center",
    justifyContent: "center",
  },
  subContainerItem: {
    flexDirection: "row",
    gap: 9,
    alignItems: "center",
    justifyContent: "center",
  },
  mainText: {
    fontFamily: FONT.bold,
    fontSize: 18,
  },
  subText: {
    fontFamily: FONT.regular,
    fontSize: 14,
    marginTop: 6,
  },
  icon: {
    width: 17,
    height: 17,
    resizeMode: "contain",
  },
});
