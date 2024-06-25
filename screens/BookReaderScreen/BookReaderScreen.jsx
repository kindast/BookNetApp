import React, { useEffect, useState } from "react";
import { View, useWindowDimensions } from "react-native";
import { Reader, useReader, Themes } from "@epubjs-react-native/core";
import { useFileSystem } from "@epubjs-react-native/expo-file-system";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { MAX_FONT_SIZE, MIN_FONT_SIZE, availableFonts, themes } from "./utils";
import LoadingComponent from "../../components/controls/LoadingComponent";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function BookReaderScreen({ book, bookFile, initialLocation }) {
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const {
    theme,
    changeFontSize,
    changeFontFamily,
    changeTheme,
    goToLocation,
    goPrevious,
  } = useReader();

  const [isFullScreen, setIsFullScreen] = useState(false);
  const [currentFontSize, setCurrentFontSize] = useState(14);
  const [currentFontFamily, setCurrentFontFamily] = useState(availableFonts[0]);

  const increaseFontSize = () => {
    if (currentFontSize < MAX_FONT_SIZE) {
      setCurrentFontSize(currentFontSize + 1);
      changeFontSize(`${currentFontSize + 1}px`);
      AsyncStorage.setItem("font-size", `${currentFontSize}`);
    }
  };

  const decreaseFontSize = () => {
    if (currentFontSize > MIN_FONT_SIZE) {
      setCurrentFontSize(currentFontSize - 1);
      changeFontSize(`${currentFontSize - 1}px`);
      AsyncStorage.setItem("font-size", `${currentFontSize}`);
    }
  };

  const switchTheme = () => {
    const index = Object.values(themes).indexOf(theme);
    const nextTheme =
      Object.values(themes)[(index + 1) % Object.values(themes).length];

    changeTheme(nextTheme);
    AsyncStorage.setItem(
      "theme",
      `${Object.values(themes).indexOf(nextTheme)}`
    );
  };

  const switchFontFamily = () => {
    const index = availableFonts.indexOf(currentFontFamily);
    const nextFontFamily = availableFonts[(index + 1) % availableFonts.length];

    setCurrentFontFamily(nextFontFamily);
    changeFontFamily(nextFontFamily);
  };

  return (
    <GestureHandlerRootView
      style={{
        flex: 1,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
        backgroundColor: theme.body.background,
      }}
    >
      {!isFullScreen && (
        <Header
          currentFontSize={currentFontSize}
          increaseFontSize={increaseFontSize}
          decreaseFontSize={decreaseFontSize}
          switchTheme={switchTheme}
          switchFontFamily={switchFontFamily}
        />
      )}

      <Reader
        onReady={() => {
          AsyncStorage.getItem("theme").then((value) => {
            if (value) {
              const theme = Object.values(themes)[parseInt(value)];
              changeTheme(theme);
            }
          });
          AsyncStorage.getItem("font-size").then((value) => {
            if (value) {
              setCurrentFontSize(parseInt(value));
              changeFontSize(`${parseInt(value)}px`);
            }
          });
          if (initialLocation) {
            goToLocation(initialLocation);
            goPrevious();
          }
        }}
        src={bookFile}
        renderLoadingFileComponent={() => (
          <LoadingComponent title={"Загрузка файла..."} />
        )}
        renderOpeningBookComponent={() => (
          <LoadingComponent title={"Открываем книгу..."} />
        )}
        onLocationChange={async (total, current, progress) => {
          if (current.end.cfi !== initialLocation) {
            await AsyncStorage.setItem(book.id, current.end.cfi);
          }
        }}
        width={width}
        height={height - 60}
        fileSystem={useFileSystem}
        defaultTheme={Themes.LIGHT}
      />

      {!isFullScreen && <Footer />}
    </GestureHandlerRootView>
  );
}
