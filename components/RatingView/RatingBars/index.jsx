import { View } from "react-native";
import RatingBar from "../RatingBar";

const RatingBars = ({ reviews, isDarkMode }) => {
  const countReviews = (stars) => {
    let procent =
      reviews.filter((review) => review.stars === stars).length /
      reviews.length;
    return procent ? procent : 0;
  };

  return (
    <View style={{ justifyContent: "space-between" }}>
      {[5, 4, 3, 2, 1].map((rating) => (
        <RatingBar
          key={rating}
          rating={rating}
          progress={countReviews(rating)}
          isDarkMode={isDarkMode}
        />
      ))}
    </View>
  );
};

export default RatingBars;
