import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS, FONT, SIZES, icons } from "../../constants";
import { useNavigation } from "@react-navigation/native";
import Input from "../../components/controls/Input";
import Button from "../../components/controls/Button";
import { useSelector } from "react-redux";
import CodeInput from "../../components/controls/CodeInput";

export default function OTPCodeScreen() {
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
          You've Got Mail 📩
        </Text>
        <Text
          style={{
            marginTop: 12,
            fontFamily: FONT.regular,
            fontSize: SIZES.h2,
            color: isDarkMode ? COLORS.white : COLORS.black,
          }}
        >
          We have sent the OTP verification code to your email address. Check
          your email and enter the code below.
        </Text>
        <CodeInput style={{ marginTop: 50 }} />
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
          title="Confirm"
          showShadow={true}
          onPress={() => {
            navigation.replace("createnewpassword");
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
