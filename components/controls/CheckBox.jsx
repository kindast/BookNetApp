import { Image, Text, TouchableOpacity, View } from "react-native";
import { COLORS, FONT, icons } from "../../constants";
import { useSelector } from "react-redux";

export default function CheckBox({ title, checked, onPress }) {
  const isDarkMode = useSelector((state) => state.settings.isDarkMode);
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={{ flexDirection: "row", gap: 15, alignItems: "center" }}>
        <Image
          source={checked ? icons.checkboxFill : icons.checkbox}
          style={{ width: 25, height: 25, resizeMode: "contain" }}
        />
        <Text
          style={{
            fontFamily: FONT.bold,
            fontSize: 18,
            color: isDarkMode ? COLORS.white : COLORS.black,
          }}
        >
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
