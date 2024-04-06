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

export default function SignInScreen() {
  const navigation = useNavigation();
  const isDarkMode = useSelector((state) => state.settings.isDarkMode);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
          Please enter your email & password to sign in.
        </Text>
        <Input
          style={{ marginTop: 32 }}
          label="Email"
          keyboardType="default"
          placeholder="Email"
          maxLength={30}
          value={email}
          onChangeText={setEmail}
        />
        <Input
          style={{ marginTop: 24 }}
          label="Password"
          keyboardType="default"
          placeholder="Password"
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
                    setError("Please enter email & password");
                  } else {
                    setError("Wrong email or password");
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
