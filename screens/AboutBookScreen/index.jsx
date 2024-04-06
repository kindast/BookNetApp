import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Image,
  ScrollView,
} from "react-native";
import { SIZES, FONT, COLORS, icons } from "../../constants";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

export default function AboutBookScreen({ route }) {
  const isDarkMode = useSelector((state) => state.settings.isDarkMode);
  const navigation = useNavigation();
  const { book } = route.params;
  return (
    <View
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
            About this Book
          </Text>
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginTop: 30 }}
      >
        <Text
          style={{
            fontSize: 18,
            fontFamily: FONT.regular,
            color: isDarkMode ? COLORS.white : "#424242",
            textAlign: "justify",
          }}
        >
          {book.description}
        </Text>
        <View
          style={{
            height: 1,
            backgroundColor: isDarkMode ? "#34363c" : "rgba(0,0,0,0.1)",
            marginVertical: 20,
          }}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 20,
          }}
        >
          <View style={{ gap: 20 }}>
            <Param title={"Language"} value={"English"} />
            <Param
              title={"Author"}
              value={book.author.firstName + " " + book.author.lastName}
              selectValue
            />
            <Param title={"Published on"} value={"Dec 8, 2015"} />
            <Param title={"Pages"} value={book.pages} />
            <Param title={"Purchases"} value={"1K"} />
          </View>
          <View style={{ gap: 20 }}>
            <Param title={"Age"} value={"Ages 20 & Up"} />
            <Param title={"Publisher"} value={"Moscow"} selectValue />
            <Param title={"ISBN"} value={"5623545895478"} />
            <Param
              title={"Genres"}
              value={() => {
                let value = "";
                book.genres.forEach((genre) => {
                  if (book.genres.lastIndexOf(genre) !== book.genres.length - 1)
                    value += `${genre.name}, `;
                  else value += `${genre.name}`;
                });
                return value;
              }}
              selectValue
            />
            <Param title={"Size"} value={book.size} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const Param = ({ title, value, selectValue = false }) => {
  const isDarkMode = useSelector((state) => state.settings.isDarkMode);
  return (
    <View style={{ gap: 8 }}>
      <Text
        style={{
          fontSize: 20,
          fontFamily: FONT.bold,
          color: isDarkMode ? COLORS.white : COLORS.black,
        }}
      >
        {title}
      </Text>
      <Text
        style={{
          fontSize: 18,
          fontFamily: FONT.regular,
          color: selectValue
            ? COLORS.primary
            : isDarkMode
            ? COLORS.white
            : COLORS.black,
        }}
      >
        {typeof value === "function" ? value() : value}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: SIZES.pt,
    paddingHorizontal: SIZES.ph,
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
