import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
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
import { useFonts } from "expo-font";

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    "Urbanist-Bold": require("./assets/fonts/Urbanist-Bold.ttf"),
    "Urbanist-Regular": require("./assets/fonts/Urbanist-Regular.ttf"),
  });
  const theme = useColorScheme();
  const { isLoggedIn } = useSelector((state) => state.settings);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setIsDarkMode(theme === "dark"));
  }, [theme]);
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator
        initialRouteName="splash"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="splash" component={SplashScreen} />
        <Stack.Screen name="welcome" component={WelcomeScreen} />
        <Stack.Screen name="signup" component={SignUpScreen} />
        <Stack.Screen name="signin" component={SignInScreen} />
        <Stack.Screen name="forgotpassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="OTPCode" component={OTPCodeScreen} />
        <Stack.Screen
          name="createnewpassword"
          component={CreateNewPasswordScreen}
        />
        <Stack.Screen name="tabs" component={BottomNavigationScreen} />
        <Stack.Screen name="genres" component={GenresScreen} />
        <Stack.Screen name="bookdetails" component={BookDetailsScreen} />
        <Stack.Screen name="aboutbook" component={AboutBookScreen} />
        <Stack.Screen name="bookreader" component={BookReaderScreen} />
        <Stack.Screen name="reviews" component={ReviewsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
