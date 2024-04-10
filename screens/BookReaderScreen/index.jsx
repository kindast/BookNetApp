import { ReaderProvider } from "@epubjs-react-native/core";
import BookReaderScreen from "./BookReaderScreen";

export default function BookReaderProvider({ route }) {
  return (
    <ReaderProvider>
      <BookReaderScreen route={route} />
    </ReaderProvider>
  );
}
