import { Image } from "react-native";
import { icons } from "../../../constants";

const Star = ({ rating, threshold, isDarkMode }) => {
  let source;
  if (rating >= threshold) {
    source = icons.fullstar;
  } else if (rating >= threshold - 0.5 && rating < threshold) {
    source = isDarkMode ? icons.halfstar : icons.halfstarLight;
  } else {
    source = isDarkMode ? icons.emptystar : icons.emptystarLight;
  }

  return (
    <Image
      source={source}
      style={{ width: 20, height: 20, resizeMode: "contain" }}
    />
  );
};

export default Star;
