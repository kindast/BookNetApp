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
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import { COLORS, FONT, SIZES, api, icons } from "../../constants";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import {
  documentDirectory,
  getInfoAsync,
  makeDirectoryAsync,
  readAsStringAsync,
  writeAsStringAsync,
} from "expo-file-system";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function BookReaderScreen({ route }) {
  const isDarkMode = useSelector((state) => state.settings.isDarkMode);
  const user = useSelector((state) => state.auth.user);
  const navigation = useNavigation();
  const { book } = route.params;
  const [bookFile, setBookFile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showHeader, setShowHeader] = useState(true);
  const [initialLocation, setInitialLocation] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const drawer = React.useRef(null);
  const { toc, goToLocation, changeTheme } = useReader();
  const lightTheme = {
    "::selection": { background: "lightskyblue" },
    a: {
      color: COLORS.black + " !important",
      cursor: "pointer",
      "pointer-events": "auto",
    },
    body: { background: COLORS.lightBackground },
    h1: { color: COLORS.black + " !important" },
    li: { color: COLORS.black + " !important" },
    p: { color: COLORS.black + " !important" },
    span: { color: COLORS.black + " !important" },
  };
  const darkTheme = {
    "::selection": { background: "lightskyblue" },
    a: {
      color: COLORS.white + " !important",
      cursor: "pointer",
      "pointer-events": "auto",
    },
    body: { background: COLORS.darkBackground },
    h1: { color: COLORS.white + " !important" },
    li: { color: COLORS.white + " !important" },
    p: { color: COLORS.white + " !important" },
    span: { color: COLORS.white + " !important" },
  };

  const downloadBook = () => {
    setIsLoading(true);
    axios
      .get(api + "/api/download-book", {
        params: { id: book.id },
        headers: { Authorization: "Bearer " + user.token },
      })
      .then((response) => {
        setBookFile(response.data);
        getInfoAsync(documentDirectory + "/books/" + book.id + ".base64").then(
          (info) => {
            if (!info.exists)
              writeAsStringAsync(
                documentDirectory + "/books/" + book.id + ".base64",
                response.data
              );
          }
        );
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };
  useEffect(() => {
    AsyncStorage.getItem(book.id).then((location) => {
      if (location) {
        setInitialLocation(location);
      }
    });
    getInfoAsync(documentDirectory + "/books").then(async (info) => {
      if (!info.exists) {
        await makeDirectoryAsync(documentDirectory + "/books");
      }
    });
    getInfoAsync(documentDirectory + "/books/" + book.id + ".base64").then(
      async (info) => {
        if (!info.exists) {
          await downloadBook();
        } else {
          await readAsStringAsync(
            documentDirectory + "/books/" + book.id + ".base64"
          ).then((data) => {
            setBookFile(data);
          });
          setIsLoading(false);
        }
      }
    );
  }, []);

  useEffect(() => {
    if (isDarkMode) changeTheme(darkTheme);
    else changeTheme(lightTheme);
  }, [isDarkMode]);

  return (
    <DrawerLayoutAndroid
      ref={drawer}
      drawerWidth={300}
      drawerPosition="left"
      renderNavigationView={() => {
        return (
          <View
            style={{
              paddingTop: SIZES.pt,
              paddingHorizontal: 10,
              flex: 1,
              backgroundColor: isDarkMode
                ? COLORS.darkBackground
                : COLORS.lightBackground,
            }}
          >
            <Text
              style={{
                fontFamily: FONT.bold,
                fontSize: 20,
                color: isDarkMode ? COLORS.white : COLORS.black,
              }}
            >
              Chapters
            </Text>
            {toc && (
              <ScrollView style={{ padding: 0 }}>
                {toc.map((chapter) => (
                  <TouchableOpacity
                    key={chapter.id}
                    onPress={() => {
                      goToLocation(chapter.href.split("/")[1]);
                    }}
                  >
                    <View style={{ padding: 0 }}>
                      <Text
                        style={{
                          fontFamily: FONT.bold,
                          fontSize: 15,
                          color: isDarkMode ? COLORS.white : COLORS.black,
                        }}
                      >
                        {chapter.label}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}
          </View>
        );
      }}
    >
      <View
        style={{
          ...styles.container,
          backgroundColor: isDarkMode
            ? COLORS.darkBackground
            : COLORS.lightBackground,
        }}
      >
        {showHeader && (
          <View style={{ ...styles.header, paddingHorizontal: SIZES.ph }}>
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
                numberOfLines={1}
                style={{
                  fontFamily: FONT.bold,
                  color: isDarkMode ? COLORS.white : COLORS.black,
                  fontSize: 24,
                  marginLeft: 20,
                  maxWidth: 300,
                }}
              >
                {book.title}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                drawer.current.openDrawer();
              }}
            >
              <Image
                source={isDarkMode ? icons.infoLight : icons.info}
                style={{ width: 25, height: 25, resizeMode: "contain" }}
              />
            </TouchableOpacity>
          </View>
        )}
        {isLoading ? (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
            }}
          >
            <ActivityIndicator size="large" color={COLORS.primary} />
          </View>
        ) : (
          <Reader
            waitForLocationsReady
            src={bookFile}
            onLocationChange={(total, current, progress) => {
              if (initialLocation === current.end.cfi) return;
              AsyncStorage.setItem(book.id, current.end.cfi).then(() => {});
              setCurrentPage(current.end.location);
              setTotalPages(total);
            }}
            onLongPress={() => {
              setShowHeader((prev) => !prev);
            }}
            initialLocation={initialLocation}
            fileSystem={useFileSystem}
            enableSelection={false}
            highlightOnSelect={false}
            allowScriptedContent={true}
            renderLoadingFileComponent={() => {
              return (
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    flex: 1,
                  }}
                >
                  <ActivityIndicator size="large" color={COLORS.primary} />
                </View>
              );
            }}
            renderOpeningBookComponent={() => {
              return (
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    flex: 1,
                  }}
                >
                  <ActivityIndicator size="large" color={COLORS.primary} />
                </View>
              );
            }}
          />
        )}
        <View style={{ alignItems: "flex-end", paddingHorizontal: 15 }}>
          <Text
            style={{
              fontFamily: FONT.regular,
              color: isDarkMode ? COLORS.white : "rgba(0,0,0,0.3)",
            }}
          >
            {currentPage}/{totalPages}
          </Text>
        </View>
      </View>
    </DrawerLayoutAndroid>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingBottom: 20,
    flex: 1,
  },
  header: {
    paddingTop: 58,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    flexDirection: "row",
    alignItems: "center",
  },
});
