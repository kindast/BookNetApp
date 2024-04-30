import {
  BackHandler,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS, FONT, SIZES, api, icons } from "../../constants";
import { useNavigation } from "@react-navigation/native";
import Input from "../../components/controls/Input";
import Button from "../../components/controls/Button";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import english from "../../locales/english.json";
import russian from "../../locales/russian.json";
import { I18n } from "i18n-js";

export default function CreateNewPasswordScreen({ route }) {
  const navigation = useNavigation();
  const isDarkMode = useSelector((state) => state.settings.isDarkMode);
  const [password, setPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(false);
  const { email, code } = route.params;

  const locale = useSelector((state) => state.settings.locale);
  const i18n = new I18n({
    en: english,
    ru: russian,
  });
  i18n.locale = locale;

  useEffect(() => {
    const backAction = () => {
      navigation.popToTop();
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

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
          {i18n.t("CNPSTitle")}
        </Text>
        <Text
          style={{
            marginTop: 12,
            fontFamily: FONT.regular,
            fontSize: SIZES.h2,
            color: isDarkMode ? COLORS.white : COLORS.black,
          }}
        >
          {i18n.t("CNPSSubtitle")}
        </Text>
        <Input
          style={{ marginTop: 32 }}
          label={i18n.t("SUSPassword")}
          keyboardType="default"
          placeholder={i18n.t("SUSPassword")}
          maxLength={25}
          value={password}
          secureTextEntry
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
          style={{ marginTop: 16 }}
          label={i18n.t("SUSConfirmPassword")}
          keyboardType="default"
          placeholder={i18n.t("SUSConfirmPassword")}
          maxLength={25}
          secureTextEntry
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
            axios
              .post(api + "/api/reset-password", {
                email,
                code,
                newPassword: password,
              })
              .then((response) => {
                navigation.popToTop();
              })
              .catch((error) => {
                navigation.popToTop();
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
