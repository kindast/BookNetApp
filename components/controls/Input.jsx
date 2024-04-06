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

export default function Input({
  label,
  placeholder,
  keyboardType,
  value,
  onChangeText,
  style,
  secureTextEntry,
  maxLength,
  validation = () => {},
}) {
  const [isFocused, setIsFocused] = React.useState(false);
  const isDarkMode = useSelector((state) => state.settings.isDarkMode);
  const [isInvisible, setIsInvisible] = React.useState(true);
  const [isFocusedFirst, setIsFocusedFirst] = React.useState(false);

  return (
    <View style={style}>
      <Text
        style={{
          fontFamily: FONT.bold,
          fontSize: SIZES.medium,
          color: isDarkMode ? COLORS.white : COLORS.black,
        }}
      >
        {label}
      </Text>
      <View>
        <TextInput
          maxLength={maxLength}
          secureTextEntry={secureTextEntry && isInvisible}
          style={{
            marginTop: 16,
            borderBottomColor:
              validation() && isFocusedFirst
                ? "#ff628c"
                : isFocused
                ? COLORS.primary
                : isDarkMode
                ? COLORS.white
                : COLORS.black,
            borderBottomWidth: 1,
            padding: 0,
            paddingBottom: 8,
            fontFamily: FONT.bold,
            fontSize: SIZES.input,
            color: isDarkMode ? COLORS.white : COLORS.black,
          }}
          placeholderTextColor={isDarkMode ? COLORS.white : COLORS.black}
          placeholder={placeholder}
          keyboardType={keyboardType}
          value={value}
          onChangeText={onChangeText}
          onSubmitEditing={Keyboard.dismiss}
          onFocus={() => {
            setIsFocused(true);
            setIsFocusedFirst(true);
          }}
          onBlur={() => setIsFocused(false)}
        />

        {secureTextEntry && (
          <TouchableOpacity
            style={{ position: "absolute", right: 0, bottom: 10 }}
            onPress={() => setIsInvisible(!isInvisible)}
          >
            <Image
              source={isInvisible ? icons.closedEye : icons.openedEye}
              style={{ width: 24, height: 20, resizeMode: "contain" }}
            />
          </TouchableOpacity>
        )}
      </View>
      {validation() && isFocusedFirst && (
        <View>
          <Text
            style={{
              fontFamily: FONT.regular,
              marginTop: 5,
              fontSize: 16,
              color: "#ff628c",
            }}
          >
            {validation()}
          </Text>
        </View>
      )}
    </View>
  );
}
