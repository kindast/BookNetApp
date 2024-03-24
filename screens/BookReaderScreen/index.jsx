import { ReaderProvider } from "@epubjs-react-native/core";
import BookReaderScreen from "./BookReaderScreen";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function BookReaderProvider() {
  return (
    <ReaderProvider>
      <BookReaderScreen />
    </ReaderProvider>
  );
}
