import { View, Text, StyleSheet } from "react-native";
import ProgressBar from "react-native-progress/Bar";
import { COLORS, FONT } from "../../../constants";

const RatingBar = ({ rating, progress, isDarkMode }) => {
  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.text,
          {
            color: isDarkMode ? COLORS.white : COLORS.black,
            fontFamily: FONT.regular,
          },
        ]}
      >
        {rating}
      </Text>
      <ProgressBar
        progress={progress}
        borderWidth={0}
        color={COLORS.primary}
        unfilledColor={isDarkMode ? "#35383f" : "#e0e0e0"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
  },
  text: {
    fontSize: 16,
  },
});

export default RatingBar;
