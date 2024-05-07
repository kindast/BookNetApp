import { View, Text, Image } from "react-native";
import { FONT, COLORS, icons } from "../../constants";

const Review = ({ review, style, isDarkMode }) => {
  return (
    <View style={{ ...style }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 15 }}>
          <View
            style={{
              width: 48,
              height: 48,
              borderRadius: 1000,
              backgroundColor: COLORS.primary,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{ fontFamily: FONT.bold, fontSize: 20, color: "white" }}
            >
              {review.author.email[0].toUpperCase()}
            </Text>
          </View>
          <Text
            style={{
              fontSize: 16,
              fontFamily: FONT.bold,
              color: isDarkMode ? COLORS.white : COLORS.black,
            }}
          >
            {review.author.firstName}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
            borderColor: COLORS.primary,
            borderWidth: 2,
            borderRadius: 25,
            paddingHorizontal: 15,
            paddingVertical: 5,
          }}
        >
          <Image
            source={icons.fullstar}
            style={{ width: 14, height: 14, resizeMode: "contain" }}
          />
          <Text
            style={{
              fontSize: 16,
              color: COLORS.primary,
              fontFamily: FONT.bold,
            }}
          >
            {review.stars}
          </Text>
        </View>
      </View>
      <Text
        style={{
          color: isDarkMode ? COLORS.white : "#424242",
          fontFamily: FONT.regular,
          fontSize: 16,
          textAlign: "justify",
          marginTop: 15,
          display: review.text ? "flex" : "none",
        }}
      >
        {review.text}
      </Text>
    </View>
  );
};

export default Review;
