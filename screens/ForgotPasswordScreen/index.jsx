import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS, FONT, SIZES, api, icons } from "../../constants";
import { useNavigation } from "@react-navigation/native";
import Input from "../../components/controls/Input";
import Button from "../../components/controls/Button";
import { useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";

export default function ForgotPasswordScreen() {
  const navigation = useNavigation();
  const isDarkMode = useSelector((state) => state.settings.isDarkMode);
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [error, setError] = useState("");

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
          Forgot Password 🔑
        </Text>
        <Text
          style={{
            marginTop: 12,
            fontFamily: FONT.regular,
            fontSize: SIZES.h2,
            color: isDarkMode ? COLORS.white : COLORS.black,
          }}
        >
          Enter your email address. We will send an OTP code for verification in
          the next step.
        </Text>
        <Input
          style={{ marginTop: 32 }}
          label="Email"
          keyboardType="email-address"
          placeholder="Email"
          maxLength={30}
          value={email}
          onChangeText={setEmail}
          validation={() => {
            let regex = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm;
            if (email.trim().length === 0) {
              setIsEmailValid(false);
              return "Email is required";
            }
            if (!regex.test(email)) {
              setIsEmailValid(false);
              return "Email does not match format example@email.com";
            }
            setIsEmailValid(true);
          }}
        />
        <Text
          style={{
            fontFamily: FONT.regular,
            fontSize: 16,
            color: "#ff628c",
            marginTop: 10,
          }}
        >
          {error}
        </Text>
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
          title="Continue"
          showShadow={true}
          onPress={() => {
            if (isEmailValid) {
              axios
                .get(api + "/api/send-recovery-code", { params: { email } })
                .then((response) => {
                  navigation.replace("OTPCode", {
                    email,
                    verifyAccount: false,
                  });
                })
                .catch((error) => {
                  setError(error.response.data.message);
                });
            }
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
