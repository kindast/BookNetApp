import { ReaderProvider } from "@epubjs-react-native/core";
import BookReaderScreen from "./BookReaderScreen";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  getInfoAsync,
  makeDirectoryAsync,
  documentDirectory,
  readAsStringAsync,
  writeAsStringAsync,
} from "expo-file-system";
import { useSelector } from "react-redux";
import LoadingComponent from "../../components/controls/LoadingComponent";
import axios from "axios";
import { api } from "../../constants";

export default function BookReaderProvider({ route }) {
  const user = useSelector((state) => state.auth.user);
  const { book } = route.params;
  const [bookFile, setBookFile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [initialLocation, setInitialLocation] = useState(null);
  const [fontSize, setFontSize] = useState(null);

  async function downloadBook() {
    try {
      setIsLoading(true);
      const response = await axios.get(`${api}/api/download-book`, {
        params: { id: book.id },
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const filePath = `${documentDirectory}/books/${book.id}.base64`;
      const fileInfo = await getInfoAsync(filePath);

      if (!fileInfo.exists) {
        await writeAsStringAsync(filePath, response.data);
      }

      setBookFile(response.data);
    } catch (error) {
      console.error(
        "Download error:",
        error.response ? error.response.data : error.message
      );
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    async function initializeBook() {
      const location = await AsyncStorage.getItem(book.id);
      const fontSize = await AsyncStorage.getItem("font-size");

      if (location) {
        setInitialLocation(location);
      }

      if (fontSize) {
        setFontSize(fontSize);
      }

      const booksDirInfo = await getInfoAsync(`${documentDirectory}/books`);

      if (!booksDirInfo.exists) {
        await makeDirectoryAsync(`${documentDirectory}/books`);
      }

      const bookPath = `${documentDirectory}/books/${book.id}.base64`;
      const bookInfo = await getInfoAsync(bookPath);

      if (!bookInfo.exists) {
        await downloadBook();
      } else {
        const data = await readAsStringAsync(bookPath);
        setBookFile(data);
        setIsLoading(false);
      }
    }

    initializeBook();
  }, []);

  if (isLoading) return <LoadingComponent title={"Скачиваем книгу..."} />;

  return (
    <ReaderProvider>
      <BookReaderScreen
        book={book}
        route={route}
        bookFile={bookFile}
        initialLocation={initialLocation}
        fontSize={fontSize}
      />
    </ReaderProvider>
  );
}
