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
import { useDispatch, useSelector } from "react-redux";
import CodeInput from "../../components/controls/CodeInput";
import { useEffect, useState } from "react";
import axios from "axios";
import { setUser } from "../../redux/slices/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function OTPCodeScreen({ route }) {
  const navigation = useNavigation();
  const isDarkMode = useSelector((state) => state.settings.isDarkMode);
  const dispatch = useDispatch();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const { verifyAccount, email } = route.params;

  useEffect(() => {
    const backAction = () => {
      if (verifyAccount) {
        navigation.popToTop();
      } else {
        navigation.goBack();
      }
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
            if (verifyAccount) {
              navigation.popToTop();
            } else {
              navigation.goBack();
            }
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
        <CodeInput style={{ marginTop: 50 }} onCodeChange={setCode} />
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
          title="Confirm"
          showShadow={true}
          onPress={() => {
            if (verifyAccount && code.length === 4) {
              axios
                .get(api + "/api/verify-account", {
                  params: { email, code },
                })
                .then(async (response) => {
                  let data = response.data;
                  console.log(data);
                  await AsyncStorage.setItem("user", JSON.stringify(data));
                  dispatch(setUser(data));
                })
                .catch((error) => {
                  if (error.response.status === 403) {
                    navigation.popToTop();
                  } else {
                    setError("Invalid code");
                  }
                });
            } else if (code.length < 4) {
              setError("Please enter a valid code");
            } else if (!verifyAccount) {
              axios
                .get(api + "/api/verify-code", {
                  params: { email: email, code },
                })
                .then((response) => {
                  navigation.replace("createnewpassword", { email, code });
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
