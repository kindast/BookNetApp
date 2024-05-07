import { View } from "react-native";

const HorizontalSeparator = ({ isDarkMode, height = 1 }) => {
  return (
    <View
      style={{
        height: height,
        backgroundColor: isDarkMode ? "#fff" : "rgba(0,0,0,0.1)",
      }}
    />
  );
};

export default HorizontalSeparator;
