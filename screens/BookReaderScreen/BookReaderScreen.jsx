import React from "react";
import { Reader, useReader } from "@epubjs-react-native/core";
import base64 from "./base64";
import { useFileSystem } from "@epubjs-react-native/expo-file-system";
import {
  Alert,
  SafeAreaView,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
  PanResponder,
  DrawerLayoutAndroid,
} from "react-native";
import Button from "../../components/controls/Button";
import { COLORS, FONT, SIZES, icons } from "../../constants";
import { useEffect } from "react/cjs/react.production.min";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

export default function BookReaderScreen() {
  const isDarkMode = useSelector((state) => state.settings.isDarkMode);
  const navigation = useNavigation();
  const { width, height } = useWindowDimensions();
  const drawer = React.useRef(null);
  const [locations, setLocations] = React.useState(null);
  const {
    goNext,
    goPrevious,
    progress,
    goToLocation,
    getLocations,
    currentLocation,
  } = useReader();
  const swipeThreshold = 50;
  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx < -swipeThreshold) {
          goNext();
        } else if (gestureState.dx > swipeThreshold) {
          goPrevious();
        }
      },
    })
  ).current;

  return (
    <DrawerLayoutAndroid
      ref={drawer}
      drawerWidth={300}
      drawerPosition="left"
      renderNavigationView={() => {
        return <View style={{ paddingTop: SIZES.pt, flex: 1 }}></View>;
      }}
    >
      <View
        {...panResponder.panHandlers}
        style={{
          ...styles.container,
          backgroundColor: isDarkMode
            ? COLORS.darkBackground
            : COLORS.lightBackground,
        }}
      >
        <View style={styles.header}>
          <View style={styles.title}>
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
                fontFamily: FONT.bold,
                color: isDarkMode ? COLORS.white : COLORS.black,
                fontSize: 24,
                marginLeft: 20,
              }}
            >
              1984
            </Text>
          </View>
          <TouchableOpacity onPress={() => {}}>
            <Image
              source={isDarkMode ? icons.wishlist : icons.wishlist}
              style={{ width: 25, height: 25, resizeMode: "contain" }}
            />
          </TouchableOpacity>
        </View>
        <Reader
          src={base64}
          fileSystem={useFileSystem}
          enableSelection={true}
          highlightOnSelect={false}
          allowScriptedContent={true}
          onLocationsReady={() => {
            setLocations(getLocations());
          }}
        />
      </View>
    </DrawerLayoutAndroid>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: SIZES.pt,
    paddingHorizontal: SIZES.ph,
    paddingBottom: 20,
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    flexDirection: "row",
    alignItems: "center",
  },
});
