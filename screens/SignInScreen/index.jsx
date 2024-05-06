import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS, FONT, SIZES, api, icons } from "../../constants";
import { useNavigation } from "@react-navigation/native";
import Input from "../../components/controls/Input";
import Button from "../../components/controls/Button";
import GoogleButton from "../../components/controls/GoogleButton";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setUser } from "../../redux/slices/authSlice";
import Toast from "react-native-toast-message";
import english from "../../locales/english.json";
import russian from "../../locales/russian.json";
import { I18n } from "i18n-js";

export default function SignInScreen() {
  const navigation = useNavigation();
  const isDarkMode = useSelector((state) => state.settings.isDarkMode);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
          {i18n.t("SISTitle")}
        </Text>
        <Text
          style={{
            marginTop: 12,
            fontFamily: FONT.regular,
            fontSize: SIZES.h2,
            color: isDarkMode ? COLORS.white : COLORS.black,
          }}
        >
          {i18n.t("SISSubtitle")}
        </Text>
        <Input
          style={{ marginTop: 32 }}
          label={i18n.t("SUSEmail")}
          keyboardType="default"
          placeholder={i18n.t("SUSEmail")}
          maxLength={30}
          value={email}
          onChangeText={setEmail}
        />
        <Input
          style={{ marginTop: 24 }}
          label={i18n.t("SUSPassword")}
          keyboardType="default"
          placeholder={i18n.t("SUSPassword")}
          maxLength={25}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
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
              marginTop: 25,
            }}
          >
            {i18n.t("SISForgotPasssword")}
          </Text>
        </TouchableOpacity>
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
          title={i18n.t("SISButton")}
          showShadow={true}
          onPress={() => {
            axios
              .get(api + "/api/signin", {
                params: { email, password },
              })
              .then(async (response) => {
                let data = response.data;
                await AsyncStorage.setItem("user", JSON.stringify(data));
                dispatch(setUser(data));
              })
              .catch((error) => {
                if (error.response.status === 400) {
                  if (!email || !password) {
                    setError(i18n.t("SISEnterEmailAndPassword"));
                  } else {
                    setError(i18n.t("SISWrongEmailOrPassword"));
                  }
                }
                if (error.response.status === 301) {
                  axios.get(api + "/api/send-verification-code", {
                    params: { email },
                  });
                  navigation.navigate("OTPCode", {
                    email,
                    verifyAccount: true,
                  });
                }
              });
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
