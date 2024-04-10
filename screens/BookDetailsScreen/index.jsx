import { useNavigation } from "@react-navigation/native";
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
import { useEffect, useState } from "react";
import Button from "../../components/controls/Button";
import DetailsButton from "../../components/controls/DetailsButton";
import ProgressBar from "react-native-progress/Bar";
import axios from "axios";
import Toast from "react-native-toast-message";

export default function BookDetailsScreen({ route }) {
  const isDarkMode = useSelector((state) => state.settings.isDarkMode);
  const user = useSelector((state) => state.auth.user);
  const navigation = useNavigation();
  const [rateStars, setRateStars] = useState(0);
  const { id } = route.params;
  const [book, setBook] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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

  useEffect(() => {
    fetchBook();
  }, []);

  const countReviews = (stars) => {
    let procent =
      book?.reviews?.filter((review) => review.stars === stars).length /
      book?.reviews?.length;
    return procent ? procent : 0;
  };
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
                        text1: "Success",
                        text2: "Book added to wishlist",
                        position: "bottom",
                        type: "success",
                        hideAfter: 100,
                      });
                    } else {
                      Toast.show({
                        text1: "Success",
                        text2: "Book deleted from wishlist",
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
              Released on {book?.releaseDate}
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
          <View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: FONT.bold,
                  fontSize: 18,
                  color: isDarkMode ? "#e0e0e0" : "#6f6f6f",
                }}
              >
                {book?.rating}
              </Text>
              <Image
                source={isDarkMode ? icons.starLight : icons.star}
                style={{
                  width: 17,
                  height: 17,
                  resizeMode: "contain",
                  marginLeft: 9,
                }}
              />
            </View>
            <Text
              style={{
                fontFamily: FONT.regular,
                color: isDarkMode ? "#e0e0e0" : "#6f6f6f",
                fontSize: 14,
                marginTop: 6,
              }}
            >
              {book?.reviews?.length} reviews
            </Text>
          </View>
          <View
            style={{
              width: 1,
              backgroundColor: isDarkMode ? "#fff" : "rgba(0,0,0,0.1)",
            }}
          />
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontFamily: FONT.bold,
                fontSize: 18,
                color: isDarkMode ? "#e0e0e0" : "#6f6f6f",
              }}
            >
              {book?.size}
            </Text>
            <Text
              style={{
                fontFamily: FONT.regular,
                color: isDarkMode ? "#e0e0e0" : "#6f6f6f",
                fontSize: 14,
                marginTop: 6,
              }}
            >
              size
            </Text>
          </View>
          <View
            style={{
              width: 1,
              backgroundColor: isDarkMode ? "#fff" : "rgba(0,0,0,0.1)",
            }}
          />
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontFamily: FONT.bold,
                fontSize: 18,
                color: isDarkMode ? "#e0e0e0" : "#6f6f6f",
              }}
            >
              {book?.pages}
            </Text>
            <Text
              style={{
                fontFamily: FONT.regular,
                color: isDarkMode ? "#e0e0e0" : "#6f6f6f",
                fontSize: 14,
                marginTop: 6,
              }}
            >
              pages
            </Text>
          </View>
          <View
            style={{
              width: 1,
              backgroundColor: isDarkMode ? "#fff" : "rgba(0,0,0,0.1)",
            }}
          />
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontFamily: FONT.bold,
                fontSize: 18,
                color: isDarkMode ? "#e0e0e0" : "#6f6f6f",
              }}
            >
              10K
            </Text>
            <Text
              style={{
                fontFamily: FONT.regular,
                color: isDarkMode ? "#e0e0e0" : "#6f6f6f",
                fontSize: 14,
                marginTop: 6,
              }}
            >
              purchases
            </Text>
          </View>
        </View>
        {!book.isPurchased ? (
          <Button
            title={"Buy " + book?.price + "₽"}
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
                    text1: "Success",
                    text2: "Book added to your account",
                    position: "bottom",
                    hideAfter: 100,
                  });
                })
                .catch((error) => {});
            }}
          />
        ) : (
          <Button
            title={"Read EBook"}
            style={{ marginTop: 25 }}
            onPress={() => {
              navigation.navigate("bookreader", { book: book });
            }}
          />
        )}
        <DetailsButton
          title={"About this Book"}
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
          title={"Ratings & Reviews"}
          onPress={() => {
            navigation.navigate("reviews", { book: book });
          }}
          style={{ marginTop: 30 }}
        />
        <View
          style={{
            gap: 10,
            marginTop: 20,
            justifyContent: "space-around",
            flexDirection: "row",
          }}
        >
          <View style={{ gap: 10, alignItems: "center" }}>
            <Text
              style={{
                fontSize: 50,
                fontFamily: FONT.bold,
                color: isDarkMode ? COLORS.white : COLORS.black,
              }}
            >
              {book?.rating}
            </Text>
            <View style={{ flexDirection: "row", gap: 10 }}>
              <Image
                source={
                  book?.rating >= 1
                    ? icons.fullstar
                    : book?.rating >= 0.5 && book?.rating < 1
                    ? isDarkMode
                      ? icons.halfstar
                      : icons.halfstarLight
                    : isDarkMode
                    ? icons.emptystar
                    : icons.emptystarLight
                }
                style={{ width: 20, height: 20, resizeMode: "contain" }}
              />
              <Image
                source={
                  book?.rating >= 2
                    ? icons.fullstar
                    : book?.rating >= 1.5 && book?.rating < 2
                    ? isDarkMode
                      ? icons.halfstar
                      : icons.halfstarLight
                    : isDarkMode
                    ? icons.emptystar
                    : icons.emptystarLight
                }
                style={{ width: 20, height: 20, resizeMode: "contain" }}
              />
              <Image
                source={
                  book?.rating >= 3
                    ? icons.fullstar
                    : book?.rating >= 2.5 && book?.rating < 3
                    ? isDarkMode
                      ? icons.halfstar
                      : icons.halfstarLight
                    : isDarkMode
                    ? icons.emptystar
                    : icons.emptystarLight
                }
                style={{ width: 20, height: 20, resizeMode: "contain" }}
              />
              <Image
                source={
                  book?.rating >= 4
                    ? icons.fullstar
                    : book?.rating >= 3.5 && book?.rating < 4
                    ? isDarkMode
                      ? icons.halfstar
                      : icons.halfstarLight
                    : isDarkMode
                    ? icons.emptystar
                    : icons.emptystarLight
                }
                style={{ width: 20, height: 20, resizeMode: "contain" }}
              />
              <Image
                source={
                  book?.rating === 5
                    ? icons.fullstar
                    : book?.rating >= 4.5 && book?.rating < 5
                    ? isDarkMode
                      ? icons.halfstar
                      : icons.halfstarLight
                    : isDarkMode
                    ? icons.emptystar
                    : icons.emptystarLight
                }
                style={{ width: 20, height: 20, resizeMode: "contain" }}
              />
            </View>
            <Text
              style={{
                fontSize: 18,
                fontFamily: FONT.bold,
                color: isDarkMode ? COLORS.white : COLORS.black,
              }}
            >
              ({book?.reviews?.length} reviews)
            </Text>
          </View>
          <View
            style={{
              width: 1,
              backgroundColor: isDarkMode ? "#35383f" : "rgba(0,0,0,0.1)",
            }}
          />
          <View style={{ justifyContent: "space-between" }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: 9,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: FONT.regular,
                  color: isDarkMode ? COLORS.white : COLORS.black,
                }}
              >
                5
              </Text>
              <ProgressBar
                progress={countReviews(5)}
                borderWidth={0}
                color={COLORS.primary}
                unfilledColor={isDarkMode ? "#35383f" : "#e0e0e0"}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: 9,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: FONT.regular,
                  color: isDarkMode ? COLORS.white : COLORS.black,
                }}
              >
                4
              </Text>
              <ProgressBar
                progress={countReviews(4)}
                borderWidth={0}
                color={COLORS.primary}
                unfilledColor={isDarkMode ? "#35383f" : "#e0e0e0"}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: 9,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: FONT.regular,
                  color: isDarkMode ? COLORS.white : COLORS.black,
                }}
              >
                3
              </Text>
              <ProgressBar
                progress={countReviews(3)}
                borderWidth={0}
                color={COLORS.primary}
                unfilledColor={isDarkMode ? "#35383f" : "#e0e0e0"}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: 9,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: FONT.regular,
                  color: isDarkMode ? COLORS.white : COLORS.black,
                }}
              >
                2
              </Text>
              <ProgressBar
                progress={countReviews(2)}
                borderWidth={0}
                color={COLORS.primary}
                unfilledColor={isDarkMode ? "#35383f" : "#e0e0e0"}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: 9,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: FONT.regular,
                  color: isDarkMode ? COLORS.white : COLORS.black,
                }}
              >
                1
              </Text>
              <ProgressBar
                progress={countReviews(1)}
                borderWidth={0}
                color={COLORS.primary}
                unfilledColor={isDarkMode ? "#35383f" : "#e0e0e0"}
              />
            </View>
          </View>
        </View>
        <View
          style={{
            height: 1,
            backgroundColor: isDarkMode ? "#35383f" : "rgba(0,0,0,0.1)",
            marginVertical: 15,
          }}
        />
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              fontSize: 20,
              fontFamily: FONT.bold,
              color: isDarkMode ? COLORS.white : "#424242",
            }}
          >
            Rate this book
          </Text>
          <View style={{ flexDirection: "row", gap: 20, marginTop: 15 }}>
            <TouchableOpacity
              onPress={() => {
                setRateStars(1);
              }}
            >
              <Image
                source={
                  rateStars >= 1
                    ? icons.fullstar
                    : isDarkMode
                    ? icons.ratestar
                    : icons.ratestarLight
                }
                style={{ width: 33, height: 33, resizeMode: "contain" }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setRateStars(2);
              }}
            >
              <Image
                source={
                  rateStars >= 2
                    ? icons.fullstar
                    : isDarkMode
                    ? icons.ratestar
                    : icons.ratestarLight
                }
                style={{ width: 33, height: 33, resizeMode: "contain" }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setRateStars(3);
              }}
            >
              <Image
                source={
                  rateStars >= 3
                    ? icons.fullstar
                    : isDarkMode
                    ? icons.ratestar
                    : icons.ratestarLight
                }
                style={{ width: 33, height: 33, resizeMode: "contain" }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setRateStars(4);
              }}
            >
              <Image
                source={
                  rateStars >= 4
                    ? icons.fullstar
                    : isDarkMode
                    ? icons.ratestar
                    : icons.ratestarLight
                }
                style={{ width: 33, height: 33, resizeMode: "contain" }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setRateStars(5);
              }}
            >
              <Image
                source={
                  rateStars >= 5
                    ? icons.fullstar
                    : isDarkMode
                    ? icons.ratestar
                    : icons.ratestarLight
                }
                style={{ width: 33, height: 33, resizeMode: "contain" }}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("writereview", { book, stars: rateStars });
            }}
          >
            <View
              style={{
                marginTop: 15,
                marginBottom: 15,
                borderColor: COLORS.primary,
                borderWidth: 2,
                borderRadius: 25,
                paddingHorizontal: 20,
                paddingVertical: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: FONT.bold,
                  color: COLORS.primary,
                }}
              >
                Write a Review
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
});
