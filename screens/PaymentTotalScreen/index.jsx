import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
import { COLORS, FONT, SIZES, icons, api } from "../../constants";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import HorizontalBookCard from "../../components/cards/HorizontalBookCard";
import { useEffect, useState } from "react";
import Input from "../../components/controls/Input";
import Button from "../../components/controls/Button";
import AccentButton from "../../components/controls/AccentButton";
import Toast from "react-native-toast-message";
import axios from "axios";
import english from "../../locales/english.json";
import russian from "../../locales/russian.json";
import { I18n } from "i18n-js";

export default function PaymentTotalScreen({ route }) {
  const isDarkMode = useSelector((state) => state.settings.isDarkMode);
  const user = useSelector((state) => state.auth.user);
  const navigation = useNavigation();
  const { book, stars, review } = route.params;
  const [rateStars, setRateStars] = useState(0);
  const [text, setText] = useState("");
  const locale = useSelector((state) => state.settings.locale);
  const i18n = new I18n({
    en: english,
    ru: russian,
  });
  i18n.locale = locale;
  const widthButton =
    (Dimensions.get("window").width - (SIZES.ph * 2 + 16)) / 2;
  useEffect(() => {
    if (!review) setRateStars(stars);
    if (review) {
      setRateStars(review.stars);
      setText(review.text);
    }
  }, []);
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
          Подтверждение оплаты
        </Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <HorizontalBookCard book={book} style={{ marginTop: 30 }} />
        <View
          style={{
            height: 1,
            backgroundColor: isDarkMode ? "#35383f" : "rgba(0,0,0,0.1)",
            marginTop: 25,
          }}
        />
        <View
          style={{
            marginVertical: 20,
            backgroundColor: "#FAFAFA",
            borderWidth: 1,
            borderColor: "#EEEEEE",
            borderRadius: 15,
            padding: 20,
            gap: 15,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "#616161",
                fontSize: 16,
                fontFamily: FONT.regular,
              }}
            >
              Итого
            </Text>
            <Text
              style={{
                color: COLORS.black,
                fontSize: 18,
                fontFamily: FONT.bold,
              }}
            >
              {book.price}₽
            </Text>
          </View>
        </View>
        <View
          style={{
            height: 1,
            backgroundColor: isDarkMode ? "#35383f" : "rgba(0,0,0,0.1)",
          }}
        />
        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 20 }}
        >
          <Image source={icons.mir} style={{ width: 60, height: 60 }} />
          <Text
            style={{
              fontFamily: FONT.bold,
              color: isDarkMode ? COLORS.white : COLORS.black,
              fontSize: 20,
              marginLeft: 15,
            }}
          >
            •••• •••• •••• 4783
          </Text>
        </View>
      </ScrollView>
      <View
        style={{
          borderTopColor: isDarkMode ? "#33363d" : "rgba(0,0,0,0.1)",
          borderTopWidth: 1,
          paddingHorizontal: SIZES.ph,
          paddingTop: SIZES.ph,
          paddingBottom: SIZES.pb,
        }}
      >
        <Button
          title={"Подтвердить"}
          showShadow={true}
          onPress={() => {
            axios
              .get(api + "/api/buy-book", {
                params: { id: book.id },
                headers: { Authorization: "Bearer " + user.token },
              })
              .then((response) => {
                Toast.show({
                  type: "success",
                  text1: i18n.t("BDSSuccess"),
                  text2: i18n.t("BDSAddBookToAccount"),
                  position: "bottom",
                  hideAfter: 100,
                });
                navigation.navigate("bookdetails", { id: book.id });
              })
              .catch((error) => {
                console.log(error.response.data);
              });
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: SIZES.pt,
    paddingHorizontal: SIZES.ph,
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
});
