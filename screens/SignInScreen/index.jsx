import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS, FONT, SIZES, icons } from "../../constants";
import { useNavigation } from "@react-navigation/native";
import Input from "../../components/controls/Input";
import Button from "../../components/controls/Button";
import GoogleButton from "../../components/controls/GoogleButton";
import { useSelector } from "react-redux";

export default function SignInScreen() {
  const navigation = useNavigation();
  const isDarkMode = useSelector((state) => state.settings.isDarkMode);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: isDarkMode
          ? COLORS.darkBackground
          : COLORS.lightBackground,
      }}
    >
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Image
            source={isDarkMode ? icons.backLight : icons.back}
            style={{ width: 25, height: 25 }}
          />
        </TouchableOpacity>
        <Text
          style={{
            marginTop: 30,
            fontFamily: FONT.bold,
            fontSize: SIZES.h1,
            color: isDarkMode ? COLORS.white : COLORS.black,
          }}
        >
          Hello there 👋
        </Text>
        <Text
          style={{
            marginTop: 12,
            fontFamily: FONT.regular,
            fontSize: SIZES.h2,
            color: isDarkMode ? COLORS.white : COLORS.black,
          }}
        >
          Please enter your phone & password to sign in.
        </Text>
        <Input
          style={{ marginTop: 32 }}
          label="Phone"
          keyboardType="phone-pad"
          placeholder="Phone"
        />
        <Input
          style={{ marginTop: 24 }}
          label="Password"
          keyboardType="default"
          placeholder="Password"
        />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("forgotpassword");
          }}
        >
          <Text
            style={{
              fontFamily: FONT.bold,
              fontSize: SIZES.medium,
              color: COLORS.primary,
              textAlign: "center",
              marginTop: 50,
            }}
          >
            Forgot Password
          </Text>
        </TouchableOpacity>
        <Text
          style={{
            fontFamily: FONT.bold,
            fontSize: SIZES.medium,
            color: "#616161",
            textAlign: "center",
            marginTop: 50,
          }}
        >
          or
        </Text>
        <GoogleButton style={{ marginTop: 50 }} />
      </View>
      <View
        style={{
          borderTopColor: isDarkMode ? "#33363d" : "rgba(0,0,0,0.1)",
          borderTopWidth: 1,
          paddingHorizontal: SIZES.ph,
          paddingTop: SIZES.ph,
          paddingBottom: SIZES.pb,
        }}
      >
        <Button
          title="Sign In"
          showShadow={true}
          onPress={() => {
            navigation.replace("tabs");
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SIZES.ph,
    paddingTop: SIZES.pt,
    paddingBottom: SIZES.pb,
    flex: 1,
  },
});
