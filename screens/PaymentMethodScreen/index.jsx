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

export default function PaymentMethodScreen({ route }) {
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
          Выбор способа оплаты
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
        <TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginVertical: 20,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image source={icons.sbp} style={{ width: 60, height: 60 }} />
              <Text
                style={{
                  fontFamily: FONT.bold,
                  color: isDarkMode ? COLORS.white : COLORS.black,
                  fontSize: 20,
                  marginLeft: 15,
                }}
              >
                СБП
              </Text>
            </View>
            <Image
              source={icons.smallArrow}
              style={{ height: 20, width: 14, resizeMode: "contain" }}
            />
          </View>
        </TouchableOpacity>
        <View
          style={{
            height: 1,
            backgroundColor: isDarkMode ? "#35383f" : "rgba(0,0,0,0.1)",
          }}
        />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("addbankcard", { book: book });
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginVertical: 20,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image source={icons.addCard} style={{ width: 60, height: 60 }} />
              <Text
                style={{
                  fontFamily: FONT.bold,
                  color: isDarkMode ? COLORS.white : COLORS.black,
                  fontSize: 20,
                  marginLeft: 15,
                }}
              >
                Банковская карта
              </Text>
            </View>
            <Image
              source={icons.smallArrow}
              style={{ height: 20, width: 14, resizeMode: "contain" }}
            />
          </View>
        </TouchableOpacity>
      </ScrollView>
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
