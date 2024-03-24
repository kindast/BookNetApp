import { View, Image, Text, StyleSheet, ActivityIndicator } from "react-native";
import { COLORS, FONT, SIZES, icons } from "../../constants";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

export default function SplashScreen() {
  const navigation = useNavigation();
  const isDarkMode = useSelector((state) => state.settings.isDarkMode);

  React.useEffect(() => {
    setTimeout(() => {
      navigation.replace("welcome");
    }, 500);
  }, []);

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: isDarkMode
          ? COLORS.darkBackground
          : COLORS.lightBackground,
      }}
    >
      <Image source={icons.logo} style={styles.logo} />
      <Text
        style={{
          ...styles.text,
          color: isDarkMode ? COLORS.white : COLORS.black,
        }}
      >
        BookNet
      </Text>
      <ActivityIndicator
        style={styles.indicator}
        color={COLORS.primary}
        size="large"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 150,
    height: 150,
  },
  text: {
    fontFamily: FONT.bold,
    fontSize: SIZES.large,
    marginTop: 25,
  },
  indicator: {
    marginTop: 100,
  },
});
