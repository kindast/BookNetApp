import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AccountScreen, HomeScreen, LibraryScreen, WishListScreen } from "..";
import { COLORS, FONT, icons } from "../../constants";
import { Image, Text, View } from "react-native";
import { useSelector } from "react-redux";

const Tab = createBottomTabNavigator();
export default function BottomNavigationScreen() {
  const isDarkMode = useSelector((state) => state.settings.isDarkMode);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 0,
          height: 70,
          backgroundColor: isDarkMode
            ? COLORS.darkBackground
            : COLORS.lightBackground,
        },
      }}
    >
      <Tab.Screen
        name="home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Image
                  source={focused ? icons.homeFill : icons.home}
                  style={{ height: 25, width: 25, resizeMode: "contain" }}
                />
                <Text
                  style={{
                    fontFamily: focused ? FONT.bold : FONT.regular,
                    color: focused ? COLORS.primary : "#9c9d9e",
                    marginTop: 8,
                    letterSpacing: focused ? 0.2 : 0.4,
                    lineHeight: 14,
                  }}
                >
                  Home
                </Text>
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="wishlist"
        component={WishListScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Image
                  source={focused ? icons.wishlistFill : icons.wishlist}
                  style={{ height: 25, width: 25, resizeMode: "contain" }}
                />
                <Text
                  style={{
                    fontFamily: focused ? FONT.bold : FONT.regular,
                    color: focused ? COLORS.primary : "#9c9d9e",
                    marginTop: 8,
                    letterSpacing: focused ? 0 : 0.6,
                    lineHeight: 14,
                  }}
                >
                  Wishlist
                </Text>
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="purchased"
        component={LibraryScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Image
                  source={focused ? icons.cartFill : icons.cart}
                  style={{ height: 25, width: 25, resizeMode: "contain" }}
                />
                <Text
                  style={{
                    fontFamily: focused ? FONT.bold : FONT.regular,
                    color: focused ? COLORS.primary : "#9c9d9e",
                    marginTop: 8,
                    letterSpacing: focused ? 0 : 0.2,
                    lineHeight: 14,
                  }}
                >
                  Purchased
                </Text>
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="account"
        component={AccountScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Image
                  source={focused ? icons.accountFill : icons.account}
                  style={{ height: 25, width: 25, resizeMode: "contain" }}
                />
                <Text
                  style={{
                    fontFamily: focused ? FONT.bold : FONT.regular,
                    color: focused ? COLORS.primary : "#9c9d9e",
                    marginTop: 8,
                    letterSpacing: focused ? 0 : 0.2,
                    lineHeight: 14,
                  }}
                >
                  Account
                </Text>
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}
