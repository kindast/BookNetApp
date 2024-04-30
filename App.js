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
  BookReaderScreen,
  CreateNewPasswordScreen,
  AboutBookScreen,
  ReviewsScreen,
  WriteReviewScreen,
  SearchScreen,
  LanguageScreen,
} from "./screens";
import {
  setI18n,
  setIsDarkMode,
  setLocale,
} from "./redux/slices/settingsSlice";
import { setUser } from "./redux/slices/authSlice";
import { loadAsync, useFonts } from "expo-font";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { MenuProvider } from "react-native-popup-menu";
import { hideAsync, preventAutoHideAsync } from "expo-splash-screen";
import { getLocales } from "expo-localization";
import { I18n } from "i18n-js";

const Stack = createNativeStackNavigator();
preventAutoHideAsync();
export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const fonts = {
    "OpenSans-Bold": require("./assets/fonts/OpenSans-Bold.ttf"),
    "OpenSans-Regular": require("./assets/fonts/OpenSans-Regular.ttf"),
  };

  useEffect(() => {
    async function loadLocalization() {
      const locale = await AsyncStorage.getItem("locale");
      if (locale === null) {
        locale = getLocales()[0].languageCode;
      }
      dispatch(setLocale(locale));
    }
    loadLocalization();
  }, []);

  useEffect(() => {
    async function loadFonts() {
      await loadAsync(fonts);
      setFontsLoaded(true);
      await hideAsync();
    }
    loadFonts();
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
                <Stack.Screen name="aboutbook" component={AboutBookScreen} />
                <Stack.Screen name="bookreader" component={BookReaderScreen} />
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
