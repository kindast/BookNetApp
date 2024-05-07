import { View } from "react-native";
import StarButton from "./StarButton";

const RatingInput = ({ rateStars, setRateStars, isDarkMode }) => {
  return (
    <View style={{ flexDirection: "row", gap: 20, marginTop: 15 }}>
      {[1, 2, 3, 4, 5].map((index) => (
        <StarButton
          key={index}
          index={index}
          rateStars={rateStars}
          setRateStars={setRateStars}
          isDarkMode={isDarkMode}
        />
      ))}
    </View>
  );
};

export default RatingInput;
