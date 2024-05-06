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
import { useEffect, useState } from "react";
import axios from "axios";
import english from "../../locales/english.json";
import russian from "../../locales/russian.json";
import { I18n } from "i18n-js";
import { Formik } from "formik";
import * as Yup from "yup";

export default function SignUpScreen() {
  const navigation = useNavigation();
  const isDarkMode = useSelector((state) => state.settings.isDarkMode);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  const locale = useSelector((state) => state.settings.locale);
  const i18n = new I18n({
    en: english,
    ru: russian,
  });
  i18n.locale = locale;

  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .matches(/^[a-zA-Zа-яА-Я]+$/, i18n.t("SUSFirstNameDigitsAndSymbols"))
      .required(i18n.t("SUSFirstNameRequired")),
    lastName: Yup.string()
      .matches(/^[a-zA-Zа-яА-Я]+$/, i18n.t("SUSLastNameDigitsAndSymbols"))
      .required(i18n.t("SUSLastNameRequired")),
    email: Yup.string()
      .email(i18n.t("SUSEmailInvalid"))
      .required(i18n.t("SUSEmailRequired")),
    password: Yup.string()
      .matches(
        /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/,
        i18n.t("SUSPasswordInvalid")
      )
      .required(i18n.t("SUSPasswordRequired")),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], i18n.t("SUSConfirmPasswordInvalid"))
      .required(i18n.t("SUSConfirmPasswordRequired")),
  });

  useEffect(() => {
    const keyboardShowListener = Keyboard.addListener("keyboardDidShow", () => {
      setIsKeyboardVisible(true);
    });
    const keyboardHideListener = Keyboard.addListener("keyboardDidHide", () => {
      setIsKeyboardVisible(false);
    });

    return () => {
      keyboardShowListener.remove();
      keyboardHideListener.remove();
    };
  }, []);
  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting, setFieldError }) => {
        axios
          .post(api + "/api/signup", {
            email: values.email,
            password: values.password,
            firstName: values.firstName,
            lastName: values.lastName,
          })
          .then((response) => {
            navigation.replace("OTPCode", {
              verifyAccount: true,
              email: values.email,
            });
          })
          .catch((error) => {
            setFieldError("email", i18n.t("SUSEmailAlreadyExists"));
          })
          .finally(() => setSubmitting(false));
      }}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
      }) => (
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
              value={values.firstName}
              onChangeText={handleChange("firstName")}
              onBlur={handleBlur("firstName")}
              error={touched.firstName && errors.firstName}
            />
            <Input
              style={{ marginTop: 32 }}
              label={i18n.t("SUSLastName")}
              keyboardType="default"
              placeholder={i18n.t("SUSLastName")}
              maxLength={30}
              onChangeText={handleChange("lastName")}
              onBlur={handleBlur("lastName")}
              value={values.lastName}
              error={touched.lastName && errors.lastName}
            />
            <Input
              style={{ marginTop: 32 }}
              label={i18n.t("SUSEmail")}
              keyboardType="email-address"
              placeholder={i18n.t("SUSEmail")}
              maxLength={30}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
              error={touched.email && errors.email}
            />
            <Input
              style={{ marginTop: 24 }}
              label={i18n.t("SUSPassword")}
              keyboardType="default"
              placeholder={i18n.t("SUSPassword")}
              secureTextEntry
              maxLength={25}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              error={touched.password && errors.password}
            />
            <Input
              style={{ marginTop: 24, marginBottom: 100 }}
              label={i18n.t("SUSConfirmPassword")}
              keyboardType="default"
              placeholder={i18n.t("SUSConfirmPassword")}
              secureTextEntry
              maxLength={25}
              onChangeText={handleChange("confirmPassword")}
              onBlur={handleBlur("confirmPassword")}
              value={values.confirmPassword}
              error={touched.confirmPassword && errors.confirmPassword}
            />
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
                onPress={handleSubmit}
              />
            </View>
          )}
        </View>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SIZES.ph,
    paddingTop: SIZES.pt,
    paddingBottom: SIZES.pb,
  },
});
