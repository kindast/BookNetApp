import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Keyboard,
} from "react-native";
import { FONT, SIZES, COLORS, icons } from "../../constants";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";

export default function Input({
  label,
  placeholder,
  keyboardType,
  value,
  onChangeText,
  onBlur,
  style,
  secureTextEntry,
  multiline,
  maxLength,
  error,
}) {
  const [isFocused, setIsFocused] = React.useState(false);
  const isDarkMode = useSelector((state) => state.settings.isDarkMode);
  const [isInvisible, setIsInvisible] = React.useState(true);
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
          multiline={multiline}
          maxLength={maxLength}
          secureTextEntry={secureTextEntry && isInvisible}
          style={{
            marginTop: 16,
            borderBottomColor: error
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
          cursorColor={COLORS.primary}
          placeholderTextColor={isDarkMode ? COLORS.white : COLORS.black}
          placeholder={placeholder}
          keyboardType={keyboardType}
          value={value}
          onChangeText={onChangeText}
          onSubmitEditing={() => {}}
          onFocus={() => {
            setIsFocused(true);
          }}
          onBlur={(event) => {
            setIsFocused(false);
            if (onBlur) onBlur(event);
          }}
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
      <Text
        style={{
          fontFamily: FONT.regular,
          marginTop: error ? 5 : 0,
          display: error ? "flex" : "none",
          fontSize: 16,
          color: "#ff628c",
        }}
      >
        {error}
      </Text>
    </View>
  );
}
