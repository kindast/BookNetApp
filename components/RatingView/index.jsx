import { View, Text } from "react-native";
import StarRating from "./StarRating";
import RatingBars from "./RatingBars";
import { FONT, COLORS } from "../../constants";

const RatingView = ({ book, isDarkMode, i18n }) => {
  return (
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
          {book.rating}
        </Text>
        <StarRating rating={book?.rating} isDarkMode={isDarkMode} />
        <Text
          style={{
            fontSize: 18,
            fontFamily: FONT.bold,
            color: isDarkMode ? COLORS.white : COLORS.black,
          }}
        >
          ({book.reviews?.length} {i18n.t("BDSReviews")})
        </Text>
      </View>
      <View
        style={{
          width: 1,
          backgroundColor: isDarkMode ? "#35383f" : "rgba(0,0,0,0.1)",
        }}
      />
      <RatingBars reviews={book?.reviews} isDarkMode={isDarkMode} />
    </View>
  );
};

export default RatingView;
