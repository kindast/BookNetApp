import { TouchableOpacity, Image } from "react-native";
import { icons } from "../../../constants";

const StarButton = ({ index, rateStars, setRateStars, isDarkMode }) => {
  return (
    <TouchableOpacity onPress={() => setRateStars(index)}>
      <Image
        source={
          rateStars >= index
            ? icons.fullstar
            : isDarkMode
            ? icons.ratestar
            : icons.ratestarLight
        }
        style={{ width: 33, height: 33, resizeMode: "contain" }}
      />
    </TouchableOpacity>
  );
};

export default StarButton;
