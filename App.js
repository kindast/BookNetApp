import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useColorScheme } from "react-native";
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
} from "./screens";
import { setIsDarkMode } from "./redux/slices/settingsSlice";
import { setToken, setName, setEmail, setUser } from "./redux/slices/authSlice";
import { useFonts } from "expo-font";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    "Urbanist-Bold": require("./assets/fonts/Urbanist-Bold.ttf"),
    "Urbanist-Regular": require("./assets/fonts/Urbanist-Regular.ttf"),
  });
  const theme = useColorScheme();
  const { user } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setIsDarkMode(theme === "dark"));
  }, [theme]);
  useEffect(async () => {
    const userJson = await AsyncStorage.getItem("user");
    let user = userJson != null ? JSON.parse(userJson) : null;
    user && dispatch(setUser(user));
    setIsLoading(false);
  }, []);
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
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
              <Stack.Screen name="bookdetails" component={BookDetailsScreen} />
              <Stack.Screen name="aboutbook" component={AboutBookScreen} />
              <Stack.Screen name="bookreader" component={BookReaderScreen} />
              <Stack.Screen name="reviews" component={ReviewsScreen} />
            </>
          )}
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
