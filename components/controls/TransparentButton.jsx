import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { COLORS, FONT } from "../../constants";

const TransparentButton = ({ onPress, style, title }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={{ ...styles.buttonStyle, ...style }}>
        <Text style={styles.textStyle}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    borderColor: COLORS.primary,
    borderWidth: 2,
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  textStyle: {
    fontSize: 18,
    fontFamily: FONT.bold,
    color: COLORS.primary,
    textAlign: "center",
  },
});

export default TransparentButton;
