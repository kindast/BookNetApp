import React from "react";
import { Alert, View, Image, Text, StyleSheet, StatusBar } from "react-native";
import { COLORS, FONT, SIZES, icons, images } from "../../constants";
import GoogleButton from "../../components/controls/GoogleButton";
import Button from "../../components/controls/Button";
import AccentButton from "../../components/controls/AccentButton";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import {
  GoogleOneTapSignIn,
  statusCodes,
} from "@react-native-google-signin/google-signin";

export default function WelcomeScreen() {
  const nagigation = useNavigation();
  const isDarkMode = useSelector((state) => state.settings.isDarkMode);

  const signInGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleOneTapSignIn.signIn({
        nonce: "your_nonce",
      });
      setState({ userInfo });
    } catch (error) {
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.NO_SAVED_CREDENTIAL_FOUND:
            // no saved credential found, try creating an account
            break;
          case statusCodes.SIGN_IN_CANCELLED:
            // sign in was cancelled
            break;
          case statusCodes.ONE_TAP_START_FAILED:
            // Android and Web only, you probably have hit rate limiting. You can still call the original Google Sign In API in this case.
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            // Android-only: play services not available or outdated
            break;
          default:
          // something else happened
        }
      } else {
        // an error that's not related to google sign in occurred
      }
    }
  };

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: isDarkMode
          ? COLORS.darkBackground
          : COLORS.lightBackground,
      }}
    >
      <View style={styles.imageContainer}>
        <Image source={images.shelfbook} style={styles.shelfbook} />
      </View>
      <View>
        <View
          style={{
            flexDirection: "row",
            columnGap: 10,
            marginTop: 24,
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              color: isDarkMode ? COLORS.white : COLORS.black,
              fontFamily: FONT.bold,
              fontSize: SIZES.h1,
            }}
          >
            Welcome to
          </Text>
          <Text
            style={{
              color: COLORS.primary,
              fontFamily: FONT.bold,
              fontSize: SIZES.h1,
            }}
          >
            BookNet 👋
          </Text>
        </View>
        <Text
          style={{
            color: isDarkMode ? COLORS.white : COLORS.black,
            fontFamily: FONT.regular,
            textAlign: "center",
            fontSize: SIZES.h2,
            marginTop: 16,
          }}
        >
          The Number One Best Ebook Store & Reader Application in this Century
        </Text>
        <GoogleButton
          style={{ marginTop: 32 }}
          onPress={() => {
            signInGoogle();
          }}
        />
        <Button
          title="Get Started"
          style={{ marginTop: 16 }}
          onPress={() => {
            nagigation.navigate("signup");
          }}
        />
        <AccentButton
          title="I Already Have an Account"
          style={{ marginTop: 16 }}
          onPress={() => {
            nagigation.navigate("signin");
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: SIZES.ph,
  },
  imageContainer: {
    height: "50%",
  },
  shelfbook: {
    height: "100%",
    resizeMode: "stretch",
  },
});
