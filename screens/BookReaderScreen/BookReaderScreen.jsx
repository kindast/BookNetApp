import React, { useEffect, useState } from "react";
import { Reader, useReader } from "@epubjs-react-native/core";
import { useFileSystem } from "@epubjs-react-native/expo-file-system";
import {
  Alert,
  SafeAreaView,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  useWindowDimensions,
  View,
  PanResponder,
  DrawerLayoutAndroid,
} from "react-native";
import { COLORS, FONT, SIZES, api, icons } from "../../constants";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

export default function BookReaderScreen({ route }) {
  const isDarkMode = useSelector((state) => state.settings.isDarkMode);
  const user = useSelector((state) => state.auth.user);
  const navigation = useNavigation();
  const { book } = route.params;
  const [bookFile, setBookFile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const drawer = React.useRef(null);
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

  const downloadBook = () => {
    setIsLoading(true);
    axios
      .get(api + "/api/download-book", {
        params: { id: book.id },
        headers: { Authorization: "Bearer " + user.token },
      })
      .then((response) => {
        setBookFile(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };
  useEffect(() => {
    downloadBook();
  }, []);

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
              adjustsFontSizeToFit
              style={{
                fontFamily: FONT.bold,
                color: isDarkMode ? COLORS.white : COLORS.black,
                fontSize: 24,
                marginLeft: 20,
              }}
            >
              {book.title}
            </Text>
          </View>
          <TouchableOpacity onPress={() => {}}>
            <Image
              source={isDarkMode ? icons.wishlist : icons.wishlist}
              style={{ width: 25, height: 25, resizeMode: "contain" }}
            />
          </TouchableOpacity>
        </View>
        {isLoading ? (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ActivityIndicator size="large" color={COLORS.primary} />
          </View>
        ) : (
          <Reader
            src={bookFile}
            fileSystem={useFileSystem}
            enableSelection={false}
            highlightOnSelect={false}
            allowScriptedContent={true}
          />
        )}
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
