import {View, Text, TextInput} from 'react-native';
import {FONT, SIZES, COLORS} from '../../constants';
import React from 'react';
import {useSelector} from 'react-redux';

export default function Input({
  label,
  placeholder,
  keyboardType,
  value,
  onChangeText,
  style,
}) {
  const [isFocused, setIsFocused] = React.useState(false);
  const isDarkMode = useSelector(state => state.settings.isDarkMode);

  return (
    <View style={style}>
      <Text
        style={{
          fontFamily: FONT.bold,
          fontSize: SIZES.medium,
          color: isDarkMode ? COLORS.white : COLORS.black,
        }}>
        {label}
      </Text>
      <TextInput
        style={{
          marginTop: 16,
          borderBottomColor: isFocused
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
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </View>
  );
}
