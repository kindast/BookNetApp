import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Image,
  ScrollView,
} from "react-native";
import { SIZES, FONT, COLORS, icons } from "../../constants";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import ProgressBar from "react-native-progress/Bar";

export default function ReviewsScreen({ route }) {
  const isDarkMode = useSelector((state) => state.settings.isDarkMode);
  const navigation = useNavigation();
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
            Ratings & Reviews
          </Text>
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginTop: 30 }}
      >
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
              (6.8K reviews)
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
                progress={0.3}
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
                progress={0.1}
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
                progress={0.5}
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
                progress={0.1}
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
                progress={0}
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
        <View style={{ gap: 20 }}>
          <Review />
          <Review />
          <Review />
          <Review />
        </View>
      </ScrollView>
    </View>
  );
}

const Review = () => {
  const isDarkMode = useSelector((state) => state.settings.isDarkMode);
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 15 }}>
          <View
            style={{
              width: 48,
              height: 48,
              borderRadius: 100,
              backgroundColor: "rgba(0,0,0,0.1)",
            }}
          />
          <Text
            style={{
              fontSize: 16,
              fontFamily: FONT.bold,
              color: isDarkMode ? COLORS.white : COLORS.black,
            }}
          >
            Author
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
            borderColor: COLORS.primary,
            borderWidth: 2,
            borderRadius: 25,
            paddingHorizontal: 15,
            paddingVertical: 5,
          }}
        >
          <Image
            source={icons.fullstar}
            style={{ width: 14, height: 14, resizeMode: "contain" }}
          />
          <Text
            style={{
              fontSize: 16,
              color: COLORS.primary,
              fontFamily: FONT.bold,
            }}
          >
            5
          </Text>
        </View>
      </View>
      <Text
        style={{
          color: isDarkMode ? COLORS.white : "#424242",
          fontFamily: FONT.regular,
          fontSize: 16,
          textAlign: "justify",
          marginTop: 15,
        }}
      >
        As a person who loves to read, this book is a great read. It is a great
        source of information about the world and the people around it.
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
