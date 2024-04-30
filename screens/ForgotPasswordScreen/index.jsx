import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
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

export default function ForgotPasswordScreen() {
  const navigation = useNavigation();
  const isDarkMode = useSelector((state) => state.settings.isDarkMode);
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [error, setError] = useState("");

  const locale = useSelector((state) => state.settings.locale);
  const i18n = new I18n({
    en: english,
    ru: russian,
  });
  i18n.locale = locale;

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
          {i18n.t("FPSTitle")}
        </Text>
        <Text
          style={{
            marginTop: 12,
            fontFamily: FONT.regular,
            fontSize: SIZES.h2,
            color: isDarkMode ? COLORS.white : COLORS.black,
          }}
        >
          {i18n.t("FPSSubtitle")}
        </Text>
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
          title={i18n.t("FPSButton")}
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
                  switch (error.response.data.error) {
                    case 1:
                      setError(i18n.t("FPSUserNotExist"));
                      break;
                    case 2:
                      setError(i18n.t("FPSFailedSendEmail"));
                      break;
                  }
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
