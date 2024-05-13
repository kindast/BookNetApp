import React, { useEffect, useRef, useState } from "react";
import { Reader, useReader } from "@epubjs-react-native/core";
import { useFileSystem } from "@epubjs-react-native/expo-file-system";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { COLORS, FONT, SIZES, api, icons } from "../../constants";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import LoadingComponent from "../../components/controls/LoadingComponent";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import Button from "../../components/controls/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RadioButton from "../../components/controls/RadioButton";
import english from "../../locales/english.json";
import russian from "../../locales/russian.json";
import { I18n } from "i18n-js";

export default function BookReaderScreen({
  book,
  bookFile,
  initialLocation,
  fontSize,
}) {
  const { changeTheme, changeFontSize, changeFontFamily, toc, goToLocation } =
    useReader();
  const { width, height } = useWindowDimensions();
  const isDarkMode = useSelector((state) => state.settings.isDarkMode);
  const [showHeader, setShowHeader] = useState(true);
  const [pageIndicator, setPageIndicator] = useState(0);
  const [bookReady, setBookReady] = useState(false);
  const [locationsReady, setLocationsReady] = useState(false);
  const bottomSheetRef = useRef(null);
  const [currentFontSize, setCurrentFontSize] = useState(14);
  const [selectedFont, setSelectedFont] = useState(null);
  const availableFonts = ["Helvetica", "serif", "monospace", "Times"];
  const locale = useSelector((state) => state.settings.locale);
  const i18n = new I18n({
    en: english,
    ru: russian,
  });
  i18n.locale = locale;

  useEffect(() => {
    isDarkMode ? changeTheme(darkTheme) : changeTheme(lightTheme);
  }, [bookReady, isDarkMode]);

  useEffect(() => {
    if (fontSize) {
      //setCurrentFontSize(fontSize);
      //changeFontSize(`${fontSize}px`);
    }
  }, [bookReady]);

  const increaseFontSize = () => {
    if (currentFontSize < 32) {
      setCurrentFontSize(currentFontSize + 1);
      changeFontSize(`${currentFontSize + 1}px`);
      AsyncStorage.setItem("font-size", `${currentFontSize}`);
    }
  };

  const decreaseFontSize = () => {
    if (currentFontSize > 8) {
      setCurrentFontSize(currentFontSize - 1);
      changeFontSize(`${currentFontSize - 1}px`);
      AsyncStorage.setItem("font-size", `${currentFontSize}`);
    }
  };

  return (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        <View
          style={{
            ...styles.container,
            backgroundColor: isDarkMode
              ? COLORS.darkBackground
              : COLORS.lightBackground,
          }}
        >
          {showHeader && (
            <Header title={book.title} bottomSheetRef={bottomSheetRef} />
          )}
          <Reader
            src={bookFile}
            width={width}
            height={showHeader ? height * 0.9 : height}
            defaultTheme={isDarkMode ? darkTheme : lightTheme}
            fileSystem={useFileSystem}
            initialLocation={initialLocation}
            renderLoadingFileComponent={() => (
              <LoadingComponent title={"Загрузка файла..."} />
            )}
            renderOpeningBookComponent={() => (
              <LoadingComponent title={"Открываем книгу..."} />
            )}
            onReady={() => {
              setBookReady(true);
            }}
            onLocationsReady={() => {
              setLocationsReady(true);
            }}
            onDoubleTap={() => {
              setShowHeader((prev) => !prev);
            }}
            onLocationChange={async (total, current, progress) => {
              if (current.end.cfi !== initialLocation) {
                await AsyncStorage.setItem(book.id, current.end.cfi);
                setPageIndicator(`${current.end.location}/${total}`);
              }
            }}
          />
        </View>
        <BottomSheetModal
          ref={bottomSheetRef}
          snapPoints={[300]}
          enablePanDownToClose
        >
          <BottomSheetView>
            <View style={{ marginHorizontal: SIZES.ph }}>
              <Text
                style={{
                  fontFamily: FONT.bold,
                  fontSize: 18,
                  color: isDarkMode ? COLORS.white : COLORS.black,
                }}
              >
                {i18n.t("BRSFontSize")}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: 15,
                }}
              >
                <Button
                  title={"-"}
                  onPress={decreaseFontSize}
                  style={{ width: 100 }}
                />
                <Text
                  style={{
                    fontFamily: FONT.bold,
                    fontSize: 18,
                    color: isDarkMode ? COLORS.white : COLORS.black,
                  }}
                >
                  {currentFontSize}
                </Text>
                <Button
                  title={"+"}
                  onPress={increaseFontSize}
                  style={{ width: 100 }}
                />
              </View>
            </View>
            <View style={{ marginHorizontal: SIZES.ph, marginTop: 20 }}>
              <Text
                style={{
                  fontFamily: FONT.bold,
                  fontSize: 18,
                  color: isDarkMode ? COLORS.white : COLORS.black,
                }}
              >
                {i18n.t("BRSFont")}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: 15,
                  gap: 10,
                }}
              >
                {availableFonts.map((font, index) => (
                  <RadioButton
                    key={index}
                    title={font}
                    checked={font === availableFonts[selectedFont]}
                    onPress={() => {
                      setSelectedFont(index);
                      changeFontFamily(font);
                    }}
                  />
                ))}
              </View>
            </View>
            <View style={{ display: "none" }}>
              {toc.map((c) => (
                <TouchableOpacity
                  key={c.id}
                  onPress={() => {
                    goToLocation(c.href.split("/")[1]);
                    console.log(c.href.split("/")[1]);
                    console.log(c);
                  }}
                >
                  <View
                    style={{
                      padding: 15,
                      borderBottomColor: "black",
                      borderBottomWidth: 1,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: FONT.regular,
                        fontSize: 16,
                        color: isDarkMode ? COLORS.white : COLORS.black,
                      }}
                    >
                      {c.label.trim()}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </BottomSheetView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

const Header = ({ title, bottomSheetRef }) => {
  const isDarkMode = useSelector((state) => state.settings.isDarkMode);
  const navigation = useNavigation();
  return (
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
          numberOfLines={1}
          style={{
            fontFamily: FONT.bold,
            color: isDarkMode ? COLORS.white : COLORS.black,
            fontSize: 24,
            marginLeft: 20,
            maxWidth: 300,
          }}
        >
          {title}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          bottomSheetRef.current.present();
        }}
      >
        <Image
          source={isDarkMode ? icons.infoLight : icons.info}
          style={{ width: 25, height: 25, resizeMode: "contain" }}
        />
      </TouchableOpacity>
    </View>
  );
};

const lightTheme = {
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
