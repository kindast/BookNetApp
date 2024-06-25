import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import { useColorScheme, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  SplashScreen,
  WelcomeScreen,
  SignUpScreen,
  SignInScreen,
  ForgotPasswordScreen,
  BottomNavigationScreen,
  OTPCodeScreen,
  GenresScreen,
  BookDetailsScreen,
  CreateNewPasswordScreen,
  AboutBookScreen,
  ReviewsScreen,
  WriteReviewScreen,
  SearchScreen,
  LanguageScreen,
  PaymentMethodScreen,
  AddBankCardScreen,
  PaymentTotalScreen,
} from "./screens";
import { setIsDarkMode, setLocale } from "./redux/slices/settingsSlice";
import { setUser } from "./redux/slices/authSlice";
import { loadAsync, useFonts } from "expo-font";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { MenuProvider } from "react-native-popup-menu";
import { hideAsync, preventAutoHideAsync } from "expo-splash-screen";
import { getLocales } from "expo-localization";
import BookReaderProvider from "./screens/BookReaderScreen";
import axios from "axios";
import { api } from "./constants";

const Stack = createNativeStackNavigator();
preventAutoHideAsync();
export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const fonts = {
    "OpenSans-Bold": require("./assets/fonts/OpenSans-Bold.ttf"),
    "OpenSans-Regular": require("./assets/fonts/OpenSans-Regular.ttf"),
  };

  useEffect(() => {
    async function loadSettings() {
      await loadAsync(fonts);
      setFontsLoaded(true);

      await hideAsync();
    }
    loadSettings();
  }, []);

  const theme = useColorScheme();
  const { user } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setIsDarkMode(theme === "dark"));
  }, [theme]);

  useEffect(() => {
    async function loadUser() {
      const userJson = await AsyncStorage.getItem("user");
      let user = userJson != null ? JSON.parse(userJson) : null;
      user && dispatch(setUser(user));

      if (user) {
        axios
          .get(api + "/api/check-token", {
            headers: { Authorization: "Bearer " + user.token },
          })
          .then(async (response) => {})
          .catch((error) => {
            if (error.response.status === 500) {
              AsyncStorage.removeItem("user");
              AsyncStorage.clear();
              dispatch(setUser(null));
            }
          });
      }

      let locale = await AsyncStorage.getItem("locale");
      if (locale === null) {
        locale = getLocales()[0].languageCode;
      }
      dispatch(setLocale(locale));

      setIsLoading(false);
    }
    loadUser();
  }, []);

  return fontsLoaded ? (
    <MenuProvider>
      <NavigationContainer>
        <StatusBar style={theme === "dark" ? "light" : "dark"} />
        {isLoading ? (
          <SplashScreen />
        ) : (
          <Stack.Navigator
            initialRouteName="splash"
            screenOptions={{ headerShown: false }}
          >
            {!user ? (
              <>
                <Stack.Screen name="welcome" component={WelcomeScreen} />
                <Stack.Screen name="signup" component={SignUpScreen} />
                <Stack.Screen name="signin" component={SignInScreen} />
                <Stack.Screen
                  name="forgotpassword"
                  component={ForgotPasswordScreen}
                />
                <Stack.Screen name="OTPCode" component={OTPCodeScreen} />
                <Stack.Screen
                  name="createnewpassword"
                  component={CreateNewPasswordScreen}
                />
              </>
            ) : (
              <>
                <Stack.Screen name="tabs" component={BottomNavigationScreen} />
                <Stack.Screen name="genres" component={GenresScreen} />
                <Stack.Screen
                  name="bookdetails"
                  component={BookDetailsScreen}
                />
                <Stack.Screen
                  name="paymentmethod"
                  component={PaymentMethodScreen}
                />
                <Stack.Screen
                  name="paymenttotal"
                  component={PaymentTotalScreen}
                />
                <Stack.Screen
                  name="addbankcard"
                  component={AddBankCardScreen}
                />
                <Stack.Screen name="aboutbook" component={AboutBookScreen} />
                <Stack.Screen
                  name="bookreader"
                  component={BookReaderProvider}
                />
                <Stack.Screen name="reviews" component={ReviewsScreen} />
                <Stack.Screen
                  name="writereview"
                  component={WriteReviewScreen}
                />
                <Stack.Screen name="search" component={SearchScreen} />
                <Stack.Screen name="language" component={LanguageScreen} />
              </>
            )}
          </Stack.Navigator>
        )}
        <Toast />
      </NavigationContainer>
    </MenuProvider>
  ) : null;
}
