import { View } from "react-native";

const VerticalSeparator = ({ isDarkMode, width = 1 }) => {
  return (
    <View
      style={{
        width: width,
        backgroundColor: isDarkMode ? "#fff" : "rgba(0,0,0,0.1)",
      }}
    />
  );
};

export default VerticalSeparator;
