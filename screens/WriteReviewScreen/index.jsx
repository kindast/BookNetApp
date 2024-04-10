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

export default function WriteReviewScreen({ route }) {
  const isDarkMode = useSelector((state) => state.settings.isDarkMode);
  const user = useSelector((state) => state.auth.user);
  const navigation = useNavigation();
  const { book, stars } = route.params;
  const [rateStars, setRateStars] = useState(0);
  const [text, setText] = useState("");
  const widthButton =
    (Dimensions.get("window").width - (SIZES.ph * 2 + 16)) / 2;
  useEffect(() => {
    setRateStars(stars);
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
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <HorizontalBookCard book={book} style={{ marginTop: 30 }} />
        <View
          style={{
            height: 1,
            backgroundColor: isDarkMode ? "#35383f" : "rgba(0,0,0,0.1)",
            marginVertical: 25,
          }}
        />
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              fontSize: 20,
              fontFamily: FONT.bold,
              color: isDarkMode ? COLORS.white : "#424242",
            }}
          >
            Rate this book
          </Text>
          <View style={{ flexDirection: "row", gap: 20, marginTop: 15 }}>
            <TouchableOpacity
              onPress={() => {
                setRateStars(1);
              }}
            >
              <Image
                source={
                  rateStars >= 1
                    ? icons.fullstar
                    : isDarkMode
                    ? icons.ratestar
                    : icons.ratestarLight
                }
                style={{ width: 33, height: 33, resizeMode: "contain" }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setRateStars(2);
              }}
            >
              <Image
                source={
                  rateStars >= 2
                    ? icons.fullstar
                    : isDarkMode
                    ? icons.ratestar
                    : icons.ratestarLight
                }
                style={{ width: 33, height: 33, resizeMode: "contain" }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setRateStars(3);
              }}
            >
              <Image
                source={
                  rateStars >= 3
                    ? icons.fullstar
                    : isDarkMode
                    ? icons.ratestar
                    : icons.ratestarLight
                }
                style={{ width: 33, height: 33, resizeMode: "contain" }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setRateStars(4);
              }}
            >
              <Image
                source={
                  rateStars >= 4
                    ? icons.fullstar
                    : isDarkMode
                    ? icons.ratestar
                    : icons.ratestarLight
                }
                style={{ width: 33, height: 33, resizeMode: "contain" }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setRateStars(5);
              }}
            >
              <Image
                source={
                  rateStars >= 5
                    ? icons.fullstar
                    : isDarkMode
                    ? icons.ratestar
                    : icons.ratestarLight
                }
                style={{ width: 33, height: 33, resizeMode: "contain" }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            height: 1,
            backgroundColor: isDarkMode ? "#35383f" : "rgba(0,0,0,0.1)",
            marginVertical: 25,
          }}
        />

        <Input
          label={"Describe Your Experience (Optional)"}
          multiline
          style={{ height: 240 }}
          maxLength={500}
          value={text}
          onChangeText={setText}
        />
      </ScrollView>
      <View
        style={{
          borderTopColor: isDarkMode ? "#33363d" : "rgba(0,0,0,0.1)",
          borderTopWidth: 1,
          paddingTop: SIZES.ph,
          paddingBottom: SIZES.pb,
        }}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <AccentButton
            title={"Cancel"}
            style={{ width: widthButton }}
            onPress={() => {
              navigation.goBack();
            }}
          />
          <Button
            title="Submit"
            showShadow={true}
            onPress={() => {
              if (rateStars === 0) {
                Toast.show({
                  text1: "Warning",
                  text2: "Please rate the book",
                  position: "bottom",
                  type: "error",
                });
              }

              axios
                .post(
                  api + "/api/review",
                  { stars: rateStars, text, id: book.id },
                  { headers: { Authorization: "Bearer " + user.token } }
                )
                .then((response) => {
                  navigation.goBack();
                  Toast.show({
                    text1: "Success",
                    text2: "Your review has been submitted",
                    position: "bottom",
                    type: "success",
                  });
                })
                .catch((error) => {
                  console.log(error);
                });
            }}
            style={{ width: widthButton }}
          />
        </View>
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
    justifyContent: "space-between",
    alignItems: "center",
  },
});
