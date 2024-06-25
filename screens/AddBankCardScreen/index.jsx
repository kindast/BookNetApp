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

export default function AddBankCardScreen({ route }) {
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
          Банковская карта
        </Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginTop: 25 }}
      >
        <Input label={"Номер карты"} />
        <Input label={"Имя на карте"} style={{ marginTop: 32 }} />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 32,
          }}
        >
          <Input label={"Срок действия"} style={{ width: widthButton }} />
          <Input label={"CVV"} style={{ width: widthButton }} />
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
          title={"Добавить"}
          showShadow={true}
          onPress={() => {
            navigation.navigate("paymenttotal", { book: book });
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
