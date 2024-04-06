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
import useFetch from "../../hooks/useFetch";
import Button from "../../components/controls/Button";
import DetailsButton from "../../components/controls/DetailsButton";
import ProgressBar from "react-native-progress/Bar";

export default function BookDetailsScreen({ route }) {
  const isDarkMode = useSelector((state) => state.settings.isDarkMode);
  const navigation = useNavigation();
  const [rateStars, setRateStars] = useState(0);
  const { id } = route.params;
  const { data, isLoading, refetch } = useFetch("book", { id: id });
  const countReviews = (stars) => {
    let procent =
      data?.reviews?.filter((review) => review.stars === stars).length /
      data?.reviews?.length;
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
              refetch();
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
          <TouchableOpacity>
            <Image
              source={isDarkMode ? icons.addLight : icons.add}
              style={{ width: 30, height: 30, resizeMode: "contain" }}
            />
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 35, flexDirection: "row" }}>
          <Image
            source={{
              uri: api + data?.coverUrl,
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
              {data?.title}
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
              {data?.author?.firstName + " " + data?.author?.lastName}
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
              Released on {data?.releaseDate}
            </Text>
            <View
              style={{
                marginTop: 15,
                flexDirection: "row",
                flexWrap: "wrap",
                gap: 8,
              }}
            >
              {data?.genres?.map((genre, index) => (
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
                {data?.rating}
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
              {data?.reviews?.length} reviews
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
              {data?.size}
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
              {data?.pages}
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
        <Button
          title={"Buy " + data?.price + "₽"}
          style={{ marginTop: 25 }}
          onPress={() => {
            navigation.navigate("bookreader");
          }}
        />
        <DetailsButton
          title={"About this Book"}
          onPress={() => {
            navigation.navigate("aboutbook", { book: data });
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
          {data?.description}
        </Text>
        <DetailsButton
          title={"Ratings & Reviews"}
          onPress={() => {
            navigation.navigate("reviews", { book: data });
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
              {data?.rating}
            </Text>
            <View style={{ flexDirection: "row", gap: 10 }}>
              <Image
                source={
                  data?.rating >= 1
                    ? icons.fullstar
                    : data?.rating >= 0.5 && data?.rating < 1
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
                  data?.rating >= 2
                    ? icons.fullstar
                    : data?.rating >= 1.5 && data?.rating < 2
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
                  data?.rating >= 3
                    ? icons.fullstar
                    : data?.rating >= 2.5 && data?.rating < 3
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
                  data?.rating >= 4
                    ? icons.fullstar
                    : data?.rating >= 3.5 && data?.rating < 4
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
                  data?.rating === 5
                    ? icons.fullstar
                    : data?.rating >= 4.5 && data?.rating < 5
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
              ({data?.reviews?.length} reviews)
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
          <TouchableOpacity>
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
