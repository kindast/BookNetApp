import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Keyboard,
} from "react-native";
import { FONT, SIZES, COLORS, icons } from "../../constants";
import React from "react";
import { useSelector } from "react-redux";

export default function SearchBox({
  value,
  onChangeText,
  style,
  inputRef,
  onFilterPress,
}) {
  const [isFocused, setIsFocused] = React.useState(false);
  const isDarkMode = useSelector((state) => state.settings.isDarkMode);

  const getBackgroundColor = () => {
    if (isFocused) {
      return isDarkMode ? "#2b241d" : "#fff7eb";
    } else {
      return isDarkMode ? "#1f222a" : "#fafafa";
    }
  };

  return (
    <View style={style}>
      <View>
        <TextInput
          ref={inputRef}
          maxLength={50}
          style={{
            borderColor: isFocused ? COLORS.primary : "transparent",
            backgroundColor: getBackgroundColor(),
            color: isDarkMode ? COLORS.white : COLORS.black,
            paddingLeft: 55,
            paddingRight: isFocused ? 30 : 55,
            paddingVertical: 19,
            borderWidth: 1,
            borderRadius: 15,
            fontFamily: FONT.regular,
            fontSize: 16,
          }}
          cursorColor={COLORS.primary}
          selectionColor={COLORS.primary}
          placeholderTextColor={isDarkMode ? COLORS.white : COLORS.black}
          keyboardType="default"
          value={value}
          onChangeText={onChangeText}
          onSubmitEditing={Keyboard.dismiss}
          onFocus={() => {
            setIsFocused(true);
          }}
          onBlur={() => setIsFocused(false)}
        />
        <Image
          source={isDarkMode ? icons.searchLight : icons.search}
          style={{
            width: 25,
            height: 25,
            position: "absolute",
            left: 20,
            top: 20,
          }}
        />
        {!isFocused && (
          <TouchableOpacity
            onPress={onFilterPress}
            style={{ position: "absolute", right: 20, top: 20 }}
          >
            <Image
              source={icons.filter}
              style={{
                width: 25,
                height: 25,
                resizeMode: "contain",
              }}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
