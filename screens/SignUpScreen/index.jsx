import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Keyboard,
} from "react-native";
import { COLORS, FONT, SIZES, api, icons } from "../../constants";
import { useNavigation } from "@react-navigation/native";
import Input from "../../components/controls/Input";
import Button from "../../components/controls/Button";
import { useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";
import english from "../../locales/english.json";
import russian from "../../locales/russian.json";
import { I18n } from "i18n-js";

export default function SignUpScreen() {
  const navigation = useNavigation();
  const isDarkMode = useSelector((state) => state.settings.isDarkMode);
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [password, setPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [isFirstNameValid, setIsFirstNameValid] = useState(false);
  const [lastName, setLastName] = useState("");
  const [isLastNameValid, setIsLastNameValid] = useState(false);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [error, setError] = useState("");

  const locale = useSelector((state) => state.settings.locale);
  const i18n = new I18n({
    en: english,
    ru: russian,
  });
  i18n.locale = locale;

  const keyboardShowListener = Keyboard.addListener("keyboardDidShow", () => {
    setIsKeyboardVisible(true);
  });
  const keyboardHideListener = Keyboard.addListener("keyboardDidHide", () => {
    setIsKeyboardVisible(false);
  });

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: isDarkMode
          ? COLORS.darkBackground
          : COLORS.lightBackground,
        paddingTop: SIZES.pt,
      }}
    >
      <ScrollView
        style={{
          flex: 1,
          paddingHorizontal: SIZES.ph,
          paddingBottom: SIZES.pb,
        }}
        showsVerticalScrollIndicator={false}
      >
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
          {i18n.t("SUSTitle")}
        </Text>
        <Text
          style={{
            marginTop: 12,
            fontFamily: FONT.regular,
            fontSize: SIZES.h2,
            color: isDarkMode ? COLORS.white : COLORS.black,
          }}
        >
          {i18n.t("SUSSubtitle")}
        </Text>
        <Input
          style={{ marginTop: 32 }}
          label={i18n.t("SUSFirstName")}
          keyboardType="default"
          placeholder={i18n.t("SUSFirstName")}
          maxLength={30}
          value={firstName}
          onChangeText={setFirstName}
          validation={() => {
            let regex = /^[а-яА-Яa-zA-Z]{1,30}$/;
            if (firstName.trim().length === 0) {
              setIsFirstNameValid(false);
              return i18n.t("SUSFirstNameRequired");
            }
            if (!regex.test(firstName)) {
              setIsFirstNameValid(false);
              return i18n.t("SUSFirstNameDigitsAndSymbols");
            }
            setIsFirstNameValid(true);
          }}
        />
        <Input
          style={{ marginTop: 32 }}
          label={i18n.t("SUSLastName")}
          keyboardType="default"
          placeholder={i18n.t("SUSLastName")}
          maxLength={30}
          value={lastName}
          onChangeText={setLastName}
          validation={() => {
            let regex = /^[а-яА-Яa-zA-Z]{1,30}$/;
            if (lastName.trim().length === 0) {
              setIsLastNameValid(false);
              return i18n.t("SUSLastNameRequired");
            }
            if (!regex.test(lastName)) {
              setIsLastNameValid(false);
              return i18n.t("SUSLastNameDigitsAndSymbols");
            }
            setIsLastNameValid(true);
          }}
        />
        <Input
          style={{ marginTop: 32 }}
          label={i18n.t("SUSEmail")}
          keyboardType="email-address"
          placeholder={i18n.t("SUSEmail")}
          maxLength={30}
          value={email}
          onChangeText={setEmail}
          validation={() => {
            let regex = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm;
            if (email.trim().length === 0) {
              setIsEmailValid(false);
              return i18n.t("SUSEmailRequired");
            }
            if (!regex.test(email)) {
              setIsEmailValid(false);
              return i18n.t("SUSEmailInvalid");
            }
            setIsEmailValid(true);
          }}
        />
        <Input
          style={{ marginTop: 24 }}
          label={i18n.t("SUSPassword")}
          keyboardType="default"
          placeholder={i18n.t("SUSPassword")}
          secureTextEntry
          maxLength={25}
          value={password}
          onChangeText={setPassword}
          validation={() => {
            let regex = /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/;
            if (password.trim().length === 0) {
              setIsPasswordValid(false);
              return i18n.t("SUSPasswordRequired");
            }
            if (!regex.test(password)) {
              setIsPasswordValid(false);
              return i18n.t("SUSPasswordInvalid");
            }
            setIsPasswordValid(true);
          }}
        />
        <Input
          style={{ marginTop: 24, marginBottom: 100 }}
          label={i18n.t("SUSConfirmPassword")}
          keyboardType="default"
          placeholder={i18n.t("SUSConfirmPassword")}
          secureTextEntry
          maxLength={25}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          validation={() => {
            if (confirmPassword !== password) {
              setIsConfirmPasswordValid(false);
              return i18n.t("SUSConfirmPasswordInvalid");
            }
            setIsConfirmPasswordValid(true);
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
      </ScrollView>
      {!isKeyboardVisible && (
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
            title={i18n.t("SUSButton")}
            showShadow={true}
            onPress={() => {
              if (
                !isFirstNameValid ||
                !isLastNameValid ||
                !isEmailValid ||
                !isPasswordValid ||
                !isConfirmPasswordValid
              ) {
                return;
              }
              axios
                .post(api + "/api/signup", {
                  email: email,
                  password,
                  firstName,
                  lastName,
                })
                .then((response) => {
                  navigation.replace("OTPCode", {
                    verifyAccount: true,
                    email,
                  });
                })
                .catch((error) => {
                  setError(error.response.data.message);
                });
            }}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SIZES.ph,
    paddingTop: SIZES.pt,
    paddingBottom: SIZES.pb,
  },
});
