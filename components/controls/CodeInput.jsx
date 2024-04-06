import { View, TextInput, StyleSheet } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { COLORS, FONT } from "../../constants";

export default function CodeInput({ style, onCodeChange }) {
  const isDarkMode = useSelector((state) => state.settings.isDarkMode);
  const [inputs, setInputs] = React.useState(["", "", "", ""]);
  const [focusIndex, setFocusIndex] = React.useState(null);
  const inputRefs = React.useRef([]);

  const focusInput = (index) => {
    inputRefs.current[index].focus();
    setFocusIndex(index);
  };

  const handleKeyPress = (key, index) => {
    if (key === "Backspace" && index > 0 && !inputs[index]) {
      focusInput(index - 1);
    } else if (key !== "Backspace" && index < inputs.length - 1) {
      focusInput(index + 1);
    }
  };

  const handleChangeText = (text, index) => {
    let hasDotOrComma = /[.,]/.test(text);
    if (hasDotOrComma) {
      focusInput(index);
      return;
    }

    const newInputs = [...inputs];
    newInputs[index] = text;
    setInputs(newInputs);
    onCodeChange(newInputs.join(""));

    if (
      text.length === 1 &&
      index < inputs.length - 1 &&
      inputs.slice(0, index).every((input) => input.length === 1)
    ) {
      focusInput(index + 1);
    }
  };

  const getBackgroundColor = (index) => {
    if (focusIndex === index) {
      return isDarkMode ? "#2b241d" : "#fff7eb";
    } else {
      return isDarkMode ? "#1f222a" : "#fafafa";
    }
  };

  return (
    <View style={{ ...styles.container, ...style }}>
      {inputs.map((value, index) => (
        <TextInput
          key={index}
          ref={(ref) => (inputRefs.current[index] = ref)}
          style={{
            borderColor:
              focusIndex === index
                ? COLORS.primary
                : isDarkMode
                ? "#34373e"
                : "rgba(0,0,0,0.1)",
            backgroundColor: getBackgroundColor(index),
            color: isDarkMode ? COLORS.white : COLORS.black,
            ...styles.input,
          }}
          keyboardType="number-pad"
          maxLength={1}
          value={value}
          onChangeText={(text) => handleChangeText(text, index)}
          onKeyPress={({ nativeEvent: { key } }) => handleKeyPress(key, index)}
          onFocus={() => {
            focusInput(index);
          }}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  input: {
    paddingHorizontal: 30,
    paddingVertical: 19,
    borderWidth: 1,
    borderRadius: 15,
    textAlign: "center",
    fontFamily: FONT.bold,
    fontSize: 24,
  },
});
