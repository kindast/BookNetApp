import { View, ActivityIndicator, Text } from "react-native";
import { COLORS, FONT } from "../../constants";
import { useSelector } from "react-redux";

export default function LoadingComponent({ title }) {
  const isDarkMode = useSelector((state) => state.settings.isDarkMode);
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        gap: 10,
      }}
    >
      <ActivityIndicator size="large" color={COLORS.primary} />
      <Text
        style={{
          fontFamily: FONT.regular,
          fontSize: 16,
          color: isDarkMode ? COLORS.white : COLORS.black,
          display: title ? "flex" : "none",
        }}
      >
        {title}
      </Text>
    </View>
  );
}
