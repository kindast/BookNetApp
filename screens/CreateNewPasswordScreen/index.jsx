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

export default function CreateNewPasswordScreen({ route }) {
  const navigation = useNavigation();
  const isDarkMode = useSelector((state) => state.settings.isDarkMode);
  const [password, setPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(false);
  const { email, code } = route.params;

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
          Create New Password 🔐
        </Text>
        <Text
          style={{
            marginTop: 12,
            fontFamily: FONT.regular,
            fontSize: SIZES.h2,
            color: isDarkMode ? COLORS.white : COLORS.black,
          }}
        >
          Enter your new password. If you forget it, then you have to do forgot
          password.
        </Text>
        <Input
          style={{ marginTop: 32 }}
          label="Password"
          keyboardType="default"
          placeholder="Password"
          maxLength={25}
          value={password}
          secureTextEntry
          onChangeText={setPassword}
          validation={() => {
            let regex = /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/;
            if (password.trim().length === 0) {
              setIsPasswordValid(false);
              return "Password is required";
            }
            if (!regex.test(password)) {
              setIsPasswordValid(false);
              return "The password must be a minimum of 6 characters, with at least 1 uppercase letter, 1 lowercase letter and 1 number, with no spaces";
            }
            setIsPasswordValid(true);
          }}
        />
        <Input
          style={{ marginTop: 16 }}
          label="Confirm Password"
          keyboardType="default"
          placeholder="Confirm Password"
          maxLength={25}
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          validation={() => {
            if (confirmPassword !== password) {
              setIsConfirmPasswordValid(false);
              return "Passwords don't match";
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
          title="Continue"
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
