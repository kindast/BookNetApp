import { View } from "react-native";
import Star from "../Star";

const StarRating = ({ rating, isDarkMode }) => {
  return (
    <View style={{ flexDirection: "row", gap: 10 }}>
      <Star rating={rating} threshold={1} isDarkMode={isDarkMode} />
      <Star rating={rating} threshold={2} isDarkMode={isDarkMode} />
      <Star rating={rating} threshold={3} isDarkMode={isDarkMode} />
      <Star rating={rating} threshold={4} isDarkMode={isDarkMode} />
      <Star rating={rating} threshold={5} isDarkMode={isDarkMode} />
    </View>
  );
};

export default StarRating;
